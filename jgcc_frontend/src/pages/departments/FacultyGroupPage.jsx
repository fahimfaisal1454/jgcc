import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";
import ImportantLinks from "../../components/ImportantLinks";

const FacultyGroupPage = () => {

  const { groupSlug } = useParams();

  const [departments, setDepartments] = useState([]);
  const [groupName, setGroupName] = useState("");

  useEffect(() => {

    const fetchData = async () => {
      try {

        // get faculty groups
        const groupRes = await axiosInstance.get("/departments/faculty-groups/");
        const group = groupRes.data.find(g => g.slug === groupSlug);

        if (!group) return;

        setGroupName(group.name);

        // get all departments
        const deptRes = await axiosInstance.get("/departments/departments/");

        const filtered = deptRes.data.filter(
          dept => dept.faculty_group === group.id
        );

        setDepartments(filtered);

      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    fetchData();

  }, [groupSlug]);

  return (
    <div className="bg-[#efefef] py-8">

      <div className="max-w-[1200px] mx-auto grid grid-cols-12 gap-6">

        {/* LEFT SIDEBAR */}
        <div className="col-span-4">
          <ImportantLinks />
        </div>


        {/* RIGHT CONTENT */}
        <div className="col-span-8 bg-white shadow-sm border">

          <div className="bg-[#f39c12] text-white font-semibold text-center py-2">
            List of {groupName} Department
          </div>

          <ul className="p-5 space-y-3 text-sm">

            {departments.map((dept) => (

              <li key={dept.id} className="border-b pb-2">

                <Link
                  to={`/departments/${groupSlug}/${dept.slug}`}
                  className="flex items-center gap-3 hover:text-orange-600"
                >
                  <span className="w-0 h-0 border-t-[6px] border-b-[6px] border-l-[8px] border-t-transparent border-b-transparent border-l-[#f39c12]" />
                  {dept.name}
                </Link>

              </li>

            ))}

          </ul>

        </div>

      </div>

    </div>
  );
};

export default FacultyGroupPage;