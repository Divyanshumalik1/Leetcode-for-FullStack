#!/usr/bin/env node
// Full-Stack LeetCode tracker. No dependencies — plain Node 18+.
//
//   npm run new   -- <words from a question>   scaffold a problem folder from README.md
//   npm run t     -- <problem>                 run that problem's tests in watch mode
//   npm run play  -- <problem>                 preview a UI in the browser / run a server
//   npm run log   -- <problem> --result pass|partial|fail [--time 25] [--missed "..."]
//   npm run reset -- <problem>                 archive your code, get blank files for the next attempt
//   npm run today                              what's due, what's next
//   npm run sync                               rebuild README checkboxes + progress table
//
// <problem> can be the folder name (003-debounce), the slug (debounce) or words from the question.

import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const README = path.join(ROOT, 'README.md');
const PROGRESS = path.join(ROOT, 'PROGRESS.md');
const TEMPLATES = path.join(ROOT, '_templates');
const TRACK = ' <!--track-->';

// Mastered = a passing attempt on attempt 3 or later.
const MASTER_ATTEMPT = 3;
// Days to wait after attempt N before attempt N+1 is due.
const SPACING = { 1: 2, 2: 7 };
const RETRY_DAYS = 3;

// README section number → [repo folder, default template]
const SECTIONS = {
  1: ['02-frontend', 'ui'], 2: ['02-frontend', 'ui'], 3: ['01-javascript', 'js'], 4: ['01-javascript', 'concept'],
  5: ['02-frontend', 'ui'], 6: ['02-frontend', 'ui'], 7: ['02-frontend', 'ui'], 8: ['02-frontend', 'js'],
  9: ['03-backend', 'backend'], 10: ['03-backend', 'backend'], 11: ['03-backend', 'backend'], 12: ['03-backend', 'backend'],
  13: ['03-backend', 'backend'], 14: ['03-backend', 'backend'], 15: ['05-concurrency', 'backend'], 16: ['03-backend', 'backend'],
  17: ['03-backend', 'backend'], 18: ['04-fullstack', 'fullstack'], 19: ['09-system-design', 'design'],
  20: ['06-distributed', 'backend'], 21: ['09-system-design', 'design'], 22: ['07-testing', 'backend'],
  23: ['08-production', 'backend'], 24: ['09-system-design', 'design'], 25: ['09-system-design', 'design'],
  26: ['01-javascript', 'js'], 28: ['10-drills', 'concept'], 29: ['10-drills', 'concept'], 30: ['10-drills', 'concept'],
};

const AREAS = [
  ['JavaScript (3, 4, 26)', [3, 4, 26]],
  ['Frontend (1, 2, 5–8)', [1, 2, 5, 6, 7, 8]],
  ['Backend (9–17)', [9, 10, 11, 12, 13, 14, 15, 16, 17]],
  ['Full-stack & systems (18–25)', [18, 19, 20, 21, 22, 23, 24, 25]],
  ['Drills & behavioral (28–30)', [28, 29, 30]],
];

// ---------- helpers ----------

