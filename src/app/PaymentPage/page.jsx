import Form from "./form.jsx";
import Bill from "./Bill.jsx";
import  NavBarNormal  from "../../components/Navbar.jsx";
import "./page.css"
import Foot from "../../components/Footer.jsx";
export default function PaymentPage() {
  return (
    <div className="container-m">
      {/* Navigation Bar */}
      <NavBarNormal />

      {/* Main Content */}
      <div className="Content">
        <div className="Normal_Page_Background">
          <div className="d-flex align-items-center justify-content-center min-vh-100">
            <div
              className=" p-4 rounded-lg shadow-lg w-100"
              style={{ maxWidth: "900px", backgroundColor:"rgba(255,255,255,.75)"}}
            >
              <div className="row d-flex justify-content-between mb-3">
                {/* Left Section - Payment Info & Form */}
                <div className="col-md-6 mb-4 mb-md-0 " >
                  <div className="d-flex align-items-center mb-3 ">
                    <img
                      src="images/download.jpeg"
                      alt="Cabit logo"
                      width="30"
                      height="30"
                      className="me-2"
                    />
                    <h1 className="h4 fw-bold">Cabit</h1>
                  </div>
                  <p className="text-muted mb-4 text-start">
                    Pay before the journey to avail offers and discounts. We will
                    also be able to confirm rides{" "}
                    <span className="text-warning fw-bold">faster</span>.
                  </p>

                  {/* Payment Form */}
                  <Form />
                </div>

                {/* Right Section - QR Code for Payment */}
                <div className="col-md-6">
                  <Bill />
                </div>
              </div>

              {/* Footer Section */}
              <div className="mt-4">
                <button className="btn btn-warning text-white w-100">
                  Pay After the Trip...
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Foot/>
    </div>
  );
}
