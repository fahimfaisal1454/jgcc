import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AxiosInstance from "../../../axiosInstance";

const NoticeList = () => {
  const [notices, setNotices] = useState([]);

  const fetchNotices = async () => {
    try {
      const res = await AxiosInstance.get("notices/");
      setNotices(res.data);
    } catch (error) {
      console.error("Error fetching notices", error);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  return (
    <div>

      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-bold">Manage Notices</h2>

        <Link
          to="/admin/notices/create"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Notice
        </Link>
      </div>

      <div className="bg-white p-6 rounded shadow">

        <table className="w-full border">

          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Title</th>
              <th className="p-2 border">Category</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">File</th>
            </tr>
          </thead>

          <tbody>

            {notices.map((notice) => (
              <tr key={notice.id}>

                <td className="border p-2">{notice.title}</td>

                <td className="border p-2 capitalize">
                  {notice.category}
                </td>

                <td className="border p-2">
                  {new Date(notice.published_at).toLocaleDateString()}
                </td>

                <td className="border p-2">
                  {notice.file && (
                    <a
                      href={notice.file}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline"
                    >
                      View
                    </a>
                  )}
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>
    </div>
  );
};

export default NoticeList;