import React from "react";
import "./Model.css";

const Modal = ({ isOpen, onClose, itinerary }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content-stuff">
        <span className="close-btn" onClick={onClose}>&times;</span>
        <img src={itinerary.image} alt={itinerary.title} className="modal-image" />
        <h2>{itinerary.title}</h2>
        <h5>Highlights:</h5>
        <ul className="modal-highlights">
          {itinerary.highlights.map((point, index) => (
            <li key={index} className="model-highlight-item-sample1">
              {point}
            </li>
          ))}
        </ul>
        <br/>
        <p> WEll some long description here </p>

      </div>
    </div>
  );
};

export default Modal;
