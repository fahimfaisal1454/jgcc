import { useEffect, useState } from "react";
import AxiosInstance from "../../../axiosInstance";

const ContactPage = () => {

  const [contactInfo, setContactInfo] = useState({
    title: "",
    college_name: "",
    address: "",
    phone: "",
    email: "",
  });

  const [messages, setMessages] = useState([]);

  // Load contact info
  const fetchContactInfo = async () => {
    const res = await AxiosInstance.get("contact/info/");
    if (res.data) setContactInfo(res.data);
  };

  // Load messages
  const fetchMessages = async () => {
    const res = await AxiosInstance.get("contact/messages/");
    setMessages(res.data);
  };

  useEffect(() => {
    fetchContactInfo();
    fetchMessages();
  }, []);

  const handleChange = (e) => {
    setContactInfo({
      ...contactInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await AxiosInstance.post("contact/info/", contactInfo);
    alert("Contact info updated");
  };

  return (
    <div>

      <h2 className="text-2xl font-bold mb-6">Contact Management</h2>

      {/* Contact Info Section */}
      <div className="bg-white p-6 rounded shadow mb-8">
        <h3 className="text-xl font-semibold mb-4">Contact Information</h3>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            name="title"
            value={contactInfo.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full border p-2 rounded"
          />

          <input
            name="college_name"
            value={contactInfo.college_name}
            onChange={handleChange}
            placeholder="College Name"
            className="w-full border p-2 rounded"
          />

          <textarea
            name="address"
            value={contactInfo.address}
            onChange={handleChange}
            placeholder="Address"
            className="w-full border p-2 rounded"
          />

          <input
            name="phone"
            value={contactInfo.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="w-full border p-2 rounded"
          />

          <input
            name="email"
            value={contactInfo.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full border p-2 rounded"
          />

          <button className="bg-blue-600 text-white px-6 py-2 rounded">
            Save
          </button>

        </form>
      </div>

      {/* Contact Messages Section */}
      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-xl font-semibold mb-4">Contact Messages</h3>

        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Subject</th>
              <th className="p-2 border">Phone</th>
              <th className="p-2 border">Message</th>
            </tr>
          </thead>

          <tbody>
            {messages.map((msg) => (
              <tr key={msg.id}>
                <td className="p-2 border">{msg.full_name}</td>
                <td className="p-2 border">{msg.subject}</td>
                <td className="p-2 border">{msg.phone}</td>
                <td className="p-2 border">{msg.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default ContactPage;