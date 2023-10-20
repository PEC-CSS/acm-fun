import React, { useState } from 'react';
import '../../styles/pages/activities/FortuneCard.css'; // Import your CSS file for styling

export function FortuneCard() {
  const [cards, setCards] = useState([]);

  const cardData = [
    
    {
      id: 1,
      title: "Fortune 1",
      description: "This is a special fortune card.",
      image: "image1.jpg",
      isSpecial: true,
      lucky: false,
    },
    {
      id: 2,
      title: "Fortune 2",
      description: "You'll have a great day ahead.",
      image: "image2.jpg",
      isSpecial: false,
      lucky: false,
    },
    {
      id: 3,
      title: "Fortune 3",
      description: "Good news is coming your way.",
      image: "image3.jpg",
      isSpecial: false,
      lucky: false,
    },
    // Add more card data here
  
  ]

  const showFortune = () => {
    const shuffledCards = [...cardData].sort(() => Math.random() - 0.5);
    const lucky = Math.random() < 0.5;
    setCards(shuffledCards.slice(0, lucky ? 3 : 2).map((card) => ({ ...card, lucky })));
  };

  return (
    <div className="FortuneCard">
      <h1>Fortune Activity</h1>
      <button onClick={showFortune}>Show my fortune</button>
      <div className="cards">
        {cards.map((card) => (
          <div key={card.id} className={`card ${card.lucky ? 'lucky' : ''}`}>
            <img src={card.image} alt={card.title} />
            <h2>{card.title}</h2>
            <p>{card.description}</p>
            {card.lucky && <p className="lucky-text">Lucky person! You are truly fortunate!</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

// export default FortuneCard;