const pad = (n) => String(n).padStart(2, '0');
const today = () => { const d = new Date(); return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; };
const addDays = (date, n) => { const d = new Date(`${date}T00:00:00Z`); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); };
const clean = (t) => t.split(TRACK)[0].replace(/[⭐🆕]/gu, '').replace(/\s+/g, ' ').trim();
const keyOf = (t) => clean(t).replace(/`/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const slugOf = (t) => keyOf(t).replace(/^(implement|build) (a |an |the )?/, '').split(' ').join('-').slice(0, 48).replace(/-+$/, '');
const readJSON = (f) => JSON.parse(fs.readFileSync(f, 'utf8'));
const writeJSON = (f, v) => fs.writeFileSync(f, JSON.stringify(v, null, 2) + '\n');

function die(msg) { console.error(`✖ ${msg}`); process.exit(1); }

function parseArgs(argv) {
  const out = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith('--')) {
      const k = a.slice(2);
      const v = argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[++i] : true;
      out[k] = v;
    } else out._.push(a);
  }
  return out;
}

// ---------- README + problem folders ----------

function parseReadme() {
  const lines = fs.readFileSync(README, 'utf8').split('\n');
  const items = [];
  let sec = null;
  lines.forEach((line, i) => {
    const h = line.match(/^## (?:\S+ )?(\d+)\. /);
    if (h) { sec = Number(h[1]); return; }
    if (/^#{1,2} /.test(line)) { sec = null; return; }
    const m = line.match(/^- \[( |x)\] (.*)$/);
    if (m && sec && SECTIONS[sec]) {
      const text = m[2].split(TRACK)[0].replace(/\s+$/, '');
      items.push({ i, sec, text, star: text.includes('⭐'), key: keyOf(text) });
    }
  });
  return { lines, items };
}

function loadProblems() {
  const out = [];
  for (const cat of fs.readdirSync(ROOT)) {
    const cdir = path.join(ROOT, cat);
    if (!/^\d{2}-/.test(cat) || !fs.statSync(cdir).isDirectory()) continue;
    for (const p of fs.readdirSync(cdir)) {
      const mf = path.join(cdir, p, 'meta.json');
      if (fs.existsSync(mf)) out.push({ dir: path.join(cdir, p), rel: `${cat}/${p}`, meta: readJSON(mf) });
    }
  }
  return out;
}

function findProblem(q) {
  if (!q) die('Tell me which problem, e.g. debounce or 003-debounce');
  const probs = loadProblems();
  const ql = q.toLowerCase();
  let hits = probs.filter((p) => p.rel.toLowerCase() === ql || p.rel.toLowerCase().endsWith(`/${ql}`));
  if (!hits.length) hits = probs.filter((p) => p.rel.toLowerCase().endsWith(`-${ql.replace(/\s+/g, '-')}`));
  if (!hits.length) {
    const words = keyOf(q).split(' ');
    hits = probs.filter((p) => { const hay = `${p.rel.toLowerCase()} ${p.meta.key}`; return words.every((w) => hay.includes(w)); });
  }
  if (!hits.length) die(`No started problem matches "${q}". Start it with: npm run new -- ${q}`);
  if (hits.length > 1) die(`"${q}" matches several problems — use the folder name:\n  ${hits.map((h) => h.rel).join('\n  ')}`);
  return hits[0];
}

const isMastered = (m) => m.attempts.some((a) => a.n >= MASTER_ATTEMPT && a.result === 'pass');

function statusLabel(m) {
  if (isMastered(m)) return '✅ mastered';
  const n = m.attempts.length;
  if (n === 0) return '⚪ not attempted';
  const last = m.attempts[n - 1];
  const icon = { pass: '🟢', partial: '🟡', fail: '🔴' }[last.result];
  return `${icon} attempt ${n}/${MASTER_ATTEMPT}`;
}

function vars(meta, type) {
  return {
    TITLE: meta.question,
    TITLE_JS: JSON.stringify(meta.question.replace(/`/g, '')),
    SECTION: String(meta.section),
    TYPE: type,
    DATE: today(),
  };
}

const TEXT_EXT = /\.(md|js|jsx|json|html|css|ya?ml|txt|sql)$/;

function copyTemplate(type, dest, v, skip = new Set()) {
  const src = path.join(TEMPLATES, type);
  const walk = (from, to) => {
    fs.mkdirSync(to, { recursive: true });
    for (const name of fs.readdirSync(from)) {
      if (from === src && skip.has(name)) continue;
      const f = path.join(from, name), t = path.join(to, name);
      if (fs.statSync(f).isDirectory()) { walk(f, t); continue; }
      if (TEXT_EXT.test(name)) {
        fs.writeFileSync(t, fs.readFileSync(f, 'utf8').replace(/\{\{(\w+)\}\}/g, (all, k) => (k in v ? v[k] : all)));
      } else fs.copyFileSync(f, t);
    }
  };
  walk(src, dest);
}

// ---------- commands ----------

