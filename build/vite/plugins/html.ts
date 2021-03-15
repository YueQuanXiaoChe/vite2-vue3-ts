/**
 * Plugin to minimize and use ejs template syntax in index.html.
 * https://github.com/anncwb/vite-plugin-html
 */
import type { Plugin } from 'vite';
import type { ViteEnv } from '../../utils';
import { getBuildEnv } from '../../utils';

import html from 'vite-plugin-html';

import pkg from '../../../package.json';

export function configHtmlPlugin(env: ViteEnv, isBuild: boolean) {
  const { VITE_GLOB_APP_TITLE } = env;
  const buildEnv = getBuildEnv();

  const isMinify = (): boolean => {
    let res = false;
    if (
      isBuild &&
      ['dev', 'test', 'develop', 'production', undefined].indexOf(buildEnv) ===
        -1
    ) {
      res = true;
    }
    return res;
  };

  const htmlPlugin: Plugin[] = html({
    minify: isMinify(),
    inject: {
      // Inject data into ejs template
      injectData: {
        title: VITE_GLOB_APP_TITLE
      },
      tags: [
        // 强制Chromium内核，作用于360浏览器、QQ浏览器等国产双核浏览器
        {
          tag: 'meta',
          attrs: {
            name: 'renderer',
            content: 'webkit'
          },
          injectTo: 'head'
        },
        // 强制Chromium内核，作用于其他双核浏览器
        {
          tag: 'meta',
          attrs: {
            name: 'force-rendering',
            content: 'webkit'
          },
          injectTo: 'head'
        },
        // 如果有安装 Google Chrome Frame 插件则强制为Chromium内核，否则强制本机支持的最高版本IE内核，作用于IE浏览器
        {
          tag: 'meta',
          attrs: {
            'http-equiv': 'X-UA-Compatible',
            content: 'IE=Edge,chrome=1'
          },
          injectTo: 'head'
        },
        // 版本号
        {
          tag: 'meta',
          attrs: {
            name: 'application-version',
            content: pkg.version
          },
          injectTo: 'head'
        },
        // [icontfont] font-class引用，只支持单色
        // 预加载外部样式表
        {
          tag: 'link',
          attrs: {
            href: 'https://at.alicdn.com/t/font_1700262_4p69bg9gl8k.css',
            rel: 'preload',
            as: 'style'
          },
          injectTo: 'head'
        },
        // 定义外部加载的样式表
        {
          tag: 'link',
          attrs: {
            href: 'https://at.alicdn.com/t/font_1700262_4p69bg9gl8k.css',
            rel: 'stylesheet'
          },
          injectTo: 'head'
        },
        // [icontfont] symbol 引用，支持多色
        // 预加载外部 js
        {
          tag: 'link',
          attrs: {
            href: 'https://at.alicdn.com/t/font_1700262_4p69bg9gl8k.js',
            rel: 'preload',
            as: 'script'
          },
          injectTo: 'head'
        },
        // 定义外部加载的 js
        {
          tag: 'script',
          attrs: {
            src: 'https://at.alicdn.com/t/font_1700262_4p69bg9gl8k.js'
          },
          injectTo: 'body'
        }
      ]
    }
  });
  return htmlPlugin;
}
