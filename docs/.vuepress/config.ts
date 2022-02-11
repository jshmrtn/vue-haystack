import path from "path";
import type { DefaultThemeOptions } from "vuepress";
import { defineUserConfig } from "vuepress";

export default defineUserConfig<DefaultThemeOptions>({
  base: "/vue-haystack/",
  port: 3000,
  lang: "en-US",
  title: "Vue Haystack 🧱",
  bundler: "@vuepress/bundler-vite",
  clientAppEnhanceFiles: [path.resolve(__dirname, "./enhanceAppFile.ts")],
  plugins: ["@vuepress/plugin-search"],
  themeConfig: {
    repo: "https://github.com/jshmrtn/vue-haystack",
    navbar: [{ text: "npm", link: "https://npmjs.com/package/vue-haystack" }],
    locales: {
      "/": {
        selectLanguageName: "English",
      },
    },
    displayAllHeaders: true,
    sidebarDepth: 3,
    sidebar: ["/setup.md", "/modal.md", "/snackbar.md", "/generic.md"],
    editLink: false,
    contributors: false,
    lastUpdated: false,
  },
});
