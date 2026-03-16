import { NavLink, Outlet, useNavigate, Link } from "react-router-dom";
import {
  FaTachometerAlt,
  FaNewspaper,
  FaPen,
  FaUniversity,
  FaUsers,
  FaUserTie,
  FaUserShield,
  FaFileAlt,
  FaEnvelope,
  FaSignOutAlt,
} from "react-icons/fa";

import logo from "../assets/logo-left.png";

const AdminLayout = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/cms/login");
  };

  const linkBase =
    "flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200";

  const active =
    "bg-blue-600 text-white shadow";

  const normal =
    "text-gray-300 hover:bg-gray-700 hover:text-white";

  return (

    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <aside className="w-72 bg-gray-900 text-white flex flex-col">

        {/* Logo (Clickable) */}
        <Link
          to="/"
          className="p-6 border-b border-gray-800 flex items-center gap-3 hover:bg-gray-800 transition"
        >

          <img
            src={logo}
            alt="JGCC Logo"
            className="w-12 h-12 rounded-full object-cover border border-gray-700"
          />

          <div>
            <h2 className="text-lg font-bold">
              JGCC CMS
            </h2>
            <p className="text-xs text-gray-400">
              Admin Panel
            </p>
          </div>

        </Link>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-6">

          {/* Dashboard */}
          <NavLink
            to="/cms/dashboard"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? active : normal}`
            }
          >
            <FaTachometerAlt />
            Dashboard
          </NavLink>

          {/* CONTENT */}
          <div>

            <p className="text-xs text-gray-500 uppercase mb-3 px-2">
              Content
            </p>

            <div className="space-y-1">

              <NavLink
                to="/cms/notices"
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? active : normal}`
                }
              >
                <FaNewspaper />
                Notices
              </NavLink>

              <NavLink
                to="/cms/news"
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? active : normal}`
                }
              >
                <FaPen />
                News
              </NavLink>

              <NavLink
                to="/cms/writers"
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? active : normal}`
                }
              >
                <FaFileAlt />
                Writers Corner
              </NavLink>

            </div>

          </div>

          {/* ACADEMIC */}
          <div>

            <p className="text-xs text-gray-500 uppercase mb-3 px-2">
              Academic
            </p>

            <div className="space-y-1">

              <NavLink
                to="/cms/faculty-groups"
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? active : normal}`
                }
              >
                <FaUniversity />
                Faculty Groups
              </NavLink>

              <NavLink
                to="/cms/departments"
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? active : normal}`
                }
              >
                <FaUniversity />
                Departments
              </NavLink>

              <NavLink
                to="/cms/faculty"
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? active : normal}`
                }
              >
                <FaUsers />
                Faculty
              </NavLink>

            </div>

          </div>

          {/* ADMINISTRATION */}
          <div>

            <p className="text-xs text-gray-500 uppercase mb-3 px-2">
              Administration
            </p>

            <div className="space-y-1">

              <NavLink
                to="/cms/principal"
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? active : normal}`
                }
              >
                <FaUserTie />
                Principal
              </NavLink>

              <NavLink
                to="/cms/vice-principal"
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? active : normal}`
                }
              >
                <FaUserShield />
                Vice Principal
              </NavLink>

              <NavLink
                to="/cms/former-principals"
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? active : normal}`
                }
              >
                <FaUsers />
                Former Principals
              </NavLink>

              <NavLink
                to="/cms/academic-council"
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? active : normal}`
                }
              >
                <FaUniversity />
                Academic Council
              </NavLink>

              <NavLink
                to="/cms/teachers-council"
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? active : normal}`
                }
              >
                <FaUsers />
                Teachers Council
              </NavLink>

            </div>

          </div>

          {/* WEBSITE */}
          <div>

            <p className="text-xs text-gray-500 uppercase mb-3 px-2">
              Website
            </p>

            <div className="space-y-1">

              <NavLink
                to="/cms/history"
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? active : normal}`
                }
              >
                <FaFileAlt />
                History
              </NavLink>

              <NavLink
                to="/cms/at-a-glance"
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? active : normal}`
                }
              >
                <FaFileAlt />
                At A Glance
              </NavLink>

              <NavLink
                to="/cms/citizen-charter"
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? active : normal}`
                }
              >
                <FaFileAlt />
                Citizen Charter
              </NavLink>

            </div>

          </div>

          {/* CONTACT */}
          <NavLink
            to="/cms/contact-messages"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? active : normal}`
            }
          >
            <FaEnvelope />
            Contact Messages
          </NavLink>

        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-800">

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 transition px-4 py-2 rounded-lg"
          >
            <FaSignOutAlt />
            Logout
          </button>

        </div>

      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-y-auto">
        <Outlet />
      </main>

    </div>

  );

};

export default AdminLayout;