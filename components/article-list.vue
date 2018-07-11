<template lang="html">
  <div class="blog-article-list">
    <!--b-pagination size="md" :total-rows="$Vue.env.posts.length / 5"/-->
    {{posts}}
  </div>
</template>

<script lang="ts">
import {readdirSync} from 'fs';
import Vue from 'vue';
import blogArticle from "~/components/article.vue";

export default Vue.extend({
  components: {  blogArticle },
  name: 'blog-article-list',
  data: () => {
    console.log(this);
    return {
      posts: []
    }
  },
  props: {
    page: {
      required: true,
      type: Number
    }
  }
});
</script>
