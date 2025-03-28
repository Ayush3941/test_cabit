"use client"
import { useState } from "react";
import "./searchBox.css"; // Import CSS
import { FiSearch } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";
import { IoCalendarOutline } from "react-icons/io5";

const SearchBox = ({ onSearch }) => {
  const [location, setLocation] = useState("");


  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) onSearch({ location, date });
  };
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]); // Default to today

  return (
    <form className="searchBox" onSubmit={handleSearch}>
      <div className="Flex_Row">
      <div className="inputGroupWrapper">
        <div className="inputGroup">
          <IoLocationOutline className="icon" />
          <div className="Flex_Row">
            <label className="inputLabel">Where To GO</label>

            <input
              type="text"
              placeholder="Enter location..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="inputField"
            />

          </div>
        </div>

        <div className="separator"></div>

        <div className="inputGroup">
          <div className="Flex_Row">
          <label className="inputLabel">Date</label>
         
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="inputField"
          />
          </div>
      </div>
        <div className="separator"></div>
       

        
          <button type="submit" className="searchButton">
            <FiSearch />
          </button>
     
    </div>
    </div>
    {/*
      
     */}
    </form>
  );
};

export default SearchBox;
