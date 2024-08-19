<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'

import { computed } from 'vue'

const props = defineProps({
  item: Object
})
</script>
<template>
  <!-- Dashboard Menu Item -->
  <RouterLink
    v-if="!item.children.length"
    :to="{ name: `${item.name}` }"
    class="flex gap-2 items-center w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-lg"
  >
    <i :class="item.icon"></i>
    {{ item.label }}
  </RouterLink>

  <!-- Products Menu Item -->
  <Disclosure v-else as="div" class="">
    <DisclosureButton
      class="flex justify-between items-center w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-lg"
    >
      <div class="flex items-center gap-2">
        <i :class="item.icon"></i>
        <span>{{ item.label }}</span>
      </div>

      <i class="fa-solid fa-angle-down" :open="true"></i>
    </DisclosureButton>
    <DisclosurePanel class="pl-4">
      <RouterLink
        v-for="child in item.children"
        :key="child.label"
        :to="{ name: `${child.name}` }"
        class="block pl-5 py-2 text-black hover:bg-gray-100 rounded-lg"
      >
        {{ child.label }}
      </RouterLink>
    </DisclosurePanel>
  </Disclosure>
</template>
