import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [active, setActive] = useState(null);
  const [subActive, setSubActive] = useState(null);

  const closeMenu = () => {
    setActive(null);
    setSubActive(null);
  };

  const menu = [
    { name: "Home", path: "/" },

    {
      name: "Administration",
      dropdown: [
        { name: "Principal", path: "/administration/principal" },
        { name: "Vice Principal", path: "/administration/vice-principal" },
        { name: "Former Principals", path: "/administration/former-principals" },
        { name: "Teacher’s Council", path: "/administration/teachers-council" },
        { name: "Academic Council", path: "/administration/academic-council" },
      ],
    },

    {
      name: "About Us",
      dropdown: [
        { name: "History of the College", path: "/about/history" },
        { name: "The College at a Glance", path: "/about/at-a-glance" },
        { name: "Citizen Charter", path: "/about/citizen-charter" },
      ],
    },

    {
      name: "Academic",
      dropdown: [
        { name: "HSC", path: "/academic/hsc" },
        { name: "Degree (Pass)", path: "/academic/degree" },
        { name: "Honours", path: "/academic/honours" },
        { name: "Master’s", path: "/academic/masters" },
      ],
    },

    {
      name: "Departments",
      dropdown: [
        {
          name: "Science",
          sub: [
            { name: "Department of Physics", path: "/departments/science/physics" },
            { name: "Department of Chemistry", path: "/departments/science/chemistry" },
            { name: "Department of Mathematics", path: "/departments/science/mathematics" },
            { name: "Department of Botany", path: "/departments/science/botany" },
            { name: "Department of Zoology", path: "/departments/science/zoology" },
          ],
        },
        {
          name: "Business Studies",
          sub: [
            { name: "Department of Accounting", path: "/departments/business/accounting" },
            { name: "Department of Management", path: "/departments/business/management" },
          ],
        },
        {
          name: "Arts",
          sub: [
            { name: "Department of Bangla", path: "/departments/arts/bangla" },
            { name: "Department of English", path: "/departments/arts/english" },
          ],
        },
        {
          name: "Social Science",
          sub: [
            { name: "Department of Economics", path: "/departments/social/economics" },
            { name: "Department of Sociology", path: "/departments/social/sociology" },
          ],
        },
        {
          name: "ICT",
          sub: [
            { name: "Department of ICT", path: "/departments/ict/ict" },
          ],
        },
      ],
    },

    {
  name: "XI Admission",
  external: true,
  path: "https://admission.studentsheba.com/login",
},
{
  name: "Notices",
  dropdown: [
    { name: "General Notice", path: "/notices/general" },
    { name: "Office Orders", path: "/notices/office" },
  ],
},

    { name: "Writer’s Corner", path: "/writers-corner" },
    { name: "Contact Us", path: "/contact" },

    {
      name: "Online Fees",
      dropdown: [
        { name: "HSC Online Fees" },
        { name: "University Fees" },
      ],
    },
  ];

  return (
    <div className="relative z-50 bg-white border-t border-gray-200">
      <div className="max-w-[1000px] mx-auto relative">
        <ul className="flex justify-center gap-8 py-3 text-[11px] font-bold">
          {menu.map((item, index) => (
            <li
              key={index}
              className="relative"
              onMouseEnter={() => setActive(index)}
              onMouseLeave={() => closeMenu()}
            >
              {/* TOP LEVEL */}
              {item.path ? (
                <Link
                  to={item.path}
                  onClick={closeMenu}
                  className="hover:text-yellow-600 transition"
                >
                  {item.name}
                </Link>
              ) : (
                <div className="cursor-pointer hover:text-yellow-600 transition">
                  {item.name}
                  {item.dropdown && <span className="ml-1 text-[10px]">▼</span>}
                </div>
              )}

              {/* LEVEL 1 DROPDOWN */}
              {item.dropdown && active === index && (
                <div className="absolute left-0 top-full w-56 bg-[#d8c7a3] shadow-2xl z-[9999]">
                  {item.dropdown.map((subItem, i) => {
                    // SIMPLE DROPDOWN
                    if (!subItem.sub) {
                      return subItem.path ? (
                        <Link
                          key={i}
                          to={subItem.path}
                          onClick={closeMenu}
                          className="block px-4 py-3 border-b border-[#cbb98f] hover:bg-[#cbb98f]"
                        >
                          {subItem.name}
                        </Link>
                      ) : (
                        <div
                          key={i}
                          className="px-4 py-3 border-b border-[#cbb98f]"
                        >
                          {subItem.name}
                        </div>
                      );
                    }

                    // DROPDOWN WITH SUBMENU
                    return (
                      <div
                        key={i}
                        className="relative"
                        onMouseEnter={() => setSubActive(i)}
                        onMouseLeave={() => setSubActive(null)}
                      >
                        <div className="px-4 py-3 border-b border-[#cbb98f] hover:bg-[#cbb98f] flex justify-between items-center cursor-pointer">
                          {subItem.name}
                          <span>›</span>
                        </div>

                        {/* LEVEL 2 DROPDOWN */}
                        {subActive === i && (
                          <div className="absolute top-0 left-full w-60 bg-[#d8c7a3] shadow-2xl z-[9999]">
                            {subItem.sub.map((child, j) =>
                              child.path ? (
                                <Link
                                  key={j}
                                  to={child.path}
                                  onClick={closeMenu}
                                  className="block px-4 py-3 border-b border-[#cbb98f] hover:bg-[#cbb98f]"
                                >
                                  {child.name}
                                </Link>
                              ) : (
                                <div
                                  key={j}
                                  className="px-4 py-3 border-b border-[#cbb98f]"
                                >
                                  {child.name}
                                </div>
                              )
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Golden Bottom Line */}
      <div className="h-[3px] bg-yellow-600"></div>
    </div>
  );
};

export default Navbar;