import "./page.css";
import Form from "./form.jsx"
import NavBarNormal from "../../components/Navbar.jsx"
import Foot from "../../components/Footer.jsx";

export default function DestinationPick() {
  return (
    <div className="container-m">
	    {/* Main Content */}
	    <NavBarNormal/>
	        <div className="Content">
				<div>
					<div className="Normal_Page_Background">
				        <div className="row justify-content-between align-items-start">

				        <div className = "Flex_Row">
				          <div className="col-md-6 text-start header-section">
				            <h1 className="display-4 fw-bolder text-dark">
				              Effortless Travel Planning!
				              <br /> Let AI Be Your Expert Guide.
				            </h1>
				            <p className="text-muted mt-2">
				              Bid farewell to generic holiday packages.
				              <br /> Get Your AI-Personalised Itineraries
				            </p>
				            <button className="btn btn-warning fw-bolder mt-4">Plan Itinerary For Free!</button>
				          </div>







				          {/* Form Section */}
				          <div className="col-md-5 form-container">
				            <h2 className="h4 fw-bolder text-dark">Get your free travel plan now</h2>
				            <Form/>
				          </div>
				        </div>



				        </div>



				        	{/* Features Section */}
				        <div className="row justify-content-center align-items-center mt-5">
				          {[
				            { text: "Free personalized itineraries", img: "8zg6ZpbMsSroJU17MqEQnHR1ZvKs8PNGXSwNb1okMWk.jpg" },
				            { text: "Affordable & flexible bookings", img: "8qCNXH6zQu-uNVqtjLymhA4NnZbTGSE8z43av6-WzDE.jpg" },
				            { text: "Zero hidden charges", img: "7aL-FU5a9jvs-i2fWI7Xy2fZGpmoFj2I6IEJKDNjjag.jpg" }
				          ].map((feature, index) => (
				            <div key={index} className="col-md-3 text-center mb-4">
							  <img 
							    alt={feature.text} 
							    className="feature-icon mx-auto d-block" 
							    src={`https://storage.googleapis.com/a1aa/image/${feature.img}`} 
							  />
							  <p className="fw-bolder">{feature.text}</p>
							</div>

				          ))}
				        </div>





				      </div>
				    </div>
				</div>
				<Foot/>
			</div>
  );
}
