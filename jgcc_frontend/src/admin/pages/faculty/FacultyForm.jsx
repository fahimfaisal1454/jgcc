import { useState, useEffect } from "react";
import AxiosInstance from "../../../axiosInstance";
import { useNavigate } from "react-router-dom";

const FacultyForm = () => {

  const navigate = useNavigate();

  const [facultyGroups, setFacultyGroups] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    faculty_group: "",
    department: "",
    image: null,
    is_head: false,
    order: 0
  });

  // Fetch faculty groups
  useEffect(() => {

    AxiosInstance.get("departments/faculty-groups/")
      .then(res => setFacultyGroups(res.data))
      .catch(err => console.log(err));

  }, []);

  // Fetch departments when group changes
  useEffect(() => {

    if (formData.faculty_group) {

      AxiosInstance.get("departments/departments/")
        .then(res => {

          const filtered = res.data.filter(
            d => d.faculty_group === Number(formData.faculty_group)
          );

          setDepartments(filtered);

        });

    }

  }, [formData.faculty_group]);

  const handleChange = (e) => {

    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox") {

      setFormData({
        ...formData,
        [name]: checked
      });

    } else if (type === "file") {

      setFormData({
        ...formData,
        image: files[0]
      });

    } else {

      setFormData({
        ...formData,
        [name]: value
      });

    }

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const data = new FormData();

      Object.keys(formData).forEach(key => {
        data.append(key, formData[key]);
      });

      await AxiosInstance.post("departments/faculty/", data, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      alert("Teacher Created ✅");

      navigate("/admin/faculty");

    } catch (error) {

      console.error(error);
      alert("Error saving teacher ❌");

    }

  };

  return (

    <div>

      <h2 className="text-2xl font-bold mb-6">
        Add Teacher
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow space-y-4"
      >

        {/* Faculty Group */}
        <select
          name="faculty_group"
          className="w-full border p-2"
          onChange={handleChange}
        >

          <option value="">
            Select Faculty Group
          </option>

          {facultyGroups.map(g => (

            <option key={g.id} value={g.id}>
              {g.name}
            </option>

          ))}

        </select>

        {/* Department */}
        <select
          name="department"
          className="w-full border p-2"
          onChange={handleChange}
        >

          <option value="">
            Select Department
          </option>

          {departments.map(d => (

            <option key={d.id} value={d.id}>
              {d.name}
            </option>

          ))}

        </select>

        {/* Teacher Name */}
        <input
          name="name"
          placeholder="Teacher Name"
          className="w-full border p-2"
          onChange={handleChange}
        />

        {/* Designation */}
        <input
          name="designation"
          placeholder="Designation"
          className="w-full border p-2"
          onChange={handleChange}
        />

        {/* Image */}
        <input
          type="file"
          name="image"
          className="w-full border p-2"
          onChange={handleChange}
        />

        {/* Order */}
        <input
          type="number"
          name="order"
          placeholder="Display Order"
          className="w-full border p-2"
          onChange={handleChange}
        />

        {/* Head of Department */}
        <label className="flex items-center gap-2">

          <input
            type="checkbox"
            name="is_head"
            onChange={handleChange}
          />

          Head of Department

        </label>

        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Save Teacher
        </button>

      </form>

    </div>

  );
};

export default FacultyForm;