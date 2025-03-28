import "./page.css";

//elements
import CarousaL from "../components/Carousal.jsx";
import {ImageCards} from "../components/GeneralCards.jsx";
import TouristAttractions from "./VisitingPlaces/page";
import Link from "next/link";
import ImageBox from "../components/ImageBox";
import {NavBarHome} from "../components/Navbar.jsx"
import SearchBar from "../components/SearchBar.jsx"
import Foot from "../components/Footer.jsx";
import SearchForm from "./searchBox.jsx";


export default function Home() {
	const handleSearch = (data) => {
    console.log("Search data:", data);
  };

	return (
		<div className="container-m">
            <NavBarHome/>

            {/* Main Content */}
            <div className="Content">
				<div>
					<CarousaL />
					<div className="search-form-div">
                    	<SearchForm />
                	</div>
					<div className="Home_Page_Background">

					    <div className="Home_Page_Content">
							<div className="row">
								<h1>What We Offer</h1>
							</div>
							<br />
							<div className="row">
								<div className="Flex_Row">
									<Link href="/DestinationPage" style={{ textDecoration: 'none' }}> <ImageCards width="50vh" height="70vh" heading = "Tour Planner" text = "Customize your trip with a personalized itinerary." source = "/images/homepage/col1.jpeg"/></Link>
									<Link href="/CabBooking" style={{ textDecoration: 'none' }}> <ImageCards width="50vh" height="70vh" heading = "Cab Booking"  text = "Book cabs with drivers who understand your language for a smooth journey." source = "/images/homepage/col2.jpeg"/></Link>
									<Link href="/VisitingPlaces" style={{ textDecoration: 'none' }}> <ImageCards width="50vh" height="70vh" heading = "Best Destinations "  text = "Discover top travel spots in India, handpicked for every type of traveler." source = "/images/homepage/col3.jpeg"/></Link>
									<Link href="/TranslatorPage" style={{ textDecoration: 'none' }}><ImageCards width="50vh" height="70vh" heading = "No Lang-Barriers"  text = "Overcome language challenges with in-app translation tools." source = "/images/homepage/col4.jpeg"/></Link>
								</div>
							</div>
							<br />
							<br />
							<br />
							<br />

							<div className="row">
								<div className="col-1"></div>
								<div className="col-5" style={{ textAlign: "left" }}>
									<h1>In 3 Easy Steps</h1>
									<br />

									<div className="Flex_Row">
										<div className="col-1"><img src = "/images/homepage/point1.jpeg" style = {{width:"100%" , borderRadius:"100px"}}/></div>
										<div className="col-10">
											<h3>Choose Destination</h3>
											<p>Select your desired travel destination and customize your itinerary.</p>
										</div>
									</div>
									<br />

									<div className="Flex_Row">
										<div className="col-1"><img src = "/images/homepage/point2.jpeg" style = {{width:"100%", borderRadius:"100px"}}/></div>
										<div className="col-10">
											<h3>Make Payment</h3>
											<p>Securely complete your payment for the trip and cab services.</p>
										</div>
									</div>

									<div className="Flex_Row">
										<div className="col-1"><img src = "/images/homepage/point3.jpeg" style = {{width:"100%", borderRadius:"100px"}}/></div>
										<div className="col-10">
											<h3>Reach Airport on selected day</h3>
											<p>Arrive at the airport on your selected date and start your journey!</p>
										</div>
									</div>
								</div>
								<div className="col-5">
										{/*An introductory video...*/}
									<ImageBox source = "/images/homepage/couples.jpeg"/>
								</div>
								<div className="col-1"></div>

							</div>
							<br />
							<br />
							<br />
							<br />
							{/*1> How we help your travel
							   2> Ready Made Trip plans
							   3> Safe ans secure travel (women Safety)*/}

							<div className = "row">
								<div className="col-1"></div>
								<div className="col-5">
										{/*An introductory video...*/}
									<ImageBox source = "/images/homepage/translator.jpeg"/>
								</div>
								<div className = "col-5" style={{ textAlign: "left" }}>

										<div className = "Flex_Row">
											<h1> How we Make your travel better</h1>
											<br/>
										</div>

									<div className="Flex_Row">
										<div className="col-1"><img src = "/images/homepage/point4.jpeg" style = {{width:"100%", borderRadius:"100px"}}/></div>
										<div className="col-10">
											<h3>Plan ahead Plan better</h3>
											<p>Effortlessly plan your trip with customized itineraries, seamless ride integration, and real-time updates for a stress-free journey.</p>
										</div>
									</div>


									<div className="Flex_Row">
										<div className="col-1"><img src = "/images/homepage/point5.jpeg" style = {{width:"100%", borderRadius:"100px"}}/></div>
										<div className="col-10">
											<h3>Multilingual Support</h3>
											<p>Plan your trip effortlessly with our multilingual drivers and built-in translator, ensuring clear communication and a seamless journey.</p>
										</div>
									</div>

									<div className="Flex_Row">
										<div className="col-1"><img src = "/images/homepage/point6.jpeg" style = {{width:"100%", borderRadius:"100px"}}/></div>
										<div className="col-10">
											<h3>Affordable Prices/Cashless Payments</h3>
											<p>Enjoy affordable pricing with no hidden charges and seamless cashless payments for a hassle-free travel experience</p>
										</div>
									</div>
									</div>
								</div>
								<div className="col-1"></div>
							</div>
							<br />
							<br />
							<br />
							<br />
							<div className="row">
								<div className="col-1"></div>
								<div className="col-5" style={{ textAlign: "left" }}>
									<h1 style={{ fontSize: "2.5rem" }}>Safety & Easy Travel</h1>
									<br />

									<div className="Flex_Row">
										<div className="col-1"><img src = "/images/homepage/point7.jpeg" style = {{width:"100%", borderRadius:"100px"}}/></div>
										<div className="col-10">
											<h3>Verified & Trained Drivers</h3>
											<p>SAll drivers undergo background checks and professional training to ensure a safe and reliable travel experience for everyone.</p>
										</div>
									</div>
									<br />

									<div className="Flex_Row">
										<div className="col-1"><img src = "/images/homepage/point8.jpeg" style = {{width:"100%", borderRadius:"100px"}}/></div>
										<div className="col-10">
											<h3>Live Tracking & 24/7 Assistance</h3>
											<p>Real-time GPS tracking and a dedicated support team provide constant monitoring and immediate help whenever needed</p>
										</div>
									</div>

									<div className="Flex_Row">
										<div className="col-1"><img src = "/images/homepage/point9.jpeg" style = {{width:"100%", borderRadius:"100px"}}/></div>
										<div className="col-10">
											<h3>Secure & Comfortable Rides for All</h3>
											<p>Features like ride detail sharing, emergency alerts, and a safe travel environment ensure a worry-free journey for every passenger.</p>
										</div>
									</div>
								</div>
								<div className="col-5">
										{/*An introductory video...*/}
									<ImageBox source = "/images/homepage/goodman.jpeg"/>
								</div>
								<div className="col-1"></div>

							</div>
							<br />
							<br />
						
					
							<div className ="row">
								<h1>Top Destinations</h1>
								<img src ="/images/temp.png"/>
							</div>
				
							<br />
							<br />
							<br />
							<br />

							<div className="row">
							  <div className="col-12 text-center my-4">
							    <h2 className="fw-bold">Download Now</h2>
							    <div className="border-bottom mx-auto" style={{ width: "100px" }}></div>
							  </div>
							  <div className="col-4"></div>
							  <div className="col-4">
								  <div className="d-flex justify-content-center" style={{ gap: "20px" }}>

								    <div className="text-center">
								      <ImageBox width="40vh" height="40vh" source= "/images/homepage/1.png" />
								      <p className="mt-2 fw-semibold">Cabit User: Bike-Taxi, Auto & Cabs</p>
								    </div>
								    <div className="text-center">
								      <ImageBox width="40vh" height="40vh"source= "/images/homepage/2.png" />
								      <p className="mt-2 fw-semibold">Cabit Driver: Drive & Earn</p>
								    </div>

								  </div>
							  </div>
							  <div className="col-4"></div>
							</div>
							


                          {/*<TouristAttractions/>*/}
						</div> 
					</div>
				</div>
				<Foot/>
			</div>

	);
}
