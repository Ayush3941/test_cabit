import "./page.css"

import NavBarNormal from "../../components/Navbar.jsx"

import VoiceConverter from "./convertor.jsx"

import Foot from "../../components/Footer.jsx";

export default function Translator() {
	return (
		<div>
			
			<div className="container-m">
			<NavBarNormal/>
	            {/* Main Content */}
	            <div className="Content">
					<div>
						<div className="Normal_Page_Background">
							<div className="row p-5">
								<VoiceConverter/>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Foot/>
		</div>
	);
}