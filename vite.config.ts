import type { UserConfig, ConfigEnv } from 'vite';

import { loadEnv } from 'vite';
import path from 'path';

import { wrapperEnv, getBuildEnv } from './build/utils';
import { createVitePlugins } from './build/vite/plugins';

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
  const buildEnv = getBuildEnv();
  const root = process.cwd();
  const env = loadEnv(buildEnv ? buildEnv : mode, root);
  // loadEnv 读取的布尔类型是字符串。此函数可以转换为布尔类型
  const viteEnv = wrapperEnv(env);
  const isBuild = command === 'build';

  console.log(
    '-------------------- vite.config.js log start --------------------'
  );
  console.log('root ---->', root);
  console.log('command ---->', command);
  console.log('mode ---->', mode);
  console.log('isBuild ---->', isBuild);
  console.log('buildEnv ---->', buildEnv);
  console.log('env ---->', env);
  console.log('viteEnv ---->', viteEnv);
  console.log(
    '-------------------- vite.config.js log end --------------------'
  );

  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_DROP_CONSOLE } = viteEnv;

  return {
    base: VITE_PUBLIC_PATH,
    root,
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    },
    server: {
      port: VITE_PORT,
      open: true
    },

    build: {
      terserOptions: {
        compress: {
          keep_infinity: true,
          // Used to delete console in production environment
          drop_console: VITE_DROP_CONSOLE
        }
      },
      // 启用/禁用 brotli 压缩大小报告。压缩大型输出文件可能会很慢，因此禁用该功能可能会提高大型项目的构建性能。
      brotliSize: false
    },

    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true
        }
      }
    },

    // 项目使用的vite插件。数量大，单独提取管理
    plugins: createVitePlugins(viteEnv, isBuild)
  };
};
