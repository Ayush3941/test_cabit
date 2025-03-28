"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";
import NewPlaceCard from "../../components/Dashboard/explorecard";

import "./Explore.css";

import { env } from "../../data/env/client"
import { z } from "zod"




const API_KEY = env.NEXT_PUBLIC_UNSPLASH_API_KEY





const CITY = "Lucknow";

const ExploreSection = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          `https://api.unsplash.com/search/photos`,
          {
            params: {
              query: `${CITY} landmarks`,
              per_page: 10,
              orientation: "landscape",
            },
            headers: {
              Authorization: `Client-ID ${API_KEY}`,
            },
          }
        );

        const newPlaces = response.data.results.map((image, index) => ({
          image: image.urls.regular,
          title: `Place ${index + 1}`,
          description: image.alt_description || "A beautiful location.",
        }));

        setPlaces(newPlaces);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="explore-container">
      <h3 style={{ display: "block", flex: "none", alignSelf: "auto", width: "100%", color: "white" }}>
        Recommend Places To Visit in {CITY}
      </h3>

      {places.length > 0 ? (
        places.map((place, index) => (
          <NewPlaceCard key={index} image={place.image} title={place.title} description={place.description} />
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ExploreSection;
