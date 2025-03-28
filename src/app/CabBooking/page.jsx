
"use client";
import dynamic from "next/dynamic";

import ImageBox from "../../components/ImageBox.jsx";
import "./page.css"
import {NavBarNormal} from "../../components/Navbar.jsx"

import Foot from "../../components/Footer.jsx";

const MapComponent = dynamic(() => import("../../components/Map.jsx"), {
    ssr: false,
});
import BookForm from "./BookForm.jsx"
import React, { useState } from 'react';

export default function CabBook() {
	const [start, setStartLocation] = useState('Your Location');
	const [end, setEndLocation] = useState('');
	const drawRoute = (startLocation, endLocation) => {
    console.log("Start:", startLocation);
    setStartLocation(startLocation)
    console.log("End:", endLocation);
    setEndLocation(endLocation)
    
  };
    return (
    	<div className="container-m">
            <NavBarNormal/>
            {/* Main Content */}
				<div className="Normal_Page_Background">
					<div className = "row">
						<div className = "col-1"></div>
							<div className = "col-10">
								<div className = "WhiteCard">
									<div className = "row">
										<div className = "col-6"><BookForm onFormSubmit={drawRoute} /></div>
										<div className = "col-6" style = {{ borderLeft:"1px solid #444"}}><MapComponent startLocation={start} endLocation={end} /></div>
									</div>
								</div>
							</div>
						<div className = "col-1"></div>
					</div>
				</div>
			<Foot/>
		</div>
    );
}