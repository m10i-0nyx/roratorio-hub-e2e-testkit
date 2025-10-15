import { expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const SNAPSHOT_DIR = path.join(process.cwd(), 'tests', 'snapshots');

export function snapshotPath(name: string) {
    // keep names filesystem-friendly
    const safe = name.replace(/[^a-zA-Z0-9._-]/g, '_');
    return path.join(SNAPSHOT_DIR, `${safe}.txt`);
}

export function ensureDir() {
    if (!fs.existsSync(SNAPSHOT_DIR)) fs.mkdirSync(SNAPSHOT_DIR, { recursive: true });
}

export function saveSnapshot(name: string, content: string) {
    ensureDir();
    fs.writeFileSync(snapshotPath(name), content, 'utf8');
}

export function loadSnapshot(name: string): string | null {
    const p = snapshotPath(name);
    if (!fs.existsSync(p)) return null;
    return fs.readFileSync(p, 'utf8');
}

export function normalizeContent(content: string) {
    let s = content;
    // Normalize ISO timestamps: 2023-10-15T12:34:56.789Z
    s = s.replace(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z/g, '<TIMESTAMP>');
    // Normalize common date formats like 2025/10/15 12:34:56
    s = s.replace(/\d{4}\/\d{1,2}\/\d{1,2}[ T]\d{1,2}:\d{2}:\d{2}/g, '<TIMESTAMP>');
    // Normalize UUIDs
    s = s.replace(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/gi, '<UUID>');
    // Normalize long hex-like or token strings (20+ chars)
    s = s.replace(/\b[0-9A-Za-z_-]{20,}\b/g, '<TOKEN>');
    // Normalize excessive whitespace
    s = s.replace(/\r\n|\r/g, '\n');
    s = s.replace(/\n{3,}/g, '\n\n');
    s = s.replace(/[ \t]+$/gm, '');
    return s.trim();
}

export async function compareOrCreateNormalized(name: string, currentRaw: string) {
    const current = normalizeContent(currentRaw);
    const baseline = loadSnapshot(name);
    if (baseline === null) {
        saveSnapshot(name, current);
        return { created: true, path: snapshotPath(name) };
    } else {
        // Compare normalized current against stored baseline (which is stored normalized)
        expect(current).toEqual(baseline);
        return { created: false };
    }
}
