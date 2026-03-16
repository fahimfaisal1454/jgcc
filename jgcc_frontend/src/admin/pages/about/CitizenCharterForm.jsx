import { useEffect, useState } from "react";
import AxiosInstance from "../../../axiosInstance";
import TextEditor from "../../../components/TextEditor";

const CitizenCharterForm = () => {

  const [data, setData] = useState({
    id: null,
    title: "",
    content: ""
  });

  const [loading, setLoading] = useState(true);

  const fetchData = async () => {

    try {

      const res = await AxiosInstance.get("citizen-charter/");

      let page = res.data;

      if (Array.isArray(res.data)) {
        page = res.data[0];
      }

      if (res.data.results) {
        page = res.data.results[0];
      }

      if (page) {
        setData({
          id: page.id || null,
          title: page.title || "",
          content: page.content || ""
        });
      }

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {

    const { name, value } = e.target;

    setData(prev => ({
      ...prev,
      [name]: value
    }));

  };

  const handleContentChange = (value) => {

    setData(prev => ({
      ...prev,
      content: value
    }));

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!data.title.trim()) {
      alert("Title is required");
      return;
    }

    try {

      if (data.id) {

        await AxiosInstance.put(
          `citizen-charter/${data.id}/`,
          data
        );

      } else {

        await AxiosInstance.post(
          "citizen-charter/",
          data
        );

      }

      alert("Saved Successfully");

      fetchData();

    } catch (error) {

      console.error(error.response?.data);

    }

  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (

    <div className="p-6 max-w-5xl">

      <h1 className="text-2xl font-semibold mb-6">
        Citizen Charter
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">

        <div>

          <label className="block mb-2 font-medium">
            Page Title
          </label>

          <input
            type="text"
            name="title"
            value={data.title}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />

        </div>

        <div>

          <label className="block mb-2 font-medium">
            Page Content
          </label>

          <TextEditor
            value={data.content}
            onChange={handleContentChange}
          />

        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
        >
          Save
        </button>

      </form>

    </div>

  );

};

export default CitizenCharterForm;