import { useEffect, useState } from "react";
import { projectStorage, projectFirestore } from "../firebase/config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

const useStorage = (file) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    // Reference to the storage
    const storageRef = ref(projectStorage, file.name);

    // Upload file
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(percentage); // Update progress
      },
      (err) => {
        setError(err); // Handle errors
      },
      async () => {
        try {
          // Get the download URL
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setUrl(downloadURL); // Update state with the download URL

          // Add the document to Firestore using `downloadURL` (local variable)
          const docRef = await addDoc(collection(projectFirestore, "images"), {
            url: downloadURL, // Use `downloadURL` here
            createdAt: new Date(),
          });
          console.log("Document written with ID: ", docRef.id);
        } catch (err) {
          setError(err);
        }
      }
    );
  }, [file]);

  return { progress, url, error };
};

export default useStorage;
