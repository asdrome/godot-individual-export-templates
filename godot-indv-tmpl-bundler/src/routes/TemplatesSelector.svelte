<script lang="ts">
  import { slide } from "svelte/transition";

  let {
    release,
    chosenAssets = $bindable(),
  }: { release: Release; chosenAssets: Asset[] } = $props();

  const VERSION_GROUPS: Record<string, Platform[]> = {
    v3: [
      { label: "Android", matchers: [/^android_/i] },
      { label: "Windows", matchers: [/^windows_/i] },
      { label: "macOS", matchers: [/^osx/i] },
      { label: "iOS", matchers: [/^iphone/i] },
      { label: "UWP", matchers: [/uwp/i] },
      { label: "Linux", matchers: [/^linux_/i] },
      { label: "Web", matchers: [/^webassembly/i] },
      { label: "Version", matchers: [/^version\.txt$/i] },
    ],
    v4: [
      { label: "Android", matchers: [/^android_/i] },
      { label: "Windows", matchers: [/^windows_/i] },
      { label: "macOS", matchers: [/^macos/i] },
      { label: "iOS", matchers: [/^ios/i] },
      { label: "visionOS", matchers: [/^visionos/i] },
      { label: "Linux", matchers: [/^linux_/i] },
      { label: "Web", matchers: [/^web_/i] },
      { label: "Data", matchers: [/^icudt_/i] },
      { label: "Version", matchers: [/^version\.txt$/i] },
    ],
  };

  function groupAssetsByPlatform(release: Release): PlatformAssets[] {
    const versionMajor = release.tag_name.split(".")[0];
    const platformsForVersion = VERSION_GROUPS[versionMajor] || [];
    const assets: Asset[] = release.assets || [];
    const grouped: PlatformAssets[] = platformsForVersion.map((platform) => ({
      label: platform.label,
      assets: assets.filter((asset) =>
        platform.matchers.some((regex) => regex.test(asset.name))
      ),
    }));

    return grouped;
  }

  function togglePlatformAssets(platform: PlatformAssets, checked: boolean) {
    platform.assets.forEach((asset) => {
      // Ignore version.txt from toggling
      if (asset.name.toLowerCase() === "version.txt") return;

      const index = chosenAssets.findIndex((a) => a.id === asset.id);
      if (checked && index === -1) {
        chosenAssets = [...chosenAssets, asset];
      } else if (!checked && index !== -1) {
        chosenAssets = chosenAssets.filter((a) => a.id !== asset.id);
      }
    });
  }

  function toggleAccordion(label: string) {
    const newSet = new Set(expandedPlatforms);
    if (newSet.has(label)) {
      newSet.delete(label);
    } else {
      newSet.add(label);
    }
    expandedPlatforms = newSet;
  }

  $effect(() => {
    if (release?.assets) {
      const versionAsset = release.assets.find((a) => a.name === "version.txt");

      // If it exists, ensure version.txt is always included
      if (versionAsset) {
        chosenAssets = [versionAsset];
      }
    }
  });

  // Controls which assets are shown based on selected release
  let groupedPlatforms = $derived(
    release ? groupAssetsByPlatform(release) : []
  );

  // Tracks which platforms are expanded in the UI
  let expandedPlatforms = $state(new Set<string>());
</script>

<div class="card">
  {#if release.tag_name}
    <div class="release-title">
      <h2>{release.tag_name}</h2>
      <span>Total selected: {chosenAssets.length}</span>
    </div>
    <p>
      > The <code>version.txt</code> file is required, and thus always selected.
    </p>
    <div class="templates-selector-group">
      {#each groupedPlatforms as platform}
        <!-- Generated variable to check if all assets in the platform are selected -->
        {@const allSelected =
          platform.assets.length > 0 &&
          platform.assets.every((asset) =>
            chosenAssets.some((c) => c.id === asset.id)
          )}
        <div class="platform-item">
          <strong>{platform.label}</strong>
          <input
            type="checkbox"
            id={`platform-${platform.label}`}
            checked={allSelected}
            onclick={() => togglePlatformAssets(platform, !allSelected)}
            disabled={platform.label === "Version"}
          />
        </div>
        <div class="card">
          {#each platform.assets as asset}
            <div class="asset-item">
              <input
                type="checkbox"
                id={`asset-${asset.id}`}
                value={asset}
                bind:group={chosenAssets}
                disabled={asset.name.toLowerCase() === "version.txt"}
              />
              <label for={`asset-${asset.id}`}>{asset.name}</label>
            </div>
          {/each}
        </div>
      {/each}
    </div>
  {:else}
    <p class="loader">Could not fetch releases from GitHub.</p>
  {/if}
</div>

<style>
  .templates-selector-group .card {
    background-color: var(--bg-secondary);
    margin-bottom: 1rem;
  }

  .release-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .platform-item {
    display: inline-block;
  }

  .asset-item label,
  .asset-item input {
    cursor: pointer;
  }
</style>
