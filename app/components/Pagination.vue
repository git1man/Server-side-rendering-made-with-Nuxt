<template>
  <div>
    <nav
      v-if="totalPages > 1"
      class="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-6 sm:mt-8 py-4 sm:py-8 px-2"
      aria-label="Pagination"
    >
      <button
        :disabled="currentPage <= 1"
        @click="emit('change', currentPage - 1)"
        class="rounded border px-3 py-2 disabled:opacity-40 hover:bg-green-600 hover:text-white active:bg-green-400 cursor-pointer"
      >
        Previous
      </button>

      <button
        v-for="page in totalPages"
        :key="page"
        @click="emit('change', page)"
        :aria-current="page === currentPage ? 'page' : undefined"
        :class="[
          'rounded border px-3 py-2',
          page === currentPage ? 'bg-green-600 text-white' : 'hover:bg-gray-100 cursor-pointer',
        ]"
      >
        {{ page }}
      </button>

      <button
        :disabled="currentPage >= totalPages"
        @click="emit('change', currentPage + 1)"
        class="rounded border px-3 py-2 disabled:opacity-40 hover:bg-green-600 hover:text-white active:bg-green-400 cursor-pointer"
      >
        Next
      </button>
    </nav>
  </div>
</template>

<script setup>
defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
});
const emit = defineEmits(["change"]);
</script>
<style scoped></style>
