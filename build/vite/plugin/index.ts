import type { Plugin } from 'vite';

import vue from '@vitejs/plugin-vue';

import { configStyleImportPlugin } from './styleImport';
import { configVisualizerConfig } from './visualizer';

export function createVitePlugins(isBuild: boolean) {
  const vitePlugins: (Plugin | Plugin[])[] = [
    // have to
    vue()
  ];

  // vite-plugin-style-import
  vitePlugins.push(configStyleImportPlugin());

  // rollup-plugin-visualizer
  vitePlugins.push(configVisualizerConfig());

  if (isBuild) {
    //
  }

  return vitePlugins;
}
