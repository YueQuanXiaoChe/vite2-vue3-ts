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
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  methods: {
    goToLogin() {
      this.$router.push("/");
    },
    goToHome() {
      this.$router.push("/home");
    },
    goToWelcome() {
      this.$router.push("/home/welcome");
    },
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
