const mainServer = "https://dummyjson.com/products";
export function getProducts(limit = 15, skip = 0) {
  return $fetch(mainServer, {
    query: { limit, skip },
  });
}
export function getProduct(id) {
  return $fetch(`${mainServer}/${id}`);
}
export function getCatagouries() {
  return $fetch(`${mainServer}/categories`);
}
export function getCatagoury(slug) {
  return $fetch(`${mainServer}/categories/${slug}`);
}
export function searchProduct(search) {
  return $fetch(`${mainServer}/categories/${search}`);
}
