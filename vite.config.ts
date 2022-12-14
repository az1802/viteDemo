import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";
import VueJsx from "@vitejs/plugin-vue-jsx";
import AutoImport from "unplugin-auto-import/vite";
import ViteComponents from "unplugin-vue-components/vite";
// import DefineOptions from "unplugin-vue-define-options/vite";
import VueMacros from "unplugin-vue-macros/vite";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VueMacros({
      plugins: {
        vue: Vue(),
        vueJsx: VueJsx(), // 如有需要
      },
    }),
    // Vue(),
    // VueJsx(),
    // DefineOptions(),
    AutoImport({
      eslintrc: {
        enabled: true,
        // filepath:"./.eslintrc-auto-import.json",
        // globalsPropValue:true,
      },
      imports: ["vue", "vue-router", "pinia"],
      include: [/\.[tj]sx?$/, /\.vue/, /\.vue\?vue/, /\.md$/],
      dts: "auto-imports.d.ts",
    }),
    ViteComponents({
      dirs: ["src/components"],
      deep: true,
      dts: "components.d.ts",
      directives: true,
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@com": "./src/components",
    },
  },
});
