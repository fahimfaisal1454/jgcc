import { useState } from "react";

const WriterForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Writer Blog Saved");
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">
        Add / Edit Writer Blog
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow space-y-4"
      >
        <input
          type="text"
          placeholder="Blog Title"
          className="w-full border p-3 rounded"
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Blog Content"
          rows="6"
          className="w-full border p-3 rounded"
          onChange={(e) => setContent(e.target.value)}
        />

        <button className="bg-green-600 text-white px-6 py-2 rounded-xl">
          Save Blog
        </button>
      </form>
    </div>
  );
};

export default WriterForm;