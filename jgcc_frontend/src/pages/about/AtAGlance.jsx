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

        console.error(error);

      } finally {

        setLoading(false);

      }

    };

    fetchData();

  }, []);

  return (

    <AdminLayout title={data?.title || "The College at a Glance"}>

      {loading ? (

        <div className="text-center py-10">
          Loading...
        </div>

      ) : !data ? (

        <div className="text-center py-10 text-gray-500">
          No content available.
        </div>

      ) : (

        <div className="px-6 py-8">

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

export default AtAGlance;