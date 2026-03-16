import { useState, useEffect } from "react";
import AxiosInstance from "../../../axiosInstance";
import { useNavigate, useParams } from "react-router-dom";

const FacultyGroupForm = () => {

  const navigate = useNavigate();
  const { id } = useParams(); // detect edit mode

  const [formData, setFormData] = useState({
    name: "",
    slug: ""
  });

  useEffect(() => {

    if (id) {

      AxiosInstance.get(`departments/faculty-groups/${id}/`)
        .then(res => {
          setFormData(res.data);
        })
        .catch(err => console.log(err));

    }

  }, [id]);

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      if (id) {

        // UPDATE
        await AxiosInstance.put(
          `departments/faculty-groups/${id}/`,
          formData
        );

        alert("Faculty Group Updated ✅");

      } else {

        // CREATE
        await AxiosInstance.post(
          "departments/faculty-groups/",
          formData
        );

        alert("Faculty Group Created ✅");

      }

      navigate("/cms/faculty-groups");

    } catch (error) {

      console.error(error);
      alert("Error saving faculty group ❌");

    }

  };

  return (

    <div>

      <h2 className="text-2xl font-bold mb-6">

        {id ? "Edit Faculty Group" : "Add Faculty Group"}

      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow space-y-4"
      >

        <input
          type="text"
          name="name"
          placeholder="Faculty Group Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-2"
        />

        <input
          type="text"
          name="slug"
          placeholder="Slug"
          value={formData.slug}
          onChange={handleChange}
          className="w-full border p-2"
        />

        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          {id ? "Update" : "Save"}
        </button>

      </form>

    </div>

  );

};

export default FacultyGroupForm;