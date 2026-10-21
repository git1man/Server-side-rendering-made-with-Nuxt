const mainServer="https://dummyjson.com/products"
export function getProducts() {
  return $fetch(mainServer);
}
export function getProduct(id) {
  return $fetch(`${mainServer}/${id}`);
}
export function getCatagouries(categories){
return $fetch(`${mainServer}/${categories}`)
}