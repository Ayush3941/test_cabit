
import Link from "next/link";
import Image from "next/image";

import Foot from "../components/Footer.jsx";
import { Poppins } from 'next/font/google';

// Import Bootstrap from CDN for the latest version
import "../styles/globals.css";
import "./layout.css";
// app/layout.js
import 'bootstrap-icons/font/bootstrap-icons.css';

// Font adjustments
const poppins = Poppins({
  weight: ['400', '600'],
  subsets: ['latin'],
});

export const metadata = {
  title: "Cabit",
  description: "Best travel planner",
  icons: {
    icon: "/images/favicon.ico", // 👈 put favicon inside public folder
  },
};

export default function Layout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" />
      </head>
      <body className={`${poppins.className} d-flex flex-column min-vh-100`}>
        <div className="Back-Ground rows">
          <div className="gradient" />
          {children}
          
        </div>
      </body>
    </html>
  );
}