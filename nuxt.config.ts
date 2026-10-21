import tailwindcss from "@tailwindcss/vite";
import { storages } from "./node_modules/pinia-plugin-persistedstate/dist/nuxt/runtime/storages";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["./assets/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  modules: ["@pinia/nuxt", "pinia-plugin-persistedstate/nuxt"],
  
  piniaPluginPersistedstate: {
    storage : "localStorage",
  },
});
