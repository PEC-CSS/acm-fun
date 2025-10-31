const STORAGE_KEY = "acmfun_favorites_v1";
const EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 hours

function _readRaw() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    console.error("favoritesStorage: failed to read", e);
    return null;
  }
}

function _writeRaw(obj) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
  } catch (e) {
    console.error("favoritesStorage: failed to write", e);
  }
}

export function _isExpired(raw) {
  if (!raw || !raw.createdAt) return false;
  return Date.now() - raw.createdAt > EXPIRY_MS;
}

export function listFavorites() {
  const raw = _readRaw();
  if (!raw) return [];
  if (_isExpired(raw)) {
    clearAll();
    return [];
  }
  return raw.items || [];
}

export function timeRemainingMs() {
  const raw = _readRaw();
  if (!raw || !raw.createdAt) return EXPIRY_MS;
  const remaining = EXPIRY_MS - (Date.now() - raw.createdAt);
  return remaining > 0 ? remaining : 0;
}

export function addFavorite(item) {
  const raw = _readRaw() || { items: [], createdAt: null };
  if (!raw.createdAt) raw.createdAt = Date.now();
  // avoid duplicates by content
  const exists = (raw.items || []).some((it) => JSON.stringify(it.content) === JSON.stringify(item.content));
  if (exists) return false;
  const entry = {
    id: Date.now() + Math.floor(Math.random() * 1000),
    type: item.type || "generic",
    content: item.content,
    meta: item.meta || null,
    createdAt: Date.now(),
  };
  raw.items = raw.items || [];
  raw.items.push(entry);
  _writeRaw(raw);
  return entry;
}

export function removeFavorite(id) {
  const raw = _readRaw();
  if (!raw || !raw.items) return false;
  raw.items = raw.items.filter((it) => it.id !== id);
  if (raw.items.length === 0) raw.createdAt = null;
  _writeRaw(raw);
  return true;
}

export function clearAll() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}

export function isExpired() {
  const raw = _readRaw();
  return _isExpired(raw);
}

export default {
  listFavorites,
  addFavorite,
  removeFavorite,
  clearAll,
  timeRemainingMs,
  isExpired,
};
