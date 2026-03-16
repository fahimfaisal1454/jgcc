const Footer = () => {
  return (
    <footer className="bg-black text-white py-6">
      <div className="max-w-[1350px] mx-auto px-4">

        <div className="flex flex-col md:flex-row justify-between items-center text-sm">

          {/* Left / Center Text */}
          <div className="text-center md:text-left space-y-1">
            <p>
              Copyright © 2024 যশোর সরকারি সিটি কলেজ
            </p>

            <p className="text-blue-400">
            
            </p>

            <p className="text-blue-400">
              
            </p>
          </div>

          {/* Right Side */}
          <div className="mt-4 md:mt-0">
            <p>
              Powered By:{" "}
              <span className="text-white font-medium">
                Utshab Technology Ltd.
              </span>
            </p>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;