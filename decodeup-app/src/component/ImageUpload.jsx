import React, { useState } from "react";

const ImageUpload = ({ formData, setFormData }) => {
  const [selectedImages, setSelectedImages] = useState([]);

  const onSelectFile = (event) => {
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles);

    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });

    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });

    setSelectedImages((previousImages) => previousImages.concat(imagesArray));
    event.target.value = "";
  };

  function deleteHandler(image) {
    setSelectedImages(selectedImages.filter((e) => e !== image));
    URL.revokeObjectURL(image);
  }

  return (
    <section className="flex justify-center flex-col items-center gap-2">
      <label className="m-auto flex flex-col justify-center border border-black items-center w-40 h-40 cursor-pointer font-lg rounded-3xl">
        + Add Images
        <br />
        <input
          className="hidden"
          type="file"
          name="images"
          value={formData.image}
          onChange={onSelectFile}
          multiple
          accept="image/png , image/jpeg, image/webp"
        />
      </label>
      <br />

      {selectedImages.length > 0 &&
        (selectedImages.length > 10 ? (
          <p className="text-red-800">
            You can't upload more than 10 images! <br />
            <span>
              please delete <b> {selectedImages.length - 10} </b> of them{" "}
            </span>
          </p>
        ) : (
          <button
            className="cursor-pointer block m-auto w-40 h-12 text-white bg-green-900 rounded-3xl"
            onClick={() => {
              console.log(selectedImages);
            }}
          >
            UPLOAD {selectedImages.length} IMAGE
            {selectedImages.length === 1 ? "" : "S"}
          </button>
        ))}

      <div
        style={{ width: "60%" }}
        className="flex flex-row flex-wrap justify-center items-center w-1/2"
      >
        {selectedImages &&
          selectedImages.map((image, index) => {
            return (
              <div key={image}>
                <img
                  src={image}
                  height="200"
                  alt="upload"
                  style={{
                    height: "140px",
                    width: "160px",
                    margin: "1rem 0.5rem",
                    border: "1px solid gray",
                    boxShadow: "rgba(0, 0, 0, 0.05) 0px 1px 2px 0px ",
                  }}
                  className=" relative p-4"
                />
                <button
                  onClick={() => deleteHandler(image)}
                  className="absolute  cursor-pointer text-white bg-red-400 p-2 rounded-2xl hover:bg-red-600"
                >
                  Remove image {index + 1}
                </button>
              </div>
            );
          })}
      </div>
    </section>
  );
};

export default ImageUpload;
