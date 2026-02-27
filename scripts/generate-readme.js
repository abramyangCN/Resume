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

const lines = [];

// Header
lines.push(`# ${basics.name}`);
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

const output = lines.join("\n");
fs.writeFileSync(path.join(__dirname, "../README.md"), output);
console.log("✓ README.md generated");
