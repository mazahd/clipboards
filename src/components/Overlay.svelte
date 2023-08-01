<script lang="ts">
  import Pad from './Pad.svelte'
  import { sheets } from '../stores'
  import { xeets } from '../extore'

  let overlay = false
  let second = false



  function handleKeydown(e: KeyboardEvent) {
        if (e.ctrlKey && e.key === 'l' ) {
      overlay = !overlay
  }

        if (e.ctrlKey && e.key === 'x' ) {
      second = !second
  }
  }
    document.addEventListener('keydown', handleKeydown);

</script>

{#if overlay}
<div class="overlay">
  <Pad bind:sheets={$sheets} />
</div>
{/if}

{#if second}
<div class="overlay">
  <Pad bind:sheets={$xeets} />
</div>
{/if}

  <style>
    .overlay {
        position: fixed;
        top: 60px;
        left: 460px;
        /* background-color: white; */
        border: 1px solid black;
        padding: 4px;
      height: 360px;
      width: 360px;
      z-index: 9999;
    }
</style>
