import { useEffect, useState } from "react";
import AxiosInstance from "../../../axiosInstance";
import TextEditor from "../../../components/TextEditor";

const AtAGlanceForm = () => {

  const [data, setData] = useState({
    id: null,
    title: "",
    content: ""
  });

  const [loading, setLoading] = useState(true);

  const fetchData = async () => {

    try {

      const res = await AxiosInstance.get("at-a-glance/");

      if (res.data && res.data.id) {
        setData(res.data);
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

    setData({
      ...data,
      [e.target.name]: e.target.value
    });

  };

  const handleContentChange = (value) => {

    setData({
      ...data,
      content: value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      if (data.id) {
        await AxiosInstance.put(`at-a-glance/${data.id}/`, data);
      } else {
        await AxiosInstance.post("at-a-glance/", data);
      }

      alert("Saved Successfully");

      fetchData();

    } catch (error) {

      console.error(error);

    }

  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (

    <div className="p-6 max-w-5xl">

      <h1 className="text-2xl font-semibold mb-6">
        At A Glance
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

export default AtAGlanceForm;