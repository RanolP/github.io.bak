<template>
  <div class="container-fluid">
    <h1 v-if="error.statusCode === 404">여긴 아무 것도 없는걸요.</h1>
    <h1 v-else>{{error.statusCode}}</h1>
    <b-button href="/">그대 이리로 와요.</b-button>
  </div>
</template>

<script lang="ts">
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import BootstrapVue from "bootstrap-vue";
import Vue from "vue";

Vue.use(BootstrapVue);
export default {
  props: ['error']
};
</script>
