import "./page.css"
import CarousaL from "../../../components/Carousal.jsx"
import NavBarNormal from "../../../components/Navbar.jsx"

import {LoginCard} from "../../../components/GeneralCards.jsx";

import Foot from "../../../components/Footer.jsx";

export default function Login() {
	return (
		<div>
			<div className="container-m">
	            {/* Main Content */}
	             <NavBarNormal/>
	            <div className="Content">
					<div>
						<div className="Normal_Page_Background">
							<div className="row" style = {{"marginTop":"100px",}}>
									<div className="Flex_Row">
										<div style={{padding:"30px"}}>
											<img src="images/CabitImage.png"/>
										</div>
										<div >
											<LoginCard/>
										</div>
									</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Foot/>
		</div>
	);
}