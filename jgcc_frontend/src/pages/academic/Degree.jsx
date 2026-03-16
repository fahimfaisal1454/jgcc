import { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import AxiosInstance from "../../axiosInstance";

const Degree = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDegree = async () => {
      try {
        const res = await AxiosInstance.get("academic/degree/");
        setData(res.data);
      } catch (error) {
        console.error("Error fetching degree program:", error);
      }
    };

    fetchDegree();
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
        className="text-sm leading-7 text-gray-800"
        dangerouslySetInnerHTML={{ __html: data.content }}
      />
    </AdminLayout>
  );
};

export default Degree;