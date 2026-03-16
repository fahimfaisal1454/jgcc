import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";

import ImportantLinks from "../../components/ImportantLinks";
import SubPageHeader from "../../components/SubPageHeader";

export default function TeacherDetails() {

  const { id } = useParams();

  const [teacher, setTeacher] = useState(null);
  const [departmentName, setDepartmentName] = useState("");

  const API_BASE =
    import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

  useEffect(() => {

    axiosInstance
      .get(`/departments/faculty/${id}/`)
      .then((res) => {

        setTeacher(res.data);

        if (res.data.department) {
          axiosInstance
            .get(`/departments/departments/${res.data.department}/`)
            .then((dept) => {
              setDepartmentName(dept.data.name);
            });
        }

      });

  }, [id]);

  if (!teacher) {
    return <p className="text-center py-10">Loading...</p>;
  }

  const imageUrl = teacher.image
    ? teacher.image.startsWith("http")
      ? teacher.image
      : `${API_BASE}${teacher.image}`
    : "/default-avatar.png";

  return (
    <>
      <SubPageHeader title="Teacher Profile" />

      <div className="max-w-6xl mx-auto flex gap-6 mt-8">

        {/* LEFT SIDEBAR */}
        <div className="w-1/4 shrink-0">
          <ImportantLinks />
        </div>

        {/* RIGHT CONTENT */}
        <div className="w-3/4">

  {/* DEPARTMENT HEADER CARD */}
{departmentName && (
  <div className="px-4 mb-6">
    <div className="bg-orange-500 text-white text-center py-2 font-semibold rounded shadow">
       {departmentName}
    </div>
  </div>
)}

          {/* TEACHER CARD */}
          <div className="text-center mb-8">

            <div className="inline-block border border-yellow-400 p-6 bg-white shadow-sm rounded">

              <img
                src={imageUrl}
                alt={teacher.name}
                className="w-36 h-36 rounded-full border-4 border-blue-300 mx-auto object-cover"
              />

              <h2 className="mt-3 font-semibold text-lg text-gray-800">
                {teacher.name}
              </h2>

              <p className="text-sm text-gray-600">
                {teacher.designation}
              </p>

            </div>

          </div>

          {/* PROFILE TABLE */}
          <div className="border border-yellow-400 rounded-xl overflow-hidden mb-10 bg-white shadow-sm">

            <div className="bg-orange-500 text-white text-center py-3 font-semibold">
              Profile of The Teacher
            </div>

            <table className="w-full text-sm">

              <tbody>

                <tr className="border-b">
                  <td className="p-3 font-medium w-1/3">Name</td>
                  <td className="p-3">{teacher.name}</td>
                </tr>

                <tr className="border-b">
                  <td className="p-3 font-medium">Position</td>
                  <td className="p-3">{teacher.designation}</td>
                </tr>

                <tr className="border-b">
                  <td className="p-3 font-medium">Govt ID</td>
                  <td className="p-3">{teacher.gov_id}</td>
                </tr>

                <tr className="border-b">
                  <td className="p-3 font-medium">BCS Batch</td>
                  <td className="p-3">{teacher.bcs_batch}</td>
                </tr>

                <tr className="border-b">
                  <td className="p-3 font-medium">Email</td>
                  <td className="p-3">{teacher.email}</td>
                </tr>

                <tr className="border-b">
                  <td className="p-3 font-medium">Mobile</td>
                  <td className="p-3">{teacher.mobile}</td>
                </tr>

                <tr className="border-b">
                  <td className="p-3 font-medium">Facebook</td>
                  <td className="p-3">
                    <a
                      href={teacher.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {teacher.facebook}
                    </a>
                  </td>
                </tr>

                <tr>
                  <td className="p-3 font-medium">WhatsApp</td>
                  <td className="p-3">{teacher.whatsapp}</td>
                </tr>

              </tbody>

            </table>

          </div>

          {/* POSTING DETAILS */}
          <div className="border border-yellow-400 rounded-xl overflow-hidden bg-white shadow-sm">

            <div className="bg-orange-500 text-white text-center py-3 font-semibold">
              Posting Details
            </div>

            <table className="w-full text-sm">

              <thead className="bg-gray-100">

                <tr>
                  <th className="p-3 text-left">SL</th>
                  <th className="p-3 text-left">Name of the College</th>
                  <th className="p-3 text-left">Joining Date</th>
                  <th className="p-3 text-left">Release Date</th>
                </tr>

              </thead>

              <tbody>

                {teacher.postings?.length > 0 ? (
                  teacher.postings.map((post, index) => (
                    <tr key={post.id} className="border-b">

                      <td className="p-3">{index + 1}</td>

                      <td className="p-3">
                        {post.college_name}
                      </td>

                      <td className="p-3">
                        {post.joining_date}
                      </td>

                      <td className="p-3">
                        {post.release_date || "Present"}
                      </td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="p-4 text-center text-gray-500"
                    >
                      No posting history available
                    </td>
                  </tr>
                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>
    </>
  );
}