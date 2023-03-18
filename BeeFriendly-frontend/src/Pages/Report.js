import React, { useState, useEffect } from "react";
import arrow from "../Images/arrow.png";
import dashed from "../Images/dashedline.png";
const MAX_COUNT = 5;

function AnnonceFormPage(props) {
  const [inputs, setInputs] = useState({});
  const [refresh, setRefresh] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [fileLimit, setFileLimit] = useState(false);
  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
    console.log(inputs);
    setRefresh(!refresh);
  }
  useEffect(() => {
    console.log(uploadedFiles);
  }, [refresh]);

  const handleSubmit = (event) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        descHiveValue: inputs.descHiveValue,
        locationValue: inputs.locationValue,
        dateListedValue: inputs.dateListedValue,
        imageFile: uploadedFiles[0],
      }),
    };

    const formData = new FormData();
    formData.append("desc_hive", inputs.descHiveValue);
    formData.append("location", inputs.locationValue);
    formData.append("date_listed", inputs.dateListedValue);
    formData.append("image", inputs.imageFile);
    console.log(formData);
    fetch("http://127.0.0.1:8000/hives", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        // handle response
        return response.json();
      })
      .catch((error) => {
        // handle error
      });

    // fetch("http://127.0.0.1:8000/api/saveannounce/", requestOptions)
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((data) => {
    //     for (let f of uploadedFiles) {
    //       let uploadData = new FormData();
    //       uploadData.append("code", data.announceCode);
    //       uploadData.append("imgFile", f);
    //       fetch("http://127.0.0.1:8000/api/saveimgs/", {
    //         method: "POST",
    //         body: uploadData,
    //       })
    //         .then((res) => console.log(res))
    //         .catch((error) => console.log(error));
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  const handleUploadFiles = (files) => {
    const uploaded = [...uploadedFiles];
    let limitExceeded = false;
    files.some((file) => {
      if (uploaded.findIndex((f) => f.name === file.name) === -1) {
        uploaded.push(file);
        if (uploaded.length === MAX_COUNT) {
          setFileLimit(true);
        }
        if (uploaded.length > MAX_COUNT) {
          alert(`You can only add a maximum of ${MAX_COUNT} files`);
          setFileLimit(false);
          limitExceeded = true;
          return true;
        }
      }
    });
    if (!limitExceeded) {
      setUploadedFiles(uploaded);
      setRefresh(!refresh);
    }
  };

  const handleFileEvent = (e) => {
    const chosenFiles = Array.prototype.slice.call(e.target.files);
    handleUploadFiles(chosenFiles);
  };

  return (
    <div className="example w-screen h-[1300px] overflow-auto flex flex-col gap-10">
      <div className=" mt-10 mx-auto flex flex-row items-center justify-between  ">
        <img src={arrow} alt="" />
        <div className="flex flex-col justify-center items-center gap-4 ">
          <h1 className="text-3xl font-bold text-gris"> Report A hive </h1>
          <img src={dashed} className=" w-64 " alt="" />
        </div>
        <div></div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-[390px] md:w-[850px] lg:w-[1220px] h-[1120px] md:h-[950px] shadow-lg mx-auto py-6 md:py-8 lg:py-10 px-7 md:px-14 lg:px-16 flex flex-col gap-5"
      >
       <div className="flex flex-row ">
       <div id="image">
            <div className="App text-sm">
              <div className="flex">
                <label
                  className="w-[500px] bg-slate-50 cursor-pointer mb-2 text-sm font-medium text-gray-900 text-center dark:text-black p-2 shadow-sm rounded-sm"
                  for="fileUpload"
                >
                  Upload images
                </label>
                <input
                  id="fileUpload"
                  type="file"
                  multiple
                  accept="application/pdf, image/png"
                  onChange={handleFileEvent}
                  disabled={fileLimit}
                  className="w-0"
                />
              </div>
              <div className="w-[340px] lg:w-[500px] flex flex-col justify-center items-center gap-2 text-sm">
                <div className="uploaded-files-list flex flex-col gap-1">
                  {uploadedFiles.map((file) => (
                    <div
                      className={`p-2 w-[340px] lg:w-[500px] bg-slate-100 shadow-sm ${
                        uploadedFiles.length === 0 && "hidden"
                      }`}
                    >
                      {file.name}
                    </div>
                  ))}
                </div>
                <div
                  className={`${
                    uploadedFiles.length === 0 && "hidden"
                  } cursor-pointer py-2 px-6 w-fit flex justify-center items-center rounded-sm bg-gris text-white`}
                  onClick={() => {
                    setUploadedFiles([]);
                    setFileLimit(false);
                  }}
                >
                  Reset
                </div>
              </div>
            </div>
          </div>

        <div className="flex flex-col w-full">
        <input
          required
          type="text"
          name="deschHive"
          placeholder="Adresse"
          className=" lg:w-[500px] p-2 border-3  border-gris bg-[#fdf6ec] rounded-lg"
          value={inputs.descHiveValue}
          onChange={handleChange}
        />
        <input
          required
          type="text"
          name="locationValue"
          placeholder="Adresse"
          className="md:w-[340px] lg:w-[500px] p-2 border-[1px] border-[rgba(0, 0, 0, 0.3)] rounded-sm"
          value={inputs.locationValue}
          onChange={handleChange}
        />
        <input
          required
          type="text"
          name="dateListedValue"
          placeholder="Adresse"
          className="md:w-[340px] lg:w-[500px] p-2 border-[1px] border-[rgba(0, 0, 0, 0.3)] rounded-sm"
          value={inputs.dateListedValue}
          onChange={handleChange}
        />
        <input
          required
          type="text"
          name="imageFile"
          placeholder="Adresse"
          className="md:w-[340px] lg:w-[500px] p-2 border-[1px] border-[rgba(0, 0, 0, 0.3)] rounded-sm"
          value={inputs.imageFile || ""}
          onChange={handleChange}
        />
          <input type="submit" id="submit" className="w-0 h-0" />
          <label
            for="submit"
            className="submit-button px-6 py-2 w-fit flex justify-center items-center gap-2 cursor-pointer hover:scale-110 bg-asfar rounded-sm text-white"
          >
            <span>Submit</span>
          </label>
        </div>
       </div>
      

       
      </form>
    </div>
  );
}

export default AnnonceFormPage;
