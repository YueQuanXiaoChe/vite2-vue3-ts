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
        title: VITE_GLOB_APP_TITLE,
        version: pkg.version
      },
      tags: [
        {
          tag: 'meta',
          attrs: {
            name: 'application-version',
            content: pkg.version
          },
          injectTo: 'head'
        }
      ]
    }
  });
  return htmlPlugin;
}
