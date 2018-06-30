const parseArgs = require("minimist");
const fs = require("fs");
const posts = fs
  .readdirSync("./_posts")
  .map(it => `blog/posts/${it.substr(0, it.lastIndexOf("."))}`);
const argv = parseArgs(process.argv.slice(2), {
  alias: {
    H: "hostname",
    p: "port"
  },
  string: ["H"],
  unknown: parameter => false
});

const port =
  argv.port ||
  process.env.PORT ||
  process.env.npm_package_config_nuxt_port ||
  "3000";
const host =
  argv.hostname ||
  process.env.HOST ||
  process.env.npm_package_config_nuxt_host ||
  "localhost";
module.exports = {
  env: {
    baseUrl: process.env.BASE_URL || `http://${host}:${port}`
  },
  head: {
    title: "RanolP Page",
    meta: [
      { charset: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      {
        hid: "description",
        name: "description",
        content: "RanolP의 개인 페이지"
      }
    ],
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/favicon.ico"
      },
      {
        rel: "stylesheet",
        type: "text/css",
        href:
          "https://cdn.jsdelivr.net/gh/joungkyun/font-d2coding-ligature/d2coding.css"
      },
      {
        rel: "stylesheet",
        type: "text/css",
        href: "https://prismjs.com/themes/prism-tomorrow.css"
      }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: "#3B8070" },
  /*
  ** Build configuration
  */
  css: ["~/assets/styles/main.scss"],
  build: {
    extractCSS: true
  },
  ignorePaths: [
    "_posts/"
  ],
  generate: {
    subFolders: false,
    routes: posts
  },
  modules: [
    "@nuxtjs/axios",
    "@nuxtjs/markdownit",
    "@nuxtjs/sitemap",
    "bootstrap-vue/nuxt",

    "~/modules/typescript.js"
  ],
  sitemap: {
    path: "/sitemap.xml",
    hostname: "https://ranolp.github.io",
    cacheTime: 1000 * 60 * 15,
    gzip: true,
    generate: true,
    routes: posts
  },
  middleware: [],
  markdownit: {
    html: false,
    xhtmlOut: false,
    preset: "default",
    linkify: true,
    typographer: true,
    use: [
      "markdown-it-abbr",
      [
        "markdown-it-anchor",
        {
          permalink: true,
          permalinkBefore: true
        }
      ],
      "markdown-it-attrs",
      ["markdown-it-container", "warning"],
      "markdown-it-deflist",
      "markdown-it-fontawesome",
      "markdown-it-footnote",
      "markdown-it-hashtag",
      "markdown-it-katex",
      "markdown-it-kbd",
      // "markdown-it-mermaid",
      "markdown-it-prism",
      "markdown-it-smartarrows",
      "markdown-it-sub",
      "markdown-it-sup",
      "markdown-it-toc",
      "markdown-it-video"
    ]
  },
  axios: {}
};
