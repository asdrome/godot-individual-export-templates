<script lang="ts">
  import { onMount } from "svelte";
  import TemplatesSelector from "./TemplatesSelector.svelte";

  let {
    release = $bindable(),
    releases = $bindable(),
    REPO_NAME,
  }: {
    release: Release;
    releases: Release[];
    REPO_NAME: string;
  } = $props();

  let chosenAssets: Asset[] = $state([]);
  let releases_tags: string[] = $derived(
    releases.map((r: Release) => r.tag_name)
  );

  async function fetchReleases(): Promise<Release[]> {
    const API_URL = `https://api.github.com/repos/${REPO_NAME}/releases`;
    try {
      const response = await fetch(API_URL);
      const _releases: Release[] = await response.json();
      return _releases;
    } catch (e) {
      console.error("Error fetching releases:", e);
      return [];
    }
  }

  onMount(async () => {
    releases = await fetchReleases();
    if (releases.length > 0) {
      release = releases[0];
    } else {
      releases = [release];
    }
  });
</script>

<section class="Releases">
  <h2>Release</h2>
  <div class="controls">
    <label for="release-select">Select a release:</label>
    <select id="release-select" bind:value={release}>
      {#each releases as version}
        <option value={version}>
          {version.tag_name}
        </option>
      {/each}
    </select>
  </div>

  <TemplatesSelector {release} {chosenAssets} />
</section>

<style>
  h2 {
    text-align: center;
  }

  .controls {
    margin: 1rem 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    justify-content: center;
    font-weight: bold;
  }
</style>
