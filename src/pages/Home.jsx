import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <style>{`
        * {
          box-sizing: border-box;
        }

        .home-page {
          min-height: calc(100vh - 72px);
          background:
            linear-gradient(
              135deg,
              rgba(239, 246, 255, 0.96),
              rgba(248, 250, 252, 0.97)
            ),
            url("https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=2000&q=85");
          background-size: cover;
          background-position: center;
          display: flex;
          align-items: center;
          padding: 70px 7%;
        }

        .hero-container {
          width: 100%;
          max-width: 1250px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 70px;
          align-items: center;
        }

        .hero-content {
          animation: fadeUp 0.8s ease;
        }

        .hero-label {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 9px 16px;
          border-radius: 30px;
          background: rgba(37, 99, 235, 0.09);
          color: #2563eb;
          font-size: 14px;
          font-weight: 700;
          margin-bottom: 22px;
        }

        .hero-content h1 {
          margin: 0;
          font-size: clamp(44px, 5vw, 68px);
          line-height: 1.05;
          color: #0f172a;
          letter-spacing: -2px;
        }

        .hero-content h1 span {
          color: #2563eb;
        }

        .hero-content p {
          margin: 25px 0 32px;
          max-width: 600px;
          font-size: 18px;
          line-height: 1.8;
          color: #64748b;
        }

        .hero-buttons {
          display: flex;
          gap: 14px;
        }

        .explore-btn {
          border: none;
          padding: 15px 28px;
          border-radius: 10px;
          background: linear-gradient(135deg, #2563eb, #06b6d4);
          color: white;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          transition: 0.25s;
          box-shadow: 0 12px 25px rgba(37, 99, 235, 0.22);
        }

        .explore-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 18px 32px rgba(37, 99, 235, 0.28);
        }

        .hero-image-card {
          position: relative;
          overflow: hidden;
          border-radius: 28px;
          min-height: 420px;
          background:
            linear-gradient(
              rgba(15, 23, 42, 0.25),
              rgba(15, 23, 42, 0.35)
            ),
            url("https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1400&q=85");
          background-size: cover;
          background-position: center;
          box-shadow: 0 30px 70px rgba(15, 23, 42, 0.2);
          animation: fadeRight 0.9s ease;
        }

        .image-overlay {
          position: absolute;
          left: 28px;
          right: 28px;
          bottom: 28px;
          padding: 24px;
          border-radius: 18px;
          background: rgba(15, 23, 42, 0.75);
          backdrop-filter: blur(12px);
          color: white;
        }

        .image-overlay h3 {
          margin: 0 0 8px;
          font-size: 22px;
        }

        .image-overlay p {
          margin: 0;
          color: #dbeafe;
          line-height: 1.6;
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @media (max-width: 900px) {
          .hero-container {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .hero-image-card {
            min-height: 330px;
          }

          .home-page {
            padding: 50px 5%;
          }
        }

        @media (max-width: 500px) {
          .hero-content h1 {
            font-size: 42px;
          }

          .hero-content p {
            font-size: 16px;
          }

          .hero-buttons {
            flex-direction: column;
          }
        }
      `}</style>

      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-label">
            🚀 YOUR CAREER STARTS HERE
          </div>

          <h1>
            Find the job that
            <br />
            <span>fits your future.</span>
          </h1>

          <p>
            Discover opportunities from leading companies, explore exciting
            roles, and take the next step in your professional journey.
          </p>

          <div className="hero-buttons">
            <button
              className="explore-btn"
              onClick={() => navigate("/login")}
            >
              Explore Jobs →
            </button>
          </div>
        </div>

        <div className="hero-image-card">
          <div className="image-overlay">
            <h3>Find Your Next Opportunity</h3>
            <p>
              Connect with companies, discover suitable jobs and build your
              career with JobPortal.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;