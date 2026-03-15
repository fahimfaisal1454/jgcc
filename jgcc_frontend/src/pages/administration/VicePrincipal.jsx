import { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import AxiosInstance from "../../axiosInstance";

const VicePrincipal = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVice = async () => {
      try {
        const res = await AxiosInstance.get("vice-principal/");
        setData(res.data);
      } catch (err) {
        console.error("Error fetching vice principal:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVice();
  }, []);

  if (loading) {
    return (
      <AdminLayout title="Vice Principal">
        <div className="text-center py-10">Loading...</div>
      </AdminLayout>
    );
  }

  if (!data) {
    return (
      <AdminLayout title="Vice Principal">
        <div className="text-center py-10 text-red-500">
          No data found.
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Vice Principal">
      <div className="space-y-12">

        {/* Image Section */}
        <div className="text-center">
          <div className="inline-block border border-yellow-400 p-6 bg-white shadow-md">
            {data.image && (
              <img
                src={data.image}
                alt={data.name}
                className="w-40 h-40 rounded-full mx-auto object-cover border-4 border-gray-300"
              />
            )}
            <h3 className="mt-4 text-orange-600 font-semibold text-lg">
              {data.name}
            </h3>
            <p className="text-gray-600 text-sm">{data.position}</p>
          </div>
        </div>

        {/* Profile Section */}
        <div>
          <div className="bg-[#f39c12] text-white text-center py-2 font-semibold rounded-t-md">
            Profile of The Vice Principal
          </div>

          <div className="border rounded-b-md overflow-hidden">
            <table className="w-full text-sm">
              <tbody>
                <Row label="Name" value={data.name} />
                <Row label="Position" value={data.position} />
                <Row label="Govt ID" value={data.gov_id} />
                <Row label="BCS Batch" value={data.bcs_batch} />
                <Row label="Email ID" value={data.email} />
                <Row label="Mobile No." value={data.mobile} />
                <Row label="WhatsApp" value={data.whatsapp} />
              </tbody>
            </table>
          </div>
        </div>

        {/* Posting Section */}
        <div>
          <div className="bg-[#f39c12] text-white text-center py-2 font-semibold">
            Posting Details
          </div>

          <table className="w-full text-sm border">
            <thead className="bg-[#f39c12] text-white">
              <tr>
                <th className="border p-2">SL</th>
                <th className="border p-2">Name of the College</th>
                <th className="border p-2">Joining Date</th>
                <th className="border p-2">Release Date</th>
              </tr>
            </thead>
            <tbody>
              {data.postings?.map((item, index) => (
                <tr key={item.id} className="text-center">
                  <td className="border p-2">{index + 1}</td>
                  <td className="border p-2">{item.college_name}</td>
                  <td className="border p-2">
                    {new Date(item.joining_date).toLocaleDateString()}
                  </td>
                  <td className="border p-2">
                    {item.release_date
                      ? new Date(item.release_date).toLocaleDateString()
                      : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </AdminLayout>
  );
};

const Row = ({ label, value }) => (
  <tr className="border-b even:bg-gray-100">
    <td className="p-3 font-medium w-1/3">{label}</td>
    <td className="p-3">{value || "-"}</td>
  </tr>
);

export default VicePrincipal;