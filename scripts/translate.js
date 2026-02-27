#!/usr/bin/env node
// scripts/translate.js
// Translates resume.json → resume.zh.json using GitHub Models API (gpt-4o-mini)
// Requires: GITHUB_MODELS_TOKEN env var (GitHub PAT with models:read scope)

const fs   = require("fs");
const path = require("path");

const TOKEN = process.env.GITHUB_MODELS_TOKEN || process.env.GITHUB_TOKEN;
if (!TOKEN) {
  console.error("✗ Missing GITHUB_MODELS_TOKEN or GITHUB_TOKEN");
  process.exit(1);
}

const resumePath = path.join(__dirname, "../resume.json");
const outputPath = path.join(__dirname, "../resume.zh.json");
const resume     = JSON.parse(fs.readFileSync(resumePath, "utf8"));

const SYSTEM_PROMPT = `You are a professional resume translator. Translate the provided JSON resume from English to Simplified Chinese.

STRICT RULES — never translate these, keep exactly as-is:
- All technology names: React, TypeScript, Vue, Next.js, Node.js, Taro, Uniapp, Fabric.js, Three.js, WebGL, Docker, CI/CD, REST API, JS Bridge, WebView, MJML, Swiper.js, Canvas, glTF, GitHub, Tailwind, CSS, HTML, JavaScript, Material UI, Litmus, Gulp, Gulp.js, Velocity, Baidu Map, Tencent Map, WeChat JSSDK, Claude Code, GitHub Copilot, LLM, SaaS, SDK
- All company names: Christie's, Hermès, Messika, Bucherer, Kallista, Monotype, Publicis Sapient, Trajectry, Fabernovel, EY Studio, Tootools, Fumamx, DS Automobile, IQOS, Marriott, Huawei, Alibaba Cloud
- All platform names: WeChat, WeChat Miniprogram, Wechat, LinkedIn, GitHub, Alibaba Cloud
- All person names
- All URLs, emails, phone numbers
- All date strings (YYYY-MM-DD format)
- Country codes and location identifiers (CN, TW, KR, Shanghai, China, etc.)
- The $schema field value
- All field keys (keep all JSON keys in English)

Translate ONLY the string values of these fields: label, summary, position, highlights (array items), description, area, studyType, fluency (language fluency values), title (award titles), awarder, interests name values.

Return ONLY valid JSON with exactly the same structure and all the same keys. No explanation, no markdown, no code fences.`;

async function translate() {
  console.log("⏳ Translating resume.json via GitHub Models API...");

  const res = await fetch("https://models.inference.ai.azure.com/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `Translate this resume JSON to Simplified Chinese following the rules above:\n\n${JSON.stringify(resume, null, 2)}`,
        },
      ],
      temperature: 0.2,
      max_tokens: 8000,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    console.error(`✗ API error (${res.status}): ${body}`);
    process.exit(1);
  }

  const data   = await res.json();
  const raw    = data.choices?.[0]?.message?.content;

  if (!raw) {
    console.error("✗ Empty response from API");
    process.exit(1);
  }

  // Strip markdown code fences if model wrapped the output
  const cleaned = raw.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "").trim();

  let translated;
  try {
    translated = JSON.parse(cleaned);
  } catch (e) {
    console.error("✗ Failed to parse translated JSON:", e.message);
    console.error("Raw output:", raw.slice(0, 500));
    process.exit(1);
  }

  // Always preserve meta.lastModified
  if (translated.meta) {
    translated.meta.lastModified = new Date().toISOString().slice(0, 19);
  }

  fs.writeFileSync(outputPath, JSON.stringify(translated, null, 2) + "\n");
  console.log(`✓ resume.zh.json generated (${(fs.statSync(outputPath).size / 1024).toFixed(1)} KB)`);
}

translate();
