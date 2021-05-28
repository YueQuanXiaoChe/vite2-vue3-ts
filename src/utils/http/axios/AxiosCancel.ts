import type { AxiosRequestConfig, Canceler } from 'axios';
import axios from 'axios';
import { isFunction } from '@/utils/is';

let pendingMap = new Map<string, Canceler>();

export const getPendingUrl = (config: AxiosRequestConfig) => [config.method, config.url].join('&');

export class AxiosCancel {
  /**
   * @description: Add request
   */
  addPending(config: AxiosRequestConfig) {
    // 取消上一个请求：在发起下一个请求前，把之前的请求取消掉
    this.removePending(config);
    const url = getPendingUrl(config);
    config.cancelToken =
      config.cancelToken ||
      new axios.CancelToken((cancel) => {
        if (!pendingMap.has(url)) {
          // If there is no current request in pending, add it
          pendingMap.set(url, cancel);
        }
      });
    console.log('add pendingMap ---->', pendingMap);
  }

  /**
   * @description: Clear all pending
   */
  removePending(config: AxiosRequestConfig) {
    const url = getPendingUrl(config);
    if (pendingMap.has(url)) {
      // If there is a current request identifier in pending,
      // the current request needs to be cancelled and removed
      const cancel = pendingMap.get(url);
      cancel && cancel(url);
      pendingMap.delete(url);
    }
    console.log('remove pendingMap ---->', pendingMap);
  }

  /**
   * @description: Clear all pending
   */
  removeAllPending() {
    pendingMap.forEach((cancel) => {
      cancel && isFunction(cancel) && cancel();
    });
    pendingMap.clear();
  }

  /**
   * @description: reset
   */
  reset() {
    pendingMap = new Map<string, Canceler>();
  }
}
