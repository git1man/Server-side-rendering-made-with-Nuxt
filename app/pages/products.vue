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
        <NuxtLink :to="`/product/${product.id}`">
          <div class="group/card">
            <div
              class="group/image aspect-square bg-gray-100 overflow-hidden relative"
            >
              <!-- الصورة الأساسية -->
              <img
                :src="product.thumbnail"
                :alt="product.title"
                class="w-full h-full object-cover transition-all duration-200 group-hover/image:scale-105"
                :class="{
                  'group-hover/image:opacity-0': product.images.length > 1,
                }"
              />

              <!-- صورة Hover -->
              <img
                v-if="product.images.length > 1"
                :src="product.images[1]"
                :alt="product.title"
                class="absolute inset-0 w-full h-full object-cover opacity-0 transition-all duration-200 group-hover/image:opacity-100 group-hover/image:scale-105"
              />
            </div>
          </div>
        </NuxtLink>

        <div class="p-4">
          <NuxtLink :to="`/product/${product.id}`">
            <h3 class="text-sm font-medium text-gray-900 truncate">
              {{ product.title }}
            </h3>
          </NuxtLink>
          <h6 class="truncate">
            {{ product.description }}
          </h6>

          <div class="flex items-center justify-between">
            <p class="text-lg font-semibold text-green-800">
              ${{ product.price }}
            </p>

            <p
              class="rounded-md bg-yellow-100 px-2 py-1 text-sm font-semibold text-yellow-800"
            >
              <span class="text-yellow-400">★</span> {{ product.rating }}
            </p>
          </div>
          <div class="flex justify-end mt-3">
            <button
              v-if="isMounted"
              class="rounded-md px-4 py-2 text-white cursor-pointer"
              :class="
                store.isInCart(product.id)
                  ? 'bg-red-500 hover:bg-red-400'
                  : 'bg-green-600 hover:bg-green-400'
              "
              @click="
                store.isInCart(product.id)
                  ? store.removeItemFromCart(product.id)
                  : store.addToCart(product)
              "
            >
              {{ store.isInCart(product.id) ? "Remove Item" : "Add To Cart" }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <Pagination
      :current-page="currentPage"
      :total-pages="totalPages"
      @change="changePage"
    />
  </div>
</template>
<script setup>
const isMounted = ref(false);
const store = useProductStore();
const route = useRoute();
const { total } = storeToRefs(store);
const limit = 20;

const currentPage = computed(() => {
  const value = Number(route.query.page) || 1;
  return Math.max(1, Math.floor(value));
});

const totalPages = computed(() => Math.ceil(total.value / limit));

// re-fetches automatically whenever ?page= changes
const { error: fetchError } = await useAsyncData(
  "products",
  () => store.fetchProducts(limit, (currentPage.value - 1) * limit),
  {
    watch: [currentPage],
  },
);

if (fetchError.value) {
  throw createError({
    statusCode: 500,
    statusMessage: "failed to load data",
  });
}

async function changePage(page) {
  if (page < 1 || page > totalPages.value) return;

  await navigateTo({
    path: route.path,
    query: {
      ...route.query,
      page: page === 1 ? undefined : String(page),
    },
  });

  // same-path navigation doesn't scroll, so go back to the top of the list
  if (import.meta.client) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

onMounted(() => {
  isMounted.value = true;
});
</script>

<style scoped></style>
