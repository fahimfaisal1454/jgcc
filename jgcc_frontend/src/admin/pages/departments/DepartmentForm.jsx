import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AxiosInstance from "../../../axiosInstance";

const DepartmentForm = () => {

  const navigate = useNavigate();
  const { id } = useParams();

  const [facultyGroups, setFacultyGroups] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    email: "",
    phone: "",
    faculty_group: ""
  });

  // Load Faculty Groups
  useEffect(() => {

    AxiosInstance.get("departments/faculty-groups/")
      .then(res => setFacultyGroups(res.data))
      .catch(err => console.log(err));

  }, []);

  // Load department data when editing
  useEffect(() => {

    if (id) {

      AxiosInstance.get(`departments/departments/${id}/`)
        .then(res => {

          setFormData({
            name: res.data.name || "",
            slug: res.data.slug || "",
            email: res.data.email || "",
            phone: res.data.phone || "",
            faculty_group: res.data.faculty_group || ""
          });

        })
        .catch(err => console.log(err));

    }

  }, [id]);

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: name === "faculty_group" ? Number(value) : value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      if (id) {

        await AxiosInstance.put(
          `departments/departments/${id}/`,
          formData
        );

        alert("Department Updated ✅");

      } else {

        await AxiosInstance.post(
          "departments/departments/",
          formData
        );

        alert("Department Created ✅");

      }

      navigate("/admin/departments");

    } catch (error) {

      console.error(error);
      alert("Error saving department ❌");

    }

  };

  return (

    <div>

      <h2 className="text-2xl font-bold mb-6">
        {id ? "Edit Department" : "Add Department"}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow space-y-4"
      >

        {/* Faculty Group */}
        <select
          name="faculty_group"
          value={formData.faculty_group}
          onChange={handleChange}
          className="w-full border p-2"
          required
        >

          <option value="">
            Select Faculty Group
          </option>

          {facultyGroups.map(group => (
            <option key={group.id} value={group.id}>
              {group.name}
            </option>
          ))}

        </select>

        {/* Department Name */}
        <input
          type="text"
          name="name"
          placeholder="Department Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-2"
          required
        />

        {/* Slug */}
        <input
          type="text"
          name="slug"
          placeholder="Slug"
          value={formData.slug}
          onChange={handleChange}
          className="w-full border p-2"
          required
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Department Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border p-2"
        />

        {/* Phone */}
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border p-2"
        />

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          {id ? "Update Department" : "Save Department"}
        </button>

      </form>

    </div>
  );
};

export default DepartmentForm;