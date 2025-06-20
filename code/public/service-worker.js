
const CACHE_NAME = "MOVIE_CACHE";
const DB_NAME = "MovieDB";
const DB_VERSION = 1;
const DB_STORE_NAME = "movieStore";
const DB_OFFLINE_MUTATIONS_NAME = "OfflineMutationsDB"
const DB_OFFLINE_MUTATIONS_VERSION = 1
const DB_OFFLINE_MUTATIONS_STORE_NAME = "mutationsStore"

async function cacheCoreAssets() {
  const cache = await caches.open(CACHE_NAME);
  return await cache.addAll([
    "/",
    "/login",
    "/profile",
    "/vite.svg",
    "/src/assets/movie.svg"
  ]);
}

self.addEventListener("install", (event) => {
  event.waitUntil(cacheCoreAssets());
  self.skipWaiting();
});

async function clearOldCaches() {
  const cacheNames = await caches.keys();
  return await Promise.all(
    cacheNames
      .filter((name) => name !== CACHE_NAME)
      .map((name_1) => caches.delete(name_1))
  );
}

self.addEventListener("activate", (event) => {
  event.waitUntil(clearOldCaches());
  self.clients.claim();
});

function openDb() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      db.createObjectStore(DB_STORE_NAME, { keyPath: "url" });
    };
  });
}

// save data when online
async function addData(url, jsonData) {
  const db = await openDb();
  const transaction = db.transaction(DB_STORE_NAME, "readwrite");
  const store = transaction.objectStore(DB_STORE_NAME);

  const data = {
    url,
    response: JSON.stringify(jsonData),
  };

  const request = store.put(data);
  await new Promise((resolve, reject) => {
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

// get data from indexed db
async function getData(url) {
  try {
    const db = await openDb();
    const transaction = db.transaction(DB_STORE_NAME, "readonly");
    const store = transaction.objectStore(DB_STORE_NAME);

    const request = store.get(url);

    const result = await new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });

    if (result && result.response) {
      return JSON.parse(result.response);
    }

    return null;
  } catch (error) {
    console.error("Error retrieving from IndexedDB:", error);
    return null;
  }
}

async function cacheFirstStrategy(request) {
  try {
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(request);

    if (cachedResponse) {
      return cachedResponse;
    }

    const networkResponse = await fetch(request);
    const responseClone = networkResponse.clone();
    await cache.put(request, responseClone);
    return networkResponse;
  } catch (error) {
    console.error("Cache first strategy failed:", error);
    return caches.match("/offline");
  }
}

async function networkFirstStrategy(request) {
  try {
    const networkResponse = await fetch(request);

    if (networkResponse.ok) {
      const responseClone = networkResponse.clone();
      const responseData = await responseClone.json();
      await addData(request.url, responseData);
      return networkResponse;
    }

    throw new Error("Network response was not ok");
  } catch (error) {
    console.error("Network first strategy failed:", error);
    const cachedResponse = await getData(request.url);

    if (cachedResponse) {
      return new Response(JSON.stringify(cachedResponse), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response("[]", { status: 200 });
  }
}

async function dynamicCaching(request) {
  const cache = await caches.open(CACHE_NAME);

  try {
    const response = await fetch(request);
    const responseClone = response.clone();
    await cache.put(request, responseClone);
    return response;
  } catch (error) {
    console.error("Dynamic caching failed:", error);
    return caches.match(request);
  }
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (url.origin === "https://api.themoviedb.org") {
    if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(request.method)) {
      event.respondWith(handleMutation(request));
    } else {
      event.respondWith(networkFirstStrategy(request));
    }
  } else if (request.mode === "navigate") {
    event.respondWith(cacheFirstStrategy(request));
  } else {
    event.respondWith(dynamicCaching(request));
  }
});

self.addEventListener('message', (event) => {
  if (event.data.type === 'offline-mutations') {
    event.waitUntil(processPendingMutations());
  }
});

async function processPendingMutations() {
  const mutations = await getPendingMutations();
  const mutationPromises = mutations.map(async (mutation) => {
    try {
      const request = new Request(mutation.url, {
        method: mutation.method,
        headers: mutation.headers,
        body: mutation.body
      });

      const response = await fetch(request);
      
      if (response.ok) {
        await removePendingMutation(mutation.id);
      }
    } catch (error) {
      console.error('Failed to sync mutation:', error);
    }
  });

  await Promise.all(mutationPromises);
}

async function getPendingMutations() {
  const db = await openDBMutations();
  const tx = db.transaction(DB_OFFLINE_MUTATIONS_STORE_NAME, 'readonly');
  const store = tx.objectStore(DB_OFFLINE_MUTATIONS_STORE_NAME);
  return new Promise((resolve) => {
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result);
  });
}

async function removePendingMutation(id) {
  const db = await openDBMutations();
  const tx = db.transaction(DB_OFFLINE_MUTATIONS_STORE_NAME, 'readwrite');
  const store = tx.objectStore(DB_OFFLINE_MUTATIONS_STORE_NAME);
  await store.delete(id);
}

async function openDBMutations() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_OFFLINE_MUTATIONS_NAME, DB_OFFLINE_MUTATIONS_VERSION);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      db.createObjectStore(DB_OFFLINE_MUTATIONS_STORE_NAME, { keyPath: 'id' });
    };
  });
}

async function storePendingMutation(mutation) {
  const db = await openDBMutations();
  const tx = db.transaction(DB_OFFLINE_MUTATIONS_STORE_NAME, 'readwrite');
  const store = tx.objectStore(DB_OFFLINE_MUTATIONS_STORE_NAME);
  await store.add(mutation);
}

async function handleOfflineMutation(request) {
  const mutation = {
    id: Date.now(),
    url: request.url,
    method: request.method,
    headers: Object.fromEntries(request.headers.entries()),
    body: await request.text(),
  };

  await storePendingMutation(mutation);

  return new Response(JSON.stringify({ 
    success: true, 
    offline: true,
    message: 'Saved for later sync' 
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

async function handleMutation(request) {
  try {
    const response = await fetch(request.clone());
    if (response.ok) {
      return response;
    } else {
      throw new Error('Network request failed');
    }
  } catch (err) {
    return handleOfflineMutation(request);
  }
}