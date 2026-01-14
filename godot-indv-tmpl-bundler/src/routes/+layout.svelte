<script lang="ts">
  import favicon from "$lib/assets/favicon.svg";
  import "../global.css";
  let { children } = $props();
</script>

<svelte:head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
