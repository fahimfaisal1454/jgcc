import { useState } from "react";

const ProgramForm = () => {
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Academic Program Saved");
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">
        Add / Edit Academic Program
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow space-y-4"
      >
        <input
          type="text"
          placeholder="Program Title (HSC / Degree / Honours / Masters)"
          className="w-full border p-3 rounded"
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder="Duration (e.g. 4 Years)"
          className="w-full border p-3 rounded"
          onChange={(e) => setDuration(e.target.value)}
        />

        <textarea
          placeholder="Program Description"
          rows="5"
          className="w-full border p-3 rounded"
          onChange={(e) => setDescription(e.target.value)}
        />

        <button className="bg-green-600 text-white px-6 py-2 rounded-xl">
          Save Program
        </button>
      </form>
    </div>
  );
};

export default ProgramForm;