import { useState, useEffect } from "react";
import AxiosInstance from "../../../axiosInstance";
import { useNavigate, useParams } from "react-router-dom";

const FacultyForm = () => {

  const navigate = useNavigate();
  const { id } = useParams(); // 👈 get teacher id

  const [facultyGroups, setFacultyGroups] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");

  const [formData, setFormData] = useState({
    department: "",
    name: "",
    designation: "",
    image: null,
    gov_id: "",
    bcs_batch: "",
    email: "",
    mobile: "",
    facebook: "",
    whatsapp: "",
    is_head: false,
    order: 0
  });

  const [postings, setPostings] = useState([
    {
      college_name: "",
      joining_date: "",
      release_date: ""
    }
  ]);

  // ================================
  // Fetch Faculty Groups
  // ================================
  useEffect(() => {

    AxiosInstance.get("departments/faculty-groups/")
      .then(res => setFacultyGroups(res.data));

  }, []);

  // ================================
  // Fetch Departments
  // ================================
  useEffect(() => {

    AxiosInstance.get("departments/departments/")
      .then(res => setDepartments(res.data));

  }, []);

  // ================================
  // Load teacher data for EDIT
  // ================================
  useEffect(() => {

    if (id) {

      AxiosInstance.get(`departments/faculty/${id}/`)
        .then(res => {

          const data = res.data;

          setFormData({
            department: data.department,
            name: data.name,
            designation: data.designation,
            image: null,
            gov_id: data.gov_id || "",
            bcs_batch: data.bcs_batch || "",
            email: data.email || "",
            mobile: data.mobile || "",
            facebook: data.facebook || "",
            whatsapp: data.whatsapp || "",
            is_head: data.is_head,
            order: data.order
          });

          setPostings(data.postings || []);

          const dept = departments.find(d => d.id === data.department);

          if (dept) {
            setSelectedGroup(dept.faculty_group);
          }

        });

    }

  }, [id, departments]);

  // ================================
  // Filter Departments
  // ================================
  const filteredDepartments = departments.filter(
    d => d.faculty_group === Number(selectedGroup)
  );

  const handleChange = (e) => {

    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox") {

      setFormData({
        ...formData,
        [name]: checked
      });

    } else if (type === "file") {

      setFormData({
        ...formData,
        image: files[0]
      });

    } else {

      setFormData({
        ...formData,
        [name]: value
      });

    }

  };

  // ================================
  // Posting change
  // ================================
  const handlePostingChange = (index, field, value) => {

    const updated = [...postings];
    updated[index][field] = value;

    setPostings(updated);

  };

  const addPosting = () => {

    setPostings([
      ...postings,
      {
        college_name: "",
        joining_date: "",
        release_date: ""
      }
    ]);

  };

  // ================================
  // Submit
  // ================================
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const data = new FormData();

      Object.keys(formData).forEach(key => {
        data.append(key, formData[key]);
      });

      let facultyId;

      // EDIT
      if (id) {

        const res = await AxiosInstance.put(
          `departments/faculty/${id}/`,
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }
        );

        facultyId = res.data.id;

      }
      // CREATE
      else {

        const res = await AxiosInstance.post(
          "departments/faculty/",
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }
        );

        facultyId = res.data.id;

      }

      // Save posting history
      for (let post of postings) {

        if (post.college_name && post.joining_date) {

          await AxiosInstance.post(
            "departments/faculty-postings/",
            {
              faculty: facultyId,
              college_name: post.college_name,
              joining_date: post.joining_date,
              release_date: post.release_date || null
            }
          );

        }

      }

      alert("Teacher saved successfully ✅");

      navigate("/cms/faculty");

    } catch (error) {

      console.error(error);
      alert("Error saving teacher ❌");

    }

  };

  return (

    <div>

      <h2 className="text-2xl font-bold mb-6">
        {id ? "Edit Teacher" : "Add Teacher"}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow space-y-4"
      >

        {/* Faculty Group */}
        <select
          className="w-full border p-2"
          value={selectedGroup}
          onChange={(e) => setSelectedGroup(e.target.value)}
        >

          <option value="">
            Select Faculty Group
          </option>

          {facultyGroups.map(group => (
            <option key={group.id} value={group.id}>
              {group.name}
            </option>
          ))}

        </select>

        {/* Department */}
        <select
          name="department"
          className="w-full border p-2"
          value={formData.department}
          onChange={handleChange}
        >

          <option value="">
            Select Department
          </option>

          {filteredDepartments.map(dept => (
            <option key={dept.id} value={dept.id}>
              {dept.name}
            </option>
          ))}

        </select>

        <input name="name" value={formData.name} placeholder="Teacher Name" className="w-full border p-2" onChange={handleChange} />
        <input name="designation" value={formData.designation} placeholder="Designation" className="w-full border p-2" onChange={handleChange} />
        <input name="gov_id" value={formData.gov_id} placeholder="Government ID" className="w-full border p-2" onChange={handleChange} />
        <input name="bcs_batch" value={formData.bcs_batch} placeholder="BCS Batch" className="w-full border p-2" onChange={handleChange} />
        <input name="email" value={formData.email} placeholder="Email" className="w-full border p-2" onChange={handleChange} />
        <input name="mobile" value={formData.mobile} placeholder="Mobile" className="w-full border p-2" onChange={handleChange} />
        <input name="facebook" value={formData.facebook} placeholder="Facebook URL" className="w-full border p-2" onChange={handleChange} />
        <input name="whatsapp" value={formData.whatsapp} placeholder="WhatsApp Number" className="w-full border p-2" onChange={handleChange} />

        <input type="file" name="image" className="w-full border p-2" onChange={handleChange} />

        <input type="number" name="order" value={formData.order} placeholder="Display Order" className="w-full border p-2" onChange={handleChange} />

        <label className="flex items-center gap-2">
          <input type="checkbox" name="is_head" checked={formData.is_head} onChange={handleChange} />
          Head of Department
        </label>

        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Save Teacher
        </button>

      </form>

    </div>

  );

};

export default FacultyForm;