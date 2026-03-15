import { useEffect, useState } from "react";
import AxiosInstance from "../../../axiosInstance";

const TeachersCouncil = () => {

  const [councils, setCouncils] = useState([]);
  const [year, setYear] = useState("");

  const [name,setName] = useState("");
  const [designation,setDesignation] = useState("");
  const [role,setRole] = useState("");

  const fetchData = async () => {
    const res = await AxiosInstance.get("admin-teachers-council/");
    setCouncils(res.data);
  };

  useEffect(()=>{
    fetchData();
  },[]);

  const createYear = async(e)=>{
    e.preventDefault();

    if(!year) return;

    await AxiosInstance.post("teachers-council/",{
      year
    });

    setYear("");
    fetchData();
  }

  const addMember = async(e,councilId)=>{
    e.preventDefault();

    if(!name || !designation || !role) return;

    await AxiosInstance.post("council-members/",{
      council:councilId,
      name,
      designation,
      role
    });

    setName("");
    setDesignation("");
    setRole("");

    fetchData();
  }

  const deleteItem = async(id)=>{
    await AxiosInstance.delete(`council-members/${id}/`);
    fetchData();
  };

  return (

    <div className="max-w-6xl">

      <h2 className="text-2xl font-bold mb-6">
        Teachers Council
      </h2>

      {/* Create Year */}

      <form
        onSubmit={createYear}
        className="bg-white p-4 rounded-lg shadow mb-8 flex gap-3 items-center"
      >

        <input
          value={year}
          onChange={(e)=>setYear(e.target.value)}
          placeholder="Enter Council Year (ex: 2024)"
          className="border rounded p-2 flex-1"
        />

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm">
          Create Year
        </button>

      </form>

      {/* Year Wise Councils */}

      {councils.map((council)=>(

        <div key={council.id} className="mb-12">

          <h3 className="text-xl font-semibold mb-4 border-b pb-2">
            Teachers Council ({council.year})
          </h3>

          {/* Add Member */}

          <form
            onSubmit={(e)=>addMember(e,council.id)}
            className="bg-white p-4 rounded-lg shadow mb-6 flex gap-3 items-end"
          >

            <input
              value={name}
              onChange={(e)=>setName(e.target.value)}
              placeholder="Name"
              className="border rounded p-2 flex-1"
            />

            <input
              value={designation}
              onChange={(e)=>setDesignation(e.target.value)}
              placeholder="Designation"
              className="border rounded p-2 flex-1"
            />

            <input
              value={role}
              onChange={(e)=>setRole(e.target.value)}
              placeholder="Role"
              className="border rounded p-2 flex-1"
            />

            <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-sm whitespace-nowrap">
              Add
            </button>

          </form>

          {/* Members Table */}

          <div className="overflow-x-auto">

            <table className="w-full border rounded-lg overflow-hidden">

              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-2 text-left">Name</th>
                  <th className="border p-2 text-left">Designation</th>
                  <th className="border p-2 text-left">Role</th>
                  <th className="border p-2 w-24">Action</th>
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

                  council.members.map((m)=>(

                    <tr key={m.id} className="hover:bg-gray-50">

                      <td className="border p-2">{m.name}</td>
                      <td className="border p-2">{m.designation}</td>
                      <td className="border p-2">{m.role}</td>

                      <td className="border p-2 text-center">

                        <button
                          onClick={()=>deleteItem(m.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs"
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

      ))}

    </div>

  );
};

export default TeachersCouncil;