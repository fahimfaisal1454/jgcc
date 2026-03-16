import { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import AxiosInstance from "../../axiosInstance";

const ContactUs = () => {
  const [contactInfo, setContactInfo] = useState(null);

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    subject: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  // ✅ Fetch Contact Info
  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const res = await AxiosInstance.get("contact/info/");
        setContactInfo(res.data);
      } catch (error) {
        console.error("Error fetching contact info:", error);
      }
    };

    fetchInfo();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ Send Message to Backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");

    try {
      await AxiosInstance.post("contact/send/", formData);

      setSuccess("Message sent successfully!");

      setFormData({
        full_name: "",
        email: "",
        subject: "",
        phone: "",
        message: "",
      });

    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout title="Contact Us">
      <div className="bg-white shadow-sm">

        {/* <div className="bg-orange-500 text-white py-2 text-center font-semibold">
          Contact Us
        </div> */}

        <div className="p-6 space-y-6">

          {/* ✅ Dynamic College Info */}
          {contactInfo && (
            <div className="text-gray-700 space-y-2">
              <h3 className="font-semibold text-lg">{contactInfo.title}</h3>
              <p>{contactInfo.college_name}</p>
              <p>📍 {contactInfo.address}</p>
              <p>📞 {contactInfo.phone}</p>
              <p>✉ {contactInfo.email}</p>
            </div>
          )}

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-4">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="full_name"
                  required
                  value={formData.full_name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-3 py-2 mt-1 text-sm"
                />
              </div>

              <div>
                <label className="text-sm font-medium">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-3 py-2 mt-1 text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-3 py-2 mt-1 text-sm"
                />
              </div>

              <div>
                <label className="text-sm font-medium">
                  Phone Number *
                </label>
                <input
                  type="text"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-3 py-2 mt-1 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">
                Messages / Questions *
              </label>
              <textarea
                name="message"
                required
                rows="5"
                value={formData.message}
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 py-2 mt-1 text-sm"
              />
            </div>

            {success && (
              <div className="text-green-600 text-sm">
                {success}
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-6 py-2 text-sm hover:bg-blue-700 transition"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </div>

          </form>

        </div>
      </div>
    </AdminLayout>
  );
};

export default ContactUs;