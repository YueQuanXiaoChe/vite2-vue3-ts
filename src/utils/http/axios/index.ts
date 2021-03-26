import { Axios } from './Axios';
import type { AxiosRequestConfig } from 'axios';
import { ContentTypeEnum } from '@/enums/httpEnum';

const options: AxiosRequestConfig = {
  baseURL: '/proxy',
  timeout: 10 * 1000, // 指定请求超时的毫秒数(0 表示无超时时间)
  // 自定义请求头
  headers: {
    'Content-Type': ContentTypeEnum.JSON
    // 'Tcsl-Loongboss-Token': window.sessionStorage.getItem('userToken')
  }
};

function createAxios(opt: AxiosRequestConfig = options): Axios {
  return new Axios(opt);
}

export const defHttp = createAxios();
