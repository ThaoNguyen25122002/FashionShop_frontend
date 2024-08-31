<template>
  <div>
    <div>
      <!-- Body Section -->
      <div class="container pt-14">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          <!-- Simplified Card -->
          <button
            class="group flex items-center justify-center p-4 border-none bg-primary/10 rounded-xl hover:bg-primary/20 transition-all"
            v-for="category in categories"
            :key="category.id"
          >
            <h3 class="font-medium text-secondary group-hover:text-primary">
              {{ category.name }}
            </h3>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  categories: Array
})
</script>
