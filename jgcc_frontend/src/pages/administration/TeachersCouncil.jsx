// pages/administration/TeachersCouncil.jsx
import { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import AxiosInstance from "../../axiosInstance";

const TeachersCouncil = () => {
  const [council, setCouncil] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCouncil = async () => {
      try {
        const res = await AxiosInstance.get("teachers-council/");
        setCouncil(res.data);
      } catch (err) {
        console.error("Error fetching teachers council:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCouncil();
  }, []);

  return (
    <AdminLayout title="Teacher’s Council">
      {loading ? (
        <div className="text-center py-10">Loading...</div>
      ) : !council || !council.members?.length ? (
        <div className="text-center py-10 text-gray-500">
          No council data found.
        </div>
      ) : (
        <>
          {/* Year Title */}
          <h2 className="text-center text-xl font-semibold mb-6 text-orange-600">
            শিক্ষক পরিষদ-{council.year}
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border text-sm text-center">
              <thead className="bg-[#f39c12] text-white">
                <tr>
                  <th className="border p-2">ক্রম নং</th>
                  <th className="border p-2">শিক্ষকের নাম</th>
                  <th className="border p-2">পদবি</th>
                  <th className="border p-2">পদ</th>
                </tr>
              </thead>

              <tbody>
                {council.members.map((member, index) => (
                  <tr
                    key={member.id}
                    className={index % 2 === 1 ? "bg-gray-50" : ""}
                  >
                    <td className="border p-2">
                      {toBanglaNumber(index + 1)}
                    </td>
                    <td className="border p-2">{member.name}</td>
                    <td className="border p-2">
                      {member.designation}
                    </td>
                    <td className="border p-2">
                      {member.role}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </AdminLayout>
  );
};

// Convert English numbers to Bangla
const toBanglaNumber = (num) => {
  const banglaDigits = ["০","১","২","৩","৪","৫","৬","৭","৮","৯"];
  return num
    .toString()
    .split("")
    .map(d => banglaDigits[d] || d)
    .join("");
};

export default TeachersCouncil;