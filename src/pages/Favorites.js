import React, { useEffect, useState } from 'react';
import { listFavorites, removeFavorite, clearAll, timeRemainingMs } from '../utils/favoritesStorage';
import "../styles/pages/activities/RandomQuote.css";
import "../styles/pages/activities/RandomJoke.css";
import "../styles/pages/Activities.css";

function formatRemaining(ms) {
  if (ms <= 0) return 'Expired';
  const h = Math.floor(ms / (1000 * 60 * 60));
  const m = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
  return `${h}h ${m}m`;
}

export const Favorites = () => {
  const [items, setItems] = useState([]);
  const [remaining, setRemaining] = useState(timeRemainingMs());
  const [expandedMap, setExpandedMap] = useState({});
  const quoteRefs = React.useRef({});
  const [longMap, setLongMap] = useState({});

  const toggleExpanded = (id) => {
    setExpandedMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    setItems(listFavorites());
    const t = setInterval(() => setRemaining(timeRemainingMs()), 1000 * 60);
    return () => clearInterval(t);
  }, []);

  // After items render, detect which quote/joke blocks take more than 2 lines
  useEffect(() => {
    const measure = () => {
      if (!items || items.length === 0) {
        setLongMap({});
        return;
      }
      const map = {};
      items.forEach((it) => {
        const el = quoteRefs.current[it.id];
        if (!el) return;
        // Ensure we measure the full content height (remove any clamps temporarily)
        const previousMax = el.style.maxHeight;
        const previousDisplay = el.style.display;
        el.style.maxHeight = 'none';
        el.style.display = 'block';
        const cs = window.getComputedStyle(el);
        // parse line-height; fallback to 1.2 * font-size
        let lineHeight = parseFloat(cs.lineHeight);
        if (!lineHeight || Number.isNaN(lineHeight)) {
          const fs = parseFloat(cs.fontSize) || 16;
          lineHeight = fs * 1.2;
        }
        const lines = Math.round(el.scrollHeight / lineHeight);
        map[it.id] = lines > 2;
        // restore
        el.style.maxHeight = previousMax;
        el.style.display = previousDisplay;
      });
      setLongMap(map);
    };

    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [items]);

  const handleRemove = (id) => {
    removeFavorite(id);
    setItems(listFavorites());
  };

  const handleClearAll = () => {
    clearAll();
    setItems([]);
    setRemaining(timeRemainingMs());
  };

  const renderCard = (it) => {
    const content = it.content || {};
    if (it.type && it.type.includes('quote')) {
      const text = content.text || content.quote || '';
      const author = content.author || content.character || '';
      const extra = content.anime ? ` (${content.anime})` : '';
  const isLong = !!longMap[it.id];
      const isExpanded = !!expandedMap[it.id];
      return (
        <div className="rquote-content" style={{ marginTop: 12 }}>
          <div
            className={`rquote-quote ${isLong && !isExpanded ? 'truncate-2' : ''}`}
          >
              <div ref={(el) => (quoteRefs.current[it.id] = el)}>
                {text}
              </div>
          </div>
          <div className="rquote-author">— {author}{extra}</div>
          {isLong && (
            <div style={{ marginTop: 8 }}>
              <button className="fav-button small" onClick={() => toggleExpanded(it.id)}>
                {isExpanded ? 'Show less' : 'Show more'}
              </button>
            </div>
          )}
        </div>
      );
    }

    if (it.type && it.type.includes('joke')) {
      const txt = content.text || (content.setup ? `${content.setup}\n\n${content.delivery}` : '');
  const isLong = !!longMap[it.id];
      const isExpanded = !!expandedMap[it.id];
      return (
        <div className="rquote-content" style={{ marginTop: 12 }}>
          <div
            className={`rquote-quote ${isLong && !isExpanded ? 'truncate-2' : ''}`}
            style={isLong && !isExpanded ? { whiteSpace: 'normal' } : { whiteSpace: 'pre-wrap' }}
          >
            <div ref={(el) => (quoteRefs.current[it.id] = el)}>
              {txt}
            </div>
          </div>
          {isLong && (
            <div style={{ marginTop: 8 }}>
              <button className="fav-button small" onClick={() => toggleExpanded(it.id)}>
                {isExpanded ? 'Show less' : 'Show more'}
              </button>
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="rquote-content" style={{ marginTop: 12 }}>
        <pre style={{ whiteSpace: 'pre-wrap', margin: 0 }}>{JSON.stringify(content, null, 2)}</pre>
      </div>
    );
  };

  return (
    <div className="activities-root" style={{ padding: 20 }}>
      <h1 className="activities-title" style={{ textAlign: 'center' }}>Favorites</h1>
      <div style={{ marginBottom: 12, color: '#666', textAlign: 'center' }}>
        Saved items will be cleared automatically after 24 hours from the time you first saved an item.
        {remaining > 0 && (
          <div style={{ marginTop: 6 }}><strong>Time until auto-clear:</strong> {formatRemaining(remaining)}</div>
        )}
        {remaining === 0 && (
          <div style={{ marginTop: 6, color: 'red' }}><strong>Storage expired and has been cleared.</strong></div>
        )}
      </div>

      <div>
        {items.length === 0 && <div style={{ textAlign: 'center' }}>No favorites yet — save quotes/jokes from activities.</div>}

        {items.map((it) => (
          <div key={it.id} style={{ margin: '20px 0' }}>
            <div style={{ maxWidth: '80vw', margin: '0 auto' }}>
              <div style={{ position: 'relative' }}>
                {renderCard(it)}
                <button
                  className="fav-button small"
                  onClick={() => handleRemove(it.id)}
                  style={{ position: 'absolute', right: 18, bottom: -8, zIndex: 5 }}
                >
                  Remove
                </button>
              </div>
              <div style={{ textAlign: 'center', marginTop: 8, color: '#666', fontSize: 12 }}>{new Date(it.createdAt).toLocaleString()}</div>
            </div>
          </div>
        ))}
      </div>

      {items.length > 0 && (
        <div style={{ marginTop: 12, textAlign: 'center' }}>
          <button className="rquote-button" onClick={handleClearAll}>Clear all (remove all favorites)</button>
        </div>
      )}
    </div>
  );
};

export default Favorites;
