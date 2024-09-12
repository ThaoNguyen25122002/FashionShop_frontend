<template>
  <div class="text-center mx-auto py-10">
    <nav class="inline-flex shadow-sm">
      <button
        :disabled="currentPage === 1"
        @click="changePage(currentPage - 1)"
        class="bg-white border border-gray-300 text-gray-500 hover:bg-gray-200 px-3 py-1 rounded-l-lg"
      >
        Trước
      </button>
      <button
        v-for="page in lastPage"
        :key="page"
        @click="changePage(page)"
        :class="currentPage === page ? 'bg-primary text-white' : 'bg-white text-gray-700'"
        class="border-t border-b border-gray-300 hover:bg-gray-200 px-3 py-1"
      >
        {{ page }}
      </button>

      <button
        :disabled="currentPage === lastPage"
        @click="changePage(currentPage + 1)"
        class="bg-white border border-gray-300 text-gray-500 hover:bg-gray-200 px-3 py-1 rounded-r-lg"
      >
        Sau
      </button>
    </nav>
  </div>
</template>

<script setup>
const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  lastPage: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['changePage'])
const changePage = (page) => {
  if (page !== props.currentPage && page >= 1 && page <= props.lastPage) {
    emit('changePage', page)
  }
}
</script>
