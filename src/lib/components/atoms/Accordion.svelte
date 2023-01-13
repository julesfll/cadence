<script lang="ts">
  import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
  } from "@rgossiaux/svelte-headlessui";
</script>

<Disclosure>
  <DisclosureButton>Is team pricing?</DisclosureButton>
  <DisclosurePanel>
    Yes! You can purchase a license.
  </DisclosurePanel>
</Disclosure>