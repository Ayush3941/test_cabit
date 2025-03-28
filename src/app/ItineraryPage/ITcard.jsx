import React from "react";
import "./ITcard.css";

const ItineraryCard = ({ image, title, price, duration, highlights, onClick }) => {
   return (
    <div className="itinerary-card">
      {/* Click image to open popup */}
      <img src={image} alt={title} className="itinerary-image" onClick={onClick} />
      
      <div className="itinerary-content">
        <h2 className="itinerary-title">{title}</h2>
        <p className="itinerary-price">💰 ${price} per person</p>
        <p className="itinerary-duration">📅 {duration} Days</p>
        <ul className="itinerary-highlights">
          {highlights.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
        <button className="book-now-btn">Book Now</button>
      </div>
    </div>
  );
};

export default ItineraryCard;
