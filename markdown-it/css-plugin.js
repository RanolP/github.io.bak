module.exports = function sub_plugin(md) {
  const escapeHtml = require("markdown-it/lib/common/utils").escapeHtml;
  md.renderer.rules.table_open = () => `<table class="table">`;
  md.renderer.rules.code_block = (tokens, idx, options, env, slf) => {
    const token = tokens[idx];

    return `<pre class="language-" ${slf.renderAttrs(token)}><code>${escapeHtml(
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
