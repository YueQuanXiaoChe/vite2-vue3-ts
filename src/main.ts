import App from './App.vue';
import { createApp } from 'vue';
import { setupStore } from '@/store';
import { router, setupRouter } from '@/router';

import { registerGlobComp } from '@/components/registerGlobComp';

import { isDevelop } from './utils/env';

// Do not introduce on-demand in local development?
// In the local development for introduce on-demand, the number of browser requests will increase by about 20%.
// Which may slow down the browser refresh.
// Therefore, all are introduced in local development, and only introduced on demand in the production environment
if (isDevelop()) {
  import('vant/lib/index.css');
}

async function bootstrap() {
  const app = createApp(App);

  // Configure store
  setupStore(app);

  // Register global components
  registerGlobComp(app);

  // Configure routing
  setupRouter(app);

  // Mount when the route is ready
  // https://next.router.vuejs.org/api/#isready
  await router.isReady();

  // 挂载到 dom 上
  app.mount('#app');
}

void bootstrap();

// 在创建根实例以后调用，借助异步模块加载能力，只在本地开发中引入
if (isDevelop()) {
  Promise.all([import('vconsole')]).then((res) => {
    if (res.length === 1) {
      const VConsole = res[0].default;
      new VConsole();
    }
  });
}
