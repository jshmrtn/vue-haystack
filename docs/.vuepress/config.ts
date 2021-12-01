import path from "path";
import type { DefaultThemeOptions } from "vuepress";
import { defineUserConfig } from "vuepress";

export default defineUserConfig<DefaultThemeOptions>({
  base: "/vue-haystack/",
  port: 3000,
  lang: "en-US",
  title: "Vue Haystack 🧱",
  bundler: "@vuepress/vite",
  clientAppEnhanceFiles: [path.resolve(__dirname, "./enhanceAppFile.ts")],
  themeConfig: {
    repo: "https://github.com/jshmrtn/vue-haystack",
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
      {
        text: "Modals",
        link: "/modal.md",
      },
      {
        text: "Generic store",
        link: "/generic.md",
      },
    ],
  },
});
