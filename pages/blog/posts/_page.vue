<template>
    <div class="content mx-auto" :key="$route.params.page">
        <h1 class="text-center"> {{$route.params.page}} </h1>
        <div v-html="content"></div>
    </div>
</template>

<script>
export default {
  async asyncData ({params}) {
    const fileContent = await import(`~/_posts/${params.page}.md`)
    return {
      content: fileContent
    }
  }
}
</script>

<style>
</style>