// components/SubPageHeader.jsx
const SubPageHeader = ({ title }) => {
  return (
    <div
      className="relative h-40 flex flex-col items-center justify-center text-white"
      style={{
        backgroundImage: "url('/images/book-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/60"></div>

      <h1 className="relative text-3xl font-serif font-bold">
        {title}
      </h1>

      <div className="relative text-sm mt-2 flex gap-6">
        <span>Phone No: +8802477761279</span>
        <span>Email: govtcitycollegejessore@gmail.com</span>
      </div>
    </div>
  );
};

export default SubPageHeader;