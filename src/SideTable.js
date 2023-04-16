import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleLeft, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import './SideTable.css';

function SideTable() {
    const [collapsed, setCollapsed] = useState(false);

    const toggleSideTable = () => {
        setCollapsed(!collapsed);
    };

    return (
        <div className={`side-table${collapsed ? ' collapsed' : ''}`}>
            <div className="header">
                <h2>Omada</h2>
                <button className="minimize" onClick={toggleSideTable}>
                    <FontAwesomeIcon icon={collapsed ? faAngleDoubleRight : faAngleDoubleLeft} />
                </button>
            </div>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/profile_settings">Profile Settings</NavLink>
                    </li>
                    <li>
                        <NavLink to="/security">Security</NavLink>
                    </li>
                    <li>
                        <NavLink to="/data_and_privacy">Data and Privacy</NavLink>
                    </li>
                    <li>
                        <NavLink to="/sharing_and_people">Sharing and People</NavLink>
                    </li>
                    <li>
                        <NavLink to="/manage_teams">Manage Teams</NavLink>
                    </li>
                    <li>
                        <NavLink to="/subscription">Subscription</NavLink>
                    </li>
                    <li>
                        <NavLink to="/notification">Notification</NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default SideTable;
