/// <reference lib="webworker" />
import { precacheAndRoute } from 'workbox-precaching';

declare let self: ServiceWorkerGlobalScope & {
  __WB_MANIFEST: Array<{ url: string; revision: string | null }>;
};

// vite-plugin-pwa가 빌드 시 프리캐시 목록을 주입
precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// 웹 푸시 수신 → 알림 표시
self.addEventListener('push', (event) => {
  let payload: { title?: string; body?: string; url?: string } = {};
  try {
    payload = event.data?.json() ?? {};
  } catch {
    payload = { body: event.data?.text() };
  }
  event.waitUntil(
    self.registration.showNotification(payload.title ?? 'Loopin', {
      body: payload.body ?? '',
      icon: '/pwa-192.png',
      badge: '/pwa-192.png',
      data: { url: payload.url ?? '/' },
    }),
  );
});

// 알림 클릭 → 해당 경로로 이동 (열린 탭 재사용)
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = (event.notification.data?.url as string) ?? '/';
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clients) => {
      for (const client of clients) {
        if ('focus' in client) {
          client.navigate(url);
          return client.focus();
        }
      }
      return self.clients.openWindow(url);
    }),
  );
});
