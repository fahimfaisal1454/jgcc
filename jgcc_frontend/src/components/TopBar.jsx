const TopBar = () => {
  return (
    <div className="bg-[#44aeea] text-white text-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 h-10">
        
        {/* Left Side */}
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2">
            <span>📞</span>
            <span>+8802477761279</span>
          </span>

          <span className="flex items-center gap-2">
            <span>✉</span>
            <span>govcitycollegejessore@gmail.com</span>
          </span>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-6">
          <a href="#" className="hover:underline">
            Admin Login
          </a>
          <a href="#" className="hover:underline">
            View Old Website
          </a>
        </div>

      </div>
    </div>
  );
};

export default TopBar;