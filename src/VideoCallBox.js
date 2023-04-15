import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faMicrophone, faDesktop, faPhone, faMessage } from '@fortawesome/free-solid-svg-icons';
import './Call.css';

const VideoCallBox = () => {
  const [cameraActive, setCameraActive] = useState(true);
  const [microphoneActive, setMicrophoneActive] = useState(true);
  const [desktopActive, setDesktopActive] = useState(true);
  const [phoneActive, setPhoneActive] = useState(true);
  const [messageActive, setMessageActive] = useState(true);

  return (
    <div className="video-call-box">
      <div className= "call-header">Video Call</div>
      <div className="video-container">
        <img src="https://www.dailyherald.com/storyimage/DA/20161023/business/161029755/AR/0/AR-161029755.jpg" alt="Placeholder Image" />
      </div>
      <div className="video-call-controls">
        <FontAwesomeIcon
          icon={faCamera}
          className={`video-call-control ${cameraActive ? 'active' : 'inactive'}`}
          style={{ opacity: cameraActive ? 1 : 0.3 }}
          onClick={() => setCameraActive(!cameraActive)}
        />
        <FontAwesomeIcon
          icon={faMicrophone}
          className={`video-call-control ${microphoneActive ? 'active' : 'inactive'}`}
          style={{ opacity: microphoneActive ? 1 : 0.3 }}
          onClick={() => setMicrophoneActive(!microphoneActive)}
        />
        <FontAwesomeIcon
          icon={faDesktop}
          className={`video-call-control ${desktopActive ? 'active' : 'inactive'}`}
          style={{ opacity: desktopActive ? 1 : 0.3 }}
          onClick={() => setDesktopActive(!desktopActive)}
        />
        <FontAwesomeIcon
          icon={faPhone}
          className={`video-call-control ${phoneActive ? 'active' : 'inactive'}`}
          style={{ opacity: phoneActive ? 1 : 0.3 }}

          onClick={() => setPhoneActive(!phoneActive)}
        />
        <FontAwesomeIcon
          icon={faMessage}
          className={`video-call-control ${messageActive ? 'active' : 'inactive'}`}
          style={{ opacity: messageActive ? 1 : 0.3 }}
          onClick={() => setMessageActive(!messageActive)}
        />
      </div>
    </div>
  );
};

export default VideoCallBox;
