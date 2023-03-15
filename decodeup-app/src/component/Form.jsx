import React, { useState } from "react";
import BasicInfo from "./BasicInfo";
import ImageUpload from "./ImageUpload";

function Form() {
  const [page, setPage] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: "",
    contactNo: "",
    images: [],
  });

  const onNext = () => {
    if (page === FormTitles.length - 1) {
      alert("FORM SUBMITTED");
      console.log(formData);
    } else {
      setPage((currPage) => currPage + 1);
    }
  };

  const FormTitles = ["Basic Info", "Image Upload"];

  const PageDisplay = () => {
    if (page === 0) {
      return (
        <BasicInfo
          formData={formData}
          setFormData={setFormData}
          onNext={onNext}
        />
      );
    } else {
      return <ImageUpload formData={formData} setFormData={setFormData} />;
    }
  };

  return (
    <div className=" flex flex-col justify-center items-center">
      <div>
        <div
          style={{ width: page === 0 ? "33.3%" : page == 1 ? "66.6%" : "100%" }}
        ></div>
      </div>
      <div className="form-container h-screen ">
        <div className="header">
          <h1 className="flex justify-center font-bold">{FormTitles[page]}</h1>
        </div>
        <div>{PageDisplay()}</div>
        <div className="flex items-center justify-center flex-row gap-6 mt-2 ">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2  px-4 rounded"
            disabled={page == 0}
            onClick={() => {
              setPage((currPage) => currPage - 1);
            }}
          >
            Prev
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={(data) => onNext(data)}
          >
            {page === FormTitles.length - 1 ? "Submit" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Form;
