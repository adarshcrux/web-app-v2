import React, { useState, useEffect } from "react";

// Update these paths according to your actual image locations
import image1 from "./assets/images/aleksandr-ledogorov-G-JJy-Yv_dA-unsplash.jpg";
import image2 from "./assets/images/icons8-team-7LNatQYMzm4-unsplash.jpg";
import image3 from "./assets/images/joseph-rosales-m0yRv0GxkV8-unsplash.jpg";
import image4 from "./assets/images/luis-barros-XOytueZ3Usc-unsplash.jpg";

import "./App.css";

const images = [image1, image2, image3, image4];

const App = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [loading, setLoading] = useState(false); // New loading state

  // Auto-scroll effect with smooth slide
  useEffect(() => {
    const interval = setInterval(() => {
      slideNext();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const slideNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const slidePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const validateEmail = (email) => {
    const regex = /\S+@\S+\.\S+/;
    if (!email) return "Email is required";
    if (!regex.test(email)) return "Invalid email format";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateEmail(email);

    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true); // Start loading

    try {
      const response = await fetch(
        `https://sheetdb.io/api/v1/tj13d2bdjs5fk?email=${email}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (!response.ok) throw new Error("Submission failed");

      alert("Thank you for your submission!");
      setEmail("");
      setSubmissionStatus("success");
      setTimeout(() => setSubmissionStatus(null), 3000);
    } catch (err) {
      alert("Something went wrong. Please try again later.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleImageError = (e) => {
    e.target.src = ""; // Consider adding a fallback image URL here
    e.target.alt = "Image not available";
  };

  return (
    <div className="landingPage">
      <h1 className="mainTitle">Knowledge in a Nutshell</h1>
      <div className="carouselContainer">
        <button
          onClick={slidePrev}
          className="carouselButton"
          aria-label="Previous slide"
        >
          ❮
        </button>
        <div className="carouselImageContainer">
          <div
            className="carouselTrack"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
              transition: "transform 0.5s ease-in-out",
            }}
          >
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Slide ${index + 1}`}
                className="carouselImage"
                onError={handleImageError}
                loading="lazy"
              />
            ))}
          </div>
        </div>
        <button
          onClick={slideNext}
          className="carouselButton"
          aria-label="Next slide"
        >
          ❯
        </button>
      </div>

      <h2 className="subtitle">
        Biggest ideas, without clutter. Learn fast, Share faster.
      </h2>

      <p className="comingSoon">Coming Soon</p>
      <p className="loopText">Loop into the Nutshell</p>
      <div>
        <form className="subscribeForm" onSubmit={handleSubmit}>
          <div className="inputGroup">
            <label htmlFor="emailInput" className="visually-hidden">
              Enter your email
            </label>
            <input
              id="emailInput"
              className={`emailInput ${error ? "inputError" : ""}`}
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              aria-describedby="errorMessage"
            />
          </div>
          <button type="submit" className="submitButton">
            {loading ? "Submitting..." : "Join Mailing List"}
          </button>
        </form>
        {error && (
          <div id="errorMessage" className="errorMessage" aria-live="polite">
            {error}
          </div>
        )}
        {submissionStatus === "success" && (
          <div className="successMessage" aria-live="polite">
            Thank you for subscribing!
          </div>
        )}
      </div>

      <footer className="footer">
        Nutshell -- All Rights Reserved -- Talk to us at{" "}
        <a
          href="mailto:info@nutshell.ink"
          target="_blank"
          rel="noopener noreferrer"
        >
          info@nutshell.ink
        </a>{" "}
        -- Coming Soon
      </footer>
    </div>
  );
};

export default App;
