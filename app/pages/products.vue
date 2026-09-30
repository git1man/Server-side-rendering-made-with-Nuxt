<template>
  <div class="max-w-7xl mx-auto py-8">
    <div
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
    >
      <div
        v-for="product in store.products"
        :key="product.id"
        class="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200"
      >
        <NuxtLink class="group" :to="`/product/${product.id}`">
          <div class="aspect-square bg-gray-100 overflow-hidden relative">
            <!-- الصورة الأساسية -->
            <img
              :src="product.thumbnail"
              :alt="product.title"
              class="w-full h-full object-cover transition-all duration-200 group-hover:scale-105"
              :class="{ 'group-hover:opacity-0': product.images.length > 1 }"
            />

            <!-- صورة Hover -->
            <img
              v-if="product.images.length > 1"
              :src="product.images[1]"
              :alt="product.title"
              class="absolute inset-0 w-full h-full object-cover opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:scale-105"
            />
          </div>
        </NuxtLink>

        <div class="p-4">
          <h3 class="text-sm font-medium text-gray-900 truncate">
            {{ product.title }}
          </h3>

          <h6 class="truncate">
            {{ product.description }}
          </h6>

          <p class="mt-1 text-lg font-semibold text-green-800">
            ${{ product.price }}
          </p>

          <div class="flex justify-end mt-3">
            <button
              class="rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-400"
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { getProducts } from '~/services/services';
const store = useProductStore();
const route=useRoute()
await callOnce("products", () => store.fetchProducts());
await useAsyncData(
  `product-${route.params.id}`,
  ()=> getProducts(route.params.id)
)

if (import.meta.server) {
  console.log(store.products);
}
</script>

<style scoped></style>