function cmdNew(argv) {
  const a = parseArgs(argv);
  const q = a._.join(' ');
  if (!q) die('Usage: npm run new -- <words from the question> [--type js|ui|backend|fullstack|design|concept]');
  const { items } = parseReadme();
  const qk = keyOf(q);
  let hits = items.filter((it) => it.key === qk);
  if (!hits.length) { const w = qk.split(' '); hits = items.filter((it) => w.every((x) => it.key.includes(x))); }
  if (!hits.length) die(`No question in README.md matches "${q}".`);
  if (hits.length > 1) {
    die(`"${q}" matches ${hits.length} questions — add a word or two:\n${hits.slice(0, 20).map((h) => `  §${h.sec}  ${clean(h.text)}`).join('\n')}`);
  }
  const it = hits[0];
  const existing = loadProblems().find((p) => p.meta.key === it.key);
  if (existing) die(`Already started: ${existing.rel}`);

  const [cat, defType] = SECTIONS[it.sec];
  const type = typeof a.type === 'string' ? a.type : defType;
  if (!fs.existsSync(path.join(TEMPLATES, type))) die(`Unknown type "${type}". Options: ${fs.readdirSync(TEMPLATES).join(', ')}`);

  const cdir = path.join(ROOT, cat);
  fs.mkdirSync(cdir, { recursive: true });
  const nums = fs.readdirSync(cdir).map((d) => parseInt(d, 10)).filter((n) => !Number.isNaN(n));
  const num = String((nums.length ? Math.max(...nums) : 0) + 1).padStart(3, '0');
  const rel = `${cat}/${num}-${slugOf(it.text)}`;
  const dir = path.join(ROOT, rel);

  const meta = { question: clean(it.text), key: it.key, section: it.sec, type, created: today(), attempts: [] };
  copyTemplate(type, dir, vars(meta, type));
  writeJSON(path.join(dir, 'meta.json'), meta);
  sync(true);

  console.log(`✔ Created ${rel}  (${type} template)\n`);
  const name = `${num}-${slugOf(it.text)}`;
  const steps = [`Write the spec in ${rel}/README.md — prompt, clarifying questions, requirements, edge cases.`];
  if (['js', 'ui', 'backend', 'fullstack'].includes(type)) {
    steps.push('Turn each requirement into a test, then start the timer and build it.');
    steps.push(`npm run t -- ${name}      (tests in watch mode)${type !== 'js' ? `\n     npm run play -- ${name}   (run it)` : ''}`);
  } else {
    steps.push(`Start the timer and answer it in the files there.${type === 'concept' ? `\n     npm run play -- ${name}   (runs playground.js)` : ''}`);
  }
  steps.push(`npm run log -- ${name} --result pass|partial|fail --time <minutes> --missed "..."`);
  console.log('Next:');
  steps.forEach((s, i) => console.log(`  ${i + 1}. ${s}`));
}

function cmdLog(argv) {
  const a = parseArgs(argv);
  const q = a._.join(' ');
  if (!q || !a.result) die('Usage: npm run log -- <problem> --result pass|partial|fail [--time 25] [--missed "what you missed"]');
  if (!['pass', 'partial', 'fail'].includes(a.result)) die('--result must be pass, partial or fail');
  const p = findProblem(q);
  const m = p.meta;
  const n = m.attempts.length + 1;
  const minutes = a.time && a.time !== true ? Number(a.time) : null;
  const missed = typeof a.missed === 'string' ? a.missed : '';
  const entry = { n, date: today(), minutes, result: a.result, missed };
  m.attempts.push(entry);
  writeJSON(path.join(p.dir, 'meta.json'), m);

  const icon = { pass: '✅', partial: '🟡', fail: '❌' }[a.result];
  const time = minutes == null ? '–' : `${minutes} min`;
  const esc = (s) => (s || '–').replace(/\|/g, '\\|');

  const notesFile = path.join(p.dir, 'NOTES.md');
  if (fs.existsSync(notesFile)) {
    const notes = fs.readFileSync(notesFile, 'utf8');
    const row = `| ${n} | ${entry.date} | ${time} | ${icon} ${a.result} | ${esc(missed)} |`;
    fs.writeFileSync(notesFile, notes.includes('<!-- attempts -->') ? notes.replace('<!-- attempts -->', `${row}\n<!-- attempts -->`) : `${notes}\n${row}\n`);
  }
  if (!fs.existsSync(PROGRESS)) fs.writeFileSync(PROGRESS, '# Progress log\n\n| Date | Problem | Attempt | Time | Result | Missed |\n|---|---|---|---|---|---|\n');
  fs.appendFileSync(PROGRESS, `| ${entry.date} | [${p.rel}](${p.rel}) | ${n} | ${time} | ${icon} ${a.result} | ${esc(missed)} |\n`);

  sync(true);
  const slug = path.basename(p.dir);
  if (isMastered(m)) {
    console.log(`🎉 ${m.question} — mastered! README checkbox ticked.`);
  } else {
    const wait = n < MASTER_ATTEMPT ? SPACING[n] : RETRY_DAYS;
    console.log(`✔ Logged attempt ${n} (${a.result}) for ${p.rel}`);
    console.log(`  Next attempt due ${addDays(entry.date, wait)}. When you start it: npm run reset -- ${slug}`);
  }
}

