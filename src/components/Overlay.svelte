<script lang="ts">
  import { storage } from "src/storage";
    import { onMount } from "svelte";
    import Options from "./Options.svelte";
    import Sheet from "./Sheet.svelte"

    let count = 0;
    let sheet = {
    id: 1,
    content: "Initial content",
    }


  let overlay = false

  function handleKeydown(e){
        var ele = e.target
    if (e.key=== "Alt"){
      overlay = true
    }
  }

  document.addEventListener('keydown', handleKeydown);



    onMount(() => {
        storage.get().then((storage) => (count = storage.count));
    });
</script>

{#if overlay}
<div class="overlay">
  <Sheet {sheet}></Sheet>
</div>

{/if}

<style>
    .overlay {
        position: fixed;
        top: 160px;
        left: 160px;
        background-color: white;
        border: 1px solid black;
        padding: 4px;
      height: 160px;
      width: 160px;
    }
</style>
