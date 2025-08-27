import "./page.css"
import CarousaL from "../../components/Carousal.jsx"
import NavBarNormal from "../../components/Navbar.jsx"
import Form from "./form.jsx"
import Share from "./share.jsx"
import Foot from "../../components/Footer.jsx";
export default function ContactUs() {
	return (

			<div className="container-m">
	            {/* Main Content */}
	            <NavBarNormal/>
	            <div className="Content">
					<div>
						<div className="Normal_Page_Background">
						<div className = "row">
						<div className = "col-1"></div>
							<div className = "col-10">
								<div className = "WhiteCard" style = {{ padding:"3px" ,minWidth:"900px"}}>
									<div className = "row">
										<div className = "col-5">
											<Share/>
										</div>
										<div className = "col-7" style = {{paddingLeft:"5px",color:"#333333",paddingTop:"50px",position: "relative"}}>
											<Form/>
										</div>
									</div>
								</div>
							</div>
						<div className = "col-1"></div>

					</div>
						</div>
					</div>
				</div>
				<Foot/>
			</div>

	);
}