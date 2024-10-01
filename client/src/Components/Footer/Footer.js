import React from "react";

const Footer = () => {
  return (
    <div className="Foooter">
      <div
        className="text-center p-4 footer"
        style={{
          backgroundColor: "#E07338",
          //   width: "1400px",
          height: "50px",
          position: "relative",
          left: -15,
          top: "300px",
          width: "1450px",
        }}
      >
       
        <a
          className="text-reset fw-bold"
          target="_blank"
          rel="noreferrer"
          href="#"
          style={{
           color: "white",
           position: "relative"

          }}
        >
            © 2022 Copyright:{" "}
        
          Student Buddy
        </a>
      </div>
    </div>
  );
};

export default Footer;
