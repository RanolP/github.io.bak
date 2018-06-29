<template>
  <div class="container-fluid">
    <my-nav />
    <nuxt/>
  </div>
</template>

<script lang="ts">
import myNav from "~/components/navbar.vue";
import "bootstrap-vue/dist/bootstrap-vue.css";
import BootstrapVue from "bootstrap-vue";
import Vue from "vue";

Vue.use(BootstrapVue);
export default {
  components: { myNav }
};
</script>
