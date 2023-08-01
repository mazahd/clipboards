<script lang="ts">
  import Sheet from './Sheet.svelte';
  import Toolbar from './Toolbar.svelte';
  import type { SheetType } from '../types/sheet.type';

  export let sheets: SheetType[] = [];

  const mobileMaxWidth = 576;

  $: currentSheet = 1;

  let isZoomed = false;

  let windowWidth: number;
  $: isMobile = windowWidth <= mobileMaxWidth;
  $: if (isMobile) isZoomed = true;

  function money(sheet: SheetType, variable: any) {
  const i = sheets.findIndex((s) => s.id === sheet.id);
  sheets[i] = { ...sheets[i], ...sheet, content: `${sheets[i].content} ${variable}` };
}


  function updateSheet(sheet: SheetType) {
    const i = sheets.findIndex((s) => s.id === sheet.id);
    sheets[i] = { ...sheets[i], ...sheet };
  }

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
    if (e.ctrlKey && e.key === 'f' && !isMobile) {
      e.preventDefault();
      isZoomed = !isZoomed;
    } else if (e.key === 'Tab') {
      e.preventDefault();
      let nextSheet: number;
      if (e.shiftKey) {
        nextSheet = currentSheet === 1 ? sheets.length : currentSheet - 1;
      } else {
        nextSheet = currentSheet === sheets.length ? 1 : currentSheet + 1;
      }
      currentSheet = nextSheet;
    }

    // else if (e.key === 'Alt') {
    //         const newVariable = getSelectedText();
    //   if (!newVariable) return;
    //   money(sheets[currentSheet - 1], newVariable);
    // }
  }

    document.addEventListener('insert', (event) => {
    // Access the event data (message) from ComponentA
    alert('Received event in ComponentB:');
  });
</script>

<svelte:window bind:innerWidth={windowWidth} on:keydown={handleKeydown} />

<Toolbar {sheets} {isMobile} bind:currentSheet bind:fullscreen={isZoomed} />

<div class="container">
  <ul role="list" class="pad" class:zoomed={isZoomed}>
    {#each sheets as sheet (sheet.id)}
      <li
        class="pad-item"
        class:current={currentSheet === sheet.id}
        class:zoomed={isZoomed}
      >
        <Sheet
          {sheet}
          zoomed={isZoomed}
          isCurrent={currentSheet === sheet.id}
          on:focus={(e) => (currentSheet = e.detail)}
          on:update={(e) => updateSheet(e.detail)}
        />
      </li>
    {/each}
  </ul>
</div>

<style>
  .container {
    grid-area: pad;
    display: flex;
    flex-direction: column;
  }
  .pad {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 2px;
    list-style: none;
    margin: 0;
    padding: 0;
    height: 550px;
  }
  .pad.zoomed {
    grid-template-columns: 1fr;
  }
  .pad-item {
    display: flex;
    flex-flow: column nowrap;
  }
  .pad-item.current.zoomed {
    grid-row: 1/-1;
    grid-column: 1/-1;
  }

  .pad.zoomed .pad-item:not(.current) {
    display: none;
  }

  @media (min-width: 992px) {
    .pad:not(.zoomed) {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
</style>
