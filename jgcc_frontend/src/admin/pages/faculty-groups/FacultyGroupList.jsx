import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AxiosInstance from "../../../axiosInstance";

const FacultyGroupList = () => {

  const [groups, setGroups] = useState([]);

  const fetchGroups = async () => {
    try {
      const res = await AxiosInstance.get("departments/faculty-groups/");
      setGroups(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this Faculty Group?"
    );

    if (!confirmDelete) return;

    try {

      await AxiosInstance.delete(`departments/faculty-groups/${id}/`);

      alert("Faculty Group Deleted ✅");

      fetchGroups(); // reload list

    } catch (error) {

      console.error(error);
      alert("Error deleting faculty group ❌");

    }

  };

  return (
    <div>

      <div className="flex justify-between mb-6">

        <h2 className="text-2xl font-bold">
          Faculty Groups
        </h2>

        <Link
          to="/admin/faculty-groups/create"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Faculty Group
        </Link>

      </div>

      <table className="w-full border">

        <thead className="bg-gray-200">

          <tr>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Slug</th>
            <th className="p-2 border">Actions</th>
          </tr>

        </thead>

        <tbody>

          {groups.length === 0 ? (

            <tr>
              <td colSpan="3" className="text-center p-4">
                No Faculty Groups Found
              </td>
            </tr>

          ) : (

            groups.map((group) => (

              <tr key={group.id}>

                <td className="border p-2">
                  {group.name}
                </td>

                <td className="border p-2">
                  {group.slug}
                </td>

                <td className="border p-2 flex gap-2">

                  {/* Edit */}
                  <Link
                    to={`/admin/faculty-groups/edit/${group.id}`}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </Link>

                  {/* Delete */}
                  <button
                    onClick={() => handleDelete(group.id)}
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
  );
};

export default FacultyGroupList;