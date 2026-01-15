<script lang="ts">
  import Installation from "./Installation.svelte";
  import Instructions from "./Instructions.svelte";

  import TemplatesSection from "./TemplatesSection.svelte";

  const REPO_NAME = "asdrome/godot-individual-export-templates";
  const REPO_URL = `https://github.com/${REPO_NAME}`;
  const GITHUB_API_URL = `https://api.github.com/repos/${REPO_NAME}/releases`;

  // Managed by TemplatesSection, and passed down to TemplatesSelector and Installation. Don't edit here.
  let release: Release = $state({ tag_name: "" });
  let releases: Release[] = $state([]);
</script>

<section class="intro">
  <div class="warning-box">
    <strong>⚠️ Not an Official Tool:</strong> Uses a
    <a
      href="https://github.com/asdrome/godot-individual-export-templates"
      target="_blank">custom mirror repository</a
    > to fetch binaries.
  </div>
  <div class="card">
    <p>Looking for a way to download individual export templates for Godot?</p>
    <h3>This tool can help.</h3>
  </div>
</section>
<Instructions />
<TemplatesSection bind:release bind:releases {REPO_NAME} />
<Installation {release} />

<style>
  h3,
  .intro p {
    text-align: center;
  }
</style>
