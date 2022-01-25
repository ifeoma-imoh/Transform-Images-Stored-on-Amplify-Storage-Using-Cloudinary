import "./App.css";
import { useState } from "react";
import Amplify, { Storage } from "aws-amplify";
import config from "./aws-exports";
import TransformImage from "./components/TransformImage";

Amplify.configure(config);

function App() {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [key, setKey] = useState("");

  const handleSelectFile = (e) => setFile(e.target.files[0]);
  const handleUpload = async () => {
    try {
      setLoading(true);
      const res = await Storage.put(`${file.name}`, file);
      console.log({ res });
      setKey(res.key);
      alert("upload successful");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };
  let choosenFileURL;
  if (file) {
    choosenFileURL = window.URL.createObjectURL(file);
  }
  // console.log({ URL: choosenFileURL, file });

  return (
    <div className="App">
      <label htmlFor="file" className="btn-grey">
        {" "}
        select image
      </label>
      {file && (
        <div>
          <img width={300} alt="sample" src={choosenFileURL} />
          <center> {file.name}</center>
        </div>
      )}
      <input
        id="file"
        type="file"
        onChange={handleSelectFile}
        multiple={false}
      />
      {file && (
        <>
          <button onClick={handleUpload} className="btn-green">
            {loading ? "uploading..." : "upload to s3 bucket"}
          </button>
        </>
      )}
      {key && <TransformImage imageKey={key} />}
    </div>
  );
}

export default App;
