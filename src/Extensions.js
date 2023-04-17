import React, { useState } from 'react';
import './Extensions.css';
import './App.css';
import { handleSelectItem, renderListItem } from './util';
const extensionsList = [
  {
    name: 'Google Drive',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/d/da/Google_Drive_logo.png',
    description: 'Browse and open your Google Drive files and folders with ease.',
  },
  {
    name: 'Google Docs',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Google_Docs_logo_%282014-2020%29.svg/1481px-Google_Docs_logo_%282014-2020%29.svg.png',
    description: 'Access and edit your Google Docs files in a convenient manner.',
  },
  {
    name: 'Google Colab',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Google_Colaboratory_SVG_Logo.svg/1200px-Google_Colaboratory_SVG_Logo.svg.png',
    description: 'Open and work with your Google Colab notebooks effortlessly.',
  },
  {
    name: 'Stack Overflow',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Stack_Overflow_icon.svg/768px-Stack_Overflow_icon.svg.png',
    description: 'Find programming solutions quickly by searching questions and answers on Stack Overflow.',
  },
  {
    name: 'Zoom',
    logo: 'https://1000marcas.net/wp-content/uploads/2021/07/logo-Zoom.png',
    description: 'Connect to Zoom for seamless video conferencing and online meeting experiences.',
  },
];

function Extensions() {
  const [selectedExtension, setSelectedExtension] = useState(null);
  const [showDemoPopup, setShowDemoPopup] = useState(false);
  
  const [dummyFolderList, setDummyFolderList] = useState([
    { name: 'Folder 1', selected: false },
    { name: 'Folder 2', selected: false },
    { name: 'Folder 3', selected: false },
  ]);
  const [dummyDocList, setDummyDocList] = useState([
    { name: 'Document 1', selected: false },
    { name: 'Document 2', selected: false },
    { name: 'Document 3', selected: false },
  ]);

  const handleSelectExtension = (ext) => {
    setSelectedExtension(ext);
  };

  const handleConnectClick = () => {
    setShowDemoPopup(true);
  };

  const handleSelectItemWrapper = (list, index) => {
    handleSelectItem(list, index, selectedExtension, setDummyFolderList, setDummyDocList);
  };

  const renderExtensionPopup = () => {
    const currentExtension = extensionsList.find(ext => ext.name === selectedExtension.name);

    if (!currentExtension) {
      return null;
    }

    const { name, logo, description } = currentExtension;

    const commonPopupContent = (
      <>
        <div className="logo-holder">
          <img
            src={logo}
            alt={name}
            style={{ maxWidth: '100%', maxHeight: '100%' }}
          />
        </div>
        <p>{description}</p>
      </>
    );

    switch (name) {
      case 'Google Drive':
      case 'Google Docs':
      case 'Google Colab':
        const listToRender = name === 'Google Drive' ? dummyFolderList : dummyDocList;

        return (
          <>
            <div className={`extension-popup ${name.toLowerCase().replace(' ', '-')}-popup`}>
              {commonPopupContent}
              <button onClick={handleConnectClick}>Connect</button>
              <button onClick={() => setSelectedExtension(null)}>Close</button>
            </div>
            {showDemoPopup && (
              <div className={`${name.toLowerCase().replace(' ', '-')}-demo-popup`}>
                <ul>
                  {listToRender.map((item, index) =>
                    renderListItem(item, index, selectedExtension, handleSelectItemWrapper)
                  )}
                </ul>
                <button onClick={() => setShowDemoPopup(false)}>Open</button>
                <button onClick={() => setShowDemoPopup(false)}>Close</button>
              </div>
            )}
          </>
        );
      case 'Stack Overflow':
        return (
          <div className="extension-popup stack-overflow-popup">
            {commonPopupContent}
            <input type="text" placeholder="Enter your question" />
            <button onClick={() => {/* Demo search, does nothing */}}>Search</button>
            <button onClick={() => setSelectedExtension(null)}>Close</button>
          </div>
        );
      case 'Zoom':
        return (
          <div className="extension-popup zoom-popup">
            {commonPopupContent}
            <button onClick={() => window.open('https://zoom.us', '_blank')}>Connect</button>
            <button onClick={() => setSelectedExtension(null)}>Close</button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="extensions">
      <button className="minimize">-</button>
<div className="extensions-list">
{extensionsList.map(ext => (
<button
key={ext.name}
onClick={() => handleSelectExtension(ext)}
>
<img
src={ext.logo}
alt={ext.name}
className="extension-logo"
style={{ maxWidth: '50%', maxHeight: '50%' }}
/>
{ext.name}
</button>
))}
</div>
{selectedExtension && renderExtensionPopup()}
</div>
);
}

export default Extensions;
