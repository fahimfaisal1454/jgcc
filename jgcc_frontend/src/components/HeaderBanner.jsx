import { useState, useEffect } from "react";
import banner1 from "../assets/banner1.jpeg";
import banner2 from "../assets/banner2.jpeg";
import banner3 from "../assets/banner3.jpeg";
import leftLogo from "../assets/logo-left.png";
import rightLogo from "../assets/logo-right.png";

const images = [banner1, banner2, banner3];

const HeaderBanner = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">

      {/* Banner Image */}
      <img
        src={images[current]}
        alt="College Banner"
        className="w-full h-[480px] object-cover transition-all duration-700"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40">

        {/* Logos + Title Section */}
        <div className="absolute top-8 left-0 right-0 flex items-center justify-center">

          {/* Left Logo */}
<img
  src={leftLogo}
  alt="Left Logo"
  className="w-20 h-20 ml-6 rounded-full object-cover"
/>

          {/* College Name */}
          <div className="text-center">
            <h2 className="text-white text-3xl md:text-5xl font-semibold">
              যশোর সরকারি সিটি কলেজ, যশোর
            </h2>
            <h3 className="text-white text-xl md:text-3xl mt-2">
              Jashore Govt. City College, Jashore
            </h3>
          </div>

          {/* Right Logo */}
          <img
            src={rightLogo}
            alt="Right Logo"
            className="w-20 h-20 ml-6"
          />

        </div>

      </div>

      {/* Golden Bottom Line */}
      <div className="h-1 bg-yellow-600"></div>

    </div>
  );
};

export default HeaderBanner;