import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addJob } from "../services/api";

function AddJob() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    jobType: "Full Time",
    workMode: "Hybrid",
    salary: "",
    experience: "",
    description: "",
    skills: "",
    education: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (
      !formData.title ||
      !formData.company ||
      !formData.location ||
      !formData.salary ||
      !formData.experience ||
      !formData.description ||
      !formData.skills ||
      !formData.education
    ) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);

      const newJob = {
        ...formData,

        skills: formData.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter((skill) => skill !== ""),

        postedDate: new Date().toISOString().split("T")[0]
      };

      await addJob(newJob);

      alert("Job posted successfully!");

      navigate("/jobs");
    } catch (error) {
      console.error(error);

      setError(
        "Unable to post job. Please make sure JSON Server is running on port 3000."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-job-page">

      <div className="add-job-container">

        {/* Header */}

        <div className="page-header">

          <div>
            <h1>Post a New Job</h1>

            <p>
              Create a job opportunity and find the right candidate.
            </p>
          </div>

          <button
            className="back-btn"
            onClick={() => navigate("/jobs")}
          >
            ← Back to Jobs
          </button>

        </div>


        {/* Form Card */}

        <div className="job-form-card">

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            {/* Basic Information */}

            <div className="section-title">
              <span>📋</span>
              <div>
                <h2>Basic Information</h2>
                <p>Enter the main details about the job.</p>
              </div>
            </div>


            <div className="form-grid">

              <div className="form-group">
                <label>Job Title *</label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Python Developer"
                />
              </div>


              <div className="form-group">
                <label>Company *</label>

                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="e.g. ABC Technologies"
                />
              </div>


              <div className="form-group">
                <label>Location *</label>

                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Hyderabad"
                />
              </div>


              <div className="form-group">
                <label>Salary *</label>

                <input
                  type="text"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  placeholder="e.g. 5 - 8 LPA"
                />
              </div>


              <div className="form-group">
                <label>Job Type *</label>

                <select
                  name="jobType"
                  value={formData.jobType}
                  onChange={handleChange}
                >
                  <option value="Full Time">Full Time</option>
                  <option value="Part Time">Part Time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>


              <div className="form-group">
                <label>Work Mode *</label>

                <select
                  name="workMode"
                  value={formData.workMode}
                  onChange={handleChange}
                >
                  <option value="On-site">On-site</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Remote">Remote</option>
                </select>
              </div>


              <div className="form-group">
                <label>Experience *</label>

                <input
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  placeholder="e.g. Fresher or 0 - 2 Years"
                />
              </div>


              <div className="form-group">
                <label>Education *</label>

                <input
                  type="text"
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  placeholder="e.g. B.Tech / MCA"
                />
              </div>

            </div>


            {/* Skills */}

            <div className="form-group full-width">

              <label>Required Skills *</label>

              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="Python, Flask, SQL, React, Git"
              />

              <small>
                Separate multiple skills using commas.
              </small>

            </div>


            {/* Description */}

            <div className="form-group full-width">

              <label>Job Description *</label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the role, responsibilities and requirements..."
                rows="6"
              />

            </div>


            {/* Buttons */}

            <div className="form-actions">

              <button
                type="button"
                className="cancel-btn"
                onClick={() => navigate("/jobs")}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="post-btn"
                disabled={loading}
              >
                {loading
                  ? "Posting Job..."
                  : "🚀 Post Job"}
              </button>

            </div>

          </form>

        </div>

      </div>


      {/* ================= CSS ================= */}

      <style>{`

        * {
          box-sizing: border-box;
        }

        .add-job-page {
          min-height: calc(100vh - 88px);
          padding: 50px 20px;
          background:
            linear-gradient(
              135deg,
              #f8fafc,
              #eef4ff
            );
        }

        .add-job-container {
          width: 100%;
          max-width: 1050px;
          margin: auto;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }

        .page-header h1 {
          margin: 0;
          color: #0f172a;
          font-size: 34px;
          font-weight: 800;
        }

        .page-header p {
          margin: 8px 0 0;
          color: #64748b;
          font-size: 15px;
        }

        .back-btn {
          border: 1px solid #dbe3ef;
          background: white;
          color: #334155;
          padding: 12px 20px;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
        }

        .back-btn:hover {
          border-color: #2563eb;
          color: #2563eb;
        }

        .job-form-card {
          background: white;
          border-radius: 20px;
          padding: 38px;
          box-shadow:
            0 15px 45px rgba(15, 23, 42, 0.08);
          border: 1px solid #e5eaf2;
        }

        .section-title {
          display: flex;
          align-items: center;
          gap: 14px;
          padding-bottom: 22px;
          margin-bottom: 25px;
          border-bottom: 1px solid #e8edf5;
        }

        .section-title span {
          width: 45px;
          height: 45px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #eff6ff;
          border-radius: 12px;
          font-size: 22px;
        }

        .section-title h2 {
          margin: 0;
          color: #0f172a;
          font-size: 20px;
        }

        .section-title p {
          margin: 4px 0 0;
          color: #64748b;
          font-size: 13px;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 22px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .full-width {
          margin-top: 22px;
        }

        .form-group label {
          margin-bottom: 8px;
          color: #334155;
          font-size: 14px;
          font-weight: 700;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          width: 100%;
          border: 1px solid #dbe3ef;
          border-radius: 10px;
          background: #f8fafc;
          color: #0f172a;
          font-size: 15px;
          outline: none;
          transition: 0.2s;
        }

        .form-group input,
        .form-group select {
          height: 50px;
          padding: 0 15px;
        }

        .form-group textarea {
          padding: 14px 15px;
          resize: vertical;
          font-family: inherit;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          border-color: #2563eb;
          background: white;
          box-shadow:
            0 0 0 4px rgba(37, 99, 235, 0.08);
        }

        .form-group small {
          margin-top: 6px;
          color: #64748b;
          font-size: 12px;
        }

        .error-message {
          margin-bottom: 25px;
          padding: 14px 16px;
          border-radius: 10px;
          background: #fef2f2;
          border: 1px solid #fecaca;
          color: #dc2626;
          font-size: 14px;
        }

        .form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 14px;
          margin-top: 32px;
          padding-top: 25px;
          border-top: 1px solid #e8edf5;
        }

        .cancel-btn {
          padding: 13px 25px;
          border: 1px solid #dbe3ef;
          border-radius: 10px;
          background: white;
          color: #475569;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
        }

        .cancel-btn:hover {
          background: #f8fafc;
        }

        .post-btn {
          padding: 13px 28px;
          border: none;
          border-radius: 10px;
          background: linear-gradient(
            135deg,
            #2563eb,
            #06b6d4
          );
          color: white;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          box-shadow:
            0 8px 20px rgba(37, 99, 235, 0.2);
        }

        .post-btn:hover {
          transform: translateY(-1px);
          box-shadow:
            0 12px 25px rgba(37, 99, 235, 0.28);
        }

        .post-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        @media (max-width: 700px) {

          .add-job-page {
            padding: 30px 15px;
          }

          .page-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 18px;
          }

          .page-header h1 {
            font-size: 28px;
          }

          .job-form-card {
            padding: 25px 20px;
          }

          .form-grid {
            grid-template-columns: 1fr;
          }

          .form-actions {
            flex-direction: column;
          }

          .cancel-btn,
          .post-btn {
            width: 100%;
          }
        }

      `}</style>

    </div>
  );
}

export default AddJob;