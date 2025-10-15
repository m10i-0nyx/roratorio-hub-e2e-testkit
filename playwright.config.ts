import { defineConfig } from '@playwright/test';
import os from 'os';

// 環境に合わせてURLを設定
const baseURL = process.env.BASE_URL || 'http://localhost/ratorio/ro4/m/calcx.html';

// デフォルトの並列 worker 数の決定
// - CI 環境なら 2（安全側）
// - ローカルなら CPU の1/2を目安（少なくとも1）
const defaultWorkers = process.env.CI
    ? 2
    : Math.max(1, Math.floor((os.cpus()?.length || 2) / 2));

// 環境変数で明示的に上限を指定できる（数値）
const workers = process.env.PLAYWRIGHT_MAX_WORKERS
    ? Math.max(1, Number(process.env.PLAYWRIGHT_MAX_WORKERS))
    : defaultWorkers;

export default defineConfig({
    workers: workers,
    globalSetup: require.resolve('./tests/fetch_savedatas'),
    fullyParallel: true,
    timeout: 20 * 1000,
    expect: {
        timeout: 10 * 1000,
    },
    projects: [
        {
            name: 'chromium',
            use: {
                launchOptions: {
                    headless: true,
                },
                baseURL: baseURL,
                browserName: 'chromium'
            },
        }
    ],
    use: {
        trace: 'retain-on-failure', // off にするとTimeoutが多発するため、retain-on-failure固定
        screenshot: { mode: 'only-on-failure', fullPage: true },
        video: process.env.CI ? 'off' : 'retain-on-failure'
    }
});
