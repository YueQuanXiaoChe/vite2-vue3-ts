import type { UserConfig, ConfigEnv } from 'vite';
import path from 'path';

import { createVitePlugins } from './build/vite/plugin';

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
  const isBuild = command === 'build';

  return {
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true
        }
      }
    },

    // The vite plugin used by the project. The quantity is large, so it is separately extracted and managed
    plugins: createVitePlugins(isBuild),

    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    }
  };
};
