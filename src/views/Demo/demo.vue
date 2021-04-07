<template>
  <div>
    <van-button type="primary" @click="login">主要按钮</van-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Button } from 'vant';
import 'vant/es/button/style/index';
import { loginApi, LoginParams } from './demo';
// import { defHttp } from '@/utils/http/axios';

export default defineComponent({
  components: {
    [Button.name]: Button
  },
  methods: {
    async login() {
      let param: LoginParams = {
        username: '18622084468',
        password: 'aa123456'
      };
      let result: any = await loginApi(param);
      console.log('login result ---->', result);
      // this.$dialog.alert({
      //   message: result.msg
      // });
    }
  }
});
</script>
