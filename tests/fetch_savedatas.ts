import fs from 'fs';
import { execSync } from 'child_process';

// savedatas API のエンドポイント
const SAVEDATAS_URL = 'https://ratorio-api.ro-database.info/savedatas';

// 保存先（リポジトリ内）
const OUT_DIR = process.env.PLAYWRIGHT_TEST_DATA_DIR || 'tests/snapshots';
const OUT_PATH = `${OUT_DIR}/savedatas.json`;

function ensureDir(d: string) {
    try { fs.mkdirSync(d, { recursive: true }); } catch (e) { /* ignore */ }
}

async function fetchSavedatas(): Promise<any[]> {
    try {
        if (typeof (globalThis as any).fetch === 'function') {
            const res = await (globalThis as any).fetch(SAVEDATAS_URL);
            if (!res.ok) {
                console.warn('fetch failed', res.status);
                return [];
            }
            const j = await res.json();
            return Array.isArray(j) ? j : [];
        }
    } catch (e) {
        console.warn('fetch failed', String(e));
    }

    try {
        const raw = execSync(`curl -s '${SAVEDATAS_URL}'`, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] });
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
        console.warn('curl fallback failed:', String(e));
        return [];
    }
}

export default async function globalSetup() {
    ensureDir(OUT_DIR);
    const items = await fetchSavedatas();
    try {
        fs.writeFileSync(OUT_PATH, JSON.stringify(items, null, 2), 'utf8');
        console.log(`Saved ${Array.isArray(items) ? items.length : 0} items to ${OUT_PATH}`);
    } catch (e) {
        console.warn('Failed to write savedatas file:', String(e));
    }
}
