import React from "react";
import { motion } from "framer-motion";
import { useState } from "react";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { getFirestore, collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";


const Modal = ({ selectedImage, setSelectedImage }) => {
  const [viewMode, setViewMode] = useState(null); // "preview" or "download"
  const handleClick = (e) => {
    if (e.target.classList.contains("backdrop")) {
      setSelectedImage(null);
      setViewMode(null);
    }
  };

  // Function to trigger the Preview
  const handlePreview = () => {
    setViewMode("preview"); // Set the view mode to preview

    // Open a new tab
    const newTab = window.open("", "_blank");

    // Define HTML content for the new tab
    const htmlContent = `
      <html>
        <head>
          <title>Image Preview</title>
          <style>
            body {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              margin: 0;
              padding: 0;
              font-family: Arial, sans-serif;
              background-color: #f0f0f0;
            }
            img {
              max-width: 90%;
              max-height: 90%;
              margin-bottom: 20px;
            }
            button {
              padding: 10px 20px;
              background-color: #FF6347;
              color: white;
              border: none;
              border-radius: 5px;
              cursor: pointer;
            }
            button:hover {
              background-color: #FF4500;
            }
          </style>
        </head>
        <body>
          <img src="${selectedImage}" alt="Preview Image" />
          <button onclick="window.close()">Go Back</button>
        </body>
      </html>
    `;

    // Write the HTML content to the new tab
    newTab.document.write(htmlContent);
    newTab.document.close(); // Ensure the content is rendered
  };


  const handleDownload = async () => {
    try {
      setViewMode('download');
      // Fetch the image as a Blob
      const response = await fetch(selectedImage); // selectedImage is the Firebase Storage URL
      const blob = await response.blob();

      // Create a temporary link element
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob); // Convert the Blob to an object URL
      link.setAttribute("download", "downloaded-image.jpg"); // Set the download attribute
      link.style.display = "none";

      // Append the link to the document, click it, and remove it
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up the object URL
      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error("Failed to download the image:", error);
    }
  };

  const handleDelete = () => {

    const storage = getStorage();
    const filePath = selectedImage.split('/o/')[1].split('?')[0]; // Replace with the actual path

    // Create a reference to the file
    const fileRef = ref(storage, filePath);
    const db = getFirestore();

    // Define the collection and the field to query
    const collectionName = "images"; // Replace with actual collection name
    const fieldName = "url"; // Replace with the field name
    const fieldValue = selectedImage; // Replace with the value to match

    // Query the collection
    const q = query(collection(db, collectionName), where(fieldName, "==", fieldValue));

    // Execute the query
    getDocs(q).then((querySnapshot) => {
      querySnapshot.forEach((document) => {
        // Delete the document
        deleteDoc(doc(db, collectionName, document.id))
          .then(() => {
            console.log(`Document with ID ${document.id} deleted successfully.`);
            
          })
          .catch((error) => {
            console.error("Error deleting document:", error);
          });
      });
    }).catch((error) => {
      console.error("Error retrieving documents:", error);
    });
    // Delete the file
    deleteObject(fileRef)
      .then(() => {
        console.log("File deleted successfully");

      })
      .catch((error) => {
        console.error("Error deleting file:", error);
      });

    console.log(filePath);
    
  }

  return (
    <motion.div
      className="backdrop"
      onClick={handleClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Full Preview button */}
      <button
        onClick={handlePreview}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          padding: "8px 12px",
          backgroundColor: "#007BFF",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Full Preview
      </button>

      {/* Download button */}
      <button
        onClick={handleDownload}
        style={{
          position: "absolute",
          top: "50px", // Adjusted position to avoid overlap
          right: "10px",
          padding: "8px 12px",
          backgroundColor: "#28A745",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          zIndex: 10,
        }}
      >
        Download
      </button>

      {/* Go Back to Main Screen button */}
      {(
        <button
          onClick={() => {
            setViewMode(null); // Reset view mode
            setSelectedImage(null); // Close modal
          }}
          style={{
            position: "absolute",
            top: "90px",
            right: "10px",
            padding: "8px 12px",
            backgroundColor: "#FF6347",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            zIndex: 10,
          }}
        >
          Go Back
        </button>

      )}
      {/* Delete button */}
      <button
        onClick={handleDelete}
        style={{
          position: "absolute",
          top: "10px",
          right: "80%",
          padding: "8px 12px",
          backgroundColor: "Red",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >Delete</button>
      {/* Image display */}
      <motion.img
        src={selectedImage}
        alt="Enlarged Pic"
        initial={{ y: "-100vh" }}
        animate={{ y: 0 }}
        style={{ maxWidth: "80%", maxHeight: "80%" }}
      />
    </motion.div>
  );
};

export default Modal;
