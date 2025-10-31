import React from "react";
import Slider from "react-slick";
import "../../styles/pages/Home/Cards.css";

// ✅ this is your central data file
import { activities, games } from "../../data/content";

// ✅ your existing card
import CardItem from "../../components/Home/CardItem";

const Cards = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2, slidesToScroll: 1, dots: true },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  };

  // ✅ combine all games + activities from your data file
  const allItems = [
    ...games.map((g) => ({
      src: g.icon,
      text: g.description,
      title: g.title,
      path: `/games/${g.urlTerm}`,
    })),
    ...activities.map((a) => ({
      src: a.icon,
      text: a.description,
      title: a.title,
      path: `/activities/${a.urlTerm}`,
    })),
  ];

  return (
    <div className="container">
      <Slider {...settings}>
        {allItems.map((item) => (
          <div key={item.path} style={{ display: "flex", justifyContent: "center" }}>
            <CardItem
              src={item.src}
              text={item.text}
              label={item.title}
              path={item.path}
              title={item.title}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Cards;
