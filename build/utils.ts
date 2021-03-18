import path from 'path';

/**
 * Whether to generate package preview
 */
export function isReportMode(): boolean {
  return process.env.REPORT === 'true';
}

/**
 * 获取构建环境
 */
export function getBuildEnv(): string | undefined {
  return process.env.BUILD_ENV;
}

export interface ViteEnv {
  VITE_PORT: number;
  VITE_PROXY: [string, string][];
  VITE_PUBLIC_PATH: string;
  VITE_DROP_CONSOLE: boolean;
  VITE_BUILD_COMPRESS: 'gzip' | 'brotli' | 'none';
  VITE_GLOB_APP_TITLE: string;
  VITE_GLOB_APP_SHORT_NAME: string;
  VITE_USE_CDN: boolean;
  VITE_USE_IMAGEMIN: boolean;
  VITE_USE_SOURCEMAP: boolean;
  VITE_APP_ENV: 'dev' | 'test' | 'stress' | 'pre' | 'prod';
}

/**
 * 将所有环境变量配置文件读取到 process.env
 */
export function wrapperEnv(envConf: Recordable): ViteEnv {
  const ret: any = {};

  for (const envName of Object.keys(envConf)) {
    let realName = envConf[envName].replace(/\\n/g, '\n');
    realName = realName === 'true' ? true : realName === 'false' ? false : realName;

    if (envName === 'VITE_PORT') {
      realName = Number(realName);
    }
    if (envName === 'VITE_PROXY') {
      try {
        realName = JSON.parse(realName);
      } catch (error) {}
    }
    ret[envName] = realName;
    process.env[envName] = realName;
  }
  return ret;
}

export function pathResolve(dir: string): string {
  return path.resolve(__dirname, '.', dir);
}
