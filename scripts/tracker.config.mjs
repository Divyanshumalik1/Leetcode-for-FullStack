// Tracker settings for this repo. The tracker itself (fl.mjs) is shared with the AI repo.
export default {
  // Languages, in the order they're shown in the README.
  langs: ['ts', 'py'],
  // A failed or partial attempt comes due again after this many days.
  retryDays: 3,
  // README section number → repo folder, template ("kind") and the languages `npm run new` picks by default.
  // Override per question with --lang py|ts|both.
  sections: {
    1: { folder: '02-frontend', kind: 'ui', langs: ['ts'] },
    2: { folder: '02-frontend', kind: 'ui', langs: ['ts'] },
    3: { folder: '01-javascript', kind: 'util', langs: ['ts'] },
    4: { folder: '01-javascript', kind: 'concept', langs: ['ts'] },
    5: { folder: '02-frontend', kind: 'ui', langs: ['ts'] },
    6: { folder: '02-frontend', kind: 'ui', langs: ['ts'] },
    7: { folder: '02-frontend', kind: 'ui', langs: ['ts'] },
    8: { folder: '02-frontend', kind: 'util', langs: ['ts'] },
    9: { folder: '03-backend', kind: 'backend', langs: ['ts', 'py'] },
    10: { folder: '03-backend', kind: 'backend', langs: ['ts', 'py'] },
    11: { folder: '03-backend', kind: 'backend', langs: ['ts', 'py'] },
    12: { folder: '03-backend', kind: 'backend', langs: ['ts', 'py'] },
    13: { folder: '03-backend', kind: 'backend', langs: ['ts', 'py'] },
    14: { folder: '03-backend', kind: 'backend', langs: ['ts', 'py'] },
    15: { folder: '05-concurrency', kind: 'backend', langs: ['ts', 'py'] },
    16: { folder: '03-backend', kind: 'backend', langs: ['ts', 'py'] },
    17: { folder: '03-backend', kind: 'backend', langs: ['ts', 'py'] },
    18: { folder: '04-fullstack', kind: 'fullstack', langs: ['ts'] },
    19: { folder: '09-system-design', kind: 'design', langs: ['none'] },
    20: { folder: '06-distributed', kind: 'backend', langs: ['ts', 'py'] },
    21: { folder: '09-system-design', kind: 'design', langs: ['none'] },
    22: { folder: '07-testing', kind: 'backend', langs: ['ts', 'py'] },
    23: { folder: '08-production', kind: 'backend', langs: ['ts', 'py'] },
    24: { folder: '09-system-design', kind: 'design', langs: ['none'] },
    25: { folder: '09-system-design', kind: 'design', langs: ['none'] },
    26: { folder: '01-javascript', kind: 'util', langs: ['ts', 'py'] },
    28: { folder: '10-drills', kind: 'concept', langs: ['none'] },
    29: { folder: '10-drills', kind: 'concept', langs: ['none'] },
    30: { folder: '10-drills', kind: 'concept', langs: ['none'] },
  },
  areas: [
    ['JavaScript (3, 4, 26)', [3, 4, 26]],
    ['Frontend (1, 2, 5–8)', [1, 2, 5, 6, 7, 8]],
    ['Backend (9–17)', [9, 10, 11, 12, 13, 14, 15, 16, 17]],
    ['Full-stack & systems (18–25)', [18, 19, 20, 21, 22, 23, 24, 25]],
    ['Drills & behavioral (28–30)', [28, 29, 30]],
  ],
  // Problems started before two-language support: old template → new kind + language.
  legacyLang: 'ts',
  legacyTypes: {
    js: { kind: 'util', lang: 'ts' },
    ui: { kind: 'ui', lang: 'ts' },
    backend: { kind: 'backend', lang: 'ts' },
    fullstack: { kind: 'fullstack', lang: 'ts' },
    design: { kind: 'design', lang: 'none' },
    concept: { kind: 'concept', lang: 'ts' },
  },
};
