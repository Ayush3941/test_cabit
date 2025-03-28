"use client"
import React, { useState } from "react";
import "./searchBox.css";

const Dropdown = ({ label, options, value, onChange }) => {
  return (
    <div className="dropdown-container-box">
      <label className="dropdown-label-text">{label}</label>
      <select className="dropdown-select-field" value={value} onChange={onChange}>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default function SearchForm() {
  const [from, setFrom] = useState("Start Point");
  const [to, setTo] = useState("End Point");
  const [date, setDate] = useState("");
  const [adults, setAdults] = useState("02");
  const [children, setChildren] = useState("02");

  return (
    <div className="search-form-wrapper">
      <Dropdown label="From" options={["Start Point", "A", "B"]} value={from} onChange={(e) => setFrom(e.target.value)} />
      <Dropdown label="To" options={["End Point", "X", "Y"]} value={to} onChange={(e) => setTo(e.target.value)} />
      <div className="date-picker-container">
        <label className="date-picker-label">Start Date</label>
        <input className="date-picker-field" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
      <div className="date-picker-container">
        <label className="date-picker-label">End Date</label>
        <input className="date-picker-field" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
      <Dropdown label="Adult" options={["01", "02", "03"]} value={adults} onChange={(e) => setAdults(e.target.value)} />
      <Dropdown label="Child" options={["00", "01", "02"]} value={children} onChange={(e) => setChildren(e.target.value)} />
      <button className="search-button-submit">Find Here</button>
    </div>
  );
};

