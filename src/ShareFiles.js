import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Modal from 'react-modal';
import './ShareFiles.css';

Modal.setAppElement('#root');

function ShareFiles() {
  const [showUploadPopup, setShowUploadPopup] = useState(false);
  const [showSharedFilesPopup, setShowSharedFilesPopup] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*,video/*,audio/*',
    onDrop: (acceptedFiles) => {
      setUploadedFiles((prevUploadedFiles) => [...prevUploadedFiles, ...acceptedFiles]);
    },
  });

  const handleUploadFromCloud = () => {
    // Implement the function to handle uploading from Google Cloud
  };

  const handleShowSharedFiles = () => {
    setShowSharedFilesPopup(true);
  };

  const handleDownloadFile = (fileUrl, fileName) => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="share-files">
      <button className="minimize">-</button>
      <button onClick={() => setShowUploadPopup(true)}>Share Files</button>
      <button onClick={handleShowSharedFiles}>Show Shared Files</button>
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
      <Modal
        isOpen={showSharedFilesPopup}
        onRequestClose={() => setShowSharedFilesPopup(false)}
        className="shared-files-modal"
        overlayClassName="shared-files-modal-overlay"
      >
        <div className="shared-files">
          <h3>Shared Files</h3>
          <ul>
            {uploadedFiles.map((file, index) => (
              <li key={index}>
                <div className="file-info">
                  <span className="file-name">{file.name}</span>
                  <button
                    className="download-button"
                    onClick={() => handleDownloadFile(file.preview, file.name)}
                  >
                    Download
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Modal>
      <div className="uploaded-files">
      </div>
    </div>
  );
}

export default ShareFiles;
