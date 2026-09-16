import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  // ================= LOGOUT =================
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar">

        {/* ================= LOGO ================= */}

        <NavLink
          to="/"
          end
          className="navbar-logo"
        >
          <div className="logo-icon">
            💼
          </div>

          <div className="logo-content">
            <div className="logo-text">
              Job<span>Portal</span>
            </div>

            <div className="logo-tagline">
              Find Your Dream Job
            </div>
          </div>
        </NavLink>


        {/* ================= NAVIGATION ================= */}

        <section className="nav-links">

          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""}`
            }
          >
            <span className="nav-icon">⌂</span>
            <span>Home</span>
          </NavLink>


          {/* ================= JOBS ================= */}

          {user ? (
            <NavLink
              to="/jobs"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              <span className="nav-icon">⌕</span>
              <span>Jobs</span>
            </NavLink>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              <span className="nav-icon">⌕</span>
              <span>Jobs</span>
            </NavLink>
          )}


          {/* ================= RECRUITER ONLY ================= */}

          {user && user.role === "recruiter" && (
            <NavLink
              to="/add-job"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              <span className="nav-icon">⊕</span>
              <span>Post Job</span>
            </NavLink>
          )}

        </section>


        {/* ================= RIGHT SIDE ================= */}

        <section className="nav-actions">

          {/* ================= NOT LOGGED IN ================= */}

          {!user && (
            <>
              <NavLink
                to="/login"
                className="login-btn"
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                className="register-btn"
              >
                Register
              </NavLink>
            </>
          )}


          {/* ================= LOGGED IN ================= */}

          {user && (
            <>
              {/* User Profile */}

              <div className="user-profile">

                <div className="user-avatar">
                  {user.name
                    ? user.name.charAt(0).toUpperCase()
                    : "U"}
                </div>

                <div className="user-info">

                  <span className="user-name">
                    {user.name}
                  </span>

                  <span className="user-role">
                    {user.role === "recruiter"
                      ? "Recruiter"
                      : "Job Seeker"}
                  </span>

                </div>

                <span className="dropdown-arrow">
                  ▾
                </span>

              </div>


              {/* Logout Button */}

              <button
                type="button"
                onClick={handleLogout}
                className="logout-btn"
              >
                <span className="logout-icon">
                  ⇥
                </span>

                Logout
              </button>

            </>
          )}

        </section>

      </nav>


      {/* ================= NAVBAR CSS ================= */}

      <style>{`

        * {
          box-sizing: border-box;
        }

        .navbar {
          width: 100%;
          height: 88px;
          background: #ffffff;
          display: flex;
          align-items: center;
          padding: 0 60px;
          border-bottom: 1px solid #e8edf5;
          position: sticky;
          top: 0;
          z-index: 1000;
          box-shadow:
            0 3px 15px rgba(15, 23, 42, 0.04);
        }

        /* ================= LOGO ================= */

        .navbar-logo {
          display: flex;
          align-items: center;
          gap: 14px;
          text-decoration: none;
          min-width: 280px;
        }

        .logo-icon {
          width: 52px;
          height: 52px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(
            135deg,
            #2563eb,
            #0ea5e9
          );
          border-radius: 12px;
          font-size: 25px;
          box-shadow:
            0 8px 18px rgba(
              37,
              99,
              235,
              0.22
            );
        }

        .logo-content {
          display: flex;
          flex-direction: column;
        }

        .logo-text {
          font-size: 30px;
          line-height: 32px;
          font-weight: 800;
          letter-spacing: -1px;
          color: #0f172a;
        }

        .logo-text span {
          color: #2563eb;
        }

        .logo-tagline {
          margin-top: 4px;
          font-size: 12px;
          color: #64748b;
          font-weight: 500;
        }

        /* ================= NAV LINKS ================= */

        .nav-links {
          height: 100%;
          display: flex;
          align-items: center;
          gap: 10px;
          margin-left: 50px;
          flex: 1;
        }

        .nav-link {
          height: 100%;
          min-width: 110px;
          padding: 0 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          position: relative;
          text-decoration: none;
          color: #475569;
          font-size: 16px;
          font-weight: 600;
          transition: 0.25s;
        }

        .nav-link:hover {
          color: #2563eb;
        }

        .nav-link.active {
          color: #2563eb;
        }

        .nav-link.active::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 15px;
          right: 15px;
          height: 3px;
          border-radius: 3px 3px 0 0;
          background: #2563eb;
        }

        .nav-icon {
          font-size: 25px;
          color: #64748b;
        }

        .nav-link.active .nav-icon,
        .nav-link:hover .nav-icon {
          color: #2563eb;
        }

        /* ================= RIGHT SIDE ================= */

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 18px;
          margin-left: auto;
        }

        /* ================= USER PROFILE ================= */

        .user-profile {
          min-width: 225px;
          height: 52px;
          display: flex;
          align-items: center;
          gap: 11px;
          padding: 5px 13px 5px 6px;
          border-radius: 28px;
          background: #f1f6ff;
          border: 1px solid #e3edff;
        }

        .user-avatar {
          width: 40px;
          height: 40px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: linear-gradient(
            135deg,
            #2563eb,
            #3b82f6
          );
          color: white;
          font-size: 17px;
          font-weight: 700;
        }

        .user-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
          flex: 1;
        }

        .user-name {
          color: #334155;
          font-size: 15px;
          font-weight: 700;
        }

        .user-role {
          width: fit-content;
          padding: 2px 9px;
          border-radius: 20px;
          background: #e1edff;
          color: #2563eb;
          font-size: 11px;
          font-weight: 700;
        }

        .dropdown-arrow {
          color: #64748b;
          font-size: 17px;
        }

        /* ================= LOGIN ================= */

        .login-btn {
          height: 46px;
          padding: 0 23px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1.5px solid #2563eb;
          border-radius: 10px;
          color: #2563eb;
          background: white;
          text-decoration: none;
          font-size: 15px;
          font-weight: 700;
          transition: 0.25s;
        }

        .login-btn:hover {
          background: #eff6ff;
        }

        /* ================= REGISTER ================= */

        .register-btn {
          height: 46px;
          padding: 0 25px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          background: linear-gradient(
            135deg,
            #2563eb,
            #06b6d4
          );
          color: white;
          text-decoration: none;
          font-size: 15px;
          font-weight: 700;
          box-shadow:
            0 6px 15px rgba(
              37,
              99,
              235,
              0.18
            );
          transition: 0.25s;
        }

        .register-btn:hover {
          transform: translateY(-1px);
        }

        /* ================= LOGOUT ================= */

        .logout-btn {
          height: 46px;
          padding: 0 21px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border: 1px solid #fecaca;
          border-radius: 10px;
          background: #fff7f7;
          color: #dc2626;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .logout-btn:hover {
          background: #fef2f2;
          border-color: #fca5a5;
          transform: translateY(-1px);
          box-shadow:
            0 6px 15px rgba(
              220,
              38,
              38,
              0.08
            );
        }

        .logout-icon {
          font-size: 20px;
          font-weight: 700;
        }

        /* ================= RESPONSIVE ================= */

        @media (max-width: 1100px) {

          .navbar {
            padding: 0 30px;
          }

          .navbar-logo {
            min-width: 220px;
          }

          .nav-links {
            margin-left: 20px;
          }

          .user-profile {
            min-width: 190px;
          }

        }

        @media (max-width: 850px) {

          .navbar {
            padding: 0 20px;
          }

          .logo-tagline {
            display: none;
          }

          .logo-text {
            font-size: 25px;
          }

          .logo-icon {
            width: 44px;
            height: 44px;
          }

          .navbar-logo {
            min-width: auto;
          }

          .nav-links {
            margin-left: 10px;
          }

          .nav-link {
            min-width: auto;
            padding: 0 10px;
          }

          .nav-link span:last-child {
            display: none;
          }

          .user-info,
          .dropdown-arrow {
            display: none;
          }

          .user-profile {
            min-width: auto;
            width: 52px;
            padding: 5px;
            justify-content: center;
          }

        }

        @media (max-width: 600px) {

          .navbar {
            height: 75px;
          }

          .logo-text {
            font-size: 21px;
          }

          .logo-icon {
            display: none;
          }

          .nav-links {
            gap: 0;
          }

          .nav-icon {
            font-size: 23px;
          }

          .login-btn,
          .register-btn,
          .logout-btn {
            height: 40px;
            padding: 0 12px;
            font-size: 13px;
          }

          .nav-actions {
            gap: 7px;
          }

        }

      `}</style>
    </>
  );
}

export default Navbar;