import path from "path";

import type { DefaultThemeOptions } from "vuepress";
import { defineUserConfig } from "vuepress";

export default defineUserConfig<DefaultThemeOptions>({
  base: "/vue-modal-system/",
  port: 3000,
  lang: "en-US",
  title: "Vue 3 Gettext",
  bundler: "@vuepress/vite",
  clientAppEnhanceFiles: [path.resolve(__dirname, "./enhanceAppFile.ts")],
  themeConfig: {
    repo: "https://github.com/jshmrtn/vue-modal-system",
    navbar: [],
    locales: {
      "/": {
        selectLanguageName: "English",
      },
    },
    sidebar: [
      {
        text: "Home",
        link: "/README.md",
      },
    ],
  },
});
