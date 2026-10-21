<template>
  <div class="max-w-7xl mx-auto py-8 px-4">
    <div
      v-if="isMounted && store.cart.length > 0"
      class="bg-white rounded-xl border border-gray-200 overflow-hidden"
    >
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm">
          <thead class="bg-gray-50 text-gray-600">
            <tr>
              <th class="px-4 py-3 font-medium">Image</th>
              <th class="px-4 py-3 font-medium">Product</th>
              <th class="px-4 py-3 font-medium">Quantity</th>
              <th class="px-4 py-3 font-medium">Price</th>
              <th class="px-4 py-3 font-medium">Category</th>
              <th class="px-4 py-3 font-medium">Rating</th>
              <th class="px-4 py-3 text-right">
                <button
                  type="button"
                  class="bg-red-500 hover:bg-red-600 active:scale-95 transition-all duration-200 rounded-md px-6 py-2 text-white font-semibold cursor-pointer"
                  @click="store.clearCart()"
                >
                  Clear Cart
                </button>
              </th>
            </tr>
          </thead>

          <tbody class="divide-y divide-gray-200">
            <tr
              v-for="product in store.cart"
              :key="product.id"
              class="hover:bg-gray-50"
            >
              <td class="px-4 py-3">
                <NuxtLink class="" :to="`product/${product.id}`">
                  <img
                    :src="product.thumbnail"
                    class="w-16 h-16 object-cover rounded-lg bg-gray-100 cursor-pointer"
                  />
                </NuxtLink>
              </td>
              <td class="px-4 py-3">
                <NuxtLink :to="`product/${product.id}`">
                  <div
                    class="font-medium text-gray-900 cursor-pointer hover:text-green-700"
                  >
                    {{ product.title }}
                  </div>
                </NuxtLink>
              </td>
              <td class="px-4 py-3">
                <div class="inline-flex items-center gap-3 font-bold">
                  <span
                    @click="store.reduceQountityByOne(product.id)"
                    class="w-8 h-8 inline-flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded cursor-pointer select-none"
                    >-</span
                  >
                  <span class="min-w-6 text-center font-medium">{{
                    product.quantity
                  }}</span>
                  <span
                    class="w-8 h-8 inline-flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded cursor-pointer select-none"
                    @click="store.addToCart(product)"
                    >+</span
                  >
                </div>
              </td>

              <td class="px-4 py-3 font-semibold text-gray-900">
                {{ product.quantity * product.price }}
              </td>

              <td class="px-4 py-3">
                <span
                  class="inline-block rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700 whitespace-nowrap"
                  >{{ product.category }}
                </span>
              </td>

              <td class="px-4 py-3 text-gray-700">{{ product.rating }}</td>

              <td class="px-4 py-3 text-right">
                <button
                  @click="store.removeItemFromCart(product.id)"
                  type="button"
                  class="rounded-md border border-red-500 px-3 py-1.5 text-red-500 hover:bg-red-50 cursor-pointer"
                >
                  Remove
                </button>
              </td>
            </tr>
          </tbody>

          <tfoot>
            <tr class="bg-gray-50">
              <td
                colspan="7"
                class="px-4 py-4 text-right text-lg font-semibold text-green-800"
              >
                Total Price {{ store.cartPrice.toFixed(2) }}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>

    <h1
      v-else-if="isMounted"
      class="py-24 text-center text-3xl font-semibold text-gray-500"
    >
      The cart is empty
    </h1>
  </div>
</template>

<script setup>
const store = useProductStore();
const isMounted = ref(false);
// const { cart,products } = storeToRefs(store);
onMounted(() => {
  isMounted.value = true;
  console.log(store.cart);
});
</script>

<style scoped></style>
