import React from "react";
import "./landingpage.scss";

export default function Banner() {
  return (
    <div className="banner">
      <div className="bgImage">
        {/* Add NavBar Here. */}
        <div>
          <h1 className="bannerTextHeader">Find your next roommate!</h1>
          <p className="bannerText">
            New to United States? Just moved cities? Looking for someone to
            share a place with? You've come to the perfect place. Student Buddy
            is your true friend which helps you find your next roommate!
          </p>
          <div>
            <a href="/register">
              <i img="fa-solid fa-house-building"></i>
              <button className="explore">Search</button>
            </a>
          </div>
        </div>
      </div>
      <div className="roomateimg">
        <div>
          <h1 className="bannerTextHeader">Find your next roommate!</h1>
          <p className="bannerText">
            New to United States? Just moved cities? Looking for someone to
            share a place with? You've come to the perfect place. Student Buddy
            is your true friend which helps you find your next roommate!
          </p>
          <div>
            <a href="/register">
              <button className="explore">Search</button>
            </a>
          </div>
        </div>
      </div>
      <div className="eventsimg">
        <div>
          <h1 className="bannerTextHeader">Find your next roommate!</h1>
          <p className="bannerText">
            New to United States? Just moved cities? Looking for someone to
            share a place with? You've come to the perfect place. Student Buddy
            is your true friend which helps you find your next roommate!
          </p>
          <div>
            <a href="/register">
              <button className="explore">Search</button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
