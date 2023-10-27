import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/components/common/NewNavbar.css';
import { Menu, Close } from 'react-ionicons'
import pecacm from '../../assets/icons/acm.webp'

function NewNavbar() {
  const [activeItem, setActiveItem] = useState(0);

  const handleItemClick = (index) => {
    setActiveItem(index);
  }; 

  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-light fixed-top navBar">
        <div className="container">
          <h1><Link to="/" className="navbar-brand"><img src={pecacm} className="pec"></img></Link></h1>
          <button className="navbar-toggler ml-auto" type="button" data-toggle="collapse" data-target="#collapsingNavbar2">
            <span className="navbar-toggler-icon my-toggler"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsingNavbar2">
            <ul className="navbar-nav ml-auto">
              <li className={`nav-item ${activeItem === 0 ? 'active' : ''}`}><Link className="nav-link" to="/" onClick={() => handleItemClick(0)}>Home</Link></li>
              <li className={`nav-item ${activeItem === 1 ? 'active' : ''}`}><Link className="nav-link" to="/games" onClick={() => handleItemClick(1)}>Games</Link></li>
              <li className={`nav-item ${activeItem === 2 ? 'active' : ''}`}><Link className="nav-link" to="/activities" onClick={() => handleItemClick(2)}> Activities</Link></li>
              <li className={`nav-item ${activeItem === 3 ? 'active' : ''}`}><Link className="nav-link" to="#" onClick={() => handleItemClick(3)}>Events</Link></li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NewNavbar;