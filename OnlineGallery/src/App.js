import React, { useState } from 'react';
import Title from './comps/Title';
import UploadForm from './comps/UploadForm';
import ImageGrid from './comps/ImageGrid';
import Modal from './comps/Modal';
import CameraUpload from './comps/CameraUpload';


function App() {

  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="App">
      <Title/>
      <UploadForm  />
      <CameraUpload />
      <ImageGrid setSelectedImage={setSelectedImage}/>
      {selectedImage && <Modal selectedImage={selectedImage} setSelectedImage={setSelectedImage} />}
    </div>
  );
}

export default App;
