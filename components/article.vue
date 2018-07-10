<template>
  <a href="${id}">
    <div class="container">
      <h3>{{title}}</h3>
    </div>
  </a>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    id: {
      required: true,
      type: String
    },
    title: {
      required: true,
      type: String
    },
    description: {
      required: true,
      type: String
    },
    published_at: {
      required: true,
      type: String
    },
  }
})
</script>
