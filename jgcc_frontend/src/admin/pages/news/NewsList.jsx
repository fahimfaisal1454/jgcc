import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AxiosInstance from "../../../axiosInstance";

const NewsList = () => {

  const [news, setNews] = useState([]);

  const fetchNews = async () => {

    try {

      const res = await AxiosInstance.get("news/");
      setNews(res.data);

    } catch (error) {

      console.error("Error fetching news", error);

    }

  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div>

      <div className="flex justify-between mb-6">

        <h2 className="text-2xl font-bold">Manage News</h2>

        <Link
          to="/admin/news/create"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add News
        </Link>

      </div>

      <div className="bg-white p-6 rounded shadow">

        <table className="w-full border">

          <thead>

            <tr className="bg-gray-100">
              <th className="border p-2">Title</th>
              <th className="border p-2">Author</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Image</th>
            </tr>

          </thead>

          <tbody>

            {news.map((item) => (

              <tr key={item.id}>

                <td className="border p-2">{item.title}</td>

                <td className="border p-2">{item.author}</td>

                <td className="border p-2">
                  {new Date(item.published_at).toLocaleDateString()}
                </td>

                <td className="border p-2">

                  {item.image && (
                    <img
                      src={item.image}
                      alt=""
                      className="w-16 h-10 object-cover"
                    />
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

export default NewsList;