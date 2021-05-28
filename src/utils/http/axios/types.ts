export type ErrorMessageMode = 'Dialog' | 'Toast' | 'Notify' | undefined;

// 向服务器发送请求时的各种选项
export interface RequestOptions {
  // post 请求的时候添加参数到 url
  joinParamsToUrl?: boolean;
  // 格式化时间类型的请求参数
  formatDate?: boolean;
  // 是否对返回数据进行处理
  isTransformRequestResult?: boolean;
  // 默认将 prefix 添加到 url
  joinPrefix?: boolean;
  // 接口地址
  apiUrl?: string;
  // 消息提示类型
  errorMessageMode?: ErrorMessageMode;
  // 是否加入时间戳
  joinTime?: boolean;
  // 忽略重复请求
  ignoreCancelToken?: boolean;
}

// 服务器返回的数据的结构
export interface Result<T = any> {
  code: string;
  data: T;
  msg: string;
  success: boolean;
}
