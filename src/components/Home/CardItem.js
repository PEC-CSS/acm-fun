import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/pages/Home/CardItem.css'
const CardItem = (props) => {


  const imageStyle = {
    objectFit: 'cover',
    width: '100%',
    height: '100%',
  };

  return (
    <div className="col-md-4 col-sm-6 mb-4">
      <div class="card container-fluid">
        <div className="card-image">
          <img
            className="card-img-top"
            src={props.src}
            alt="Card"
            style={imageStyle}
          />
        </div>
        <div class="card-body">
          <h5 class="card-title">{props.title}</h5>
          <p class="card-text">{props.text}</p>
          <Link to={props.path} class="btn btn-primary">
            Play
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CardItem;
