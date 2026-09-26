<template>
  <div class="max-w-7xl mx-auto px-4 py-8">
    <div
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
    >
      <div
        v-for="product in store.products"
        :key="product.id"
        class="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200"
      >
        <div class="aspect-square bg-gray-100 overflow-hidden">
          <img
            :src="product.thumbnail"
            :alt="product.title"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          />

        </div>

        <div class="p-4">
          <h3 class="text-sm font-medium text-gray-900 truncate">
            {{ product.title }}
          </h3>
          <h6 class="truncate">{{product.description}}</h6>
          <p class="mt-1 text-lg font-semibold text-green-800">
            ${{ product.price }}
          </p>
          <button class="">Add To Cart</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const store = useProductStore();
await callOnce("products", () => store.fetchProducts());

if (import.meta.server) {
  console.log(store.products);
}
</script>

<style scoped></style>
