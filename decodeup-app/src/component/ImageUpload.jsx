import React, { useState, useEffect } from "react";

function ImageUpload({ formData, setFormData }) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [errors, setErrors] = useState({});

  function handleFileInputChange(event) {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setErrors({
      ...errors,
      [name]: " Allow only png, jpg and jpeg extension images",
    });
  }

  useEffect(() => {
    return () => {
      previewUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previewUrls]);

  return (
    <div>
      <input
        type="file"
        name="images"
        value={formData.image}
        multiple
        onChange={handleFileInputChange}
      />
      {errors.image && <p className="text-red-800">{errors.image}</p>}
      {previewUrls.map((url, index) => (
        <img
          key={index}
          src={url}
          alt={`Selected file ${index}`}
          style={{ maxWidth: "100%" }}
        />
      ))}
    </div>
  );
}

export default ImageUpload;
