import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../../../axiosInstance";

const NoticeForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "general",
    file: null,
    published_at: "",
  });

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
      data.append("published_at", formData.published_at);

      if (formData.file) {
        data.append("file", formData.file);
      }

      await AxiosInstance.post("notices/", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Notice Created ✅");
      navigate("/admin/notices");

    } catch (error) {
      console.error(error);
      alert("Error creating notice ❌");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Add Notice</h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded shadow"
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
        <div>
          <label className="block mb-1 font-medium">Publish Date</label>
          <input
            type="datetime-local"
            name="published_at"
            className="w-full border p-2"
            value={formData.published_at}
            onChange={handleChange}
            required
          />
        </div>

        {/* File Upload */}
        <input
          type="file"
          name="file"
          className="w-full border p-2"
          onChange={handleChange}
        />

        {/* Submit */}
        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Save Notice
        </button>

      </form>
    </div>
  );
};

export default NoticeForm;