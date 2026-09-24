<template>
  <div>
    <div v-for="product in store.products" :key ="product.id">
      <p>{{ product.title }}</p>
      <img :src="product.thumbnail" alt="" />
    </div>
  </div>
</template>

<script setup>
const store = useProductStore();
await callOnce("products", () => store.fetchProducts());
console.log(store.products);
</script>

<style scoped></style>
