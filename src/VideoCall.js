import React, { useState, useEffect, useRef } from 'react';
import './VideoCall.css';
import './App.css';

import { AiOutlineAudio, AiOutlineAudioMuted, AiOutlineCamera, AiOutlineCameraOff } from 'react-icons/ai';
import { BiShareAlt } from 'react-icons/bi';
import { MdCallEnd, MdVideocam } from 'react-icons/md';

function VideoCall() {
  const [isMuted, setIsMuted] = useState(false);
  const [stream, setStream] = useState(null);
  const [isVideoEnabled, setIsVideoEnabled] = useState(false);
  const [isInCall, setIsInCall] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    async function getMedia() {
      if (isInCall) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
          setStream(stream);
          videoRef.current.srcObject = stream;
        } catch (err) {
          console.error(err);
        }
      }
    }
    getMedia();
  }, [isInCall]);

  function toggleMute() {
    if (stream) {
      stream.getAudioTracks().forEach((track) => (track.enabled = !track.enabled));
      setIsMuted(!isMuted);
    }
  }

  function toggleVideo() {
    if (stream) {
      stream.getVideoTracks().forEach((track) => (track.enabled = !track.enabled));
      setIsVideoEnabled(!isVideoEnabled);
    }
  }

  function endCall() {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
      setIsInCall(false);
    }
  }

  async function startCall() {
    setShowPopup(false);
    setIsInCall(true);
  }

  return (
    <div className="video-call">
      {!isInCall ? (
        <div className="start-call-container">
          <button onClick={() => setShowPopup(true)}>Do you want to start a call?</button>
        </div>
      ) : (
        <>
          <div className="top-controls">
            <button className="minimize">-</button>
            <div className="more-options">
              <button className="three-dots">. . .</button>
            </div>
          </div>
          <div className="call-title">Video Call</div>
          <div className="video-container">
            <video ref={videoRef} autoPlay playsInline muted={isMuted} />
          </div>
          <div className="video-controls">
            <button onClick={toggleMute}>
              {isMuted ? <AiOutlineAudioMuted size={24} /> : <AiOutlineAudio size={24} />}
            </button>
            <button onClick={toggleVideo}>
              {isVideoEnabled ? <AiOutlineCamera size={24} /> : <AiOutlineCamera size={24} />}
            </button>
            <button>
              <BiShareAlt size={24} />
            </button>
            <button onClick={endCall}>
              <MdCallEnd size={24} />
            </button>
          </div>
        </>
      )}
      {showPopup && (
        <div className="popup">
          <div className="popup-content-container">
            <button className="close-popup" onClick={() => setShowPopup(false)}>
              X
            </button>
            <div className="popup-content">
              <button onClick={startCall}>Start now</button>
              <button>Schedule a call (not functional)</button>
</div>
</div>
</div>
)}
</div>
);
}

export default VideoCall;
