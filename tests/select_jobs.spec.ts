import { test, expect } from '@playwright/test';

test.describe('Job Tests', () => {
    const jobs = [
        { name: 'ノービス', baseLevel: '99', jobLevel: '10', statusPointMax: '99', expectedText: '-2495' },
        { name: 'ソードマン', baseLevel: '99', jobLevel: '50', statusPointMax: '99', expectedText: '-2495' },
        { name: 'シーフ', baseLevel: '99', jobLevel: '50', statusPointMax: '99', expectedText: '-2495' },
        { name: 'アコライト', baseLevel: '99', jobLevel: '50', statusPointMax: '99', expectedText: '-2495' },
        { name: 'アーチャー', baseLevel: '99', jobLevel: '50', statusPointMax: '99', expectedText: '-2495' },
        { name: 'マジシャン', baseLevel: '99', jobLevel: '50', statusPointMax: '99', expectedText: '-2495' },
        { name: 'マーチャント', baseLevel: '99', jobLevel: '50', statusPointMax: '99', expectedText: '-2495' },
        { name: 'ナイト', baseLevel: '99', jobLevel: '50', statusPointMax: '99', expectedText: '-2495' },
        { name: 'アサシン', baseLevel: '99', jobLevel: '50', statusPointMax: '99', expectedText: '-2495' },
        { name: 'ハンター', baseLevel: '99', jobLevel: '50', statusPointMax: '99', expectedText: '-2495' },
        { name: 'ウィザード', baseLevel: '99', jobLevel: '50', statusPointMax: '99', expectedText: '-2495' },
        { name: 'ブラックスミス', baseLevel: '99', jobLevel: '50', statusPointMax: '99', expectedText: '-2495' },
        { name: 'クルセイダー', baseLevel: '99', jobLevel: '50', statusPointMax: '99', expectedText: '-2495' },
        { name: 'ローグ', baseLevel: '99', jobLevel: '50', statusPointMax: '99', expectedText: '-2495' },
        { name: 'モンク', baseLevel: '99', jobLevel: '50', statusPointMax: '99', expectedText: '-2495' },
        { name: 'バード', baseLevel: '99', jobLevel: '50', statusPointMax: '99', expectedText: '-2495' },
        { name: 'ダンサー', baseLevel: '99', jobLevel: '50', statusPointMax: '99', expectedText: '-2495' },
        { name: 'セージ', baseLevel: '99', jobLevel: '50', statusPointMax: '99', expectedText: '-2495' },
        { name: 'アルケミスト', baseLevel: '99', jobLevel: '50', statusPointMax: '99', expectedText: '-2495' },
        { name: 'スーパーノービス', baseLevel: '99', jobLevel: '99', statusPointMax: '99', expectedText: '-2495' },
        { name: 'ロードナイト', baseLevel: '99', jobLevel: '70', statusPointMax: '99', expectedText: '-2443' },
        { name: 'アサシンクロス', baseLevel: '99', jobLevel: '70', statusPointMax: '99', expectedText: '-2443' },
        { name: 'ハイプリースト', baseLevel: '99', jobLevel: '70', statusPointMax: '99', expectedText: '-2443' },
        { name: 'スナイパー', baseLevel: '99', jobLevel: '70', statusPointMax: '99', expectedText: '-2443' },
        { name: 'ハイウィザード', baseLevel: '99', jobLevel: '70', statusPointMax: '99', expectedText: '-2443' },
        { name: 'ホワイトスミス', baseLevel: '99', jobLevel: '70', statusPointMax: '99', expectedText: '-2443' },
        { name: 'パラディン', baseLevel: '99', jobLevel: '70', statusPointMax: '99', expectedText: '-2443' },
        { name: 'チェイサー', baseLevel: '99', jobLevel: '70', statusPointMax: '99', expectedText: '-2443' },
        { name: 'チャンピオン', baseLevel: '99', jobLevel: '70', statusPointMax: '99', expectedText: '-2443' },
        { name: 'クラウン', baseLevel: '99', jobLevel: '70', statusPointMax: '99', expectedText: '-2443' },
        { name: 'ジプシー', baseLevel: '99', jobLevel: '70', statusPointMax: '99', expectedText: '-2443' },
        { name: 'プロフェッサー', baseLevel: '99', jobLevel: '70', statusPointMax: '99', expectedText: '-2443' },
        { name: 'クリエイター', baseLevel: '99', jobLevel: '70', statusPointMax: '99', expectedText: '-2443' },
        { name: 'ハイ ノービス', baseLevel: '99', jobLevel: '99', statusPointMax: '99', expectedText: '-2443' },
        { name: 'ハイ ソードマン', baseLevel: '99', jobLevel: '50', statusPointMax: '99', expectedText: '-2443' },
        { name: 'ハイ シーフ', baseLevel: '99', jobLevel: '50', statusPointMax: '99', expectedText: '-2443' },
        { name: 'ハイ アコライト', baseLevel: '99', jobLevel: '50', statusPointMax: '99', expectedText: '-2443' },
        { name: 'ハイ アーチャー', baseLevel: '99', jobLevel: '50', statusPointMax: '99', expectedText: '-2443' },
        { name: 'ハイ マジシャン', baseLevel: '99', jobLevel: '50', statusPointMax: '99', expectedText: '-2443' },
        { name: 'ハイ マーチャント', baseLevel: '99', jobLevel: '50', statusPointMax: '99', expectedText: '-2443' },
        { name: 'テコンキッド', baseLevel: '99', jobLevel: '50', statusPointMax: '99', expectedText: '-2495' },
        { name: '拳聖', baseLevel: '99', jobLevel: '50', statusPointMax: '99', expectedText: '-2495' },
        { name: 'ソウルリンカー', baseLevel: '99', jobLevel: '50', statusPointMax: '99', expectedText: '-2495' },
        { name: '忍者', baseLevel: '99', jobLevel: '70', statusPointMax: '99', expectedText: '-2495' },
        { name: 'ガンスリンガー', baseLevel: '99', jobLevel: '70', statusPointMax: '99', expectedText: '-2495' },
        { name: 'ルーンナイト', baseLevel: '200', jobLevel: '70', statusPointMax: '130', expectedText: '-4363' },
        { name: 'アークビショップ', baseLevel: '200', jobLevel: '70', statusPointMax: '130', expectedText: '-4363' },
        { name: 'レンジャー', baseLevel: '200', jobLevel: '70', statusPointMax: '130', expectedText: '-4363' },
        { name: 'ウォーロック', baseLevel: '200', jobLevel: '70', statusPointMax: '130', expectedText: '-4363' },
        { name: 'メカニック', baseLevel: '200', jobLevel: '70', statusPointMax: '130', expectedText: '-4363' },
        { name: 'ロイヤルガード', baseLevel: '200', jobLevel: '70', statusPointMax: '130', expectedText: '-4363' },
        { name: 'シャドウチェイサー', baseLevel: '200', jobLevel: '70', statusPointMax: '130', expectedText: '-4363' },
        { name: '修羅', baseLevel: '200', jobLevel: '70', statusPointMax: '130', expectedText: '-4363' },
        { name: 'ミンストレル', baseLevel: '200', jobLevel: '70', statusPointMax: '130', expectedText: '-4363' },
        { name: 'ワンダラー', baseLevel: '200', jobLevel: '70', statusPointMax: '130', expectedText: '-4363' },
        { name: 'ソーサラー', baseLevel: '200', jobLevel: '70', statusPointMax: '130', expectedText: '-4363' },
        { name: 'ジェネティック', baseLevel: '200', jobLevel: '70', statusPointMax: '130', expectedText: '-4363' },
        { name: '影狼', baseLevel: '200', jobLevel: '70', statusPointMax: '130', expectedText: '-4415' },
        { name: '朧', baseLevel: '200', jobLevel: '70', statusPointMax: '130', expectedText: '-4415' },
        { name: 'スーパーノービス＋', baseLevel: '200', jobLevel: '70', statusPointMax: '130', expectedText: '-4415' },
        { name: 'リベリオン', baseLevel: '200', jobLevel: '70', statusPointMax: '130', expectedText: '-4415' },
        { name: 'サモナー', baseLevel: '200', jobLevel: '60', statusPointMax: '130', expectedText: '-4415' },
        { name: '星帝', baseLevel: '200', jobLevel: '70', statusPointMax: '130', expectedText: '-4415' },
        { name: 'ソウルリーパー', baseLevel: '200', jobLevel: '70', statusPointMax: '130', expectedText: '-4415' },
        { name: 'ドラゴンナイト', baseLevel: '260', jobLevel: '55', statusPointMax: '130', expectedText: '-4363' },
        { name: 'シャドウクロス', baseLevel: '260', jobLevel: '55', statusPointMax: '130', expectedText: '-4363' },
        { name: 'カーディナル', baseLevel: '260', jobLevel: '55', statusPointMax: '130', expectedText: '-4363' },
        { name: 'ウィンドホーク', baseLevel: '260', jobLevel: '55', statusPointMax: '130', expectedText: '-4363' },
        { name: 'アークメイジ', baseLevel: '260', jobLevel: '55', statusPointMax: '130', expectedText: '-4363' },
        { name: 'マイスター', baseLevel: '260', jobLevel: '55', statusPointMax: '130', expectedText: '-4363' },
        { name: 'インペリアルガード', baseLevel: '260', jobLevel: '55', statusPointMax: '130', expectedText: '-4363' },
        { name: 'アビスチェイサー', baseLevel: '260', jobLevel: '55', statusPointMax: '130', expectedText: '-4363' },
        { name: 'インクイジター', baseLevel: '260', jobLevel: '55', statusPointMax: '130', expectedText: '-4363' },
        { name: 'トルバドゥール', baseLevel: '260', jobLevel: '55', statusPointMax: '130', expectedText: '-4363' },
        { name: 'トルヴェール', baseLevel: '260', jobLevel: '55', statusPointMax: '130', expectedText: '-4363' },
        { name: 'エレメンタルマスター', baseLevel: '260', jobLevel: '55', statusPointMax: '130', expectedText: '-4363' },
        { name: 'バイオロ', baseLevel: '260', jobLevel: '55', statusPointMax: '130', expectedText: '-4363' },
        { name: '天帝', baseLevel: '260', jobLevel: '55', statusPointMax: '130', expectedText: '-4415' },
        { name: 'ソウルアセティック', baseLevel: '260', jobLevel: '55', statusPointMax: '130', expectedText: '-4415' },
        { name: '蜃気楼', baseLevel: '260', jobLevel: '55', statusPointMax: '130', expectedText: '-4415' },
        { name: '不知火', baseLevel: '260', jobLevel: '55', statusPointMax: '130', expectedText: '-4415' },
        { name: 'ナイトウォッチ', baseLevel: '260', jobLevel: '55', statusPointMax: '130', expectedText: '-4415' },
        { name: 'ハイパーノービス', baseLevel: '260', jobLevel: '55', statusPointMax: '130', expectedText: '-4415' },
        { name: 'スピリットハンドラー', baseLevel: '260', jobLevel: '55', statusPointMax: '130', expectedText: '-4415' },
    ];

    test.beforeEach(async ({ page, baseURL, browserName }) => {
        // ページに移動
        await page.goto(baseURL!);
    });

    for (const job of jobs) {
        test(`Select job test ${job.name}`, async ({ page, baseURL, browserName }) => {
            // ジョブを選択
            await page.locator('#OBJID_SELECT_JOB').selectOption(job.name);
            await page.getByRole('checkbox', { name: 'BaseLVを自動調節する' }).uncheck();

            // ステータスを設定
            await page.locator('#OBJID_SELECT_STATUS_STR').fill(job.statusPointMax);
            await page.locator('#OBJID_SELECT_STATUS_AGI').fill(job.statusPointMax);
            await page.locator('#OBJID_SELECT_STATUS_VIT').fill(job.statusPointMax);
            await page.locator('#OBJID_SELECT_STATUS_INT').fill(job.statusPointMax);
            await page.locator('#OBJID_SELECT_STATUS_DEX').fill(job.statusPointMax);
            await page.locator('#OBJID_SELECT_STATUS_LUK').fill(job.statusPointMax);
            await page.locator('#OBJID_SELECT_BASE_LEVEL').fill(job.baseLevel);
            await page.locator('#OBJID_SELECT_JOB_LEVEL').fill(job.jobLevel);

            // 結果を検証
            //await expect(page.locator("#A_STPOINT").getByText(job.expectedText)).toBeVisible();
        });
    }
});
