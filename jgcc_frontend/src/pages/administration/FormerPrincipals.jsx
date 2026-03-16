import { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import AxiosInstance from "../../axiosInstance";

const FormerPrincipals = () => {
  const [principals, setPrincipals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFormerPrincipals = async () => {
      try {
        const res = await AxiosInstance.get("former-principals/");
        setPrincipals(res.data);
      } catch (err) {
        console.error("Error fetching former principals:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFormerPrincipals();
  }, []);

  return (
    <AdminLayout title="Former Principals">
      <div className="overflow-x-auto">
        <table className="w-full border text-sm text-center">
          <thead className="bg-[#f39c12] text-white">
            <tr>
              <th className="border p-2">SL</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">BCS Batch</th>
              <th className="border p-2">Subject</th>
              <th className="border p-2">From</th>
              <th className="border p-2">To</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="p-6">
                  Loading...
                </td>
              </tr>
            ) : principals.length > 0 ? (
              principals.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="border p-2">{index + 1}</td>
                  <td className="border p-2">{item.name}</td>
                  <td className="border p-2">
                    {item.bcs_batch || "-"}
                  </td>
                  <td className="border p-2">
                    {item.subject || "-"}
                  </td>
                  <td className="border p-2">
                    {formatDate(item.from_date)}
                  </td>
                  <td className="border p-2">
                    {item.to_date
                      ? formatDate(item.to_date)
                      : "Present"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-6 text-gray-500">
                  No former principals found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

const formatDate = (date) => {
  if (!date) return "-";
  return new Date(date).toISOString().split("T")[0];
};

export default FormerPrincipals;