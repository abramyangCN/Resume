#!/usr/bin/env node
// Injects a floating language switcher button into resume HTML files.
// Usage: node scripts/inject-lang-switcher.js <html-file> <current-lang> <other-lang> <other-href>

const fs = require("fs");

const [filePath, currentLang, otherLang, otherHref] = process.argv.slice(2);
if (!filePath || !currentLang || !otherLang || !otherHref) {
  console.error("Usage: inject-lang-switcher.js <file> <current-lang> <other-lang> <other-href>");
  process.exit(1);
}

const label = otherLang === "zh" ? "中文" : "English";

const snippet = `
<style>
  #lang-switcher {
    position: fixed;
    bottom: 24px;
    left: 24px;
    z-index: 9999;
    background: #333;
    color: #fff;
    border: none;
    border-radius: 20px;
    padding: 8px 16px;
    font-size: 13px;
    cursor: pointer;
    text-decoration: none;
    box-shadow: 0 2px 8px rgba(0,0,0,0.3);
    transition: background 0.2s;
  }
  #lang-switcher:hover { background: #555; }
</style>
<a id="lang-switcher" href="${otherHref}">${label}</a>
`;

let html = fs.readFileSync(filePath, "utf8");
html = html.replace("</body>", `${snippet}</body>`);
fs.writeFileSync(filePath, html);
console.log(`✓ Injected lang switcher into ${filePath} (→ ${otherHref})`);