function cmdReset(argv) {
  const p = findProblem(parseArgs(argv)._.join(' '));
  const n = p.meta.attempts.length;
  if (!n) die('Nothing to archive yet — log an attempt first (npm run log).');
  const keep = new Set(['README.md', 'NOTES.md', 'meta.json', 'attempts']);
  const dest = path.join(p.dir, 'attempts', `attempt-${n}`);
  if (fs.existsSync(dest)) die(`${path.relative(ROOT, dest)} already exists — you already reset after attempt ${n}.`);
  fs.mkdirSync(dest, { recursive: true });
  for (const name of fs.readdirSync(p.dir)) {
    if (!keep.has(name)) fs.renameSync(path.join(p.dir, name), path.join(dest, name));
  }
  copyTemplate(p.meta.type, p.dir, vars(p.meta, p.meta.type), keep);
  console.log(`✔ Archived attempt ${n} to ${path.relative(ROOT, dest)} and restored blank files.`);
  console.log(`  Attempt ${n + 1}: blank editor, timer on. Your spec in README.md is still there.`);
}

function cmdToday() {
  const t = today();
  const probs = loadProblems();
  const due = [], upcoming = [];
  for (const p of probs) {
    const m = p.meta;
    if (isMastered(m)) continue;
    const n = m.attempts.length;
    if (n === 0) { due.push([p.rel, 'attempt 1 — not attempted yet']); continue; }
    const last = m.attempts[n - 1];
    const when = addDays(last.date, n < MASTER_ATTEMPT ? SPACING[n] : RETRY_DAYS);
    const row = [p.rel, `attempt ${n + 1} (last: ${last.result} on ${last.date})`, when];
    (when <= t ? due : upcoming).push(row);
  }
  const mastered = probs.filter((p) => isMastered(p.meta)).length;
  const { items } = parseReadme();
  console.log(`📅 ${t}  ·  ${probs.length} started  ·  ${mastered} mastered  ·  ${items.length} total\n`);
  console.log(due.length ? '🔔 Due now:' : '🔔 Nothing due right now.');
  for (const [rel, what] of due) console.log(`   • ${rel} — ${what}`);
  if (upcoming.length) {
    console.log('\n⏳ Coming up:');
    upcoming.sort((x, y) => x[2].localeCompare(y[2])).slice(0, 8).forEach(([rel, what, when]) => console.log(`   • ${when}  ${rel} — ${what}`));
  }
  const started = new Set(probs.map((p) => p.meta.key));
  const next = items.filter((it) => it.star && !started.has(it.key)).slice(0, 3);
  if (next.length) {
    console.log('\n⭐ Next new high-value problems:');
    for (const it of next) console.log(`   • ${clean(it.text)}   →  npm run new -- ${keyOf(it.text)}`);
  }
}

function replaceBlock(lines, name, content) {
  const s = lines.findIndex((l) => l.trim() === `<!-- ${name}:start -->`);
  const e = lines.findIndex((l) => l.trim() === `<!-- ${name}:end -->`);
  if (s === -1 || e === -1 || e < s) return false;
  lines.splice(s + 1, e - s - 1, ...content);
  return true;
}

const bar = (done, total) => {
  const pct = total ? Math.round((done / total) * 100) : 0;
  const filled = Math.round(pct / 10);
  return `${'▓'.repeat(filled)}${'░'.repeat(10 - filled)} ${pct}%`;
};

