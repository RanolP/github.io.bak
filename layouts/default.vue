<template>
  <div class="container-wrap">
    <my-nav />
    <div class="container-fluid p-0">
      <nuxt/>
    </div>
    <script>
    mermaid.initialize({
      theme: 'dark',
      startOnLoad: true
    });
    </script>
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
