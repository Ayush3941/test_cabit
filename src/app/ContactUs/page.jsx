// import "./page.css"
// import CarousaL from "../../components/Carousal.jsx"
// import NavBarNormal from "../../components/Navbar.jsx"
// import Form from "./form.jsx"
// import Share from "./share.jsx"
// import Foot from "../../components/Footer.jsx";
// export default function ContactUs() {
// 	return (

// 			<div className="container-m">
// 	            {/* Main Content */}
// 	            <NavBarNormal/>
// 	            <div className="Content">
// 					<div>
// 						<div className="Normal_Page_Background">
// 						<div className = "row">
// 						<div className = "col-1"></div>
// 							<div className = "col-10">
// 								<div className = "WhiteCard" style = {{ padding:"3px" ,minWidth:"900px"}}>
// 									<div className = "row">
// 										<div className = "col-5">
// 											<Share/>
// 										</div>
// 										<div className = "col-7" style = {{paddingLeft:"5px",color:"#333333",paddingTop:"50px",position: "relative"}}>
// 											<Form/>
// 										</div>
// 									</div>
// 								</div>
// 							</div>
// 						<div className = "col-1"></div>

// 					</div>
// 						</div>
// 					</div>
// 				</div>
// 				<Foot/>
// 			</div>

// 	);
// }

"use client";

import { useState } from "react";
import NavBarNormal from "../../components/Navbar.jsx";
import Foot from "../../components/Footer.jsx";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    firstName: "",
    secondName: "",
    email: "",
    phone: "",
    issue: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/route?model=contactus`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_name: formData.firstName + " " + formData.secondName,
          email: formData.email,
          user_phone: formData.phone,
          issue: formData.issue,
          query: formData.message,
        }),
      });

      if (res.ok) {
        alert("Query submitted successfully!");
        setFormData({
          firstName: "",
          secondName: "",
          email: "",
          phone: "",
          issue: "",
          message: "",
        });
      } else {
        alert("Failed to submit query!");
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting query!");
    }
  };

  return (
    <div className="bg-neutral-50 min-h-screen flex flex-col">
      <NavBarNormal />

      <main className="flex-grow">
        <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Info / Share Section */}
            <div className="bg-white rounded-2xl shadow p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold text-neutral-800">
                  Contact Information
                </h3>
                <p className="mt-2 text-sm text-neutral-600">
                  Feel free to reach out to us anytime.
                </p>

                <div className="mt-6 space-y-2 text-neutral-700">
                  <p>
                    📧 <span className="font-medium">Email:</span> admin@cabit.co.in
                  </p>
                  <p>
                    📞 <span className="font-medium">Phone:</span> +91 8439150558
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <img
                  src="/images/CabitImage.png"
                  alt="Contact Illustration"
                  className="rounded-xl w-full object-cover"
                />
              </div>

              <div className="mt-6 flex gap-4">
                {["insta", "linkedin", "social", "twitter"].map((icon) => (
                  <img
                    key={icon}
                    src={`icon/${icon}.png`}
                    className="w-10 h-10 hover:scale-110 transition-transform cursor-pointer"
                    alt={icon}
                  />
                ))}
              </div>
            </div>

            {/* Form Section */}
            <div className="bg-white rounded-2xl shadow p-6">
              <h3 className="text-2xl font-bold text-neutral-800 mb-4">
                Send us a Message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-neutral-700">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm shadow-sm focus:border-yellow-400 focus:ring focus:ring-yellow-200"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-neutral-700">
                      Second Name
                    </label>
                    <input
                      type="text"
                      name="secondName"
                      value={formData.secondName}
                      onChange={handleChange}
                      required
                      className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm shadow-sm focus:border-yellow-400 focus:ring focus:ring-yellow-200"
                    />
                  </div>
                </div>

                {/* Email + Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-neutral-700">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm shadow-sm focus:border-yellow-400 focus:ring focus:ring-yellow-200"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-neutral-700">
                      Phone Number
                    </label>
                    <input
                      type="number"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm shadow-sm focus:border-yellow-400 focus:ring focus:ring-yellow-200"
                    />
                  </div>
                </div>

                {/* Issue Options */}
                <div>
                  <label className="block text-sm font-semibold text-neutral-800 mb-2">
                    Select One of the Options
                  </label>
                  <div className="flex flex-wrap gap-4">
                    {[
                      "Trip Issue",
                      "Cab Issue",
                      "Payment Issue",
                      "App Issue",
                      "Other",
                    ].map((option) => (
                      <label
                        key={option}
                        className="flex items-center gap-2 text-sm text-neutral-700 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="issue"
                          value={option}
                          checked={formData.issue === option}
                          onChange={handleChange}
                          required
                          className="text-yellow-400 focus:ring-yellow-400"
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="text-sm font-medium text-neutral-700">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm shadow-sm focus:border-yellow-400 focus:ring focus:ring-yellow-200"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full rounded-lg bg-yellow-400 px-4 py-2 font-semibold text-black shadow hover:scale-[1.02] transition-transform"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Foot />
    </div>
  );
}
