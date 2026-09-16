import { Link } from "react-router-dom";

function JobCard({
  job,
  onDelete,
  isRecruiter
}) {

  return (

    <div className="job-card">

      <div className="job-card-top">

        <div className="company-logo">
          {job.company?.charAt(0)}
        </div>

        <div>
          <h2>{job.title}</h2>
          <h3>{job.company}</h3>
        </div>

      </div>

      <div className="job-meta">

        <span>
          📍 {job.location}
        </span>

        <span>
          💼 {job.jobType}
        </span>

        <span>
          🏠 {job.workMode}
        </span>

        <span>
          ⭐ {job.experience}
        </span>

        <span>
          💰 {job.salary}
        </span>

      </div>

      <p className="job-description">

        {job.description?.length > 120
          ? job.description.substring(0, 120) + "..."
          : job.description}

      </p>

      <div className="job-actions">

        <Link
          className="view-btn"
          to={`/jobs/${job.id}`}
        >
          View Job
        </Link>

        {isRecruiter && (

          <>
            <Link
              className="edit-btn"
              to={`/edit-job/${job.id}`}
            >
              Edit
            </Link>

            <button
              className="delete-btn"
              onClick={() => onDelete(job.id)}
            >
              Delete
            </button>
          </>

        )}

      </div>

    </div>

  );
}

export default JobCard;