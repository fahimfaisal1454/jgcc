import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaFilePdf } from "react-icons/fa";
import AdminLayout from "../../components/AdminLayout";
import axiosInstance from "../../axiosInstance";

const NoticePage = () => {
  const { category } = useParams();

  const [search, setSearch] = useState("");
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await axiosInstance.get(`/notices/?category=${category}`);
        setNotices(response.data);
      } catch (error) {
        console.error("Error fetching notices:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, [category]);

  const filteredNotices = notices.filter((notice) =>
    notice.title.toLowerCase().includes(search.toLowerCase())
  );

  const pageTitle =
    category === "general" ? "General Notice" : "Office Orders";

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-GB").replace(/\//g, ".");
  };

  return (
    <AdminLayout title={pageTitle}>
      <div className="bg-white shadow-sm">

        {/* Search Bar */}
        <div className="flex justify-end p-4">
          <input
            type="text"
            placeholder="Search..."
            className="border border-gray-300 px-3 py-2 text-sm w-64"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-gray-200">

            <thead className="bg-gray-200">
              <tr>
                <th className="p-3 border text-left">SL</th>
                <th className="p-3 border text-left">Date</th>
                <th className="p-3 border text-left">Description</th>
                <th className="p-3 border text-center">Download</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4" className="p-6 text-center">
                    Loading...
                  </td>
                </tr>
              ) : filteredNotices.length > 0 ? (
                filteredNotices.map((notice, index) => (
                  <tr key={notice.id} className="hover:bg-gray-50">

                    {/* Reverse Serial */}
                    <td className="p-3 border">
                      {filteredNotices.length - index}
                    </td>

                    {/* Date */}
                    <td className="p-3 border">
                      {formatDate(notice.published_at)}
                    </td>

                    {/* Title */}
                    <td className="p-3 border">
                      {notice.title}
                    </td>

                    {/* PDF Download */}
                    <td className="p-3 border text-center">
                      {notice.file ? (
                        <a
                          href={notice.file}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex flex-col items-center text-red-600 hover:text-red-800"
                        >
                          <FaFilePdf size={28} />
                          <span className="text-xs font-semibold">PDF</span>
                        </a>
                      ) : (
                        "-"
                      )}
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="p-6 text-center text-gray-500">
                    No notices found.
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>

      </div>
    </AdminLayout>
  );
};

export default NoticePage;