<template>
  <div>Main Out</div>
  <img alt="Vue logo" src="@/assets/logo.png" />
  <div>
    Count: {{ count }}
    <van-button type="primary" plain hairline @click="increment">Add</van-button>
  </div>
  <div class="test-viewport">测试转换</div>
  <van-cell-group>
    <van-field v-model="value" label="文本" placeholder="请输入用户名" />
  </van-cell-group>
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
import { defineComponent, computed, ref } from 'vue';
import { tempStore } from '@/store/modules/temp';
import { defHttp } from '@/utils/http/axios';

export default defineComponent({
  name: 'MainOut',
  setup() {
    const store = tempStore();
    const increment = () => {
      store.increment();
    };

    const count = computed(() => store.getCount);

    const value = ref('asd');

    // ---------- start 模拟 AxiosCancel 主动取消重复请求 start ----------
    defHttp.request({
      url: 'bp/sys/login',
      method: 'POST',
      params: {
        username: '18622084468',
        password: 'aa123456'
      }
    });
    defHttp.post({
      url: 'bp/sys/login',
      params: {
        password: 'aa123456'
      }
    });
    defHttp.post({
      url: 'bp/sys/login',
      params: {
        password: 'aa123456'
      }
    });
    setTimeout(() => {
      defHttp.post({
        url: 'bp/sys/login',
        params: {
          username: '18622084468'
          // password: 'aa123456'
        }
      });
    }, 1000);
    // ---------- end 模拟 AxiosCancel 主动取消重复请求 end ----------

    return {
      increment,
      count,
      value
    };
  }
});
</script>

<style lang="less">
@import '@/design/mainOut.less';

.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.vb {
  margin-right: 10px;
}
</style>
