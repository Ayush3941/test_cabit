'use client';

import Link from "next/link";
import "./Navbar.css";
import { useEffect, useState } from "react";

export function NavBarHome() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [logo, setLogo] = useState("");

  const fetchSession = async () => {
      const sessionCookie = document.cookie.split("; ").find(row => row.startsWith("session-id="));
      const sessionId = sessionCookie ? sessionCookie.split("=")[1] : null;

      if (sessionId) {
          try {
              const res = await fetch(`/api/route?model=sessions&id=${sessionId}`);
              const data = await res.json();

              const res_user = await fetch(`/api/route?model=users&id=${data.record.userId}`)
              const data_user = await res_user.json();

              setLogo(data_user.record.user_name[0].toUpperCase())
          } catch (error) {
              console.error("Error fetching session data:", error);
          }
          setIsLoggedIn(true);
      }
  };

  useEffect(() => {
      fetchSession();
  }, []);

  console.log(logo)


  return (
    <nav className="NavbarHome">
      <h1><img src="images/CabitImageW.png" width="150px" /></h1>
      <ul>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/AboutUs">About Us</Link></li>
        <li><Link href="/VisitingPlaces">Destinations</Link></li>
        <li><Link href="/ContactUs">Contact</Link></li>

        {isLoggedIn ? (
          <li>
            <button className="avatar">{logo}</button>
          </li>
        ) : (
          <li><Link href="/Login"><p className="navbar-special-button">Log in</p></Link></li>
        )}

        <li><Link href="/PlanTrip"><p className="navbar-special-button">Plan Trip</p></Link></li>
      </ul>
    </nav>
  );
}

export function NavBarNormal() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [logo, setLogo] = useState("");

  const fetchSession = async () => {
      const sessionCookie = document.cookie.split("; ").find(row => row.startsWith("session-id="));
      const sessionId = sessionCookie ? sessionCookie.split("=")[1] : null;

      if (sessionId) {
          try {
              const res = await fetch(`/api/route?model=sessions&id=${sessionId}`);
              const data = await res.json();

              const res_user = await fetch(`/api/route?model=users&id=${data.record.userId}`)
              const data_user = await res_user.json();
              setLogo(data_user.record.user_name[0].toUpperCase())
          } catch (error) {
              console.error("Error fetching session data:", error);
          }
          setIsLoggedIn(true);
      }
  };

  useEffect(() => {
      fetchSession();
  }, []);

  

  return (
    <nav className="Navbar_Normal">
      <h1>Cabit</h1>
      <ul>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/AboutUs">About Us</Link></li>
        <li><Link href="/VisitingPlaces">Destinations</Link></li>
        <li><Link href="/ContactUs">Contact</Link></li>

        {isLoggedIn ? (
          <li>
            <button className="avatar">{logo}</button>
          </li>
        ) : (
          <li><Link href="/Login"><p className="navbar-special-button">Log in</p></Link></li>
        )}

        <li><Link href="/PlanTrip"><p className="navbar-special-button">Plan Trip</p></Link></li>
      </ul>
    </nav>
  );
}
