import { defHttp } from '@/utils/http/axios';

export interface LoginParams {
  username: string;
  password: string;
}

export interface LoginResult {
  OrgName: string;
  admin: number;
  comId: string;
  com_logo: string | null;
  deptType: string;
  fullName: string;
  icon: string | null;
  mobile: string;
  ucId: string;
  uid: string;
  userComs: number;
  welcome: number;
}

export function loginApi(params: LoginParams) {
  return defHttp.post<LoginResult>({
    url: 'bp/sys/login',
    params
  });
}

export interface UserInfoResult {
  OrgName: string;
  admin: number;
  comId: string;
  com_logo: null | string;
  deptType: string;
  fullName: string;
  icon: string;
  mobile: string;
  ucId: string;
  uid: string;
  userComs: number;
  welcome: number;
}

export function userInfoApi(token: string) {
  return defHttp.get<UserInfoResult>({
    url: 'bp/thirdparty/user/' + token
  });
}
