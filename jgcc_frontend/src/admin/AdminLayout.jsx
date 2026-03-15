import { NavLink, Outlet, useNavigate } from "react-router-dom";
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

const AdminLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/admin/login");
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

        {/* Logo */}
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-xl font-bold tracking-wide">
            JGCC CMS
          </h2>
          <p className="text-xs text-gray-400">
            Admin Panel
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-6">

          {/* Dashboard */}
          <NavLink
            to="/admin/dashboard"
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
                to="/admin/notices"
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? active : normal}`
                }
              >
                <FaNewspaper />
                Notices
              </NavLink>

              <NavLink
                to="/admin/news"
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? active : normal}`
                }
              >
                <FaPen />
                News
              </NavLink>

              <NavLink
                to="/admin/writers"
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
                to="/admin/faculty-groups"
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? active : normal}`
                }
              >
                <FaUniversity />
                Faculty Groups
              </NavLink>

              <NavLink
                to="/admin/departments"
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? active : normal}`
                }
              >
                <FaUniversity />
                Departments
              </NavLink>

              <NavLink
                to="/admin/faculty"
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
                to="/admin/principal"
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? active : normal}`
                }
              >
                <FaUserTie />
                Principal
              </NavLink>

              <NavLink
                to="/admin/vice-principal"
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? active : normal}`
                }
              >
                <FaUserShield />
                Vice Principal
              </NavLink>

              <NavLink
                to="/admin/former-principals"
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? active : normal}`
                }
              >
                <FaUsers />
                Former Principals
              </NavLink>

              <NavLink
                to="/admin/academic-council"
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? active : normal}`
                }
              >
                <FaUniversity />
                Academic Council
              </NavLink>

              <NavLink
                to="/admin/teachers-council"
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
                to="/admin/history"
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? active : normal}`
                }
              >
                <FaFileAlt />
                History
              </NavLink>

              <NavLink
                to="/admin/at-a-glance"
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? active : normal}`
                }
              >
                <FaFileAlt />
                At A Glance
              </NavLink>

              <NavLink
                to="/admin/citizen-charter"
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
            to="/admin/contact-messages"
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