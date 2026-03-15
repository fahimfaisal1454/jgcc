import { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import AxiosInstance from "../../axiosInstance";

const Honours = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchHonours = async () => {
      try {
        const res = await AxiosInstance.get("academic/honours/");
        setData(res.data);
      } catch (error) {
        console.error("Error fetching honours program:", error);
      }
    };

    fetchHonours();
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

export default Honours;