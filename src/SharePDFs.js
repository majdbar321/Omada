import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './SharePDFs.css';
import { Document, Page } from 'react-pdf';

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
    },
  });

  const openPDFViewer = (pdf) => {
    setSelectedPDF(pdf);
    setShowPDFViewer(true);
  };

  const closeModal = () => {
    setShowUploadPopup(false);
    setShowPDFViewer(false);
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
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

  const showPDFViewerButton = (
    <button onClick={() => setShowPDFViewer(true)}>Show PDF</button>
  );

  return (
    <div className="share-pdfs">
      <button className="minimize">-</button>
      <button onClick={() => setShowUploadPopup(true)}>Share PDFs</button>
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
          </div>
        </div>
      )}
      {showPDFViewer && selectedPDF && (
        <div className="modal">
          <div className="modal-content">
            <button className="close" onClick={closeModal}>
              &times;
            </button>
            <div className="pdf-viewer">
              <div className="pdf-controls">
                <button onClick={previousPage} disabled={pageNumber <= 1}>Previous</button>
                <span>{pageNumber} of {numPages}</span>
                <button onClick={nextPage} disabled={pageNumber >= numPages}>Next</button>
              </div>
              <div className="pdf-document">
                <Document file={selectedPDF} onLoadSuccess={onDocumentLoadSuccess}>
                  <Page pageNumber={pageNumber} />
                </Document>
              </div>
              <div className="pdf-actions">
                <a href={URL.createObjectURL(selectedPDF)} download={selectedPDF.name}>
                  <button>Download PDF</button>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="uploaded-pdfs">
        {uploadedPDFs.map((pdf, index) => (
          <p key={index} onClick={() => openPDFViewer(pdf)}>
            {pdf.name}
          </p>
        ))}
      </div>
    </div>
  );
}

export default SharePDFs
