// 声明全局模块 *.json
declare module '*.json' {
  const src: any;
  export default src;
}

// 声明全局类型 Recordable
declare type Recordable = Record<string, any>;
