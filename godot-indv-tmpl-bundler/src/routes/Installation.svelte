<script>
  let { release } = $props();
</script>

<h3>CLI Installation (Recommended)</h3>

<div class="card">
  <div class="controls">
    <label for="platform-path-select">Target Operating System:</label>
    <select id="platform-path-select">
      <option value="linux">Linux (~/.local/share/godot)</option>
      <option value="windows" disabled>Windows (Coming Soon)</option>
      <option value="macos" disabled>macOS (Coming Soon)</option>
    </select>
  </div>

  <div id="terminal-section">
    <h3>Installation Script (Recommended)</h3>
    <p>
      We'll generate a file with the list of URLs for downloading the selected
      export templates.
    </p>
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
        style="color: #00ff00; font-family: monospace; overflow-x: auto;"></pre>
      <div style="margin-top: 10px; display: flex; gap: 10px;">
        <button class="secondary-btn" style="background: #2e7d32;"
          >Download URL list</button
        >
        <button class="secondary-btn">Copy commands</button>
      </div>
    </div>
  </div>
</div>
