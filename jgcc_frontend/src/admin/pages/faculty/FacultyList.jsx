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

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-bold">
          Faculty Members
        </h2>

        <Link
          to="/admin/faculty/create"
          className="bg-blue-600 text-white px-4 py-2 rounded"
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

                      {head.image && (

                        <img
                          src={head.image}
                          alt={head.name}
                          className="w-16 h-16 object-cover rounded"
                        />

                      )}

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

                      {t.image && (

                        <img
                          src={t.image}
                          alt={t.name}
                          className="w-16 h-16 object-cover rounded"
                        />

                      )}

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