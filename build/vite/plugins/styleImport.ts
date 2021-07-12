/**
 * 按需引入组件库样式
 * https://github.com/anncwb/vite-plugin-style-import
 */

import styleImport from 'vite-plugin-style-import';

export function configStyleImportPlugin(isBuild: boolean) {
  if (!isBuild) return [];
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
