import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import pkg from "./package.json";
import vue from "@vitejs/plugin-vue";

const extensions = [".ts", ".vue"];

export default [
  {
    input: "src/index.ts",
    external: ["vue"],
    plugins: [vue(), resolve({ extensions }), typescript()],
    output: [
      { file: pkg.main, format: "cjs" },
      { file: pkg.module, format: "es" },
    ],
  },
  {
    input: "src/index.ts",
    external: ["vue"],
    plugins: [dts()],
    output: [{ file: pkg.types, format: "es" }],
  },
];
