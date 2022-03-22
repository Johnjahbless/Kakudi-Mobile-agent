import React from "react";

export default function Footer() {
  return (
    <footer className="main-footer">
      <div className="footer-left">
        Copyright &copy; {new Date().getFullYear()} <div className="bullet" /> Kakudi Mobile Limited in Partnership with JD Lab Ng{" "}
      </div>{" "}
      <div className="footer-right"> V1.0.0 </div>{" "}
    </footer>
  );
} 
