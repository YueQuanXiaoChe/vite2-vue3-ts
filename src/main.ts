import App from './App.vue';
import { createApp } from 'vue';
import { setupStore } from '@/store';
import router from './router';

import { registerGlobComp } from '@/components/registerGlobComp';

import { isDevelop } from './utils/env';

const app = createApp(App);

// Configure store
setupStore(app);

// Register global components
registerGlobComp(app);

// 全局注册路由和状态管理
app.use(router);

// 挂载到 dom 上
app.mount('#app');

// import VConsole from 'vconsole';
// new VConsole();

// 在创建根实例以后调用，借助异步模块加载能力，只在本地开发中引入
if (isDevelop()) {
  Promise.all([import('vconsole')]).then((res) => {
    if (res.length === 1) {
      const VConsole = res[0].default;
      new VConsole();
    }
  });
}
