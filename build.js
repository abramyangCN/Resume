#!/usr/bin/env node
// build.js — merges src/*.yaml into resume.json (and resume.zh.json if src/zh/ exists)

const fs   = require("fs");
const path = require("path");
const yaml = require("js-yaml");

const src = (...f) => path.join(__dirname, "src", ...f);
const out = (...f) => path.join(__dirname, ...f);

function read(file) {
  return yaml.load(fs.readFileSync(file, "utf8"));
}

function build(basicsFile, workFile, projectsFile, skillsFile, miscFile, outputFile) {
  const basics   = read(basicsFile);
  const work     = read(workFile);
  const projects = read(projectsFile);
  const skills   = read(skillsFile);
  const misc     = read(miscFile);

  const resume = {
    $schema: "https://raw.githubusercontent.com/jsonresume/resume-schema/v1.2.1/schema.json",
    basics,
    work,
    skills,
    volunteer:    misc.volunteer    ?? [],
    education:    misc.education    ?? [],
    projects,
    awards:       misc.awards       ?? [],
    publications: misc.publications ?? [],
    languages:    misc.languages    ?? [],
    interests:    misc.interests    ?? [],
    references:   misc.references   ?? [],
    meta: {
      canonical:    "https://raw.githubusercontent.com/jsonresume/resume-schema/master/resume.json",
      version:      "v1.0.0",
      lastModified: new Date().toISOString().slice(0, 19),
    },
  };

  fs.writeFileSync(outputFile, JSON.stringify(resume, null, 2) + "\n");
  console.log(`✓ Built → ${path.relative(__dirname, outputFile)}`);
}

// English resume
build(
  src("basics.yaml"),
  src("work.yaml"),
  src("projects.yaml"),
  src("skills.yaml"),
  src("misc.yaml"),
  out("resume.json")
);

// Chinese resume (only if src/zh/ exists)
const zhDir = path.join(__dirname, "src", "zh");
if (fs.existsSync(zhDir)) {
  const zhSrc = (...f) => path.join(zhDir, ...f);
  build(
    zhSrc("basics.yaml"),
    zhSrc("work.yaml"),
    zhSrc("projects.yaml"),
    zhSrc("skills.yaml"),
    zhSrc("misc.yaml"),
    out("resume.zh.json")
  );
}
