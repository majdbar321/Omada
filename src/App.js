import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import SideTable from './SideTable';
import VideoCall from './VideoCall';
import Chat from './Chat';
import ShareFiles from './ShareFiles';
import Calendar from './Calendar';
import Extensions from './Extensions';
import ProfileSettings from './ProfileSettings';
import Security from './Security';
import DataAndPrivacy from './DataAndPrivacy';
import SharingAndPeople from './SharingAndPeople';
import ManageTeams from './ManageTeams';
import Subscription from './Subscription';
import Notification from './Notification';

function App() {
    return (
        <Router>
            <div className="App">
                <SideTable />
                <div className="main-content">
                    <div className="video-call-container">
                        <VideoCall />
                    </div>
                    <div className="chat-container">
                        <Chat />
                    </div>
                    <div className="share-files-container">
                        <ShareFiles />
                    </div>
                    <div className="calendar-container">
                        <Calendar />
                    </div>
                    <div className="extensions-container">
                        <Extensions />
                    </div>
                    <Routes>
                        <Route path="/profile_settings" element={<ProfileSettings />} />
                        <Route path="/security" element={<Security />} />
                        <Route path="/data_and_privacy" element={<DataAndPrivacy />} />
                        <Route path="/sharing_and_people" element={<SharingAndPeople />} />
                        <Route path="/manage_teams" element={<ManageTeams />} />
                        <Route path="/subscription" element={<Subscription />} />
                        <Route path="/notification" element={<Notification />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
