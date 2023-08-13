
<!-- App.svelte -->
<script>
  import { writable } from 'svelte/store';

  // Create a writable store to hold the data
  const myData = writable('Initial Value');

  // Listen to the "storage" event to detect changes made in other tabs
  window.addEventListener('storage', (event) => {
    if (event.key === 'myData') {
      myData.set(event.newValue);
    }
  });

  // Function to update localStorage and synchronize across tabs
  function updateLocalStorage(newValue) {
    localStorage.setItem('myData', newValue);
  }

  // Example function to update the store
  function updateStoreValue() {
    myData.update((value) => `${value} Updated`);
  }
</script>

<main>
  <h1>Svelte Store & localStorage Sync Across Tabs</h1>
  <p>Value in this tab: {$myData}</p>
  <button on:click={updateStoreValue}>Update Store Value</button>
</main>
