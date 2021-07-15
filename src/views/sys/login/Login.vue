<template>
  <div>Login</div>
  <van-field v-model="username" label="账号" placeholder="请输入账号" />
  <van-field v-model="password" label="密码" placeholder="请输入密码" />
  <van-button type="primary" @click="login">Login</van-button>
  <van-button type="primary" @click="userInfo">userInfo</van-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { userInfoApi, UserInfoResult, loginApi, LoginParams, LoginResult } from '@/api/login';
import { PageEnum } from '@/enums/pageEnum';
// import { Button } from 'vant';
// import 'vant/es/button/style/index';

export default defineComponent({
  name: 'Login',
  // components: {
  //   [Button.name]: Button
  // },
  setup() {
    let username = '15620571557';
    let password = '123456a';

    return { username, password };
  },
  methods: {
    async login() {
      let param: LoginParams = {
        username: this.username,
        password: this.password
      };
      let result: LoginResult = await loginApi(param);
      if (result) {
        this.$router.push(PageEnum.DASHBOARD);
      }
    },
    async userInfo() {
      let result: UserInfoResult = await userInfoApi('6962c0ec-1511-44e7-a3c6-2369ec5dbb0d');
      console.log('userInfo ---------->', result);
    }
  }
});
</script>
