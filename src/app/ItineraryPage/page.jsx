"use client"

import {useState} from "react"

import "./page.css";
import CarousaL from "../../components/Carousal.jsx";
import { NavBarHome } from "../../components/Navbar.jsx";
import Foot from "../../components/Footer.jsx";
import SearchForm from "./searchBox.jsx";
import ItineraryCard from "./ITcard.jsx";
import Modal from "./Model.jsx";

export default function Itinerary() {
    const [selectedItinerary, setSelectedItinerary] = useState(null);

    const itineraries = [
        {
            image: "images/TajMahal.jpg",
            title: "Paradise TajMahal",
            price: "500",
            duration: "7",
            highlights: ["Scenic Views", "Houseboats", "Skiing", "Local Cuisine"]
        },
        {
            image: "images/GoaImage.jpeg",
            title: "Goa Beach Adventure",
            price: "600",
            duration: "5",
            highlights: ["Beaches", "Nightlife", "Water Sports", "Casinos"]
        },
        {
            image: "images/Rajesthan.jpg",
            title: "Royal Rajasthan Tour",
            price: "800",
            duration: "10",
            highlights: ["Palaces", "Desert Safari", "Folk Dance", "Camel Rides"]
        }
        ,
        {
            image: "images/TajMahal.jpg",
            title: "Paradise TajMahal",
            price: "500",
            duration: "7",
            highlights: ["Scenic Views", "Houseboats", "Skiing", "Local Cuisine"]
        },
        {
            image: "images/GoaImage.jpeg",
            title: "Goa Beach Adventure",
            price: "600",
            duration: "5",
            highlights: ["Beaches", "Nightlife", "Water Sports", "Casinos"]
        },
        {
            image: "images/Rajesthan.jpg",
            title: "Royal Rajasthan Tour",
            price: "800",
            duration: "10",
            highlights: ["Palaces", "Desert Safari", "Folk Dance", "Camel Rides"]
        }
    ];

    return (
        <div className="container-m">
            <NavBarHome />
            <div className="Content">
                <CarousaL />
                <div className="search-form-div">
                    <SearchForm />
                </div>
                <div className="Home_Page_Background">
                    <h2 className="itinerary-heading">Your AI-Generated Itinerary</h2>
                    <div className="Flex_Row" style={{ padding: "40px" }}>
                        {itineraries.map((itinerary, index) => (
                            <ItineraryCard 
                                key={index} 
                                {...itinerary} 
                                onClick={() => setSelectedItinerary(itinerary)}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <Modal 
                isOpen={selectedItinerary !== null} 
                onClose={() => setSelectedItinerary(null)} 
                itinerary={selectedItinerary || {}} 
            />
            <Foot />
        </div>
    );
}
