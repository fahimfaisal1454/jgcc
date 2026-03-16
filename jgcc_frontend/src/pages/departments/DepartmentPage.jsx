import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "../../components/AdminLayout";
import AxiosInstance from "../../axiosInstance";

const DepartmentPage = () => {

  const { group, department } = useParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchDepartment = async () => {

      try {

        const res = await AxiosInstance.get(
          `departments/${group}/${department}/`
        );

        setData(res.data);

      } catch (error) {

        console.error("Error fetching department:", error);

      } finally {

        setLoading(false);

      }

    };

    fetchDepartment();

  }, [group, department]);


  if (loading) {

    return (
      <AdminLayout title="Loading...">
        <div className="text-center py-10">Loading...</div>
      </AdminLayout>
    );

  }


  if (!data || !data.id) {

    return (
      <AdminLayout title="Department Not Found">
        <div className="p-6 text-center text-red-600 font-semibold">
          Department data not available.
        </div>
      </AdminLayout>
    );

  }


  const head = data.faculties.find(f => f.is_head);
  const teachers = data.faculties.filter(f => !f.is_head);


  return (

    <AdminLayout title={data.name}>

      <div className="space-y-12">

        {/* Head of Department */}
        {head && (

          <div>

            <div className="bg-orange-500 text-white py-2 text-center font-semibold">
              Head of the Department
            </div>

            <div className="flex justify-center mt-8">
              <FacultyCard person={head} />
            </div>

          </div>

        )}


        {/* Teachers */}
        <div>

          <div className="bg-orange-500 text-white py-2 text-center font-semibold">
            Teachers
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
            {teachers.map((teacher) => (
              <FacultyCard key={teacher.id} person={teacher} />
            ))}
          </div>

        </div>

      </div>

    </AdminLayout>

  );

};


const FacultyCard = ({ person }) => {

  const navigate = useNavigate();

  const API_BASE =
    import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

  let imageUrl = "/default-avatar.png";

  if (person.image) {

    if (person.image.startsWith("http")) {
      imageUrl = person.image;
    } else {
      imageUrl = `${API_BASE}${person.image}`;
    }

  }


  return (

    <div
      onClick={() => navigate(`/teacher/${person.id}`)}
      className="cursor-pointer text-center border border-yellow-500 bg-white p-6 w-60 mx-auto shadow-sm hover:shadow-lg hover:scale-105 transition duration-200"
    >

      <img
        src={imageUrl}
        alt={person.name}
        className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-blue-300"
      />

      <h4 className="mt-4 font-semibold text-gray-800">
        {person.name}
      </h4>

      <p className="text-sm text-gray-600">
        {person.designation}
      </p>

    </div>

  );

};


export default DepartmentPage;