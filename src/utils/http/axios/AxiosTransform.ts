/**
 * Data processing class, can be configured according to the project
 */
import type { AxiosRequestConfig } from 'axios';
import type { RequestOptions } from './types';

export interface CreateAxiosOptions extends AxiosRequestConfig {
  requestOptions?: RequestOptions;
}
