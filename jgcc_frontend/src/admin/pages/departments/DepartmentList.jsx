import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AxiosInstance from "../../../axiosInstance";

const DepartmentList = () => {

  const [departments, setDepartments] = useState([]);

  const fetchDepartments = async () => {

    try {

      const res = await AxiosInstance.get("departments/departments/");
      setDepartments(res.data);

    } catch (error) {

      console.error("Error fetching departments", error);

    }

  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this department?"
    );

    if (!confirmDelete) return;

    try {

      await AxiosInstance.delete(`departments/departments/${id}/`);

      alert("Department deleted ✅");

      fetchDepartments();

    } catch (error) {

      console.error("Delete failed", error);
      alert("Error deleting department ❌");

    }

  };

  return (
    <div>

      <div className="flex justify-between mb-6">

        <h2 className="text-2xl font-bold">
          Manage Departments
        </h2>

        <Link
          to="/admin/departments/create"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Department
        </Link>

      </div>

      <div className="bg-white p-6 rounded shadow">

        <table className="w-full border">

          <thead>

            <tr className="bg-gray-100">

              <th className="border p-2">Name</th>
              <th className="border p-2">Slug</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Phone</th>
              <th className="border p-2">Actions</th>

            </tr>

          </thead>

          <tbody>

            {departments.length === 0 ? (

              <tr>

                <td colSpan="5" className="text-center p-4">
                  No Departments Found
                </td>

              </tr>

            ) : (

              departments.map((dept) => (

                <tr key={dept.id}>

                  <td className="border p-2">{dept.name}</td>
                  <td className="border p-2">{dept.slug}</td>
                  <td className="border p-2">{dept.email}</td>
                  <td className="border p-2">{dept.phone}</td>

                  <td className="border p-2 flex gap-2">

                    {/* Edit */}
                    <Link
                      to={`/admin/departments/edit/${dept.id}`}
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </Link>

                    {/* Delete */}
                    <button
                      onClick={() => handleDelete(dept.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default DepartmentList;