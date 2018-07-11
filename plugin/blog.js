function Blog(Vue) {
  if (process.client) {
    window.posts = Vue.env.posts;
  }
  console.log(process.client);
  console.log(Vue);
  Blog.posts = Vue.env.posts;
  Vue.route.posts = Vue.env.posts;
}

module.exports = Blog;