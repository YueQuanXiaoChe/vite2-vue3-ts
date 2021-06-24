<template>
  <div>Dashboard</div>
  <van-button type="primary" @click="goToMainOut">Go to main out</van-button>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { PageEnum } from '@/enums/pageEnum';

export default defineComponent({
  name: 'Dashboard',
  setup() {
    //
  },
  methods: {
    goToMainOut() {
      this.$router.push(PageEnum.MAIN_OUT);
    }
  }
});
</script>
