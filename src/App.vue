<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <div>
    <router-link to="/">Go to Login</router-link> |
    <router-link to="/home">Go to Home</router-link> |
    <router-link to="/home/welcome">Go to Welcome</router-link>
  </div>
  <button type="submit" @click="goToLogin">Login</button>
  <button type="submit" @click="goToHome">Home</button>
  <button type="submit" @click="goToWelcome">Welcome</button>

  <router-view></router-view>

  <div>
    Count: {{ $store.state.count }}
    <button type="submit" @click="increment">Add</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  name: "App",
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

    const store = useStore();
    const increment = () => {
      store.commit("increment");
    };

    return { goToLogin, goToHome, goToWelcome, increment };
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
