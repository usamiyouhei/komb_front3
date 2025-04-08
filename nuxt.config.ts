// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
import { defineNuxtConfig } from "nuxt/config";
import { fileURLToPath } from "url";

export default defineNuxtConfig({
  devtools: { enabled: true },
  components: true,
  build: {
    transpile: ["vuetify"],
  },
  devServer: {
    port: 4420, //default 3000では他のプロジェクトと色々とかぶるので、4115
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        config.plugins?.push(vuetify({ autoImport: true }));
      });
    },
    "@ringzero/nuxt3-front-template-set",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "dayjs-nuxt",
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  dayjs: {
    locales: ["ja", "en"],
    plugins: ["relativeTime", "utc", "timezone"],
    defaultLocale: "ja",
    defaultTimezone: "Asia/Tokyo",
  },
  app: {
    head: {
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
      link: [{ rel: "icon", type: "image/png", href: "/favicon.png" }],
    },
  },
  css: ["@/assets/main.scss"],
  imports: {
    dirs: ["composables", "composables/**"],
  },

  alias: {
    "google-libphonenumber": fileURLToPath(
      new URL(
        "./node_modules/google-libphonenumber/dist/libphonenumber.js",
        import.meta.url
      )
    ),
  },
  compatibilityDate: "2024-09-05",
});
