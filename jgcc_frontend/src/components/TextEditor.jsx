import { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const TextEditor = ({ value, onChange }) => {

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  useEffect(() => {

    if (!quillRef.current) {

      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        modules: {
          toolbar: [
            [{ font: [] }],
            [{ size: [] }],
            ["bold", "italic", "underline"],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
            ["clean"]
          ]
        }
      });

      quillRef.current.on("text-change", () => {

        const html = quillRef.current.root.innerHTML;
        onChange(html);

      });

    }

  }, []);

  useEffect(() => {

    if (quillRef.current && value !== quillRef.current.root.innerHTML) {
      quillRef.current.root.innerHTML = value || "";
    }

  }, [value]);

  return (
    <div className="bg-white">
      <div ref={editorRef} style={{ height: "300px" }} />
    </div>
  );
};

export default TextEditor;