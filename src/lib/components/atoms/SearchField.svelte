<script lang="ts">
  import Icon from '@iconify/svelte';
  
  export let name: string;
  export let value: string;
  export let placeholder = '';
  export let required = false;
</script>

<label for="search" class="sr-only mb-2 text-sm font-medium text-gray-900">Search</label>
<div class="relative">
  <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
    <Icon icon="mdi:search" class="h-5 w-5 text-gray-500" />
  </div>
  <input type="search" id="search" {name} {value} class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500" {placeholder} {required} />
  <button type="submit" class="absolute right-2.5 bottom-2.5 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300">Search</button>
</div>
