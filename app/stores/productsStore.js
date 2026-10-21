// stores/productsStore.js

import { defineStore } from "pinia";
import { getProducts } from "../services/services";

export const useProductStore = defineStore("products", {
  state: () => ({
    products: [],
    loading: false,
    cart: [],
    error: null,
  }),

  actions: {
    async fetchProducts() {
      this.loading = true;
      this.error = null;

      try {
        const response = await getProducts();

        this.products = response.products;

        return response.products;
      } catch (err) {
        this.error = `Failed to load products: ${err.message}`;

        throw err;
      } finally {
        this.loading = false;
      }
    },
    addToCart(product) {
      const check = this.cart.find((item) => item.id === product.id);
      if (check) {
        check.quantity++;
        console.log(product.id);
        console.log(product.quantity);
        console.log(Object.keys(product))
      } else {
        this.cart.push({
          id: product.id,
          title: product.title,
          price: product.price,
          thumbnail: product.thumbnail,
          category: product.category,
          rating: product.rating,
          quantity: 1,
        });
        console.log(product.id);
        console.log(product.quantity);
      }
    },
    reduceQountityByOne(id) {
      const product = this.cart.find((item) => item.id === id);
      if (!product) return;
      if (product.quantity > 1) {
        product.quantity--;
      } else {
        this.cart = this.cart.filter((item) => item.id !== id);
      }
    },
    removeItemFromCart(id) {
      this.cart = this.cart.filter((item) => item.id !== id);
    },
    clearCart() {
      this.cart = [];
    },
  },
  getters: {
    cartCountItmes() {
      return this.cart.reduce((total, product) => {
        return total + product.quantity;
      }, 0);
    },
    cartTotlaPrice() {
      return this.reduce((total, product) => total + product.price, 0);
    },
    isInCart(state) {
      return (id) => state.cart.some((product) => product.id === id);
    },
    cartPrice() {
      return this.cart.reduce(
        (total, product) => total + product.price * product.quantity,
        0,
      );
    },
  },
  persist: {
    storage: piniaPluginPersistedstate.localStorage(),
    pick: ["cart"],
  },
});
