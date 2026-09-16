import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getJobs } from "../services/api";

function Jobs() {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const data = await getJobs();
        setJobs(data);
      } catch (err) {
        console.error(err);

        setError(
          "Unable to load jobs. Please make sure JSON Server is running."
        );
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, []);

  return (
    <div className="jobs-page">
      <style>{`
        * {
          box-sizing: border-box;
        }

        .jobs-page {
          min-height: calc(100vh - 72px);
          padding: 55px 6%;
          background:
            linear-gradient(
              rgba(248, 250, 252, 0.95),
              rgba(239, 246, 255, 0.95)
            ),
            url("https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=2000&q=85");
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
        }

        .jobs-container {
          max-width: 1250px;
          margin: auto;
        }

        .jobs-heading {
          text-align: center;
          margin-bottom: 40px;
        }

        .jobs-heading h1 {
          margin: 0;
          color: #0f172a;
          font-size: 42px;
        }

        .jobs-heading p {
          color: #64748b;
          margin-top: 10px;
        }

        .jobs-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .job-card {
          background: rgba(255, 255, 255, 0.95);
          border: 1px solid #e2e8f0;
          border-radius: 18px;
          padding: 25px;
          box-shadow: 0 12px 35px rgba(15, 23, 42, 0.08);
          transition: 0.25s;
        }

        .job-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 45px rgba(37, 99, 235, 0.15);
        }

        .job-icon {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          background: #eff6ff;
          color: #2563eb;
          font-size: 22px;
          margin-bottom: 18px;
        }

        .job-card h2 {
          margin: 0 0 8px;
          color: #0f172a;
          font-size: 21px;
        }

        .company {
          color: #2563eb;
          font-weight: 700;
          margin-bottom: 15px;
        }

        .job-info {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 16px;
        }

        .tag {
          padding: 6px 10px;
          border-radius: 20px;
          background: #f1f5f9;
          color: #475569;
          font-size: 12px;
          font-weight: 600;
        }

        .salary {
          color: #059669;
          font-weight: 700;
          margin-bottom: 18px;
        }

        .view-btn {
          width: 100%;
          height: 45px;
          border: none;
          border-radius: 9px;
          background: #2563eb;
          color: white;
          font-weight: 700;
          cursor: pointer;
          transition: 0.2s;
        }

        .view-btn:hover {
          background: #1d4ed8;
        }

        .error-box {
          max-width: 600px;
          margin: 30px auto;
          padding: 18px;
          text-align: center;
          border-radius: 12px;
          background: #fef2f2;
          color: #dc2626;
        }

        .loading {
          text-align: center;
          color: #475569;
          font-size: 18px;
        }

        @media (max-width: 1000px) {
          .jobs-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 650px) {
          .jobs-grid {
            grid-template-columns: 1fr;
          }

          .jobs-heading h1 {
            font-size: 34px;
          }
        }
      `}</style>

      <div className="jobs-container">
        <div className="jobs-heading">
          <h1>Explore Jobs</h1>
          <p>
            Find opportunities that match your skills and career goals.
          </p>
        </div>

        {loading && (
          <div className="loading">
            Loading jobs...
          </div>
        )}

        {error && (
          <div className="error-box">
            {error}
          </div>
        )}

        {!loading && !error && (
          <div className="jobs-grid">
            {jobs.map((job) => (
              <div
                className="job-card"
                key={job.id}
              >
                <div className="job-icon">
                  💼
                </div>

                <h2>{job.title}</h2>

                <div className="company">
                  {job.company}
                </div>

                <div className="job-info">
                  <span className="tag">
                    📍 {job.location}
                  </span>

                  <span className="tag">
                    {job.jobType}
                  </span>

                  <span className="tag">
                    {job.workMode}
                  </span>

                  <span className="tag">
                    {job.experience}
                  </span>
                </div>

                <div className="salary">
                  💰 {job.salary}
                </div>

                <button
                  className="view-btn"
                  onClick={() =>
                    navigate(`/jobs/${job.id}`)
                  }
                >
                  View Job Details
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Jobs;