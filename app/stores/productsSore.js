// stores/productsStore.js

import { defineStore } from 'pinia'
import { getProducts } from '../services/services'

export const useProductStore = defineStore('products', {
    state: () => ({
        products: [],
        loading: false,
        error: null
    }),

    actions: {
        async fetchProducts() {
            this.loading = true
            this.error = null

            try {
                const response = await getProducts()

                this.products = response.products

                return response.products
            } catch (err) {
                this.error = `Failed to load products: ${err.message}`

                throw err
            } finally {
                this.loading = false
            }
        }
    },
})