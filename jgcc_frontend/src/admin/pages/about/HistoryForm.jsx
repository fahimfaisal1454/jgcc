import { useEffect, useState } from "react";
import AxiosInstance from "../../../axiosInstance";
import TextEditor from "../../../components/TextEditor";

const HistoryForm = () => {

  const [history, setHistory] = useState({
    id: null,
    title: "",
    content: ""
  });

  const [loading, setLoading] = useState(true);

  const fetchData = async () => {

    try {

      const res = await AxiosInstance.get("history/");

      if (res.data && res.data.id) {
        setHistory(res.data);
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

    setHistory({
      ...history,
      [e.target.name]: e.target.value
    });

  };

  const handleContentChange = (value) => {

    setHistory({
      ...history,
      content: value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      if (history.id) {

        await AxiosInstance.put(`history/${history.id}/`, history);

      } else {

        await AxiosInstance.post("history/", history);

      }

      alert("History Updated Successfully");

      fetchData();

    } catch (error) {

      console.error(error);

    }

  };

  if (loading) {

    return <div className="p-6">Loading...</div>;

  }

  return (

    <div className="p-6 max-w-5xl">

      <h1 className="text-2xl font-semibold mb-6">
        History Page
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* TITLE */}

        <div>

          <label className="block mb-2 font-medium">
            Page Title
          </label>

          <input
            type="text"
            name="title"
            value={history.title}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />

        </div>

        {/* EDITOR */}

        <div>

          <label className="block mb-2 font-medium">
            Page Content
          </label>

          <TextEditor
            value={history.content}
            onChange={handleContentChange}
          />

        </div>

        {/* SAVE */}

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

export default HistoryForm;