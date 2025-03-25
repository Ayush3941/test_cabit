'use client';
import { useState } from "react";
import Overview from "./Overview";
import Notes from "./Notes";
import MapBox from "../../components/Map.jsx"
import PlacesTovisit from "./PlacesTovisit";
import Explore from "./Explore";
import Sidebar from "./sidebar";
import './page.css';

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState("Overview");
  const [sidebarVisible, setSidebarVisible] = useState(true);

  return (
    <div className="dashboard-wrapper">   
      <div className="dashboard-container">
        <Sidebar 
          activeSection={activeSection} 
          setActiveSection={setActiveSection} 
          sidebarVisible={sidebarVisible}
          setSidebarVisible={setSidebarVisible}
        />

        <div 
          className={`sidebar-toggle ${sidebarVisible ? 'shrink' : ''}`} 
          onClick={() => setSidebarVisible(!sidebarVisible)}
        >
          {sidebarVisible ? "×" : ">"}
        </div>

        <div className="main-content">
          <div className="header" style={{"textAlign":"center"}}>
            <h1>Trip to Lucknow</h1>
          </div>

          {activeSection === "Overview" && <Overview />}
          {activeSection === "PlacesTovisit" && <PlacesTovisit />}
          {activeSection === "Explore" && <Explore />}
          {activeSection === "Notes" && <Notes />}
        </div>
        <div className="" style={{"width":"300px"}}>
          <MapBox />
        </div>
      </div>
    </div>
  );
}
