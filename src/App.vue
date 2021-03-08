<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <div>
    <van-button type="primary" @click="goToLogin" class="test-button"
      >Login</van-button
    >
    <van-button type="primary" @click="goToHome" class="test-button"
      >Home</van-button
    >
    <van-button type="primary" @click="goToWelcome" class="test-button"
      >Welcome</van-button
    >
    <van-button type="primary" @click="goToDemo" class="test-button"
      >Demo</van-button
    >
  </div>
  <router-view></router-view>
  <div>
    Count: {{ $store.state.count }}
    <van-button type="primary" @click="increment" class="test-button"
      >Add</van-button
    >
  </div>
  <div class="test-viewport">测试转换</div>
  <van-field v-model="value"></van-field>
  <div class="test-autoprefixer">
    <div>aaa</div>
    <div>bbb</div>
    <div>ccc</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { Button, Field } from "vant";
import "vant/es/button/style/index";
import "vant/es/field/style/index";

export default defineComponent({
  name: "App",
  components: {
    [Button.name]: Button,
    [Field.name]: Field,
  },
  setup() {
    const router = useRouter();
    const goToLogin = () => {
      router.push("/");
    };
    const goToHome = () => {
      router.push("/home");
    };
    const goToWelcome = () => {
      router.push("/home/welcome");
    };
    const goToDemo = () => {
      router.push("/demo");
    };

    const store = useStore();
    const increment = () => {
      store.commit("increment");
    };

    const show = ref(true);
    const value = ref("asd");

    return {
      goToLogin,
      goToHome,
      goToWelcome,
      increment,
      goToDemo,
      show,
      value,
    };
  },
});
</script>

<style lang="less" scoped>
.test-viewport {
  width: 375px;
  height: 100px;
  font-size: 40px;
  text-align: center;
  line-height: 100px;
  background: #13b5b1;
  margin-top: 10px;
}
.test-button {
  margin: 0 5px;
}
.test-autoprefixer {
  display: flex;
}
</style>
