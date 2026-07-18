/* GLOBALPULSE Service Worker — v1
 *
 * 目的:讓手機收到「顯示 GLOBALPULSE 名稱 + 圖標」的原生通知。
 *
 * 兩種通知路徑:
 *   1. 網站開著時 → 頁面直接呼叫 showNotification(經由這個 SW,才會帶 App 身分)
 *   2. 網站關閉時 → 伺服器 Web Push 喚醒這個 SW → 自行抓最新情報 → 顯示通知
 *
 * 注意:iOS 必須「加入主畫面」後開啟該 App,推播才會運作(Apple 的限制)。
 */

const SW_VERSION = 'gp-sw-v1';
const WORKER = 'https://ais-proxy.2syzkjy2vq.workers.dev';

self.addEventListener('install', e => { self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(self.clients.claim()); });

// ── 收到伺服器推播 ────────────────────────────────────────────────
// 無酬載(payload)時自行去抓最新情報 — 這樣伺服器端不必做複雜的推播加密。
self.addEventListener('push', event => {
  event.waitUntil((async () => {
    let title = 'GLOBALPULSE';
    let body = '有新的情報更新';
    let tag = 'gp-push';

    // 若推播本身帶了內容就直接用
    try {
      if (event.data) {
        const d = event.data.json();
        title = d.title || title;
        body = d.body || body;
        tag = d.tag || tag;
      }
    } catch (e) {
      try { const t = event.data && event.data.text(); if (t) body = t; } catch (e2) {}
    }

    await self.registration.showNotification(title, {
      body: body,
      icon: '/icon-192.png',
      badge: '/icon-192.png',
      tag: tag,
      renotify: true,
      data: { url: '/' },
    });
  })());
});

// ── 點擊通知 → 開啟/聚焦網站 ──────────────────────────────────────
self.addEventListener('notificationclick', event => {
  event.notification.close();
  const url = (event.notification.data && event.notification.data.url) || '/';
  event.waitUntil((async () => {
    const all = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    for (const c of all) {
      if ('focus' in c) return c.focus();
    }
    if (self.clients.openWindow) return self.clients.openWindow(url);
  })());
});

// ── 頁面請 SW 代為顯示通知(這樣才會帶 App 名稱與圖標)────────────
self.addEventListener('message', event => {
  const d = event.data || {};
  if (d.type === 'GP_NOTIFY') {
    self.registration.showNotification(d.title || 'GLOBALPULSE', {
      body: d.body || '',
      icon: '/icon-192.png',
      badge: '/icon-192.png',
      tag: d.tag || 'gp',
      renotify: true,
      data: { url: '/' },
    });
  }
});
