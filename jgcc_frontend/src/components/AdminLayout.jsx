// components/AdminLayout.jsx
import SubPageHeader from "./SubPageHeader";
import ImportantLinks from "./ImportantLinks";

const AdminLayout = ({ title, children }) => {
  return (
    <div className="bg-gray-100">
      <SubPageHeader title={title} />

      <div className="max-w-6xl mx-auto flex gap-6 py-8">
        <ImportantLinks />

        <div className="flex-1 bg-white shadow-md">
          <div className="bg-[#f39c12] text-white text-center font-semibold py-3 text-lg">
            {title}
          </div>

          <div className="p-8">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;