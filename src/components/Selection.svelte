<script lang="ts">
  import { tick, createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

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
    if (e.key === 'Alt') {
            const newVariable = getSelectedText();
      if (!newVariable) return;
       dispatch('sendselection', { message: newVariable });

    }
  }
    document.addEventListener('keydown', handleKeydown);
</script>


  <!-- <div style="background: violet">money</div> -->