function sync(quiet = false) {
  const { lines, items } = parseReadme();
  const probs = loadProblems();
  const byKey = new Map(probs.map((p) => [p.meta.key, p]));

  for (const it of items) {
    const p = byKey.get(it.key);
    if (!p) { lines[it.i] = `- [ ] ${it.text}`; continue; }
    const done = isMastered(p.meta);
    lines[it.i] = `- [${done ? 'x' : ' '}] ${it.text}${TRACK} · [📂](${p.rel}) ${statusLabel(p.meta)}`;
  }

  const readmeKeys = new Set(items.map((it) => it.key));
  for (const p of probs) if (!readmeKeys.has(p.meta.key)) console.warn(`⚠ ${p.rel}: its question isn't in README.md any more ("${p.meta.question}")`);

  const stat = (list) => {
    const ps = list.map((it) => byKey.get(it.key)).filter(Boolean);
    return {
      total: list.length,
      started: ps.length,
      a1: ps.filter((p) => p.meta.attempts.length >= 1).length,
      a2: ps.filter((p) => p.meta.attempts.length >= 2).length,
      mastered: ps.filter((p) => isMastered(p.meta)).length,
    };
  };
  const row = (label, s, bold = false) => {
    const b = (x) => (bold ? `**${x}**` : x);
    return `| ${b(label)} | ${b(s.total)} | ${b(s.started)} | ${b(s.a1)} | ${b(s.a2)} | ${b(s.mastered)} | ${bar(s.mastered, s.total)} |`;
  };
  const table = [
    '',
    '| Area | Total | Started | Attempt 1 | Attempt 2 | Mastered | Progress |',
    '|---|---|---|---|---|---|---|',
    ...AREAS.map(([label, secs]) => row(label, stat(items.filter((it) => secs.includes(it.sec))))),
    row('⭐ Starred questions', stat(items.filter((it) => it.star))),
    row('Total', stat(items), true),
    '',
    `_Last synced ${today()} by \`npm run sync\`._`,
    '',
  ];
  replaceBlock(lines, 'progress', table);

  const all = stat(items);
  replaceBlock(lines, 'badges', [
    `![Questions](https://img.shields.io/badge/questions-${all.total}-blue)`,
    `![Started](https://img.shields.io/badge/started-${all.started}-orange)`,
    `![Mastered](https://img.shields.io/badge/mastered-${all.mastered}%2F${all.total}-brightgreen)`,
  ]);

  const next = lines.join('\n');
  if (next !== fs.readFileSync(README, 'utf8')) {
    fs.writeFileSync(README, next);
    if (!quiet) console.log(`✔ README.md synced — ${all.started} started, ${all.mastered}/${all.total} mastered.`);
  } else if (!quiet) console.log('✔ README.md already up to date.');
}

function run(cmd, args, opts = {}) {
  return spawn(cmd, args, { stdio: 'inherit', shell: process.platform === 'win32', cwd: ROOT, ...opts });
}

function cmdTest(argv) {
  const p = findProblem(parseArgs(argv)._.join(' '));
  if (['design', 'concept'].includes(p.meta.type)) die(`${p.rel} is a ${p.meta.type} problem — no tests to run.`);
  run('npx', ['vitest', p.rel]);
}

function cmdPlay(argv) {
  const p = findProblem(parseArgs(argv)._.join(' '));
  const t = p.meta.type;
  const has = (f) => fs.existsSync(path.join(p.dir, f));
  const vite = (entry) => run('npx', ['vite', '--config', 'scripts/play/vite.config.js'], { env: { ...process.env, PROBLEM_ENTRY: path.join(p.dir, entry) } });
  if (t === 'ui' && has('App.jsx')) return vite('App.jsx');
  if (t === 'backend' && has('src/server.js')) return run('node', ['--watch', path.join(p.rel, 'src/server.js')]);
  if (t === 'fullstack') {
    run('node', ['--watch', path.join(p.rel, 'server/server.js')]);
    return vite('client/App.jsx');
  }
  if (has('playground.js')) return run('node', [path.join(p.rel, 'playground.js')]);
  die(`Nothing to run for ${p.rel} (${t}).`);
}

const [cmd, ...rest] = process.argv.slice(2);
const commands = { new: cmdNew, log: cmdLog, reset: cmdReset, today: cmdToday, sync: () => sync(false), test: cmdTest, play: cmdPlay };
if (!commands[cmd]) {
  console.log('Commands: new, t (test), play, log, reset, today, sync — see the top of scripts/fl.mjs');
  process.exit(cmd ? 1 : 0);
}
commands[cmd](rest);
