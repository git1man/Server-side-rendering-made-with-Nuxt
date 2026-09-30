export function getProducts() {
  return $fetch("https://dummyjson.com/products");
}
export function getProduct(id) {
  return $fetch(`https://dummyjson.com/products/${id}`);
}