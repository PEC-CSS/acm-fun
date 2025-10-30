import React, {useEffect, useState} from 'react';
import './FavoriteButton.css';
import { listFavorites, addFavorite, removeFavorite } from '../../utils/favoritesStorage';

export default function FavoriteButton({ item }) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const all = listFavorites();
    const exists = all.some((it) => JSON.stringify(it.content) === JSON.stringify(item.content));
    setSaved(!!exists);
  }, [item]);

  const handleToggle = () => {
    if (saved) {
      // remove
      const all = listFavorites();
      const found = all.find((it) => JSON.stringify(it.content) === JSON.stringify(item.content));
      if (found) {
        removeFavorite(found.id);
        setSaved(false);
      }
    } else {
      const added = addFavorite(item);
      if (added) setSaved(true);
    }
  };

  return (
    <button className={`fav-button ${saved ? 'saved' : ''}`} onClick={handleToggle} title={saved ? 'Remove from favorites' : 'Save to favorites'}>
      {saved ? '★ Saved' : '☆ Save'}
    </button>
  );
}
