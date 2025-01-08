import React from 'react';
import { useState } from 'react';
import ProgressBar from './ProgressBar';

const UploadForm = () => {

    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const [fileName, setFileName] = useState(null);

    const types = ['image/png', 'image/jpg', 'image/jpeg'];
    const changeHandler = (e) => {
        console.log("clicked");
        let selected = e.target.files[0];

        if (selected && types.includes(selected.type)) {
            setFile(selected);
            setError('');
        } else {
            setFile(null);
            setError("Please Select an image file (png or Jpg)");
        }
    }


    return (
        <>
            <div className="wrapper">
      <div className="file-upload">
        {/* Accept images only and open camera */}
        <input
        id="FileInput"
        type="file"
        accept="image/*"
        onChange={changeHandler}
      />
      <label htmlFor="FileInput">
        <i className="fa fa-arrow-up"></i>
        </label>
      </div>
    </div>
            <div className='output'>
                {error && <div className='error'>{error}</div>}
                {file && <div>{file.name}</div>}
                {file && <ProgressBar file={file} setFile={setFile} setFileName={setFileName}/>}
            </div>
       </> 
    );
}

export default UploadForm;