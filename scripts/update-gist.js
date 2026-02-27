#!/usr/bin/env node
// scripts/update-gist.js — pushes resume.json to a GitHub Gist

const fs = require("fs");
const path = require("path");

const GIST_TOKEN = process.env.GIST_TOKEN;
const GIST_ID    = process.env.GIST_ID;

if (!GIST_TOKEN || !GIST_ID) {
  console.error("✗ Missing GIST_TOKEN or GIST_ID environment variables.");
  console.error("  Set them as repository secrets in GitHub → Settings → Secrets.");
  process.exit(1);
}

const content = fs.readFileSync(
  path.join(__dirname, "../resume.json"),
  "utf8"
);

async function run() {
  const res = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${GIST_TOKEN}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      files: {
        "resume.json": { content },
      },
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    console.error(`✗ Gist update failed (${res.status}): ${body}`);
    process.exit(1);
  }

  const data = await res.json();
  console.log(`✓ Gist updated → ${data.html_url}`);
}

run();
