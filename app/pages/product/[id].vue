<template>
  <div v-if="product" class="max-w-7xl mx-auto py-8 px-4">
    <NuxtLink
      to="/products"
      class="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-green-700 mb-6"
    >
      <svg
        class="w-4 h-4"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          d="M12.7 5.3a1 1 0 010 1.4L9.4 10l3.3 3.3a1 1 0 11-1.4 1.4l-4-4a1 1 0 010-1.4l4-4a1 1 0 011.4 0z"
          clip-rule="evenodd"
        />
      </svg>
      Back to products
    </NuxtLink>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
      <!-- Gallery -->
      <div>
        <div
          class="aspect-square bg-gray-100 rounded-xl border border-gray-200 overflow-hidden"
        >
          <img
            :src="activeImage"
            :alt="product.title"
            class="w-full h-full object-cover"
          />
        </div>

        <div v-if="images.length > 1" class="mt-4 grid grid-cols-5 gap-3">
          <button
            v-for="(image, index) in images"
            :key="image"
            type="button"
            class="aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-green-600"
            :class="
              selectedIndex === index
                ? 'border-green-600'
                : 'border-gray-200 hover:border-green-400'
            "
            :aria-label="`Show image ${index + 1}`"
            :aria-current="selectedIndex === index"
            @click="selectedIndex = index"
          >
            <img
              :src="image"
              :alt="`${product.title} - image ${index + 1}`"
              class="w-full h-full object-cover"
            />
          </button>
        </div>
      </div>

      <!-- Main info -->
      <div>
        <p v-if="product.brand" class="text-sm text-gray-500">
          {{ product.brand }}
        </p>
        <h1 class="mt-1 text-3xl font-semibold text-gray-900">
          {{ product.title }}
        </h1>

        <div class="mt-3 flex items-center gap-2">
          <div
            class="flex text-lg leading-none"
            role="img"
            :aria-label="`Rated ${product.rating} out of 5`"
          >
            <span
              v-for="n in 5"
              :key="n"
              :class="
                n <= Math.round(product.rating)
                  ? 'text-yellow-400'
                  : 'text-gray-300'
              "
              >★</span
            >
          </div>
          <span class="text-sm text-gray-600">
            {{ product.rating }}
            <template v-if="product.reviews?.length">
              ({{ product.reviews.length }} reviews)
            </template>
          </span>
        </div>

        <div class="mt-5 flex flex-wrap items-baseline gap-3">
          <p class="text-3xl font-semibold text-green-800">${{ finalPrice }}</p>
          <template v-if="product.discountPercentage > 0">
            <p class="text-lg text-gray-400 line-through">
              ${{ product.price }}
            </p>
            <span
              class="rounded-md bg-green-100 px-2 py-1 text-sm font-medium text-green-800"
            >
              {{ Math.round(product.discountPercentage) }}% off
            </span>
          </template>
        </div>

        <div class="mt-4 flex flex-wrap items-center gap-3">
          <span
            class="rounded-full px-3 py-1 text-sm font-medium"
            :class="availabilityClass"
          >
            {{ product.availabilityStatus }}
          </span>
          <span class="text-sm text-gray-600">
            {{ product.stock }} units in stock
          </span>
        </div>

        <p class="mt-6 text-gray-700 leading-relaxed">
          {{ product.description }}
        </p>

        <div v-if="product.tags?.length" class="mt-6 flex flex-wrap gap-2">
          <span
            v-for="tag in product.tags"
            :key="tag"
            class="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
          >
            {{ tag }}
          </span>
        </div>

        <div class="mt-8">
          <button
            type="button"
            class="w-full sm:w-auto rounded-md bg-green-600 px-8 py-3 text-white hover:bg-green-400 disabled:bg-gray-300 disabled:cursor-not-allowed"
            :disabled="product.stock === 0"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>

    <!-- Details -->
    <section
      class="mt-12 bg-white rounded-xl border border-gray-200 p-6"
      aria-labelledby="details-heading"
    >
      <h2 id="details-heading" class="text-lg font-semibold text-gray-900">
        Product details
      </h2>
      <dl class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
        <div v-for="item in details" :key="item.label">
          <dt class="text-sm text-gray-500">{{ item.label }}</dt>
          <dd class="text-sm font-medium text-gray-900">{{ item.value }}</dd>
        </div>
      </dl>
    </section>

    <!-- Reviews -->
    <section class="mt-8" aria-labelledby="reviews-heading">
      <h2 id="reviews-heading" class="text-lg font-semibold text-gray-900">
        Customer reviews
      </h2>

      <p
        v-if="!product.reviews?.length"
        class="mt-4 text-sm text-gray-600"
      >
        No reviews yet for this product.
      </p>

      <div v-else class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <article
          v-for="(review, index) in product.reviews"
          :key="index"
          class="bg-white rounded-xl border border-gray-200 p-4"
        >
          <div class="flex items-center justify-between gap-3">
            <p class="text-sm font-medium text-gray-900">
              {{ review.reviewerName }}
            </p>
            <p class="text-xs text-gray-500">{{ formatDate(review.date) }}</p>
          </div>

          <div
            class="mt-1 flex text-base leading-none"
            role="img"
            :aria-label="`Rated ${review.rating} out of 5`"
          >
            <span
              v-for="n in 5"
              :key="n"
              :class="n <= review.rating ? 'text-yellow-400' : 'text-gray-300'"
              >★</span
            >
          </div>

          <p class="mt-3 text-sm text-gray-700">{{ review.comment }}</p>
        </article>
      </div>
    </section>
  </div>
</template>

<script setup>
import { getProduct } from "~/services/services";

const route = useRoute();

const { data: product, error } = await useAsyncData(
  `product-${route.params.id}`,
  () => getProduct(route.params.id),
);

if (error.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Product Not Found",
  });
}

const selectedIndex = ref(0);

const images = computed(() => {
  if (product.value?.images?.length) return product.value.images;
  return product.value?.thumbnail ? [product.value.thumbnail] : [];
});

const activeImage = computed(
  () => images.value[selectedIndex.value] ?? product.value?.thumbnail,
);

const finalPrice = computed(() => {
  const { price, discountPercentage = 0 } = product.value;
  return (price * (1 - discountPercentage / 100)).toFixed(2);
});

const availabilityClass = computed(() => {
  const status = product.value?.availabilityStatus;
  if (status === "In Stock") return "bg-green-100 text-green-800";
  if (status === "Low Stock") return "bg-yellow-100 text-yellow-800";
  return "bg-red-100 text-red-800";
});

const details = computed(() => {
  const p = product.value;
  const d = p.dimensions;
  return [
    { label: "Category", value: p.category },
    { label: "SKU", value: p.sku },
    { label: "Weight", value: p.weight },
    d && {
      label: "Dimensions (W × H × D)",
      value: `${d.width} × ${d.height} × ${d.depth}`,
    },
    { label: "Warranty", value: p.warrantyInformation },
    { label: "Shipping", value: p.shippingInformation },
    { label: "Return policy", value: p.returnPolicy },
  ].filter((item) => item && item.value !== undefined && item.value !== "");
});

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}
</script>