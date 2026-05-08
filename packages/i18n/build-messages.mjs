import { readFileSync, writeFileSync, readdirSync, statSync, existsSync, mkdirSync } from 'fs';
import { join, relative, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '../..');
const LOCALES = ['es', 'en'];
const COMMON_PATH = join(ROOT, 'packages/i18n/messages.json');

function findLocalMessages(dir) {
  const results = [];
  if (!existsSync(dir)) return results;
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      results.push(...findLocalMessages(full));
    } else if (entry === 'messages.json') {
      results.push(full);
    }
  }
  return results;
}

function pathToNamespace(filePath, appSrc) {
  return relative(appSrc, filePath)
    .replace(/\/messages\.json$/, '')
    .replace(/\//g, '-');
}

function buildForApp(appName) {
  const appSrc = join(ROOT, 'apps', appName, 'src');
  const outDir = join(appSrc, 'messages');

  if (!existsSync(appSrc)) return;
  mkdirSync(outDir, { recursive: true });

  const common = JSON.parse(readFileSync(COMMON_PATH, 'utf-8'));

  // Partir siempre desde cero — sin merge con output anterior
  const result = Object.fromEntries(LOCALES.map(l => [l, { common: common[l]?.common ?? {} }]));

  const localFiles = findLocalMessages(appSrc).filter(f => !f.startsWith(outDir));

  for (const file of localFiles) {
    const raw = JSON.parse(readFileSync(file, 'utf-8'));
    const namespace = pathToNamespace(file, appSrc);
    for (const locale of LOCALES) {
      if (raw[locale]) result[locale][namespace] = raw[locale];
    }
  }

  for (const locale of LOCALES) {
    const outPath = join(outDir, `${locale}.json`);
    writeFileSync(outPath, JSON.stringify(result[locale], null, 2));
    console.log(`  ✓ ${appName}/src/messages/${locale}.json — ${Object.keys(result[locale]).length} namespaces`);
  }
}

const apps = readdirSync(join(ROOT, 'apps')).filter(
  a => statSync(join(ROOT, 'apps', a)).isDirectory()
);

for (const app of apps) buildForApp(app);

console.log('\n✓ Messages built successfully');
