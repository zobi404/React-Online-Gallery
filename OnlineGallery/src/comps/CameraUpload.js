import React, { useState } from "react";
import ProgressBar from "./ProgressBar";


const CameraUpload = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);


  const handleCapture = (e) => {
    const file = e.target.files[0]; // Get the captured image file
    if (file) {
      const reader = new FileReader();

      // Preview the captured image
      reader.onload = (event) => {
        setImagePreview(event.target.result);
      };
      reader.readAsDataURL(file);

      // Store the file for upload
      setFile(file);
      setError(null);
      setIsUploading(false);
    } else {
      setImagePreview(null);
      setError("Error occurred!");
    }
  };

  const handleUpload = () => {
    if (file) {
        setIsUploading(true);
      // Clear the preview after ensuring ProgressBar has the file state
      setTimeout(() => {
        setImagePreview(null);
      }, 0); // Clear the preview after state propagation
    }

  };

  return (
    <div className="container">
      {/* <h2>Capture and Upload Image</h2> */}

      {/* Input to capture image */}
      <input
        id="cameraInput"
        type="file"
        accept="image/*"
        capture="user" // Opens the camera directly
        onChange={handleCapture}
      />
      

      {/* Camera Icon */}
      <label htmlFor="cameraInput">
        <i className="fa-solid fa-camera" style={{ fontSize: "24px" }}></i>
      </label>

      {/* Preview the captured image */}
      {imagePreview && (
        <div>
          <h3>Image Preview:</h3>
          <img src={imagePreview} alt="Captured" className="image-preview" />
        </div>
      )}

      {/* Upload button */}
      {imagePreview && (
        <button onClick={handleUpload} className="upload-button">
          Upload
        </button>
      )}
      {isUploading && file && <ProgressBar file={file} setFile={setFile} />}

      {/* ProgressBar for file upload */}
    </div>
  );
};

export default CameraUpload;
