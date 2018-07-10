<template>
  <div class="content mx-auto">
    <h1 class="text-center"> 철학 </h1>
    <div v-html="content"></div>
  </div>
</template>

<script>
export default {
  async asyncData ({params}) {
    const fileContent = await import(`~/_pages/philosophy.md`)
    return {
      content: fileContent
    }
  }
}
</script>

<style>
</style>