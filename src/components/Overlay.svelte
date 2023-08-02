<script lang="ts">
  import Draggable from './Draggable.svelte';
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

  // $: console.log($sheets)
    document.addEventListener('keydown', handleKeydown);

// window.onstorage = (e) => {
//     // if(e.key === $sheets.keys)
//     console.log("event" , e.key)
//     console.log($sheets)

// };
// window.onstorage = (e) => {
//   // When local storage changes, dump the list to
//   // the console.
//     console.log("event" , e)
//     console.log("sheets" , $sheets)
//   // console.log(JSON.parse(window.localStorage.getItem("sampleList")));
// };


  
  // const draggableElement = document.querySelector('.overlay');

  // // Function to handle the drag start event
  // function handleDragStart(event) {
  //   event.dataTransfer.setData('text/plain', 'Draggable Element'); // This line is necessary, but the content doesn't matter.
  //   event.target.style.opacity = '0.5'; // Optionally, you can set a visual effect to indicate dragging.
  // }

  // // Function to handle the drag event
  // function handleDrag(event) {
  //   // You can add additional code here if you need to do something while dragging.
  // }

  // // Function to handle the drag end event
  // function handleDragEnd(event) {
  //   event.target.style.opacity = '1'; // Reset the element's opacity after dragging.
  // }

  // // Add event listeners to the draggable element
  // draggableElement.addEventListener('dragstart', handleDragStart);
  // draggableElement.addEventListener('drag', handleDrag);
  // draggableElement.addEventListener('dragend', handleDragEnd);


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
