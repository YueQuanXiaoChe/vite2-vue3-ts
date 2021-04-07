import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import { registerGlobComp } from '@/components/registerGlobComp';

const app = createApp(App);
// 全局注册路由和状态管理
app.use(router).use(store);

// Register global components
registerGlobComp(app);

// 挂载到 dom 上
app.mount('#app', true);
