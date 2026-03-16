import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import AxiosInstance from "../../../axiosInstance";

const FacultyDetails = () => {

  const { id } = useParams();
  const [teacher, setTeacher] = useState(null);

  useEffect(() => {

    AxiosInstance.get(`departments/faculty/${id}/`)
      .then(res => {
        setTeacher(res.data);
      })
      .catch(err => console.log(err));

  }, [id]);

  if (!teacher) {
    return <p>Loading...</p>;
  }

  return (

    <div>

      <h2 className="text-2xl font-bold mb-6">
        Teacher Details
      </h2>

      <div className="bg-white p-6 rounded shadow space-y-3">

        {teacher.image && (
          <img
            src={teacher.image}
            alt={teacher.name}
            className="w-32 h-32 object-cover rounded"
          />
        )}

        <p><strong>Name:</strong> {teacher.name}</p>
        <p><strong>Designation:</strong> {teacher.designation}</p>
        <p><strong>Government ID:</strong> {teacher.gov_id}</p>
        <p><strong>BCS Batch:</strong> {teacher.bcs_batch}</p>
        <p><strong>Email:</strong> {teacher.email}</p>
        <p><strong>Mobile:</strong> {teacher.mobile}</p>
        <p><strong>Facebook:</strong> {teacher.facebook}</p>
        <p><strong>WhatsApp:</strong> {teacher.whatsapp}</p>

        <div className="flex gap-4 pt-4">

          <Link
            to={`/cms/faculty/edit/${teacher.id}`}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Edit
          </Link>

          <Link
            to="/cms/faculty"
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Back
          </Link>

        </div>

      </div>

    </div>

  );

};

export default FacultyDetails;