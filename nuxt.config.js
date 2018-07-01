const parseArgs = require("minimist");
const fs = require("fs");
const hljs = require("highlight.js");
const cssPlugin = require("./markdown-it/css-plugin");
const mermaidPlugin = require("markdown-it-mermaid").default;
const utils = require("markdown-it/lib/common/utils");
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
          "https://cdn.jsdelivr.net/gh/joungkyun/font-d2coding-ligature/d2coding-ligature.css"
      },
      {
        rel: "stylesheet",
        type: "text/css",
        href:
          "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.5.0/styles/tomorrow-night-eighties.min.css"
      },
      {
        rel: "stylesheet",
        type: "text/css",
        href: "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css"
      }
    ],
    script: [
      {
        defer: true,
        src: "https://use.fontawesome.com/releases/v5.1.0/js/all.js",
        integrity:
          "sha384-3LK/3kTpDE/Pkp8gTNp2gR/2gOiwQ6QaO7Td0zV76UFJVhqLl4Vl3KL1We6q6wR9",
        crossorigin: "anonymous"
      },
      {
        src:
          "https://cdnjs.cloudflare.com/ajax/libs/mermaid/7.1.2/mermaid.min.js"
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
  ignorePaths: ["_posts/"],
  generate: {
    subFolders: false,
    routes: posts,
    fallback: "404.html"
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
    html: true,
    xhtmlOut: false,
    preset: "default",
    linkify: true,
    typographer: true,
    highlight: (str, lang) => {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return `<pre class="hljs"><code>${
            hljs.highlight(lang, str, true).value
          }</code></pre>`;
        } catch (e) {
          console.log(e);
        }
      }

      return `<pre class="hljs"><code>${utils.escapeHtml(str)}</code></pre>`;
    },
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
      [
        "markdown-it-container",
        "bootstrap",
        {
          validate: () => true,
          render: (tokens, idx) => {
            const token = tokens[idx];

            if (token.nesting === 1) {
              return '<div class="alert alert-' + token.info.trim() + '">';
            } else {
              return "</div>";
            }
          }
        }
      ],
      "markdown-it-deflist",
      "markdown-it-fontawesome",
      "markdown-it-footnote",
      "markdown-it-hashtag",
      "markdown-it-katex",
      "markdown-it-kbd",
      "markdown-it-smartarrows",
      "markdown-it-sub",
      "markdown-it-sup",
      "markdown-it-toc",
      "markdown-it-video",
      mermaidPlugin,
      cssPlugin
    ]
  },
  axios: {}
};
