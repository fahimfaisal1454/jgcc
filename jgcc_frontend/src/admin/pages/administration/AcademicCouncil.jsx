import { useEffect, useState } from "react";
import AxiosInstance from "../../../axiosInstance";

const AcademicCouncil = () => {

  const [councils, setCouncils] = useState([]);
  const [year, setYear] = useState("");

  // form state per council
  const [memberForms, setMemberForms] = useState({});

  const fetchData = async () => {
    try {
      const res = await AxiosInstance.get("admin-academic-council/");
      setCouncils(res.data);
    } catch (error) {
      console.error("Error fetching councils", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const createYear = async (e) => {
    e.preventDefault();

    try {
      await AxiosInstance.post("admin-academic-council/", {
        year
      });

      setYear("");
      fetchData();
    } catch (error) {
      console.error("Error creating year", error);
    }
  };

  const addMember = async (e, councilId) => {
    e.preventDefault();

    const form = memberForms[councilId] || {};

    try {
      await AxiosInstance.post("academic-council-members/", {
        council: councilId,
        name: form.name || "",
        designation: form.designation || "",
        role: form.role || ""
      });

      // reset that council form
      setMemberForms({
        ...memberForms,
        [councilId]: { name: "", designation: "", role: "" }
      });

      fetchData();
    } catch (error) {
      console.error("Error adding member", error);
    }
  };

  const deleteItem = async (id) => {
    try {
      await AxiosInstance.delete(`academic-council-members/${id}/`);
      fetchData();
    } catch (error) {
      console.error("Error deleting member", error);
    }
  };

  const handleChange = (councilId, field, value) => {
    setMemberForms({
      ...memberForms,
      [councilId]: {
        ...memberForms[councilId],
        [field]: value
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto">

      <h2 className="text-3xl font-bold mb-6">
        Academic Council
      </h2>

      {/* Create Year */}
      <form
        onSubmit={createYear}
        className="bg-white border rounded-lg p-4 mb-8 flex gap-3 shadow-sm"
      >
        <input
          value={year}
          onChange={(e) => setYear(e.target.value)}
          placeholder="Enter Council Year (ex: 2024)"
          className="border p-2 flex-1 rounded"
          required
        />

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm">
          Create Year
        </button>
      </form>

      {councils.map((council) => {

        const form = memberForms[council.id] || {};

        return (
          <div
            key={council.id}
            className="bg-white border rounded-lg shadow-sm mb-10 p-6"
          >

            <h3 className="text-xl font-semibold mb-4">
              Academic Council ({council.year})
            </h3>

            {/* Add Member */}
            <form
              onSubmit={(e) => addMember(e, council.id)}
              className="flex gap-3 mb-6"
            >

              <input
                value={form.name || ""}
                onChange={(e) =>
                  handleChange(council.id, "name", e.target.value)
                }
                placeholder="Name"
                className="border p-2 flex-1 rounded"
                required
              />

              <input
                value={form.designation || ""}
                onChange={(e) =>
                  handleChange(council.id, "designation", e.target.value)
                }
                placeholder="Designation"
                className="border p-2 flex-1 rounded"
              />

              <input
                value={form.role || ""}
                onChange={(e) =>
                  handleChange(council.id, "role", e.target.value)
                }
                placeholder="Role"
                className="border p-2 flex-1 rounded"
              />

              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm">
                Add
              </button>

            </form>

            {/* Table */}
            <div className="overflow-x-auto">

              <table className="w-full border text-sm">

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
                      <tr key={m.id} className="hover:bg-gray-50">

                        <td className="border p-2">{m.name}</td>
                        <td className="border p-2">{m.designation}</td>
                        <td className="border p-2">{m.role}</td>

                        <td className="border p-2 text-center">
                          <button
                            onClick={() => deleteItem(m.id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                          >
                            Delete
                          </button>
                        </td>

                      </tr>
                    ))
                  )}

                </tbody>

              </table>

            </div>

          </div>
        );
      })}

    </div>
  );
};

export default AcademicCouncil;