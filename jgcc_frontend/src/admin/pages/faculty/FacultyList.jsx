import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AxiosInstance from "../../../axiosInstance";

const FacultyList = () => {

  const [teachers, setTeachers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [groups, setGroups] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = async () => {
    try {

      const facultyRes = await AxiosInstance.get("departments/faculty/");
      const deptRes = await AxiosInstance.get("departments/departments/");
      const groupRes = await AxiosInstance.get("departments/faculty-groups/");

      setTeachers(facultyRes.data);
      setDepartments(deptRes.data);
      setGroups(groupRes.data);

    } catch (error) {

      console.error("Error loading data", error);

    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Delete Teacher
  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this teacher?"
    );

    if (!confirmDelete) return;

    try {

      await AxiosInstance.delete(`departments/faculty/${id}/`);

      setTeachers((prev) => prev.filter((t) => t.id !== id));

    } catch (error) {

      console.error("Delete failed", error);

    }

  };

  // 🔎 Search teachers + department + group
  const filteredTeachers = teachers.filter((t) => {

    const dept = departments.find((d) => d.id === t.department);
    const deptName = dept ? dept.name.toLowerCase() : "";

    const group = groups.find((g) => g.id === dept?.faculty_group);
    const groupName = group ? group.name.toLowerCase() : "";

    return (
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      deptName.includes(searchTerm.toLowerCase()) ||
      groupName.includes(searchTerm.toLowerCase())
    );

  });

  const getTeachersByDepartment = (deptId) => {
    return filteredTeachers.filter((t) => t.department === deptId);
  };

  return (

    <div>

      {/* Header */}
      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-bold">
          Faculty Members
        </h2>

        <Link
          to="/cms/faculty/create"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Teacher
        </Link>

      </div>

      {/* 🔎 Search */}
      <input
        type="text"
        placeholder="Search teacher, department, or faculty group..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full border p-2 mb-6 rounded"
      />

      {groups.map((group) => (

        <div key={group.id} className="mb-10">

          <h2 className="text-xl font-bold mb-4 border-b pb-2">
            {group.name}
          </h2>

          {departments
            .filter((d) => d.faculty_group === group.id)
            .map((dept) => {

              const deptTeachers = getTeachersByDepartment(dept.id);

              if (deptTeachers.length === 0) return null;

              const head = deptTeachers.find((t) => t.is_head);
              const others = deptTeachers.filter((t) => !t.is_head);

              return (

                <div key={dept.id} className="mb-6">

                  <h3 className="text-lg font-semibold mb-3">
                    {dept.name}
                  </h3>

                  {/* Head */}
                  {head && (

                    <div className="flex justify-between items-center bg-white p-4 rounded shadow mb-2">

                      <div>

                        <p className="font-bold">
                          {head.name}
                        </p>

                        <p className="text-gray-600">
                          {head.designation} (Head)
                        </p>

                      </div>

                      <div className="flex items-center gap-3">

                        {head.image && (
                          <img
                            src={head.image}
                            alt={head.name}
                            className="w-14 h-14 object-cover rounded"
                          />
                        )}

                        <Link
                          to={`/cms/faculty/${head.id}`}
                          className="text-blue-600 text-sm"
                        >
                          Details
                        </Link>

                        <Link
                          to={`/cms/faculty/edit/${head.id}`}
                          className="text-green-600 text-sm"
                        >
                          Edit
                        </Link>

                        <button
                          onClick={() => handleDelete(head.id)}
                          className="text-red-600 text-sm"
                        >
                          Delete
                        </button>

                      </div>

                    </div>

                  )}

                  {/* Other Teachers */}
                  {others.map((t) => (

                    <div
                      key={t.id}
                      className="flex justify-between items-center bg-white p-4 rounded shadow mb-2"
                    >

                      <div>

                        <p className="font-semibold">
                          {t.name}
                        </p>

                        <p className="text-gray-600">
                          {t.designation}
                        </p>

                      </div>

                      <div className="flex items-center gap-3">

                        {t.image && (
                          <img
                            src={t.image}
                            alt={t.name}
                            className="w-14 h-14 object-cover rounded"
                          />
                        )}

                        <Link
                          to={`/cms/faculty/${t.id}`}
                          className="text-blue-600 text-sm"
                        >
                          Details
                        </Link>

                        <Link
                          to={`/cms/faculty/edit/${t.id}`}
                          className="text-green-600 text-sm"
                        >
                          Edit
                        </Link>

                        <button
                          onClick={() => handleDelete(t.id)}
                          className="text-red-600 text-sm"
                        >
                          Delete
                        </button>

                      </div>

                    </div>

                  ))}

                </div>

              );

            })}

        </div>

      ))}

    </div>

  );

};

export default FacultyList;