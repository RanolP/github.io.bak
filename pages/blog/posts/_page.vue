<template>
    <div :key="$route.params.page">
        <section class="hero is-primary">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">
                        {{$route.params.page}}
                    </h1>
                </div>
            </div>
        </section>
        <div class="container">
            <div v-html="content" class="contentWrapper content"></div>
        </div>
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