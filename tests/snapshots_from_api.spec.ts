import { test } from '@playwright/test';
import { compareOrCreateNormalized, snapshotPath, normalizeContent } from './helpers/snapshotHelperNormalized';
import fs from 'fs';
import path from 'path';

// 環境変数でベースライン自動更新を可能にする
const UPDATE = !!process.env.UPDATE_SNAPSHOTS;

// globalSetup が出力した JSON を読み込む
const DATA_DIR = process.env.PLAYWRIGHT_TEST_DATA_DIR || 'tests/snapshots';
const DATA_PATH = path.resolve(DATA_DIR, 'savedatas.json');

let savedataList: any[] = [];
try {
    const raw = fs.readFileSync(DATA_PATH, 'utf8');
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) savedataList = parsed;
    else console.warn('savedatas.json is not an array, skipping dynamic test generation.');
} catch (err) {
    console.warn('Failed to read savedatas.json at module load time. No dynamic tests will be generated.', String(err));
    savedataList = [];
}

// 動的に test を生成（module-load 時に定義するため並列実行可能）
for (const item of savedataList) {
    const qs = item.query_string as string | undefined;
    const rawId = item.id ?? item.name ?? 'unnamed';
    let idForName: string;
    if (typeof rawId === 'number' || /^[0-9]+$/.test(String(rawId))) {
        const n = Number(rawId);
        idForName = String(n).padStart(4, '0');
    } else {
        idForName = String(rawId).toString().replace(/[^a-zA-Z0-9_-]/g, '_');
    }
    const identifer = idForName;

    if (!qs || typeof qs !== 'string') {
        continue;
    }

    const testName = `savedata: ${identifer}`;
    const snapshotName = `savedata_${identifer}`;

    test(testName, async ({ page, baseURL }) => {
        const url = qs.startsWith('http') ? qs : `${baseURL}${qs}`;
        //console.log('[dynamic test]', url);

        await page.goto(url, { waitUntil: 'domcontentloaded' });

        await page.evaluate(() => {
            const el = document.querySelector('#OBJID_TD_MONSTER_MAP_AREA');
            if (el) el.remove();
        });

        const section = page.locator('section#combatResult');
        const bodyText = (await section.count()) ? await section.innerText() : '';
        const firstNumber = (await section.count()) ? (await section.textContent())?.match(/\d{4,}/)?.[0] || '' : '';

        const calcButton = page.getByRole('button', { name: '計算する' });
        const isDisabled = await calcButton.isDisabled().catch(() => false);

        const combined = [
            '=== NAME ===', identifer,
            '=== URL ===', url,
            '=== BUTTON disabled ===', `disabled=${isDisabled}`,
            '=== FIRST NUMBER ===', firstNumber,
            '=== BODY ===', bodyText
        ].join('\n');

        if (UPDATE) {
            const p = snapshotPath(snapshotName);
            const fsmod = await import('fs');
            fsmod.writeFileSync(p, normalizeContent(combined), 'utf8');
            //console.log('Updated baseline for', snapshotName);
        } else {
            await compareOrCreateNormalized(snapshotName, combined);
            //console.log('Compared', snapshotName);
        }
    });
}
