import { defHttp } from '@/utils/http/axios';

export interface LoginParams {
  username: string;
  password: string;
}

export function loginApi(params: LoginParams) {
  return defHttp.post<any>({
    url: 'bp/sys/login',
    data: params
  });
}
