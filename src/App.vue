<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <div>
    <van-button type="primary" class="test-button" @click="goToLogin">Login</van-button>
    <van-button type="primary" class="test-button" @click="goToHome">Home</van-button>
    <van-button type="primary" class="test-button" @click="goToWelcome">Welcome</van-button>
    <van-button type="primary" class="test-button" @click="goToDemo">Demo</van-button>
  </div>
  <router-view />
  <div>
    Count: {{ $store.state.count }}
    <van-button type="primary" class="test-button" @click="increment">Add</van-button>
  </div>
  <div class="test-viewport">测试转换</div>
  <van-field v-model="value" />
  <div class="test-autoprefixer">
    <div>aaa</div>
    <div>bbb</div>
    <div>ccc</div>
  </div>
  <!-- 单色 iconfont 图标 -->
  <i class="iconfont iconic_zujianguanli"></i>
  <i class="iconfont iconic_search"></i>
  <!-- 多色 iconfont 图标 -->
  <svg class="icon" aria-hidden="true">
    <use xlink:href="#iconkongzhitai" />
  </svg>

  <div>
    <a href="weixin://">打开微信</a>
  </div>
  <div>
    <a href="weixin://dl/business/?ticket=tcd3fdada4b2b7758ab95eb5b82943bab">腾讯客服</a>
  </div>
  <div>
    <a href="weixin://dl/business/?ticket=t214ed431bc5b8ba0ac03f4f14a420cf7">腾讯客服</a>
  </div>
  <div>
    <a href="weixin://dl/business/?ticket=tc0c5e67926d042fa534d895ab808207e">腾讯客服</a>
  </div>
  <div>
    <a href="alipays://">打开支付宝</a>
  </div>
  <div>
    <a href="alipays://platformapi/startapp?saId=10000007">打开支付宝的扫一扫</a>
  </div>
  <div>
    <a href="alipays://platformapi/startapp?appId=60000002">打开支付宝的蚂蚁森林</a>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { Button, Field } from 'vant';
import 'vant/es/button/style/index';
import 'vant/es/field/style/index';
import { defHttp } from '@/utils/http/axios';

export default defineComponent({
  name: 'App',
  components: {
    [Button.name]: Button,
    [Field.name]: Field
  },
  setup() {
    const router = useRouter();
    const goToLogin = () => {
      router.push('/');
    };
    const goToHome = () => {
      router.push('/home');
    };
    const goToWelcome = () => {
      router.push('/home/welcome');
    };
    const goToDemo = () => {
      router.push('/demo');
    };

    const store = useStore();
    const increment = () => {
      store.commit('increment');
    };

    const show = ref(true);
    const value = ref('asd');

    // console.log('Test whether the environment variable VITE_DROP_CONSOLE is valid!');
    // console.log(defHttp);
    let result: Promise<any> = defHttp.request({
      url: 'bp/sys/login',
      method: 'POST',
      data: {
        username: '18622084468',
        password: 'aa123456'
      },
      headers: {
        ignoreCancelToken: false
      }
    });
    // console.log('result ---->', result);

    let postResult: Promise<any> = defHttp.post({
      url: 'bp/sys/login',
      data: {
        // username: '18622084468',
        password: 'aa123456'
      }
    });
    // console.log('postResult ---->', postResult);

    setTimeout(() => {
      let pr: Promise<any> = defHttp.post({
        url: 'bp/sys/login',
        data: {
          username: '18622084468'
          // password: 'aa123456'
        }
      });
    }, 1000);

    return {
      goToLogin,
      goToHome,
      goToWelcome,
      increment,
      goToDemo,
      show,
      value
    };
  }
});
</script>

<style lang="less">
@import '@/design/app.less';

.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
