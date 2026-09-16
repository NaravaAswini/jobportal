import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function EditJob() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    jobType: "",
    workMode: "",
    experience: "",
    salary: "",
    education: "",
    description: "",
    skills: ""
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getJob();
  }, [id]);

  async function getJob() {

    try {

      const response =
        await api.get(`/jobs/${id}`);

      const job = response.data;

      setFormData({
        ...job,
        skills: Array.isArray(job.skills)
          ? job.skills.join(", ")
          : job.skills || ""
      });

    } catch (error) {

      console.error(error);

      alert("Unable to load job.");

    }
  }

  function handleChange(e) {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  }

  async function handleSubmit(e) {

    e.preventDefault();

    try {

      setLoading(true);

      const updatedJob = {
        ...formData,
        skills: formData.skills
          .split(",")
          .map(skill => skill.trim())
          .filter(Boolean)
      };

      await api.put(
        `/jobs/${id}`,
        updatedJob
      );

      navigate("/jobs");

    } catch (error) {

      console.error(error);

      alert("Unable to update job.");

    } finally {

      setLoading(false);

    }
  }

  return (

    <div className="form-page">

      <div className="form-container">

        <div className="form-heading">

          <span className="section-label">
            RECRUITER
          </span>

          <h1>Edit Job</h1>

          <p>
            Update the job information below.
          </p>

        </div>

        <form onSubmit={handleSubmit}>

          <div className="form-grid">

            <div className="form-group">
              <label>Job Title</label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Company</label>

              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Location</label>

              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Job Type</label>

              <input
                type="text"
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Work Mode</label>

              <input
                type="text"
                name="workMode"
                value={formData.workMode}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Experience</label>

              <input
                type="text"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Salary</label>

              <input
                type="text"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Education</label>

              <input
                type="text"
                name="education"
                value={formData.education || ""}
                onChange={handleChange}
                required
              />
            </div>

          </div>

          <div className="form-group">

            <label>Required Skills</label>

            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              required
            />

          </div>

          <div className="form-group">

            <label>Job Description</label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />

          </div>

          <button
            type="submit"
            className="submit-btn"
            disabled={loading}
          >

            {loading
              ? "Updating..."
              : "Update Job"}

          </button>

        </form>

      </div>

    </div>

  );
}

export default EditJob;