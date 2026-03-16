import { useEffect, useState } from "react";
import AxiosInstance from "../../../axiosInstance";

const TeachersCouncil = () => {

  const [councils, setCouncils] = useState([]);
  const [year, setYear] = useState("");

  const [editingYearId, setEditingYearId] = useState(null);
  const [editingYearValue, setEditingYearValue] = useState("");

  const [memberForms, setMemberForms] = useState({});

  const [editingMemberId, setEditingMemberId] = useState(null);
  const [editingMemberForm, setEditingMemberForm] = useState({});

  const fetchData = async () => {
    const res = await AxiosInstance.get("admin-teachers-council/");
    setCouncils(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* ---------------- YEAR FUNCTIONS ---------------- */

  const createYear = async (e) => {
    e.preventDefault();

    if (!year) return;

    await AxiosInstance.post("teachers-council/", { year });

    setYear("");
    fetchData();
  };

  const startEditYear = (council) => {
    setEditingYearId(council.id);
    setEditingYearValue(council.year);
  };

  const updateYear = async (id) => {

    await AxiosInstance.patch(`teachers-council/${id}/`, {
      year: editingYearValue
    });

    setEditingYearId(null);
    setEditingYearValue("");

    fetchData();
  };

  const deleteYear = async (id) => {

    if (!window.confirm("Delete this council year?")) return;

    await AxiosInstance.delete(`teachers-council/${id}/`);

    fetchData();
  };

  /* ---------------- MEMBER FUNCTIONS ---------------- */

  const handleChange = (councilId, field, value) => {

    setMemberForms({
      ...memberForms,
      [councilId]: {
        ...memberForms[councilId],
        [field]: value
      }
    });

  };

  const addMember = async (e, councilId) => {

    e.preventDefault();

    const form = memberForms[councilId] || {};

    if (!form.name || !form.designation || !form.role) return;

    await AxiosInstance.post("council-members/", {
      council: councilId,
      name: form.name,
      designation: form.designation,
      role: form.role
    });

    setMemberForms({
      ...memberForms,
      [councilId]: { name: "", designation: "", role: "" }
    });

    fetchData();
  };

  const deleteItem = async (id) => {
    await AxiosInstance.delete(`council-members/${id}/`);
    fetchData();
  };

  const startEditMember = (member) => {

    setEditingMemberId(member.id);

    setEditingMemberForm({
      name: member.name,
      designation: member.designation,
      role: member.role
    });

  };

  const handleEditMemberChange = (field, value) => {

    setEditingMemberForm({
      ...editingMemberForm,
      [field]: value
    });

  };

  const updateMember = async (id) => {

    await AxiosInstance.patch(`council-members/${id}/`, editingMemberForm);

    setEditingMemberId(null);
    setEditingMemberForm({});

    fetchData();
  };

  return (

    <div className="max-w-6xl">

      <h2 className="text-2xl font-bold mb-6">
        Teachers Council
      </h2>

      {/* CREATE YEAR */}

      <form
        onSubmit={createYear}
        className="bg-white p-4 rounded shadow mb-8 flex gap-3"
      >

        <input
          value={year}
          onChange={(e) => setYear(e.target.value)}
          placeholder="Enter Council Year (ex: 2024)"
          className="border rounded p-2 flex-1"
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Create Year
        </button>

      </form>

      {councils.map((council) => {

        const form = memberForms[council.id] || {};

        return (

          <div key={council.id} className="mb-12">

            {/* YEAR HEADER */}

            <div className="flex justify-between items-center mb-4 border-b pb-2">

              {editingYearId === council.id ? (

                <div className="flex gap-2">

                  <input
                    value={editingYearValue}
                    onChange={(e) => setEditingYearValue(e.target.value)}
                    className="border rounded p-1"
                  />

                  <button
                    onClick={() => updateYear(council.id)}
                    className="bg-green-600 text-white px-2 py-1 rounded text-sm"
                  >
                    Save
                  </button>

                  <button
                    onClick={() => setEditingYearId(null)}
                    className="bg-gray-400 text-white px-2 py-1 rounded text-sm"
                  >
                    Cancel
                  </button>

                </div>

              ) : (

                <h3 className="text-xl font-semibold">
                  Teachers Council ({council.year})
                </h3>

              )}

              {editingYearId !== council.id && (

                <div className="flex gap-2">

                  <button
                    onClick={() => startEditYear(council)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded text-sm"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteYear(council.id)}
                    className="bg-red-600 text-white px-2 py-1 rounded text-sm"
                  >
                    Delete
                  </button>

                </div>

              )}

            </div>

            {/* ADD MEMBER */}

            <form
              onSubmit={(e) => addMember(e, council.id)}
              className="bg-white p-4 rounded shadow mb-6 flex gap-3"
            >

              <input
                value={form.name || ""}
                onChange={(e) => handleChange(council.id, "name", e.target.value)}
                placeholder="Name"
                className="border rounded p-2 flex-1"
              />

              <input
                value={form.designation || ""}
                onChange={(e) => handleChange(council.id, "designation", e.target.value)}
                placeholder="Designation"
                className="border rounded p-2 flex-1"
              />

              <input
                value={form.role || ""}
                onChange={(e) => handleChange(council.id, "role", e.target.value)}
                placeholder="Role"
                className="border rounded p-2 flex-1"
              />

              <button className="bg-green-600 text-white px-3 py-2 rounded">
                Add
              </button>

            </form>

            {/* MEMBERS TABLE */}

            <table className="w-full border">

              <thead className="bg-gray-100">

                <tr>
                  <th className="border p-2 text-left">Name</th>
                  <th className="border p-2 text-left">Designation</th>
                  <th className="border p-2 text-left">Role</th>
                  <th className="border p-2 text-center">Action</th>
                </tr>

              </thead>

              <tbody>

                {council.members?.length === 0 ? (

                  <tr>
                    <td colSpan="4" className="text-center p-4 text-gray-500">
                      No members yet
                    </td>
                  </tr>

                ) : (

                  council.members.map((m) => (

                    <tr key={m.id}>

                      {editingMemberId === m.id ? (

                        <>
                          <td className="border p-2">
                            <input
                              value={editingMemberForm.name}
                              onChange={(e) => handleEditMemberChange("name", e.target.value)}
                              className="border p-1 w-full"
                            />
                          </td>

                          <td className="border p-2">
                            <input
                              value={editingMemberForm.designation}
                              onChange={(e) => handleEditMemberChange("designation", e.target.value)}
                              className="border p-1 w-full"
                            />
                          </td>

                          <td className="border p-2">
                            <input
                              value={editingMemberForm.role}
                              onChange={(e) => handleEditMemberChange("role", e.target.value)}
                              className="border p-1 w-full"
                            />
                          </td>

                          <td className="border p-2 text-center flex gap-2 justify-center">

                            <button
                              onClick={() => updateMember(m.id)}
                              className="bg-green-600 text-white px-2 py-1 rounded text-xs"
                            >
                              Save
                            </button>

                            <button
                              onClick={() => setEditingMemberId(null)}
                              className="bg-gray-500 text-white px-2 py-1 rounded text-xs"
                            >
                              Cancel
                            </button>

                          </td>
                        </>

                      ) : (

                        <>
                          <td className="border p-2">{m.name}</td>
                          <td className="border p-2">{m.designation}</td>
                          <td className="border p-2">{m.role}</td>

                          <td className="border p-2 text-center flex gap-2 justify-center">

                            <button
                              onClick={() => startEditMember(m)}
                              className="bg-yellow-500 text-white px-2 py-1 rounded text-xs"
                            >
                              Edit
                            </button>

                            <button
                              onClick={() => deleteItem(m.id)}
                              className="bg-red-500 text-white px-2 py-1 rounded text-xs"
                            >
                              Delete
                            </button>

                          </td>
                        </>

                      )}

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

        )

      })}

    </div>

  );

};

export default TeachersCouncil;