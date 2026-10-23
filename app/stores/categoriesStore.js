import { defineStore } from "pinia";
import { getCatagouries } from "../services/services";

export const useCategoriesStore = defineStore("categories", {
  state: () => ({
    categories: [],
    laoding: false,
    error: null,
  }),
  actions: {
    async fetchcategories() {
      this.laoding = true;
      this.error = null;
      try {
        const response = await getCatagouries();
        // DummyJSON's categories endpoint returns a plain array:
        // [{ slug, name, url }, ...]
        this.categories = Array.isArray(response)
          ? response
          : (response.categories ?? []);
        return this.categories;
      } catch (err) {
        this.error = `failed to load categories ${err.message}`;
        throw err;
      } finally {
        this.laoding = false;
      }
    },
  },
});