import { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import AxiosInstance from "../../axiosInstance";

const AtAGlance = () => {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchData = async () => {

      try {

        const res = await AxiosInstance.get("at-a-glance/");

        if (res.data && res.data.id) {
          setData(res.data);
        }

      } catch (error) {

        console.error("Error fetching At A Glance content:", error);

      } finally {

        setLoading(false);

      }

    };

    fetchData();

  }, []);

  return (

    <AdminLayout title={data?.title || "At A Glance"}>

      {loading ? (

        <div className="text-center py-10">
          Loading...
        </div>

      ) : !data ? (

        <div className="text-center py-10 text-gray-500">
          No content available.
        </div>

      ) : (

        <div className="px-6 pt-0 pb-10">

          <div
            className="text-[14px] leading-[1.7] text-gray-800"
            style={{ fontFamily: "Times New Roman, Times, serif" }}
            dangerouslySetInnerHTML={{ __html: data.content }}
          />

        </div>

      )}

    </AdminLayout>

  );

};

export default AtAGlance;