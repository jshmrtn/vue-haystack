import { viteBundler } from "@vuepress/bundler-vite";
import { defaultTheme } from "@vuepress/theme-default";
import path from "node:path";
import { defineUserConfig } from "vuepress";

export default defineUserConfig({
  base: "/vue-haystack/",
  port: 3000,
  lang: "en-US",
  title: "Vue Haystack 🧱",
  bundler: viteBundler({}),
  clientConfigFile: path.resolve(__dirname, "./clientConfig.ts"),
  plugins: [],
  theme: defaultTheme({
    repo: "https://github.com/jshmrtn/vue-haystack",
    navbar: [{ text: "npm", link: "https://npmjs.com/package/vue-haystack" }],
    locales: {
      "/": {
        selectLanguageName: "English",
      },
    },
    sidebarDepth: 3,
    sidebar: ["/setup.md", "/modal.md", "/snackbar.md", "/generic.md"],
    editLink: false,
    contributors: false,
    lastUpdated: false,
  }),
});
