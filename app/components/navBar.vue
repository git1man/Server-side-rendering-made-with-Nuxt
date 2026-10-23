<template>
  <div>
    <nav class="bg-white border-gray-200 dark:bg-gray-900">
      <div
        class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4"
      >
        <NuxtLink
          to="/"
          class="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src="/favicon.ico" class="h-8" alt="Nuxt" />
          <span
            class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
            >Nuxt</span
          >
        </NuxtLink>
        <SearchBar />
        <div
          class="items-center justify-between w-full md:flex md:w-auto md:order-1"
          id="navbar-search"
        >
          <ul
            class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
          >
            <li>
              <NuxtLink
                to="/"
                class="block py-2 px-3 text-white rounded-sm md:bg-transparent md:dark:hover:text-blue-500 md:p-0"
                exact-active-class="!text-blue-700"
                aria-current="page"
                >Products</NuxtLink
              >
            </li>

            <!-- Categories dropdown: opens on hover, keyboard focus, closes on Esc / route change -->
            <li
              class="relative"
              @mouseenter="open = true"
              @mouseleave="open = false"
              @focusin="open = true"
              @focusout="onFocusOut"
              @keydown.esc="open = false"
            >
              <button
                type="button"
                class="flex items-center gap-1 py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-500 md:p-0 dark:text-white"
                aria-haspopup="true"
                :aria-expanded="open"
              >
                Categories
                <svg
                  class="w-3 h-3 transition-transform duration-200"
                  :class="{ 'rotate-180': open }"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>

              <!-- pt-2 keeps the hover area continuous between the button and the menu -->
              <div
                v-show="open"
                class="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-2"
              >
                <div
                  class="w-96 max-w-[calc(100vw-2rem)] rounded-lg border border-gray-200 bg-white shadow-lg"
                >
                  <categories />
                </div>
              </div>
            </li>

            <li>
              <NuxtLink
                to="/cart"
                exact-active-class="!text-blue-700"
                class="block py-2 px-3 text-w rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                ><span class="relative">
                  Cart

                  <span
                    class="absolute -top-2 -right-4 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white"
                  >
                    {{ store.cartCountItmes }}
                  </span>
                </span></NuxtLink
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup>
import categories from "./categories.vue";

const open = ref(false);
const route = useRoute();
const store = useProductStore();

// close the menu after clicking a category
watch(
  () => route.fullPath,
  () => {
    open.value = false;
  },
);

// close when keyboard focus leaves the whole dropdown item
function onFocusOut(event) {
  if (!event.currentTarget.contains(event.relatedTarget)) {
    open.value = false;
  }
}
</script>

<style scoped></style>
