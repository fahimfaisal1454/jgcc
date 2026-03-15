import { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import AxiosInstance from "../../axiosInstance";

const Principal = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrincipal = async () => {
      try {
        const res = await AxiosInstance.get("principal/");
        setData(res.data);
      } catch (err) {
        console.error("Error fetching principal:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPrincipal();
  }, []);

  if (loading) {
    return (
      <AdminLayout title="Principal">
        <div className="text-center py-10">Loading...</div>
      </AdminLayout>
    );
  }

  if (!data) {
    return (
      <AdminLayout title="Principal">
        <div className="text-center py-10 text-red-500">
          No data found.
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Principal">
      <div className="space-y-12">

        {/* ===== Principal Image Section ===== */}
        <div className="text-center">
          <div className="inline-block border border-yellow-400 p-6 bg-white shadow-md">
            {data.image && (
              <img
                src={data.image}
                alt={data.name}
                className="w-40 h-40 rounded-full mx-auto object-cover border-4 border-gray-300 cursor-pointer"
                onClick={() => window.open(data.image, "_blank")}
              />
            )}
            <h3 className="mt-4 text-orange-600 font-semibold text-lg">
              {data.name}
            </h3>
            <p className="text-gray-600 text-sm">{data.position}</p>
          </div>
        </div>

        {/* ===== Profile Section ===== */}
        <div>
          <div className="bg-[#f39c12] text-white text-center py-2 font-semibold rounded-t-md">
            Profile of The Principal
          </div>

          <div className="border rounded-b-md overflow-hidden">
            <table className="w-full text-sm">
              <tbody>
                <ProfileRow label="Name" value={data.name} />
                <ProfileRow label="Position" value={data.position} />
                <ProfileRow label="Govt ID" value={data.gov_id} />
                <ProfileRow label="BCS Batch" value={data.bcs_batch} />
                <ProfileRow label="Email ID" value={data.email} />
                <ProfileRow label="Mobile No." value={data.mobile} />
                <ProfileRow label="WhatsApp" value={data.whatsapp} />
              </tbody>
            </table>
          </div>
        </div>

        {/* ===== Posting Details ===== */}
        <div>
          <div className="bg-[#f39c12] text-white text-center py-2 font-semibold">
            Posting Details
          </div>

          <div className="overflow-x-auto">
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
                {data.postings && data.postings.length > 0 ? (
                  data.postings.map((item, index) => (
                    <tr key={item.id} className="text-center">
                      <td className="border p-2">{index + 1}</td>
                      <td className="border p-2">{item.college_name}</td>
                      <td className="border p-2">
                        {formatDate(item.joining_date)}
                      </td>
                      <td className="border p-2">
                        {item.release_date
                          ? formatDate(item.release_date)
                          : "-"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center p-4">
                      No posting records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
};

const ProfileRow = ({ label, value }) => (
  <tr className="border-b even:bg-gray-100">
    <td className="p-3 font-medium w-1/3">{label}</td>
    <td className="p-3">{value || "-"}</td>
  </tr>
);

const formatDate = (date) => {
  if (!date) return "-";
  return new Date(date).toLocaleDateString();
};

export default Principal;