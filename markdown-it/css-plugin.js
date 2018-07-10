module.exports = function(md) {
  md.mermaid.loadPreferences({
    get: key => {
      if (key === "mermaid-theme") {
        return "dark";
      } else if (key === "gantt-axis-format") {
        return "%Y/%m/%d";
      } else {
        return undefined;
      }
    }
  });
  const originalMathBlock = md.renderer.rules.math_block;
  md.renderer.rules.math_block = (tokens, idx) => {
    return `<div class="katex-wrap">${originalMathBlock(tokens, idx)}</div>`;
  };
  
  const utils = require("markdown-it/lib/common/utils");
  const escapeHtml = utils.escapeHtml;
  md.renderer.rules.table_open = () => `<table class="table">`;
  md.renderer.rules.code_block = (tokens, idx, options, env, slf) => {
    const token = tokens[idx];

    return `<pre class="hljs" ${slf.renderAttrs(token)}><code>${escapeHtml(
      token.content
    )}</code></pre>\n`;
  };
  md.renderer.rules.image = (tokens, idx, options, env, slf) => {
    const token = tokens[idx];

    token.attrs[token.attrIndex("alt")][1] = slf.renderInlineAsText(
      token.children,
      options,
      env
    );
    token.attrs.push(["class", "img-fluid"]);

    return slf.renderToken(tokens, idx, options);
  };
};
