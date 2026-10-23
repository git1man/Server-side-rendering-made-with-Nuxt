<template>
  <div>
    <ul v-if="store.categories.length" class="grid grid-cols-2 gap-1 p-2">
      <li v-for="category in store.categories" :key="category.slug">
        <NuxtLink
          class="block rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-700"
          active-class="!text-blue-700 bg-gray-50"
        >
          {{ category.name }}
        </NuxtLink>
      </li>
    </ul>

    <p v-else class="px-4 py-3 text-sm text-gray-500">
      {{
        store.error
          ? "Categories could not be loaded."
          : "No categories available."
      }}
    </p>
  </div>
</template>

<script setup>
const store = useCategoriesStore();
await useAsyncData("categories", () => store.fetchcategories());
if (import.meta.server) {
  console.log(store.categories);
}
</script>

<style scoped></style>