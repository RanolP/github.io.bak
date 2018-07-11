<template>
  <div class="content mx-auto">
    <h1 class="header">블로그 글 목록이 보고 싶었구나아아아.</h1>
    <blog-article-list :page=1 />
  </div>
</template>

<script lang="ts">
import blogArticle from "~/components/article.vue";
import blogArticleList from "~/components/article-list.vue";
import Vue from 'vue'
export default {
  components: { blogArticle, blogArticleList }
};
</script>
