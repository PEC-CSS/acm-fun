import React, { useState } from 'react';
import '../../styles/pages/activities/FortuneCard.css'; // Import your CSS file for styling

export function FortuneCard() {
  const [cards, setCards] = useState([]);

  const cardData = [
  {
    id: 1,
    title: "Card of Revelation",
    description: "Unlock your hidden potential with this special fortune card. Discover the talents and strengths that make you unique.",
    image: "https://www.evatarot.net/images/card/19.jpg",
    isSpecial: false,
  },
  {
    id: 2,
    title: "Joyful Journey Ahead",
    description: "Embrace the day ahead. You're in for a delightful journey filled with joy, happiness, and new experiences.",
    image: "https://www.evatarot.net/images/card/21.jpg",
    isSpecial: false,
  },
  {
    id: 3,
    title: "Bright Future Awaits",
    description: "Stay positive, as good news is on its way. This card foretells a bright and promising future for you.",
    image: "https://www.evatarot.net/images/card/22.jpg",
    isSpecial: false,
  },
  {
    id: 4,
    title: "Opportunity Beckons",
    description: "Your day is filled with opportunities. Take the first step, and you'll be amazed by what you can achieve.",
    image: "https://www.evatarot.net/images/card/1.jpg",
    isSpecial: false,
  },
  {
    id: 5,
    title: "Message of Hope",
    description: "This card carries a message of hope and optimism. No matter the challenges, your determination will see you through.",
    image: "https://www.evatarot.net/images/card/20.jpg",
    isSpecial: false,
  },
  {
    id: 6,
    title: "Path to Possibilities",
    description: "Believe in your unique journey. This card reveals the path to a future filled with endless possibilities.",
    image: "https://www.evatarot.net/images/card/2.jpg",
    isSpecial: true,
  },
  {
    id: 7,
    title: "Confidence and Success",
    description: "Seize the day with confidence. You are destined for success and happiness on your life's adventure.",
    image: "https://www.evatarot.net/images/card/18.jpg",
    isSpecial: false,
  },
  {
    id: 8,
    title: "Strengths Unveiled",
    description: "This card brings insights into your strengths. Embrace them and watch your dreams turn into reality.",
    image: "https://www.evatarot.net/images/card/9.jpg",
    isSpecial: false,
  },
  {
    id: 9,
    title: "Optimism and Opportunities",
    description: "Optimism will light your path. Good news is on its way, bringing new opportunities and happiness.",
    image: "https://www.evatarot.net/images/card/8.jpg",
    isSpecial: false,
  },
  {
    id: 10,
    title: "Unique Qualities",
    description: "Believe in yourself, for this special card reveals your unique qualities that set you apart.",
    image: "https://www.evatarot.net/images/card/14.jpg",
    isSpecial: false,
  },
  {
    id: 11,
    title: "Journey of Joy",
    description: "Embrace the journey ahead with positivity. The universe is aligning to bring you joy and success.",
    image: "https://www.evatarot.net/images/card/15.jpg",
    isSpecial: false,
  },
  {
    id: 12,
    title: "Opportunity Awaits",
    description: "Your day is filled with opportunities. Take the first step, and you'll be amazed by what you can achieve.",
    image: "https://www.evatarot.net/images/card/11.jpg",
    isSpecial: false,
  },
  {
    id: 13,
    title: "Endless Possibilities",
    description: "Believe in your unique journey. This card reveals the path to a future filled with endless possibilities.",
    image: "https://www.evatarot.net/images/card/10.jpg",
    isSpecial: false,
  },
  {
    id: 14,
    title: "Destined for Happiness",
    description: "Seize the day with confidence. You are destined for success and happiness on your life's adventure.",
    image: "https://www.evatarot.net/images/card/7.jpg",
    isSpecial: false,
  },
  {
    id: 15,
    title: "A Message of Determination",
    description: "This card carries a message of hope and optimism. No matter the challenges, your determination will see you through.",
    image: "https://www.evatarot.net/images/card/12.jpg",
    isSpecial: false,
  },
];



  const showFortune = () => {
    const shuffledCards = [...cardData].sort(() => Math.random() - 0.5);
    let selectedCards = shuffledCards.slice(0, 3);

    // Check if any selected card isSpecial
    const isSpecialSelected = selectedCards.some((card) => card.isSpecial);

    if (isSpecialSelected) {
      // If any selected card is special, display all three selected cards
      setCards(selectedCards);
    } else {
      // If no selected card is special, display any two selected cards
      setCards(selectedCards.slice(0, 2));
    }
  };

  return (
    <div className="FortuneCard">
      <h1>Fortune Activity</h1>
      <button className="fortune-button" onClick={showFortune}>
        Show my Fortune
      </button>
      <div className="cards">
        {cards.map((card) => (
          <div key={card.id} className={`card ${card.isSpecial ? 'special' : ''}`}>
            <img src={card.image} alt={card.title} />
            <h2>{card.title}</h2>
            <p>{card.description}</p>
            {card.isSpecial && <p className="special-text">Special fortune for a special person!</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
