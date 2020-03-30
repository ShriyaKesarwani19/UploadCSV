import React, { Fragment, useState } from "react";
import axios from "axios";

const FileUpload = () => {
  const [jirano, setJirano] = useState("");
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Choose File");
  const [uploadedFile, setUploadedFile] = useState({});

  const onChange = e => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const jiraonChange = e => {
    setJirano(e.target.value);
  };

  const onSubmit = async e => {
    e.preventDefault();
    let request = {
      jira: document.getElementById("jira").value
    };
    const formData = new FormData();
    formData.append("file", file);
    formData.append("jirano", request.jira);

    try {
      const res = await axios.post("http://localhost:5000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      const { fileName, filePath } = res.data;
      setUploadedFile({ fileName, filePath });
    } catch (err) {
      if (err.response.status === 500) {
        console.log("There was a problem with the server");
      } else {
        console.log(err.response.data.msg);
      }
    }
  };
  return (
    <Fragment>
      <form onSubmit={onSubmit}>
        <div className="form-group mb-4">
          <input
            type="text"
            className="form-control"
            placeholder="Enter Jira number"
            name="jirano"
            id="jira"
            onChange={jiraonChange}
          />
        </div>
        <div className="custom-file mb-4">
          <input
            type="file"
            className="custom-file-input"
            id="customFile"
            onChange={onChange}
          />
          <label className="custom-file-label" htmlFor="customFile">
            {filename}
          </label>
        </div>
        <p>{jirano}</p>
        <input
          type="submit"
          value="Upload"
          className="btn btn-primary float-left"
        />
        <input
          type="submit"
          value="Update"
          className="btn btn-primary float-right"
        />
      </form>
    </Fragment>
  );
};

export default FileUpload;
