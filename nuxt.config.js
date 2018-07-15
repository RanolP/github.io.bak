const Vue = require("vue");
const parseArgs = require("minimist");
const fs = require("fs");
const hljs = require("highlight.js");
const cssPlugin = require("./markdown-it/css-plugin");
const mermaidPlugin = require("markdown-it-mermaid").default;
const utils = require("markdown-it/lib/common/utils");
const posts = fs
  .readdirSync("./_posts")
  .filter(it => it.endsWith(".md"))
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
const contentSecurityPolicy = `
default-src 'self';
script-src
  'self'
  cdnjs.cloudflare.com
  use.fontawesome.com
  'sha256-/JmvdCgtofwGu9lknHM1s1gWhBWaHycObl7sRcIStHo='
  'sha256-HwKHMu3z+w8SJVQC3c0A8gphcnYY8nt/2UgNkNLWlYM='
  'sha256-9pyEYbPQ7JhrmSaD3yGNHg6/tnPDCEOULf1CRa8xouk='
  'sha256-94GTxLnBtUyv2xrv+/sa64aW2XAMI5pWjloFugcWwCM=';
style-src
  'self'
  cdnjs.cloudflare.com
  cdn.jsdelivr.net
  spoqa.github.io
  cdn.rawgit.com
  fonts.googleapis.com
  'sha256-gsLTdR9I9DCfu3x6zxBCiAKA+crSTYQwEgnHxdX/A8E='
  'sha256-LcEv7QI5CkYcx54yMlyUPvQLuYNJTNq4jSjStzCTJWE='
  'sha256-a/0fTQAowiZhJ50lvP3KRHyc5rd2AR45zz5q7ccQYu0='
  'sha256-1iHfDzc7jDcrYYZ74cczicaadO9oHgUikNQUK9EYyj4='
  'sha256-Dn9OzJeAR9jyrIii6FrmqvMbzkx8AEOKgOID5fie3Go='
  'sha256-Pl4uMqaBx8ZDXzYWPMuw37x1ZZpYIXWTokH3qaULml4='
  'sha256-yF4e6LaddOsUmyEBqaEF5nPyp8VoVOVMLJl0MEWShwM='
  'sha256-O13gELkORT9xyJ61rzUDVjuUQoPv1pZB060YHJ2Wq80='
  'sha256-cyn71Ax2KxodvNlDU9djaUCmgjSCkmqjY84IMH7iCu0='
  'sha256-xnqzyqSjp30/+PmDy04osZIIa3HazEgpGIqPLaqvqUI='
  'sha256-0EZqoz+oBhx7gF4nvY2bSqoGyy4zLjNF+SDQXGp/ZrY='
  'sha256-47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU='
  'sha256-2RkHO9Rsz42EaW7aTpEamOHuEVtjl2JdcxdcFkXF3WA='
  'sha256-Zs1JxUwj1zq9sx9pQ9MaUKNz1AUZkc3DTN4Ax+fLdLU='
  'sha256-PVxr2n122U9ZqyAYSLkczS8C6DI6BvOW1k/CIeQkyT0='
  'sha256-WP2WNCs0SZA+F+Q7bop3sAFZiPUng1+vcyx+mPqljtw='
  'sha256-6yyfctO+faWUHgaLEFv+Ze7tS1ppowYFTkM46XAMKlU='
  'sha256-2YHHy3MSW2khwKp2GovRw+0GLIEyYbKzZxbA3jg6fTw='
  'sha256-R0QVBq+IKxnV3v9z4hWM0d6gpMyy0XdWK9it1MFrIJM='
  'sha256-bviLPwiqrYk7TOtr5i2eb7I5exfGcGEvVuxmITyg//c='
  'sha256-t44LkGGM9VEoKZXwj/beeuoERB9yu5IXKHJFeElhOb4='
  'sha256-uA8NnTehvCPI0L12IKIE+EbdoJkV3T5BGUEoHWtghq4='
  'sha256-yCralQCVWd8Kge+LGUMXgcOAeA7r+WxF+bs5ENedViY='
  'sha256-aqNNdDLnnrDOnTNdkJpYlAxKVJtLt9CtFLklmInuUAE='
  'sha256-9pyEYbPQ7JhrmSaD3yGNHg6/tnPDCEOULf1CRa8xouk='
  'sha256-94GTxLnBtUyv2xrv+/sa64aW2XAMI5pWjloFugcWwCM=';
font-src 'self' cdn.jsdelivr.net spoqa.github.io cdn.rawgit.com fonts.googleapis.com fonts.gstatic.com data: cdnjs.cloudflare.com;
img-src 'self';
`;
module.exports = {
  env: {
    baseUrl: process.env.BASE_URL || `http://${host}:${port}`,
    posts: posts
  },
  head: {
    title: "RanolP Page",
    meta: [
      {
        charset: "utf-8"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      {
        hid: "description",
        name: "description",
        content: "RanolP의 개인 페이지"
      },
      {
        "http-equiv": "Content-Security-Policy",
        content: contentSecurityPolicy
      },
      {
        "http-equiv": "Referrer-Policy",
        content: "no-referrer, strict-origin-when-cross-origin"
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
          "https://cdn.jsdelivr.net/gh/joungkyun/font-d2coding-ligature@1.3.2/d2coding-ligature.css",
        integrity: "sha256-NFDjPJN2aVL8VM1cRcA1cUr0kn0PQ7o9du/irmixqLs=",
        crossorigin: "anonymous"
      },
      {
        rel: "stylesheet",
        type: "text/css",
        href:
          "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/tomorrow-night-eighties.min.css",
        integrity: "sha256-/CURZpogYLP3tOB+9145aSzwZ1wdyIh+smZn9LdzJb4=",
        crossorigin: "anonymous"
      },
      {
        rel: "stylesheet",
        type: "text/css",
        href:
          "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.9.0/katex.min.css",
        integrity: "sha256-uXNHy6FK52Pb83SmU45mVAg7YECmr9Lwwu1zOz31j5c=",
        crossorigin: "anonymous"
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
          "https://cdnjs.cloudflare.com/ajax/libs/mermaid/7.1.2/mermaid.min.js",
        integrity: "sha256-tJ52z0aAzZBamAZPedNylrtijTuTMLBabhv/A6eTA1w=",
        crossorigin: "anonymous"
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
    extractCSS: {
      allChunks: true
    }
  },
  ignorePaths: ["_posts/"],
  generate: {
    subFolders: false,
    routes: posts,
    fallback: "404.html"
  },
  plugins: ["~/plugin/blog.js"],
  modules: [
    "@nuxtjs/axios",
    "@nuxtjs/markdownit",
    "@nuxtjs/sitemap",
    "bootstrap-vue/nuxt",

    "~/modules/typescript.js"
  ],
  minify: {
    decodeEntities: false
  },
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
    quotes: "“”‘’",
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
