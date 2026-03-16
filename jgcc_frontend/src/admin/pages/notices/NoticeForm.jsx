import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AxiosInstance from "../../../axiosInstance";

const NoticeForm = () => {

  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "general",
    file: null,
    published_at: "",
  });

  useEffect(() => {
    if (id) {
      fetchNotice();
    }
  }, [id]);

  const fetchNotice = async () => {
    try {

      const res = await AxiosInstance.get(`notices/${id}/`);

      setFormData({
        title: res.data.title || "",
        description: res.data.description || "",
        category: res.data.category || "general",
        file: null,
        published_at: res.data.published_at
          ? res.data.published_at.split("T")[0]
          : "",
      });

    } catch (error) {
      console.error("Error loading notice", error);
    }
  };

  const handleChange = (e) => {

    const { name, value, files } = e.target;

    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const data = new FormData();

      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("category", formData.category);

      // convert date → datetime for Django
      data.append(
        "published_at",
        formData.published_at + "T00:00:00"
      );

      if (formData.file) {
        data.append("file", formData.file);
      }

      if (id) {

        await AxiosInstance.put(`notices/${id}/`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        alert("Notice Updated ✅");

      } else {

        await AxiosInstance.post("notices/", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        alert("Notice Created ✅");

      }

      navigate("/cms/notices");

    } catch (error) {

      console.error(error);
      alert("Error saving notice ❌");

    }

  };

  return (
    <div>

      <h2 className="text-2xl font-bold mb-6">
        {id ? "Edit Notice" : "Add Notice"}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded shadow max-w-2xl"
      >

        {/* Title */}
        <input
          type="text"
          name="title"
          placeholder="Notice Title"
          className="w-full border p-2"
          value={formData.title}
          onChange={handleChange}
          required
        />

        {/* Description */}
        <textarea
          name="description"
          placeholder="Description"
          rows="5"
          className="w-full border p-2"
          value={formData.description}
          onChange={handleChange}
        />

        {/* Category */}
        <select
          name="category"
          className="w-full border p-2"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="general">General</option>
          <option value="office">Office Order</option>
        </select>

        {/* Publish Date */}
        <input
          type="date"
          name="published_at"
          className="w-full border p-2"
          value={formData.published_at}
          onChange={handleChange}
          required
        />

        {/* File Upload */}
        <input
          type="file"
          name="file"
          className="w-full border p-2"
          onChange={handleChange}
        />

        {/* Submit */}
        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          {id ? "Update Notice" : "Save Notice"}
        </button>

      </form>

    </div>
  );
};

export default NoticeForm;