import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Modal from 'react-modal';
import './ShareFiles.css';

Modal.setAppElement('#root');

function ShareFiles() {
  const [showUploadPopup, setShowUploadPopup] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*,video/*,audio/*',
    onDrop: (acceptedFiles) => {
      setUploadedFiles([...uploadedFiles, ...acceptedFiles]);
    },
  });

  const handleUploadFromCloud = () => {
    // Implement the function to handle uploading from Google Cloud
  };

  return (
    <div className="share-files">
      <button className="minimize">-</button>
      <button onClick={() => setShowUploadPopup(true)}>Share Files</button>
      <Modal
        isOpen={showUploadPopup}
        onRequestClose={() => setShowUploadPopup(false)}
        className="upload-modal"
        overlayClassName="upload-modal-overlay"
      >
        <div className="upload-options">
          <h3>Upload File</h3>
          <button onClick={handleUploadFromCloud}>Upload from Google Cloud</button>
          <div {...getRootProps()} className="dropzone">
            <input {...getInputProps()} />
            <p>Drag and drop files here or click to browse</p>
          </div>
        </div>
      </Modal>
      <div className="uploaded-files">
        {uploadedFiles.map((file, index) => (
          <p key={index}>{file.name}</p>
        ))}
      </div>
    </div>
  );
}

export default ShareFiles;
