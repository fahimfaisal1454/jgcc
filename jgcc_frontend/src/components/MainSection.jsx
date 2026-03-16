import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosInstance from "../axiosInstance";
import img4 from "../assets/4.jpeg";
import img1 from "../assets/1.jpeg";
import img2 from "../assets/2.jpeg";
import img3 from "../assets/3.jpeg";


const MainSection = () => {

  const [principal, setPrincipal] = useState(null);
  const [vicePrincipal, setVicePrincipal] = useState(null);
  const [notices, setNotices] = useState([]);
  const [administrationLinks, setAdministrationLinks] = useState([]);
  const [facultyGroups, setFacultyGroups] = useState([]);


useEffect(() => {
  const fetchData = async () => {
    try {
      const principalRes = await axiosInstance.get("/principal/");
      const viceRes = await axiosInstance.get("/vice-principal/");
      const noticeRes = await axiosInstance.get("/notices/");
      const facultyRes = await axiosInstance.get("/departments/faculty-groups/");

      setPrincipal(principalRes.data);
      setVicePrincipal(viceRes.data);
      setNotices(noticeRes.data.slice(0, 7));
      setFacultyGroups(facultyRes.data);
      setAdministrationLinks([
        { name: "অধ্যক্ষ", link: "/administration/principal" },
        { name: "উপাধ্যক্ষ", link: "/administration/vice-principal" },
        { name: "প্রাক্তন অধ্যক্ষবৃন্দ", link: "/administration/former-principals" },
        { name: "শিক্ষক পরিষদ", link: "/administration/teachers-council" },
        { name: "একাডেমিক কাউন্সিল", link: "/administration/academic-council" },
      ]);


    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  fetchData();
}, []);
  return (
    <div className="bg-[#efefef] py-6">
      <div className="max-w-[1350px] mx-auto px-4">
        <div className="grid grid-cols-12 gap-6">

          {/* ================= LEFT SIDEBAR ================= */}
          <div className="col-span-3 space-y-6">

            {/* National Anthem Video */}
            <div className="bg-white shadow-sm">
              <video controls className="w-full h-48 object-cover">
                <source src="/national-anthem.mp4" type="video/mp4" />
              </video>
            </div>

            {/* Our Services */}
            <div className="bg-white shadow-sm">
              <div className="bg-[#f39c12] text-white font-semibold px-4 py-2">
                Our Services
              </div>
              <ul className="p-4 space-y-2 text-sm">
                {[
                  "Internal Exam Result",
                  "XI Admission",
                  "XI Admission Form",
                  "Online Payment",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 hover:text-orange-600 cursor-pointer">
                    <span className="text-green-600 text-sm">✔</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Important Links */}
            <div className="bg-white shadow-sm">
              <div className="bg-[#f39c12] text-white font-semibold text-center py-2">
                Important Links
              </div>
              <ul className="px-4 py-3 text-sm">
                {[
                  "Education Ministry",
                  "Directorate of Secondary and Higher Education",
                  "National Curriculum and Textbook Board",
                  "Jashore Board",
                  "Education Board Results",
                  "National University",
                  "National University Results",
                  "Jonmo Nibondhon Check",
                  "Online News Papers",
                  "Bangla Library",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 py-2 border-b border-gray-300 hover:text-orange-600 cursor-pointer"
                  >
                    <span className="text-[#f39c12]">✔</span>
                    {item}
                  </li>
                ))}
              </ul>

              {/* Social Media */}
              <div className="bg-[#f39c12] text-white font-semibold text-center py-2 mt-4">
                Find Us in Social Media
              </div>
              <ul className="px-4 py-3 text-sm">
                {["Facebook Id", "Facebook Page", "Facebook Group"].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 py-2 border-b border-gray-300 hover:text-orange-600 cursor-pointer"
                  >
                    <span className="text-[#f39c12]">✔</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ================= MIDDLE CONTENT ================= */}
          <div className="col-span-6 space-y-6">

            {/* College Administration */}
            <div className="bg-white shadow-sm border p-5">
              <h2 className="text-lg font-semibold mb-4 border-b pb-2">
                কলেজ প্রশাসন
              </h2>

              <div className="flex gap-5">
                <img
                  src={img4}
                  className="w-64 h-40 object-cover border"
                  alt=""
                />

<ul className="space-y-3 text-sm">
  {administrationLinks.map((item, i) => (
    <li key={i}>
      <Link
        to={item.link}
        className="flex items-center gap-3 hover:text-orange-600"
      >
        <span className="w-0 h-0 border-t-[6px] border-b-[6px] border-l-[8px] border-t-transparent border-b-transparent border-l-[#f39c12]" />
        {item.name}
      </Link>
    </li>
  ))}
</ul>
              </div>
            </div>

            {/* Departments */}
            <div className="bg-white shadow-sm border p-5">
              <h2 className="text-lg font-semibold mb-4 border-b pb-2">
                বিভাগসমূহ
              </h2>

              <div className="flex gap-5">
                <img
                  src={img2}
                  className="w-64 h-40 object-cover border"
                  alt=""
                />

<ul className="space-y-3 text-sm">
  {facultyGroups.map((group) => (
    <li key={group.id}>
      <Link
        to={`/departments/${group.slug}`}
        className="flex items-center gap-3 hover:text-orange-600"
      >
        <span className="w-0 h-0 border-t-[6px] border-b-[6px] border-l-[8px] border-t-transparent border-b-transparent border-l-[#f39c12]" />
        {group.name}
      </Link>
    </li>
  ))}
</ul>
              </div>
            </div>

{/* Latest Notices */}
<div className="bg-white border">

  {/* Header */}
  <div className="relative h-[130px] flex items-center justify-center bg-[#efefef] border-b">

    {/* Globe */}
    <img
      src={img3}
      alt="globe"
      className="absolute left-0 top-0 h-full object-cover"
    />

    {/* Title */}
    <h2 className="text-2xl font-semibold">
      সাম্প্রতিক নোটিশ
    </h2>

    {/* Button */}
    <button className="absolute right-6 bg-[#f39c12] text-white text-sm px-4 py-1 rounded-full hover:bg-orange-600">
      সকল
    </button>

  </div>

  {/* Notice List */}
  <ul className="text-[15px] text-gray-700 px-6 py-4">
    {notices.map((notice) => (
      <li
        key={notice.id}
        className="flex items-center gap-3 py-2 border-b last:border-none hover:text-orange-600"
      >
        <span className="w-0 h-0 border-t-[6px] border-b-[6px] border-l-[8px] border-t-transparent border-b-transparent border-l-[#f39c12]" />

        <a
          href={notice.file}
          target="_blank"
          rel="noopener noreferrer"
        >
          {notice.title}
        </a>
      </li>
    ))}
  </ul>

</div>
            {/* Academic Section */}
            <div className="bg-white border shadow-sm p-5">
              <h2 className="text-lg font-semibold border-b pb-2 mb-4">
                একাডেমিক
              </h2>

              <div className="flex gap-5 items-center">
                <img
                  src={img1}
                  className="w-52 h-40 object-contain"
                  alt=""
                />

                <ul className="space-y-3 text-sm">
                  {[
                    "এইচ এস সি",
                    "ডিগ্রী (পাস)",
                    "সম্মান",
                    "মাস্টার্স",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <span className="w-0 h-0 border-t-[6px] border-b-[6px] border-l-[8px] border-l-[#f39c12]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

        

          </div>

          {/* ================= RIGHT SIDEBAR ================= */}
          <div className="col-span-3 space-y-6">

            {/* Principal */}
            <div className="bg-white shadow-sm p-6 text-center relative">
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#f39c12]" />
              <img
                src={principal?.image || "/principal.jpg"}
                className="w-40 h-40 mx-auto rounded-full border-4 border-blue-300 object-cover"
                alt=""
              />
              <h3 className="mt-4 font-semibold">
                {principal?.position || "Principal"}
              </h3>
              <p className="text-gray-600 text-sm">
                {principal?.name || "Loading..."}
              </p>
            </div>

            {/* Vice Principal */}
            <div className="bg-white shadow-sm p-6 text-center relative">
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#f39c12]" />
              <img
                src={vicePrincipal?.image || "/vice.jpg"}
                className="w-40 h-40 mx-auto rounded-full border-4 border-blue-300 object-cover"
                alt=""
              />
              <h3 className="mt-4 font-semibold">
                {vicePrincipal?.position || "Vice Principal"}
              </h3>
              <p className="text-gray-600 text-sm">
                {vicePrincipal?.name || "Loading..."}
              </p>
            </div>

{/* Map */}
<div className="bg-white shadow-sm">
  <div className="bg-[#f39c12] text-white text-center py-2 font-semibold">
    Get Direction
  </div>

  <div className="h-56">
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1834.1251350211269!2d89.22208094231289!3d23.16106413494365!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ff11af14569fc5%3A0xcd1dc1c4d817a464!2sJashore%20Government%20City%20College!5e0!3m2!1sen!2sus!4v1773488344015!5m2!1sen!2sus"
      className="w-full h-full border-0"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      allowFullScreen
      title="JGCC Location"
    ></iframe>
  </div>
</div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default MainSection;