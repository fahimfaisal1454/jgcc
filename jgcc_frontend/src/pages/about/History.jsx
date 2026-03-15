import { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import AxiosInstance from "../../axiosInstance";

const History = () => {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchHistory = async () => {

      try {

        const res = await AxiosInstance.get("history/");

        if (res.data && res.data.id) {
          setData(res.data);
        } else {
          setData(null);
        }

      } catch (error) {

        console.error("Error fetching history:", error);
        setData(null);

      } finally {

        setLoading(false);

      }

    };

    fetchHistory();

  }, []);

  return (

    <AdminLayout title={data?.title || "History of the College"}>

      {loading ? (

        <div className="text-center py-10">
          Loading...
        </div>

      ) : !data ? (

        <div className="text-center py-10 text-gray-500">
          No history content available.
        </div>

      ) : (

        <div className="px-6 py-8">

          {/* TYPOGRAPHY FIX */}
          <div className="prose lg:prose-lg max-w-none">

            <div
              dangerouslySetInnerHTML={{ __html: data.content }}
            />

          </div>

        </div>

      )}

    </AdminLayout>

  );

};

export default History;