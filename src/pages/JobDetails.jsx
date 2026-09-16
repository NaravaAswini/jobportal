import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function JobDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  const [resume, setResume] = useState(null);
  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {

    getJob();

    if (user?.role === "jobseeker") {
      checkApplication();
    }

  }, [id]);

  async function getJob() {

    try {

      const response =
        await api.get(`/jobs/${id}`);

      setJob(response.data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }
  }

  async function checkApplication() {

    try {

      const response =
        await api.get(
          `/applications?jobId=${id}&userId=${user.id}`
        );

      if (response.data.length > 0) {
        setApplied(true);
      }

    } catch (error) {

      console.error(error);

    }
  }

  function handleResumeChange(e) {

    const file = e.target.files[0];

    if (!file) {
      return;
    }

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];

    if (!allowedTypes.includes(file.type)) {

      alert(
        "Please upload a PDF, DOC, or DOCX resume."
      );

      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {

      alert(
        "Resume size must be less than 5 MB."
      );

      e.target.value = "";
      return;
    }

    setResume(file);
  }

  function fileToBase64(file) {

    return new Promise((resolve, reject) => {

      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () =>
        resolve(reader.result);

      reader.onerror = error =>
        reject(error);

    });
  }

  async function handleApply() {

    if (!user) {

      navigate("/login");
      return;

    }

    if (user.role !== "jobseeker") {

      alert(
        "Only job seekers can apply for jobs."
      );

      return;
    }

    if (!resume) {

      alert(
        "Please upload your resume before applying."
      );

      return;
    }

    try {

      setApplying(true);

      const resumeData =
        await fileToBase64(resume);

      await api.post(
        "/applications",
        {
          userId: user.id,
          applicantName: user.name,
          applicantEmail: user.email,
          jobId: job.id,
          jobTitle: job.title,
          company: job.company,
          resumeName: resume.name,
          resumeData: resumeData,
          appliedAt: new Date().toISOString(),
          status: "Applied"
        }
      );

      setApplied(true);

      alert(
        "Application submitted successfully!"
      );

    } catch (error) {

      console.error(error);

      alert(
        "Unable to submit application."
      );

    } finally {

      setApplying(false);

    }
  }

  if (loading) {

    return (
      <div className="loading-box">
        <div className="loader"></div>
        <p>Loading job details...</p>
      </div>
    );

  }

  if (!job) {

    return (
      <div className="empty-box">
        <h2>Job not found</h2>

        <Link
          to="/jobs"
          className="view-btn"
        >
          Back to Jobs
        </Link>
      </div>
    );

  }

  return (

    <div className="details-page">

      <div className="details">

        <div className="details-header">

          <div className="company-logo large">
            {job.company?.charAt(0)}
          </div>

          <div>

            <span className="section-label">
              JOB OPPORTUNITY
            </span>

            <h1>{job.title}</h1>

            <h2>
              {job.company}
            </h2>

          </div>

        </div>

        <div className="details-grid">

          <div className="detail-item">
            <span>📍 Location</span>
            <strong>{job.location}</strong>
          </div>

          <div className="detail-item">
            <span>💼 Job Type</span>
            <strong>{job.jobType}</strong>
          </div>

          <div className="detail-item">
            <span>🏠 Work Mode</span>
            <strong>{job.workMode}</strong>
          </div>

          <div className="detail-item">
            <span>⭐ Experience</span>
            <strong>{job.experience}</strong>
          </div>

          <div className="detail-item">
            <span>💰 Salary</span>
            <strong>{job.salary}</strong>
          </div>

          <div className="detail-item">
            <span>🎓 Education</span>
            <strong>{job.education}</strong>
          </div>

        </div>

        <div className="detail-section">

          <h3>Job Description</h3>

          <p>
            {job.description}
          </p>

        </div>

        <div className="detail-section">

          <h3>Required Skills</h3>

          <div className="skills">

            {job.skills?.map(
              (skill, index) => (

                <span
                  className="skill"
                  key={index}
                >
                  {skill}
                </span>

              )
            )}

          </div>

        </div>

        {user?.role === "jobseeker" && (

          <div className="application-box">

            <h3>
              Apply for this position
            </h3>

            <p>
              Upload your latest resume to apply.
            </p>

            {applied ? (

              <div className="success-message">
                ✓ You have already applied for this job.
              </div>

            ) : (

              <>

                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleResumeChange}
                  className="resume-input"
                />

                {resume && (

                  <p className="file-selected">
                    📄 {resume.name}
                  </p>

                )}

                <button
                  className="apply-large-btn"
                  onClick={handleApply}
                  disabled={applying}
                >

                  {applying
                    ? "Submitting Application..."
                    : "Apply with Resume"}

                </button>

              </>

            )}

          </div>

        )}

        {!user && (

          <div className="application-box">

            <h3>
              Ready to apply?
            </h3>

            <p>
              Login as a job seeker to apply with your resume.
            </p>

            <Link
              to="/login"
              className="apply-large-btn"
            >
              Login to Apply
            </Link>

          </div>

        )}

        {user?.role === "recruiter" && (

          <div className="recruiter-note">

            <p>
              Recruiter account: You can manage jobs from the Jobs page.
            </p>

            <Link
              to="/edit-job/${job.id}"
              className="edit-btn"
            >
              Edit Job
            </Link>

          </div>

        )}

        <Link
          to="/jobs"
          className="back-link"
        >
          ← Back to All Jobs
        </Link>

      </div>

    </div>

  );
}

export default JobDetails;