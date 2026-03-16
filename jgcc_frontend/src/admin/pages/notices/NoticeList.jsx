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

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this notice?");

    if (!confirmDelete) return;

    try {
      await AxiosInstance.delete(`notices/${id}/`);
      fetchNotices();
    } catch (error) {
      console.error("Error deleting notice", error);
    }
  };

  return (
    <div>

      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-bold">Manage Notices</h2>

        <Link
          to="/cms/notices/create"
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
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>

          <tbody>

            {notices.map((notice) => (
              <tr key={notice.id}>

                <td className="border p-2">{notice.title}</td>

                <td className="border p-2 capitalize">
                  {notice.category}
                </td>

<td className="border p-2 text-center">
  {(() => {
    const d = new Date(notice.published_at);
    return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
  })()}
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

                <td className="border p-2 flex gap-2">

                  <Link
                    to={`/cms/notices/edit/${notice.id}`}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(notice.id)}
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
    </div>
  );
};

export default NoticeList;