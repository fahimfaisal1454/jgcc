import { useEffect, useState } from "react";
import AxiosInstance from "../../../axiosInstance";

const VicePrincipalPage = () => {

  const [vicePrincipal, setVicePrincipal] = useState(null);
  const [editMode, setEditMode] = useState(false);

  // Posting form visibility
  const [showPostingForm, setShowPostingForm] = useState(false);

  // Posting edit mode
  const [editingPostingId, setEditingPostingId] = useState(null);

  // Posting form data
  const [postingData, setPostingData] = useState({
    college_name: "",
    joining_date: "",
    release_date: ""
  });

  // -----------------------------
  // Fetch vice principal
  // -----------------------------
  const fetchVicePrincipal = async () => {
    try {

      const res = await AxiosInstance.get("vice-principal/");
      setVicePrincipal(res.data);

    } catch (error) {

      console.error("Error loading vice principal", error);

    }
  };

  useEffect(() => {
    fetchVicePrincipal();
  }, []);

  // -----------------------------
  // Vice Principal form change
  // -----------------------------
  const handleChange = (e) => {

    const { name, value, files } = e.target;

    if (files) {

      setVicePrincipal({
        ...vicePrincipal,
        [name]: files[0]
      });

    } else {

      setVicePrincipal({
        ...vicePrincipal,
        [name]: value
      });

    }

  };

  // -----------------------------
  // Update vice principal
  // -----------------------------
 const handleUpdate = async (e) => {

  e.preventDefault();

  try {

    const data = new FormData();

    data.append("name", vicePrincipal.name || "");
    data.append("position", vicePrincipal.position || "");
    data.append("gov_id", vicePrincipal.gov_id || "");
    data.append("bcs_batch", vicePrincipal.bcs_batch || "");
    data.append("email", vicePrincipal.email || "");
    data.append("mobile", vicePrincipal.mobile || "");
    data.append("whatsapp", vicePrincipal.whatsapp || "");

    if (vicePrincipal.image instanceof File) {
      data.append("image", vicePrincipal.image);
    }

    if (vicePrincipal.id) {

      // UPDATE
      await AxiosInstance.put(
        `vice-principal/${vicePrincipal.id}/`,
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      alert("Vice Principal updated ✅");

    } else {

      // CREATE NEW
      await AxiosInstance.post(
        "vice-principal/",
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      alert("Vice Principal added ✅");

    }

    setEditMode(false);
    fetchVicePrincipal();

  } catch (error) {

    console.error(error);
    alert("Save failed ❌");

  }

};

  // -----------------------------
  // Posting form change
  // -----------------------------
  const handlePostingChange = (e) => {

    const { name, value } = e.target;

    setPostingData({
      ...postingData,
      [name]: value
    });

  };

  // -----------------------------
  // Add or update posting
  // -----------------------------
  const handlePostingSubmit = async (e) => {

    e.preventDefault();

    try {

      if (editingPostingId) {

        await AxiosInstance.put(
          `vice-posting-history/${editingPostingId}/`,
          {
            ...postingData,
            vice_principal: vicePrincipal.id
          }
        );

        alert("Posting updated ✅");

      } else {

        await AxiosInstance.post(
          "vice-posting-history/",
          {
            ...postingData,
            vice_principal: vicePrincipal.id
          }
        );

        alert("Posting added ✅");

      }

      setPostingData({
        college_name: "",
        joining_date: "",
        release_date: ""
      });

      setShowPostingForm(false);
      setEditingPostingId(null);

      fetchVicePrincipal();

    } catch (error) {

      console.error(error);
      alert("Error saving posting ❌");

    }

  };

  // -----------------------------
  // Edit posting
  // -----------------------------
  const handleEditPosting = (p) => {

    setPostingData({
      college_name: p.college_name,
      joining_date: p.joining_date,
      release_date: p.release_date || ""
    });

    setEditingPostingId(p.id);
    setShowPostingForm(true);

  };

  // -----------------------------
  // Delete posting
  // -----------------------------
  const handleDeletePosting = async (id) => {

    const confirmDelete = window.confirm(
      "Delete this posting history?"
    );

    if (!confirmDelete) return;

    try {

      await AxiosInstance.delete(
        `vice-posting-history/${id}/`
      );

      alert("Posting deleted ✅");

      fetchVicePrincipal();

    } catch (error) {

      console.error(error);
      alert("Delete failed ❌");

    }

  };

  // -----------------------------
  // Loading
  // -----------------------------
  if (!vicePrincipal) {
    return <p>Loading...</p>;
  }

return (

  <div>

    {/* Header */}
    <div className="flex justify-between items-center mb-6">

      <h2 className="text-2xl font-bold">
        Vice Principal
      </h2>

      <div className="flex gap-3">

        <button
          onClick={() => setEditMode(true)}
          className="bg-yellow-500 text-white px-4 py-2 rounded"
        >
          Edit Vice Principal
        </button>

        <button
          onClick={() => {
            setVicePrincipal({
              name: "",
              position: "Vice Principal",
              gov_id: "",
              bcs_batch: "",
              email: "",
              mobile: "",
              whatsapp: "",
              image: null,
              postings: []
            });
            setEditMode(true);
          }}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          + Add Vice Principal
        </button>

      </div>

    </div>

    <div className="bg-white p-6 rounded shadow">

      {/* ============================
          EDIT MODE
      ============================ */}

      {editMode ? (

        <form
          onSubmit={handleUpdate}
          className="space-y-4"
        >

          <input
            name="name"
            value={vicePrincipal.name || ""}
            onChange={handleChange}
            placeholder="Name"
            className="w-full border p-2"
          />

          <input
            name="position"
            value={vicePrincipal.position || ""}
            onChange={handleChange}
            placeholder="Position"
            className="w-full border p-2"
          />

          <input
            name="gov_id"
            value={vicePrincipal.gov_id || ""}
            onChange={handleChange}
            placeholder="Govt ID"
            className="w-full border p-2"
          />

          <input
            name="bcs_batch"
            value={vicePrincipal.bcs_batch || ""}
            onChange={handleChange}
            placeholder="BCS Batch"
            className="w-full border p-2"
          />

          <input
            name="email"
            value={vicePrincipal.email || ""}
            onChange={handleChange}
            placeholder="Email"
            className="w-full border p-2"
          />

          <input
            name="mobile"
            value={vicePrincipal.mobile || ""}
            onChange={handleChange}
            placeholder="Mobile"
            className="w-full border p-2"
          />

          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="w-full border p-2"
          />

          <div className="flex gap-3">

            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Update Vice Principal
            </button>

            <button
              type="button"
              onClick={() => setEditMode(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>

          </div>

        </form>

      ) : (

        <>

          {/* Vice Principal Info */}
          <div className="flex items-center gap-6 mb-6">

            {vicePrincipal.image && (

              <img
                src={vicePrincipal.image}
                alt={vicePrincipal.name}
                className="w-28 h-28 object-cover rounded"
              />

            )}

            <div>

              <h3 className="text-xl font-semibold">
                {vicePrincipal.name}
              </h3>

              <p>{vicePrincipal.position}</p>

              <p>
                BCS Batch: {vicePrincipal.bcs_batch}
              </p>

              <p>
                Mobile: {vicePrincipal.mobile}
              </p>

            </div>

          </div>

          {/* Profile Table */}
          <h3 className="text-lg font-semibold mb-3">
            Profile of the Vice Principal
          </h3>

          <table className="w-full border mb-6">

            <tbody>

              <tr>
                <td className="border p-2">Name</td>
                <td className="border p-2">{vicePrincipal.name}</td>
              </tr>

              <tr>
                <td className="border p-2">Position</td>
                <td className="border p-2">{vicePrincipal.position}</td>
              </tr>

              <tr>
                <td className="border p-2">Govt ID</td>
                <td className="border p-2">{vicePrincipal.gov_id}</td>
              </tr>

              <tr>
                <td className="border p-2">BCS Batch</td>
                <td className="border p-2">{vicePrincipal.bcs_batch}</td>
              </tr>

              <tr>
                <td className="border p-2">Email</td>
                <td className="border p-2">{vicePrincipal.email}</td>
              </tr>

              <tr>
                <td className="border p-2">Mobile</td>
                <td className="border p-2">{vicePrincipal.mobile}</td>
              </tr>

            </tbody>

          </table>

            {/* ============================
                POSTING HISTORY
            ============================ */}

            <div className="flex justify-between items-center mb-2">

  <h3 className="text-lg font-semibold">
    Posting History
  </h3>

  <button
    onClick={() => {
      setShowPostingForm(true);
      setEditingPostingId(null);
    }}
    className="bg-green-600 text-white px-3 py-1 rounded"
  >
    + Add Posting
  </button>

</div>

{/* Posting Form */}

{showPostingForm && (

  <form
    onSubmit={handlePostingSubmit}
    className="bg-gray-100 p-4 rounded mb-4 space-y-3"
  >

    <input
      name="college_name"
      placeholder="College Name"
      value={postingData.college_name}
      onChange={handlePostingChange}
      className="w-full border p-2"
      required
    />

    <input
      type="date"
      name="joining_date"
      value={postingData.joining_date}
      onChange={handlePostingChange}
      className="w-full border p-2"
      required
    />

    <input
      type="date"
      name="release_date"
      value={postingData.release_date}
      onChange={handlePostingChange}
      className="w-full border p-2"
    />

    <div className="flex gap-3">

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Save Posting
      </button>

      <button
        type="button"
        onClick={() => {
          setShowPostingForm(false);
          setEditingPostingId(null);
        }}
        className="bg-gray-500 text-white px-4 py-2 rounded"
      >
        Cancel
      </button>

    </div>

  </form>

)}

            {/* Posting Table */}

           <table className="w-full border">

  <thead>

    <tr className="bg-gray-100">

      <th className="border p-2">
        College
      </th>

      <th className="border p-2">
        Joining Date
      </th>

      <th className="border p-2">
        Release Date
      </th>

      <th className="border p-2">
        Actions
      </th>

    </tr>

  </thead>

  <tbody>

    {vicePrincipal.postings?.length === 0 && (

      <tr>
        <td
          colSpan="4"
          className="text-center p-3"
        >
          No posting history
        </td>
      </tr>

    )}

    {vicePrincipal.postings?.map((p) => (

      <tr key={p.id}>

        <td className="border p-2">
          {p.college_name}
        </td>

        <td className="border p-2">
          {p.joining_date}
        </td>

        <td className="border p-2">
          {p.release_date || "Present"}
        </td>

        <td className="border p-2 flex gap-2">

          <button
            onClick={() => handleEditPosting(p)}
            className="bg-yellow-500 text-white px-2 py-1 rounded"
          >
            Edit
          </button>

          <button
            onClick={() => handleDeletePosting(p.id)}
            className="bg-red-600 text-white px-2 py-1 rounded"
          >
            Delete
          </button>

        </td>

      </tr>

    ))}

  </tbody>

</table>

          </>

        )}

      </div>

    </div>

  );

};

export default VicePrincipalPage;