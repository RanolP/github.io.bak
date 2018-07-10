<template>
  <div class="content mx-auto">
    <h1 class="header">블로그 글 목록이 보고 싶었구나아아아.</h1>
    <article-list :page=1 />
  </div>
</template>

<script lang="ts">
import blogArticle from "~/components/article.vue";
import Vue from 'vue'
Vue.component('article-list', {
  render: function (createElement) {
    return createElement(
      'blog-article',  
      {
        props: {
          id: 0,
          title: "No title",
          description: "No description",
          published_at: "20xx.xx.xx."
        }
      }
    )
  },
  props: {
    page: {
      type: Number,
      required: true
    }
  }
});
export default {
  components: { 'blog-article':blogArticle }
};
</script>
