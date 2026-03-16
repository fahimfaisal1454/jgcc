// components/ImportantLinks.jsx
const links = [
  "Education Ministry",
  "Directorate of Secondary and Higher Education",
  "National Curriculum and Textbook Board",
  "Jashore Board",
  "Education Board Results",
  "National University",
  "National University Results",
  "National Web Portal",
  "Online News Papers",
  "Bangla Library",
];

const ImportantLinks = () => {
  return (
    <div className="w-72 bg-white shadow">
      <div className="bg-orange-500 text-white font-bold px-4 py-2">
        Important Links
      </div>

      <ul className="text-sm">
        {links.map((link, index) => (
          <li
            key={index}
            className="border-b px-4 py-2 hover:bg-gray-100 cursor-pointer"
          >
            ▪ {link}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ImportantLinks;