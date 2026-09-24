export function getProducts() {
    console.log("fetching!");
  return $fetch("https://dummyjson.com/products");
}
