import {
  FaNewspaper,
  FaUsers,
  FaUniversity,
  FaPen,
} from "react-icons/fa";

const Dashboard = () => {
  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Admin Dashboard
        </h1>
        <p className="text-gray-500 mt-1">
          Welcome to JGCC Admin Panel
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition duration-300 border">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Total Notices</p>
              <h2 className="text-3xl font-bold text-gray-800 mt-2">24</h2>
            </div>
            <div className="bg-blue-100 p-3 rounded-xl">
              <FaNewspaper className="text-blue-600 text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition duration-300 border">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Total News</p>
              <h2 className="text-3xl font-bold text-gray-800 mt-2">12</h2>
            </div>
            <div className="bg-green-100 p-3 rounded-xl">
              <FaPen className="text-green-600 text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition duration-300 border">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Departments</p>
              <h2 className="text-3xl font-bold text-gray-800 mt-2">18</h2>
            </div>
            <div className="bg-purple-100 p-3 rounded-xl">
              <FaUniversity className="text-purple-600 text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition duration-300 border">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Admin Users</p>
              <h2 className="text-3xl font-bold text-gray-800 mt-2">3</h2>
            </div>
            <div className="bg-red-100 p-3 rounded-xl">
              <FaUsers className="text-red-600 text-xl" />
            </div>
          </div>
        </div>

      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Recent Activity
        </h3>

        <ul className="space-y-3 text-gray-600 text-sm">
          <li className="border-b pb-2">New notice added</li>
          <li className="border-b pb-2">Principal information updated</li>
          <li className="border-b pb-2">Department page edited</li>
          <li>Writers corner blog published</li>
        </ul>
      </div>

    </div>
  );
};

export default Dashboard;