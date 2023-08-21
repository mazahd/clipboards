<script lang="ts">
  import Draggable from './Draggable.svelte';
  import Pad from './Pad.svelte'
  import { sheets } from '../stores'
  import { xeets } from '../extore'

  let overlay = false
  let second = false


function handleKeydown(e: KeyboardEvent) {
    if (e.ctrlKey) {
        if (e.key === 'l') {
        overlay = !overlay
            // executeCode();
        } else if (e.key === 'x') {
            second = !second; // Assuming 'second' is declared somewhere in your code
        }
    }
}

document.addEventListener('keydown', handleKeydown);
</script>

{#if overlay}
  <Draggable>
<div class="overlay">
  <Pad bind:sheets={$sheets} />
</div>
  </Draggable>
{/if}

{#if second}
  <Draggable>
<div class="overlay">
  <Pad bind:sheets={$xeets} />
</div>
  </Draggable>
{/if}

  <style>
    .overlay {
        position: fixed;
        /* top: 60px; */
        /* left: 460px; */
        /* background-color: white; */
        border: 1px solid black;
        padding: 4px;
      /* height: 100vh; */
      /* width: 100vh; */
      z-index: 9999;
      resize: both;
      overflow: auto;
    }
</style>
