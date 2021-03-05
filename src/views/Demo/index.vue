<template>
  <div>
    <van-button type="primary">主要按钮</van-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Button } from "vant";

export default defineComponent({
  components: {
    [Button.name]: Button,
  },
});
</script>
