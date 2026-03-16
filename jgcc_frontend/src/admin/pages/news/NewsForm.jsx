import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../../../axiosInstance";

const NewsForm = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    image: null,
    is_published: true,
  });

  const handleChange = (e) => {

    const { name, value, files, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: files ? files[0] : type === "checkbox" ? checked : value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const data = new FormData();

      data.append("title", formData.title);
      data.append("content", formData.content);
      data.append("author", formData.author);
      data.append("is_published", formData.is_published);

      if (formData.image) {
        data.append("image", formData.image);
      }

      await AxiosInstance.post("news/", data, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      alert("News Created ✅");

      navigate("/cms/news");

    } catch (error) {

      console.error(error);
      alert("Error creating news ❌");

    }

  };

  return (
    <div>

      <h2 className="text-2xl font-bold mb-6">Add News</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow space-y-4"
      >

        {/* Title */}
        <input
          type="text"
          name="title"
          placeholder="News Title"
          className="w-full border p-2"
          onChange={handleChange}
          required
        />

        {/* Author */}
        <input
          type="text"
          name="author"
          placeholder="Author Name"
          className="w-full border p-2"
          onChange={handleChange}
        />

        {/* Content */}
        <textarea
          name="content"
          placeholder="News Content"
          rows="5"
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

        {/* Publish Toggle */}
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="is_published"
            defaultChecked
            onChange={handleChange}
          />
          Publish
        </label>

        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Save News
        </button>

      </form>

    </div>
  );
};

export default NewsForm;