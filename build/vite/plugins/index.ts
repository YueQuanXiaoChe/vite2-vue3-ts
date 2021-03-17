import type { Plugin } from 'vite';
import type { ViteEnv } from '../../utils';

import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

import { configHtmlPlugin } from './html';
import { configCompressPlugin } from './compress';
import { configStyleImportPlugin } from './styleImport';
import { configVisualizerConfig } from './visualizer';
import { configImageminPlugin } from './imagemin';

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const { VITE_USE_IMAGEMIN, VITE_BUILD_COMPRESS } = viteEnv;

  const vitePlugins: (Plugin | Plugin[])[] = [vue(), vueJsx()];

  // vite-plugin-html
  vitePlugins.push(configHtmlPlugin(viteEnv, isBuild));

  // vite-plugin-style-import
  vitePlugins.push(configStyleImportPlugin());

  // rollup-plugin-visualizer
  vitePlugins.push(configVisualizerConfig());

  if (isBuild) {
    //vite-plugin-imagemin
    VITE_USE_IMAGEMIN && vitePlugins.push(configImageminPlugin());

    // rollup-plugin-gzip
    vitePlugins.push(configCompressPlugin(VITE_BUILD_COMPRESS));
  }

  return vitePlugins;
}
