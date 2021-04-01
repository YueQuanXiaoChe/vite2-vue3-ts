import { defHttp } from '@/utils/http/axios';
import { Result } from '@/utils/http/axios/types';

export interface LoginParams {
  username: string;
  password: string;
}

export function loginApi(params: LoginParams) {
  return defHttp.post<Result>({
    url: 'bp/sys/login',
    data: params
  });
}
