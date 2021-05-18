/*
 * @Author: wang xue
 * @Description:
 */

import type { UserConfig, ConfigEnv } from 'vite';

import { loadEnv } from 'vite';

import { wrapperEnv, getBuildEnv, pathResolve } from './build/utils';
import { createVitePlugins } from './build/vite/plugins';
import { createProxy } from './build/vite/proxy';
import { OUTPUT_DIR } from './build/constant';

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
  const buildEnv = getBuildEnv();
  const root = process.cwd();
  const env = loadEnv(buildEnv ? buildEnv : mode, root);
  // loadEnv 读取的布尔类型是字符串。此函数可以转换为布尔类型
  const viteEnv = wrapperEnv(env);
  const isBuild = command === 'build';

  const {
    VITE_PORT,
    VITE_PROXY,
    VITE_PUBLIC_PATH,
    VITE_DROP_CONSOLE,
    VITE_USE_SOURCEMAP
  } = viteEnv;

  console.log('-------------------- vite.config.js log start --------------------');
  console.log('root ---->', root);
  console.log('command ---->', command);
  console.log('mode ---->', mode);
  console.log('isBuild ---->', isBuild);
  console.log('buildEnv ---->', buildEnv);
  console.log('env ---->', env);
  console.log('viteEnv ---->', viteEnv);
  console.log('__dirname ---->', __dirname);
  console.log('path.resolve ---->', pathResolve('./src'));
  console.log('-------------------- vite.config.js log end --------------------');

  return {
    base: VITE_PUBLIC_PATH,
    root,
    resolve: {
      alias: {
        '@': pathResolve('./src')
      }
    },
    server: {
      port: VITE_PORT, // 指定端口
      // Load proxy configuration from .env
      proxy: createProxy(VITE_PROXY),
      open: true, // 项目启动时自动打开浏览器
      hmr: {
        overlay: true
      }
    },

    build: {
      minify: 'terser', // 最小化混淆 https://cn.vitejs.dev/config/#build-minify
      outDir: OUTPUT_DIR, // 指定输出路径
      sourcemap: VITE_USE_SOURCEMAP,
      terserOptions: {
        compress: {
          keep_infinity: true,
          // Used to delete console in production environment
          drop_console: VITE_DROP_CONSOLE
        }
      },
      // 启用/禁用 brotli 压缩大小报告。压缩大型输出文件可能会很慢，因此禁用该功能可能会提高大型项目的构建性能。
      brotliSize: false,
      chunkSizeWarningLimit: 1200 // chunk 大小警告的限制（以 kbs 为单位）
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
