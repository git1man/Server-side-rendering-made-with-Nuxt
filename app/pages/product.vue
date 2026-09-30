<script setup>
import { getProduct } from '~/services/services';

const route = useRoute();

const { data: product, error } = await useAsyncData(
  `product-${route.params.id}`,
  () => getProduct(route.params.id)
);

if (error.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Product Not Found'
  });
}
</script>

<template>
  <div v-if="product">
    <h1>{{ product.title }}</h1>

    <img
      :src="product.thumbnail"
      :alt="product.title"
    />

    <p>{{ product.description }}</p>
  </div>
</template>