// ── Focusino Service Worker ──

self.addEventListener('install', e => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(clients.claim());
});

// Push notifikacie
self.addEventListener('push', e => {
  const data = e.data ? e.data.json() : { title: '🍅 Focusino', body: 'Timer skončil!' };
  e.waitUntil(
    self.registration.showNotification(data.title, {
      body:    data.body,
      icon:    '/icon.png',
      badge:   '/icon.png',
      vibrate: [200, 100, 200],
      tag:     'focusino-timer'
    })
  );
});

// Klik na notifikaciu otvori appku
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(
    clients.matchAll({ type: 'window' }).then(list => {
      for (const client of list) {
        if (client.url.includes('focusino') && 'focus' in client) return client.focus();
      }
      return clients.openWindow('https://focusino.sk');
    })
  );
});
