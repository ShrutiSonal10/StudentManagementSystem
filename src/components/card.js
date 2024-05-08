import React from 'react';
import {Link} from 'react-router-dom';
import './card.css';

const Card = ({ title, content }) => {
  return (
    <div className="card">
      <h2>{title}</h2>
      <p>{content}</p>
      <Link to="/destination">Go to Destination</Link>
    </div>
  );
};

export default Card;
