import React from 'react';
import { Users, UserPlus, Server, Wifi, WifiOff } from 'lucide-react';

export default function Navbar({ onAddClick, isBackendOnline, totalCount }) {
  return (
    <header className="navbar-container">
      <div className="navbar-content">
        <div className="navbar-brand">
          <div className="brand-icon-wrapper">
            <Users className="brand-icon" size={26} />
          </div>
          <div>
            <h1 className="brand-title">Employee Hub</h1>
            <p className="brand-subtitle">Enterprise Resource & Workforce Management</p>
          </div>
        </div>

        <div className="navbar-actions">
          <div className={`status-badge ${isBackendOnline ? 'online' : 'offline'}`} title={isBackendOnline ? 'Backend API is connected' : 'Backend API is not reachable'}>
            {isBackendOnline ? (
              <>
                <span className="status-dot online"></span>
                <Wifi size={14} />
                <span>Backend Connected</span>
              </>
            ) : (
              <>
                <span className="status-dot offline"></span>
                <WifiOff size={14} />
                <span>Backend Disconnected</span>
              </>
            )}
          </div>

          <button
            id="add-employee-btn"
            className="btn btn-primary"
            onClick={onAddClick}
          >
            <UserPlus size={18} />
            <span>Add Employee</span>
          </button>
        </div>
      </div>
    </header>
  );
}
