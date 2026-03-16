import { useState, useEffect } from "react";
import AdminLayout from "../../components/AdminLayout";
import AxiosInstance from "../../axiosInstance";

const WritersCorner = () => {
  const [search, setSearch] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await AxiosInstance.get("news/");
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout title="Writer’s Corner">
      <div className="bg-white shadow-sm p-6">

        {/* Search */}
        <div className="flex justify-end mb-6">
          <div className="flex">
            <input
              type="text"
              placeholder="Search..."
              className="border border-gray-300 px-3 py-2 text-sm w-64"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="bg-gray-600 text-white px-4">
              🔍
            </button>
          </div>
        </div>

        {/* Section Title */}
        <div className="bg-orange-500 text-white py-2 text-center font-semibold mb-6">
          Recent Blogs/Articles
        </div>

        {/* Blog List */}
        <div className="space-y-6">
          {loading ? (
            <div className="text-center text-gray-500 py-6">
              Loading...
            </div>
          ) : filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog) => (
              <div
                key={blog.id}
                className="border border-gray-200 p-4 hover:bg-gray-50 transition flex justify-between gap-6"
              >
                {/* LEFT SIDE - TEXT */}
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 text-lg">
                    {blog.title}
                  </h3>

                  <div className="text-sm text-gray-500 mt-1">
                    {new Date(blog.published_at).toLocaleDateString()} | {blog.author}
                  </div>

                  <p className="mt-3 text-gray-700 text-sm leading-relaxed">
                    {blog.content}
                  </p>
                </div>

                {/* RIGHT SIDE - IMAGE */}
                {blog.image && (
                  <div className="w-40 flex-shrink-0">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-28 object-cover rounded cursor-pointer hover:opacity-80 transition"
                      onClick={() => window.open(blog.image, "_blank")}
                    />
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 py-6">
              No articles found.
            </div>
          )}
        </div>

      </div>
    </AdminLayout>
  );
};

export default WritersCorner;