const NewsTicker = () => {
  return (
    <div className="bg-white border-t-2 border-yellow-600 shadow-sm">

      <div className="max-w-[1000px] mx-auto flex items-center py-2">

        {/* Left Label */}
        <div className="text-red-600 font-bold text-sm mr-4 whitespace-nowrap">
          Latest News:
        </div>

        {/* Scrolling Area */}
        <div className="overflow-hidden relative w-full">
          <div className="whitespace-nowrap animate-marquee text-sm">

            <span className="text-blue-600">
              আন্তর্জাতিক পাসপোর্ট করার অনাপত্তি সনদ (NOC)
            </span>

            <span className="text-red-600 mx-6">
              উচ্চ মাধ্যমিক ২০২৪-২০২৫ শিক্ষাবর্ষের শিক্ষার্থীদের রেজিস্ট্রেশন কার্ড
            </span>

            <span className="text-blue-600">
              জনাব মোঃ আনোয়ার হোসেন
            </span>

          </div>
        </div>

      </div>
    </div>
  );
};

export default NewsTicker;