<script lang="ts">
  let { release, chosenAssets }: { release: Release; chosenAssets: Asset[] } =
    $props();

  const PLATFORM_PATHS = [
    {
      label: "Linux",
      codename: "linux",
      path: "~/.local/share/godot",
      supported: true,
      command: "wget -i {1} -P {2}",
    },
    {
      label: "Windows",
      codename: "windows",
      path: "%APPDATA%\\Godot",
      supported: false,
    },
    {
      label: "MacOS",
      codename: "macos",
      path: "~/Library/Application Support/Godot",
      supported: false,
    },
  ];

  const VERSION_DIR: Record<string, string> = {
    v3: "templates",
    v4: "export_templates",
  };

  const versionMajor = $derived(release.tag_name.split(".")[0]);

  function downloadFile(assets: Asset[], fileName: string) {
    if (assets.length === 0) {
      alert("No assets selected!");
      return;
    }

    const content: string = assets
      .map((asset) => `${asset.browser_download_url}`)
      .join("\n");

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function getPlatformCommand(
    platformCodename: string,
    fileName: string,
    godotVersion: string
  ): string {
    const platform = PLATFORM_PATHS.find(
      (p) => p.codename === platformCodename && p.supported
    );
    if (platform && platform.command) {
      if (!VERSION_DIR[godotVersion]) {
        return "# Unsupported Godot version for CLI installation.";
      }
      const RELEASE_DIR = release.tag_name.replace("v", "").replace("-", ".");
      const path = `${platform.path}/${VERSION_DIR[godotVersion]}/${
        RELEASE_DIR
      }`;
      return platform.command.replace("{1}", fileName).replace("{2}", path);
    }
    return "";
  }

  function copyCommands() {
    const text = document.getElementById("cli-display")?.textContent;
    const trimmedText = text ? text.trim() : "";
    navigator.clipboard.writeText(trimmedText);
    alert("Commands copied to clipboard!");
  }

  const fileName = "godot_export_template_urls.txt";

  let targetPlatform: string = $state(PLATFORM_PATHS[0].codename);
  let commandOutput = $derived(
    getPlatformCommand(targetPlatform, fileName, versionMajor)
  );
</script>

<h2>Installation</h2>

<div class="card">
  <div class="controls">
    <label for="platform-path-select">Target Operating System:</label>
    <select id="platform-path-select" bind:value={targetPlatform}>
      {#each PLATFORM_PATHS as platform}
        <option value={platform.codename} disabled={!platform.supported}>
          {platform.label}
          {platform.supported ? "" : " (Unsupported)"}
        </option>
      {/each}
    </select>
  </div>
  <div id="terminal-section">
    <p>
      We'll generate a file with the list of URLs for downloading the selected
      export templates.
    </p>
    <h3>CLI Install (Recommended)</h3>
    <ol>
      <li>Download the file to your computer.</li>
      <li>Open a terminal in the download location.</li>
      <li>
        Copy and paste the generated commands into your terminal to download and
        install the selected export templates.
      </li>
    </ol>
    <div
      class="code-wrapper"
      style="background: #000; padding: 15px; border-radius: 5px; position: relative;"
    >
      <pre
        id="cli-display"
        style="color: #00ff00; font-family: monospace; overflow-x: auto;">{commandOutput}</pre>
    </div>

    <div class="btns">
      <button
        class="primary-btn"
        onclick={() => downloadFile(chosenAssets, fileName)}
        >Download URL list</button
      >
      <button class="secondary-btn" onclick={copyCommands}>Copy commands</button
      >
    </div>
  </div>
</div>

<style>
  h2 {
    text-align: center;
  }

  .btns {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
    justify-content: center;
  }

  .primary-btn {
    background-color: var(--accent-default);
  }

  .primary-btn:hover {
    background-color: var(--accent-hover);
  }

  .secondary-btn {
    background-color: var(--accent-secondary);
  }

  .secondary-btn:hover {
    background-color: var(--accent-secondary-hover);
  }
</style>
