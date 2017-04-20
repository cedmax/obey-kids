importScripts('node_modules/sw-toolbox/sw-toolbox.js');

toolbox.precache(['/assets/audio/up.mp3', '/assets/audio/down.mp3']);

toolbox.router.get('*', toolbox.networkFirst);
toolbox.router.get('/assets/assets/audio/*', toolbox.cacheFirst);