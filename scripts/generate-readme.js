#!/usr/bin/env node
// scripts/generate-readme.js — generates README.md from resume.json

const fs   = require("fs");
const path = require("path");

const resume = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../resume.json"), "utf8")
);

const { basics, work, skills, education, languages } = resume;

function formatDate(dateStr) {
  if (!dateStr) return "Present";
  const [year, month] = dateStr.split("-");
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${months[parseInt(month, 10) - 1]} ${year}`;
}

const docLines = [];

// Project documentation (shown before resume)
docLines.push("# 📄 JSON Resume — Bilingual as Code");
docLines.push("");
docLines.push("**English** | [中文](./docs/README.zh.md)");
docLines.push("");
docLines.push("## 🍴 Use This Template");
docLines.push("");
docLines.push("> A résumé-as-code pipeline: write in YAML, auto-translate to Chinese via GitHub Models, publish as a bilingual GitHub Pages site — fully automated on every push.");
docLines.push("");
docLines.push("### ✨ Features");
docLines.push("");
docLines.push("- 📝 **YAML source** — edit `src/*.yaml`, the build step assembles `resume.json`");
docLines.push("- 🤖 **AI translation** — `resume.zh.json` is auto-generated via GitHub Models (GPT-4o mini); works with the built-in `GITHUB_TOKEN`, no extra setup needed");
docLines.push("- 🌐 **Bilingual GitHub Pages** — English at `/` and Chinese at `/zh/` with a floating language-switch button");
docLines.push("- 📋 **Gist sync** *(optional)* — push `resume.json` to a Gist on every deploy for use with [registry.jsonresume.org](https://registry.jsonresume.org)");
docLines.push("- 📄 **README auto-gen** — this file is regenerated from `resume.json` on every push");
docLines.push("");
docLines.push("### 🚀 Quick Start");
docLines.push("");
docLines.push("> **Prerequisites:** This template is designed for **GitHub Pages project sites** (URL: `https://<username>.github.io/<repo-name>/`).  ");
docLines.push("> If you are not familiar with GitHub Pages, read the [official guide](https://docs.github.com/en/pages) first.  ");
docLines.push("> User/org sites (`<username>.github.io`) have no repo-name prefix — the language switcher paths will need manual adjustment in the workflow.");
docLines.push("");
docLines.push("1. **Fork** this repository");
docLines.push("2. **Enable GitHub Actions**");
docLines.push("");
docLines.push("   Forked repositories have Actions disabled by default.");
docLines.push("   - Click the **Actions** tab in your forked repo");
docLines.push("   - Click the green **\"I understand my workflows, go ahead and enable them\"** button");
docLines.push("");
docLines.push("3. **Enable GitHub Pages**");
docLines.push("");
docLines.push("   - Go to your forked repository on GitHub");
docLines.push("   - Click the **Settings** tab (top menu of the repo)");
docLines.push("   - In the left sidebar, click **Pages**");
docLines.push("   - Under **Build and deployment → Source**, select **Deploy from a branch**");
docLines.push("   - Under **Branch**, select `gh-pages` and keep the folder as `/ (root)`, then click **Save**");
docLines.push("");
docLines.push("   > `gh-pages` branch doesn't exist yet — it will be created automatically on the first push to `main`. Come back and set this after your first push if you don't see it.");
docLines.push("");
docLines.push("4. *(Optional)* **Set Gist secrets** if you want JSON Resume registry sync:");
docLines.push("");
docLines.push("   | Secret | Description |");
docLines.push("   |--------|-------------|");
docLines.push("   | `GIST_TOKEN` | GitHub PAT with `gist` scope |");
docLines.push("   | `GIST_ID` | ID of the target Gist (create a blank one first) |");
docLines.push("");
docLines.push("   > If these secrets are not set, the Gist sync step will be skipped automatically.");
docLines.push("");
docLines.push("5. **Edit your resume** in `src/*.yaml`:");
docLines.push("");
docLines.push("   ```");
docLines.push("   src/");
docLines.push("   ├── basics.yaml   # name, contact, summary");
docLines.push("   ├── work.yaml     # experience");
docLines.push("   ├── skills.yaml   # skills & keywords");
docLines.push("   ├── projects.yaml # side projects");
docLines.push("   └── misc.yaml     # education, languages, awards");
docLines.push("   ```");
docLines.push("");
docLines.push("6. **Push to `main`** — the workflow will automatically:");
docLines.push("   - Build `resume.json` from YAML");
docLines.push("   - Translate to `resume.zh.json` via GitHub Models *(only when `resume.json` changes)*");
docLines.push("   - Export bilingual HTML → deploy to GitHub Pages");
docLines.push("   - Sync `resume.json` to Gist *(if configured)*");
docLines.push("   - Regenerate this README");
docLines.push("");
docLines.push("### 🛠 Local Development");
docLines.push("");
docLines.push("```bash");
docLines.push("pnpm install");
docLines.push("pnpm run build    # build resume.json from YAML");
docLines.push("pnpm run serve    # preview at http://localhost:4000");
docLines.push("pnpm run export   # export to resume.html");
docLines.push("```");
docLines.push("");
docLines.push("---");
docLines.push("");

const lines = [];

// Header
lines.push(`## ${basics.name}`);
lines.push("");
lines.push(`**${basics.label}**`);
lines.push("");
lines.push(
  [
    basics.email && `📧 [${basics.email}](mailto:${basics.email})`,
    basics.url   && `🌐 [${basics.url}](${basics.url})`,
    basics.location?.city && `📍 ${basics.location.city}, ${basics.location.region}`,
  ]
    .filter(Boolean)
    .join(" · ")
);
lines.push("");

if (basics.profiles?.length) {
  lines.push(
    basics.profiles
      .map((p) => `[![${p.network}](https://img.shields.io/badge/${p.network}-0A66C2?style=flat&logo=${p.network.toLowerCase()}&logoColor=white)](${p.url})`)
      .join(" ")
  );
  lines.push("");
}

// Summary
lines.push("## Summary");
lines.push("");
lines.push(basics.summary);
lines.push("");

// Experience
lines.push("## Experience");
lines.push("");
for (const job of work) {
  const period = `${formatDate(job.startDate)} – ${formatDate(job.endDate)}`;
  lines.push(`### ${job.position} · ${job.name}`);
  lines.push(`*${period} · ${job.location}*`);
  lines.push("");
  if (job.highlights?.length) {
    for (const h of job.highlights) {
      lines.push(`- ${h}`);
    }
  }
  lines.push("");
}

// Skills
lines.push("## Skills");
lines.push("");
for (const group of skills) {
  lines.push(`**${group.name}:** ${group.keywords.join(", ")}`);
  lines.push("");
}

// Education
lines.push("## Education");
lines.push("");
for (const edu of education) {
  lines.push(`**${edu.studyType} in ${edu.area}** · ${edu.institution} · ${formatDate(edu.startDate)} – ${formatDate(edu.endDate)}`);
  lines.push("");
}

// Languages
if (languages?.length) {
  lines.push("## Languages");
  lines.push("");
  lines.push(languages.map((l) => `**${l.language}** (${l.fluency})`).join(" · "));
  lines.push("");
}

// Footer
lines.push("---");
lines.push("");
lines.push(
  `*Generated automatically from [resume.json](./resume.json) · ` +
  `Last updated: ${new Date().toISOString().slice(0, 10)}*`
);

const output = [...docLines, ...lines].join("\n");
fs.writeFileSync(path.join(__dirname, "../README.md"), output);
console.log("✓ README.md generated");
