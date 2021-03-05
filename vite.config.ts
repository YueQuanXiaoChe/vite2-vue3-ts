import { UserConfigExport } from "vite";
import styleImport from "vite-plugin-style-import";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vitejs.dev/config/
export default (): UserConfigExport => {
  return {
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
    },
    plugins: [
      vue(),
      styleImport({
        libs: [
          {
            libraryName: "vant",
            esModule: true,
            resolveStyle: (name) => {
              return `vant/es/${name}/style/index`;
            },
          },
        ],
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
};
