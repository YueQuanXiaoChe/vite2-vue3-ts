/**
 * Used to parse the .env.development proxy configuration
 */
import type { ServerOptions } from 'http-proxy';

type ProxyItem = [string, string];

type ProxyList = ProxyItem[];

type ProxyTargetList = Record<
  string,
  ServerOptions & { rewrite: (path: string) => string }
>;

const httpsRE = /^https:\/\//;

/**
 * Generate proxy
 * @param list
 */
export function createProxy(list: ProxyList = []): ProxyTargetList {
  const ret: ProxyTargetList = {};
  for (const [prefix, target] of list) {
    const isHttps = httpsRE.test(target);

    // https://github.com/http-party/node-http-proxy#options
    ret[prefix] = {
      target: target, //代理地址，这里设置的地址会代替axios中设置的baseURL
      changeOrigin: true, // 开启代理，在本地创建一个虚拟服务端
      ws: false, // 是否启用 websockets
      rewrite: (path) => path.replace(new RegExp(`^${prefix}`), ''),
      // https is require secure=false
      ...(isHttps ? { secure: false } : {})
    };
  }
  console.log('proxy ---->', ret);
  return ret;
}
