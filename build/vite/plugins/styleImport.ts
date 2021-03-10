/**
 * 按需引入组件库样式
 * https://github.com/anncwb/vite-plugin-style-import
 */

import styleImport from 'vite-plugin-style-import';

export function configStyleImportPlugin() {
  return styleImport({
    libs: [
      {
        libraryName: 'vant',
        esModule: true,
        resolveStyle: (name) => {
          return `vant/es/${name}/style/index`;
        }
      }
    ]
  });
}
