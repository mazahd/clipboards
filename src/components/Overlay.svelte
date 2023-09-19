<script lang="ts">
  import Draggable from './Draggable.svelte';
  import Pad from './Pad.svelte'
  import { sheets } from '../stores'
  import { xeets } from '../extore'

  let overlay = false
  let second = false

const port = chrome.runtime.connect();

// Define a function to send a message to the background script
function sendMessageToBackgroundScript(msg) {
  port.postMessage(msg);
}



port.onMessage.addListener((msg) => {
    // if(msg.data){
    //   console.log(msg)
    // console.log(msg)
    // }
    // if(msg.event){
    console.log(msg)
    //   alert(text)
    // }
  })

// Example message to send
const exampleMessage = {
    question: "is this gpt-4?"
};

// Send the example message to the background script

function handleKeydown(e: KeyboardEvent) {
    if (e.ctrlKey) {
        if (e.key === 'l') {
        sendMessageToBackgroundScript(exampleMessage)
            // executeCode();
        } else if (e.key === 'x') {
            second = true; // Assuming 'second' is declared somewhere in your code
        }
    }
   if (e.key === "Escape") {
      second = false
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
