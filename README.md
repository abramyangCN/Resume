# 📄 JSON Resume — Bilingual as Code

**English** | [中文](./docs/README.zh.md)

## 🍴 Use This Template

> A résumé-as-code pipeline: write in YAML, auto-translate to Chinese via GitHub Models, publish as a bilingual GitHub Pages site — fully automated on every push.

### ✨ Features

- 📝 **YAML source** — edit `src/*.yaml`, the build step assembles `resume.json`
- 🤖 **AI translation** — `resume.zh.json` is auto-generated via GitHub Models (GPT-4o mini); works with the built-in `GITHUB_TOKEN`, no extra setup needed
- 🌐 **Bilingual GitHub Pages** — English at `/` and Chinese at `/zh/` with a floating language-switch button
- 📋 **Gist sync** *(optional)* — push `resume.json` to a Gist on every deploy for use with [registry.jsonresume.org](https://registry.jsonresume.org)
- 📄 **README auto-gen** — this file is regenerated from `resume.json` on every push

### 🚀 Quick Start

> **Prerequisites:** This template is designed for **GitHub Pages project sites** (URL: `https://<username>.github.io/<repo-name>/`).  
> If you are not familiar with GitHub Pages, read the [official guide](https://docs.github.com/en/pages) first.  
> User/org sites (`<username>.github.io`) have no repo-name prefix — the language switcher paths will need manual adjustment in the workflow.

1. **Fork** this repository
2. **Enable GitHub Actions**

   Forked repositories have Actions disabled by default.
   - Click the **Actions** tab in your forked repo
   - Click the green **"I understand my workflows, go ahead and enable them"** button

3. **Enable GitHub Pages**

   - Go to your forked repository on GitHub
   - Click the **Settings** tab (top menu of the repo)
   - In the left sidebar, click **Pages**
   - Under **Build and deployment → Source**, select **Deploy from a branch**
   - Under **Branch**, select `gh-pages` and keep the folder as `/ (root)`, then click **Save**

   > `gh-pages` branch doesn't exist yet — it will be created automatically on the first push to `main`. Come back and set this after your first push if you don't see it.

4. *(Optional)* **Set Gist secrets** if you want JSON Resume registry sync:

   | Secret | Description |
   |--------|-------------|
   | `GIST_TOKEN` | GitHub PAT with `gist` scope |
   | `GIST_ID` | ID of the target Gist (create a blank one first) |

   > If these secrets are not set, the Gist sync step will be skipped automatically.

5. **Edit your resume** in `src/*.yaml`:

   ```
   src/
   ├── basics.yaml   # name, contact, summary
   ├── work.yaml     # experience
   ├── skills.yaml   # skills & keywords
   ├── projects.yaml # side projects
   └── misc.yaml     # education, languages, awards
   ```

6. **Push to `main`** — the workflow will automatically:
   - Build `resume.json` from YAML
   - Translate to `resume.zh.json` via GitHub Models *(only when `resume.json` changes)*
   - Export bilingual HTML → deploy to GitHub Pages
   - Sync `resume.json` to Gist *(if configured)*
   - Regenerate this README

### 🛠 Local Development

```bash
pnpm install
pnpm run build    # build resume.json from YAML
pnpm run serve    # preview at http://localhost:4000
pnpm run export   # export to resume.html
```

---

## Abraham Yang 杨杨

**Senior Frontend Engineer / Frontend Lead**

📧 [abram.yang@outlook.com](mailto:abram.yang@outlook.com) · 🌐 [https://gh.abramyang.com/resume](https://gh.abramyang.com/resume) · 📍 Shanghai, Shanghai

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/abramyang) [![Github](https://img.shields.io/badge/Github-0A66C2?style=flat&logo=github&logoColor=white)](https://www.github.com/abramyangCN)

## Summary

Senior Frontend Engineer with 7+ years of experience building scalable web, hybrid, and mini-program applications. Specialized in React ecosystem, interactive rendering (2D/3D), and SaaS systems architecture. Led small cross-functional teams (up to 5 engineers) delivering production-ready systems serving 10k+ users. Strong ownership mindset across frontend architecture, hybrid integration, CI/CD pipelines, and cloud deployment. Experienced collaborating across APAC regions and driving engineering standards.

## Experience

### Senior Frontend Engineer · Trajectry (formerly EY Fabernovel China)
*May 2023 – Present · Shanghai, China*

- Delivered ongoing retainer frontend development for Christie's WeChat Miniprogram, including private sale workflows and multi-account management features.
- Developed WeChat Miniprograms for luxury and premium brands including Messika, Bucherer, Hermès (after-sales service), and Kallista using Taro, React, and TypeScript.
- Built and localized the Monotype Asia platform across CN, TW, and KR markets, handling regional content configuration and locale-specific adaptations.
- Maintained and iterated on live production Miniprograms under an agile retainer model with continuous client feedback cycles.

### Frontend Lead · Shanghai RJY Information Technology Co., Ltd
*Sep 2021 – Feb 2023 · Shanghai, China*

- Designed and implemented a customizable clothing platform with real-time 2D/3D rendering using React, Fabric.js, and Three.js.
- Architected layer-based editing system (undo/redo, asset pipeline, rendering abstraction) for interactive design workflow.
- Built server-side rendering pipeline with Node.js to export high-resolution design assets.
- Established CI/CD pipeline and managed production deployment on Alibaba Cloud.

### Frontend Lead · Shanghai Fumasoft Co., Ltd
*Dec 2020 – Sep 2021 · Shanghai, China*

- Migrated React Native application to hybrid architecture, improving integration flexibility with native modules.
- Designed and implemented JS bridge for bidirectional communication between WebView and native layers.
- Improved application stability and reduced hybrid interaction issues through structured routing and lifecycle management.
- Led a cross-functional team of 5 engineers (FE, iOS, Android) coordinating sprint planning and technical decisions.

### Frontend Engineer · Publicis Sapient
*Apr 2019 – Nov 2020 · Shanghai, China*

- Developed responsive campaign websites and minisites for Huawei, Marriott, and automotive brands.
- Implemented interactive mobile experiences using modern JS frameworks and canvas-based rendering.
- Collaborated across Singapore, Japan, and India teams in distributed delivery model.
- Mentored interns and contributed to frontend standards and reusable component design.

## Skills

**Frontend:** React, TypeScript, Vue, TailwindCSS, Hybrid Architecture, Mini Program

**AI-assisted Development:** Claude Code, GitHub Copilot, Prompt Engineering, LLM Workflow Optimization

**Rendering & Visualization:** Fabric.js, Three.js, WebGL, Interactive Editing Systems

**Backend & Infrastructure:** Node.js, REST APIs, CI/CD, Docker, Cloud Deployment

## Education

**Bachelor in Electronic Engineering** · Shanghai Dianji University · Sep 2015 – Jun 2019

## Languages

**Mandarin Chinese** (Native) · **English** (Professional Working Proficiency)

---

*Generated automatically from [resume.json](./resume.json) · Last updated: 2026-02-27*