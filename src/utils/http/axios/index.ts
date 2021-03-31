import { Axios } from './Axios';
import { ContentTypeEnum } from '@/enums/httpEnum';
import type { CreateAxiosOptions } from './axiosTransform';

const options: CreateAxiosOptions = {
  baseURL: '/proxy',
  timeout: 10 * 1000, // 指定请求超时的毫秒数(0 表示无超时时间)
  // 自定义请求头
  headers: {
    'Content-Type': ContentTypeEnum.JSON
  },
  requestOptions: {
    // 忽略重复请求
    ignoreCancelToken: true
  }
};

function createAxios(opt: CreateAxiosOptions = options): Axios {
  return new Axios(opt);
}

export const defHttp = createAxios();
