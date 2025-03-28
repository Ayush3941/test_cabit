import { FaTimes } from "react-icons/fa";
import './page.css';
import { useState } from "react";

export default function Sidebar({ activeSection, setActiveSection, sidebarVisible, setSidebarVisible }) {
  const [tripOpen, setTripOpen] = useState(true);
  const [overviewOpen, setOverviewOpen] = useState(true);
  const [confirmOpen, setConfirmOpen] = useState(true);

  return (
    <div className={`dashboard-sidebar ${sidebarVisible ? "show" : "hide"}`}>
      <div className="dashboard-sidebar-header">
        <div className="dashboard-logo"><img src = "/images/CabitImageW.png" alt= "logo"/></div>
 
      </div>
        <hr/>
      <nav className="DashNavigationLinks">

      
       <button onClick={() => setOverviewOpen(!overviewOpen)} className="dashboard-dropdown-btn">
          Overview {overviewOpen ? "▼" : "▶"}
        </button>

        <div className={`dashboard-overview-content ${overviewOpen ? "open" : ""}`}>
          <p onClick={() => setActiveSection("Overview")}>Overview</p>
          <p onClick={() => setActiveSection("PlacesTovisit")}>Places to Visit</p>
          <p onClick={() => setActiveSection("Explore")}>Explore</p>
          <p onClick={() => setActiveSection("Ask AI")}>Ask AI</p>
        </div>

        {/* Trip Planner */}
        <button onClick={() => setTripOpen(!tripOpen)} className="dashboard-dropdown-btn">
          Trip Planner {tripOpen ? "▼" : "▶"}
        </button>
        <ul className={`dashboard-overview-content ${tripOpen ? "open" : ""}`}>
          <li>Wed 19/2/25</li>
          <li>Thu 20/2/25</li>
          <li>Fri 21/2/25</li>
          <li>Sat 22/2/25</li>
        </ul>

        {/* Confirm Booking */}
        <button onClick={() => setConfirmOpen(!confirmOpen)} className="dashboard-dropdown-btn">
          Confirm Booking {confirmOpen ? "▼" : "▶"}
        </button>
        <div className={`dashboard-overview-content ${confirmOpen ? "open" : ""}`}>
          <p>View</p>
        </div>

      </nav>
    </div>
  );
}
