import { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import AxiosInstance from "../../axiosInstance";

const HSC = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchHSC = async () => {
      try {
        const res = await AxiosInstance.get("academic/hsc/");
        setData(res.data);
      } catch (error) {
        console.error("Error fetching HSC program:", error);
      }
    };

    fetchHSC();
  }, []);

  if (!data) {
    return (
      <AdminLayout title="Loading...">
        <div className="text-center py-10">Loading...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title={data.title}>
      <div
        className="text-sm leading-7 text-gray-800 space-y-4"
        dangerouslySetInnerHTML={{ __html: data.content }}
      />
    </AdminLayout>
  );
};

export default HSC;