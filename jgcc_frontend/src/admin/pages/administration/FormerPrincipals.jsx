import { useEffect, useState } from "react";
import AxiosInstance from "../../../axiosInstance";

const FormerPrincipals = () => {

  const [principals, setPrincipals] = useState([]);

  const [name, setName] = useState("");
  const [bcsBatch, setBcsBatch] = useState("");
  const [subject, setSubject] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const fetchData = async () => {
    try {
      const res = await AxiosInstance.get("former-principals/");
      setPrincipals(res.data);
    } catch (error) {
      console.error("Error fetching principals", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await AxiosInstance.post("former-principals/", {
        name: name,
        bcs_batch: bcsBatch,
        subject: subject,
        from_date: fromDate,
        to_date: toDate
      });

      setName("");
      setBcsBatch("");
      setSubject("");
      setFromDate("");
      setToDate("");

      fetchData();
    } catch (error) {
      console.error("Error adding principal", error);
    }
  };

  const deleteItem = async (id) => {
    try {
      await AxiosInstance.delete(`former-principals/${id}/`);
      fetchData();
    } catch (error) {
      console.error("Error deleting principal", error);
    }
  };

  return (
    <div>

      <h2 className="text-2xl font-bold mb-6">
        Former Principals
      </h2>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow mb-6 grid grid-cols-5 gap-3"
      >

        <input
          value={name}
          onChange={(e)=>setName(e.target.value)}
          placeholder="Name"
          className="border p-2"
          required
        />

        <input
          value={bcsBatch}
          onChange={(e)=>setBcsBatch(e.target.value)}
          placeholder="BCS Batch"
          className="border p-2"
        />

        <input
          value={subject}
          onChange={(e)=>setSubject(e.target.value)}
          placeholder="Subject"
          className="border p-2"
        />

        <input
          type="date"
          value={fromDate}
          onChange={(e)=>setFromDate(e.target.value)}
          className="border p-2"
          required
        />

        <input
          type="date"
          value={toDate}
          onChange={(e)=>setToDate(e.target.value)}
          className="border p-2"
        />

        <button className="bg-green-600 text-white px-4 py-2 rounded col-span-5">
          Add Principal
        </button>

      </form>

      {/* Table */}
      <table className="w-full border">

        <thead className="bg-gray-100">

          <tr>
            <th className="border p-2">SL</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">BCS Batch</th>
            <th className="border p-2">Subject</th>
            <th className="border p-2">From</th>
            <th className="border p-2">To</th>
            <th className="border p-2">Action</th>
          </tr>

        </thead>

        <tbody>

          {principals.map((p,index)=>(
            <tr key={p.id}>

              <td className="border p-2 text-center">{index+1}</td>
              <td className="border p-2">{p.name}</td>
              <td className="border p-2">{p.bcs_batch}</td>
              <td className="border p-2">{p.subject}</td>
              <td className="border p-2">{p.from_date}</td>
              <td className="border p-2">{p.to_date}</td>

              <td className="border p-2 text-center">

                <button
                  onClick={()=>deleteItem(p.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>

              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
};

export default FormerPrincipals;