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
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { Button, Field } from 'vant';
import 'vant/es/button/style/index';
import 'vant/es/field/style/index';

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

    console.log('Test whether the environment variable VITE_DROP_CONSOLE is valid!');

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
