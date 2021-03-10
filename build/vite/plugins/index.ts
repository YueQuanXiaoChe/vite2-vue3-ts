import type { Plugin } from 'vite';
import type { ViteEnv } from '../../utils';

import vue from '@vitejs/plugin-vue';

import { configStyleImportPlugin } from './styleImport';
import { configVisualizerConfig } from './visualizer';
import { configCompressPlugin } from './compress';
import { configHtmlPlugin } from './html';

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const { VITE_BUILD_COMPRESS } = viteEnv;

  const vitePlugins: (Plugin | Plugin[])[] = [
    // have to
    vue()
  ];

  // vite-plugin-html
  vitePlugins.push(configHtmlPlugin(viteEnv, isBuild));

  // vite-plugin-style-import
  vitePlugins.push(configStyleImportPlugin());

  // rollup-plugin-visualizer
  vitePlugins.push(configVisualizerConfig());

  if (isBuild) {
    // rollup-plugin-gzip
    vitePlugins.push(configCompressPlugin(VITE_BUILD_COMPRESS));
  }

  return vitePlugins;
}
