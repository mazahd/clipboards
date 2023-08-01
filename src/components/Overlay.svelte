<script lang="ts">
  import Pad from './Pad.svelte'
  import { sheets } from '../stores'
  import { xeets } from '../extore'
  import { tick, createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();


  let overlay = false
  let second = false
  const getSelectedText = (): string => {
  const element = document.activeElement as HTMLElement;
  const isInTextField = element.tagName === "INPUT" || element.tagName === "TEXTAREA";
  const selectedText = isInTextField
    ? (element as HTMLInputElement | HTMLTextAreaElement).value.substring(
        (element as HTMLInputElement | HTMLTextAreaElement).selectionStart,
        (element as HTMLInputElement | HTMLTextAreaElement).selectionEnd
      )
    : window.getSelection()?.toString() ?? "";
  return selectedText;
};




  function handleKeydown(e: KeyboardEvent) {
        if (e.ctrlKey && e.key === 'l' ) {
      overlay = !overlay
  }

        if (e.ctrlKey && e.key === 'x' ) {
      second = !second
  }
    if (e.key === 'Alt') {
            const newVariable = getSelectedText();
      if (!newVariable) return;
       dispatch('insert', { message: newVariable });

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
