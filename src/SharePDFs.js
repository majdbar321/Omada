import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './SharePDFs.css';
import { MdInsertDriveFile } from 'react-icons/md';

function SharePDFs() {
  const [showUploadPopup, setShowUploadPopup] = useState(false);
  const [showPDFViewer, setShowPDFViewer] = useState(false);
  const [uploadedPDFs, setUploadedPDFs] = useState([]);
  const [selectedPDF, setSelectedPDF] = useState(null);
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'application/pdf',
    onDrop: (acceptedFiles) => {
      setUploadedPDFs([...uploadedPDFs, ...acceptedFiles]);
      setSelectedPDF(URL.createObjectURL(acceptedFiles[0]));
      setShowPDFViewer(true);
    },
  });

  const closeModal = () => {
    setShowUploadPopup(false);
    setShowPDFViewer(false);
  };

  const changePage = (offset) => {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }

  const previousPage = () => {
    changePage(-1);
  }

  const nextPage = () => {
    changePage(1);
  }

  return (
    <div className="share-pdfs">
      <button className="minimize">-</button>
      <div className="inner-container">
        <button className="share-pdfs-btn" onClick={() => setShowUploadPopup(true)}>Share PDFs</button>
        {showUploadPopup && (
          <div className="modal">
            <div className="modal-content">
              <button className="close" onClick={closeModal}>
                &times;
              </button>
              <div className="upload-options">
                <h3>Upload PDF</h3>
                <div {...getRootProps()} className="dropzone">
                  <input {...getInputProps()} />
                  <p>Drag and drop PDF files here or click to browse</p>
                </div>
              </div>
              <div className="uploaded-pdfs-container">
                <button className="show-all" onClick={() => setShowPDFViewer(true)}>Show all uploaded PDFs</button>
                <div className="uploaded-pdfs">
                  {uploadedPDFs.map((pdf, index) => (
                    <div key={index} onClick={() => {
                      setSelectedPDF(URL.createObjectURL(pdf));
                      setShowPDFViewer(true);
                    }} className="file">
                      <MdInsertDriveFile className="file-icon" />
                      <p className="file-name">{pdf.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        {showPDFViewer && selectedPDF && (
          <div className="modal">
            <div className="modal-content">
              <button className="close" onClick={closeModal}>
                &times;
              </button>
              <button className="back" onClick={() => setShowPDFViewer(false)}>Back</button>
              <div className="pdf-viewer">
                <div className="pdf-controls">
                  <button onClick={previousPage} disabled={pageNumber <= 1}>Previous</button>
                  <span>{pageNumber} of {numPages}</span>
                  <button onClick={nextPage} disabled={pageNumber >= numPages}>Next</button>
                </div>
                <div className="pdf-document">
                    <iframe src={selectedPDF} title="PDF Viewer" width="100%" height="600px" style={{border: "none"}}></iframe>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="uploaded-pdfs">
            {uploadedPDFs.map((pdf, index) => (
              <p key={index} onClick={() => {
                setSelectedPDF(URL.createObjectURL(pdf));
                setShowPDFViewer(true);
              }}>
                <MdInsertDriveFile className="file-icon" /> {pdf.name}
              </p>
            ))}
          </div>
        </div>
      </div>
    );
}

export default SharePDFs;
