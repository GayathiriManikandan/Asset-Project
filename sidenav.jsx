// Sidebar.jsx
import React, { useState } from 'react';
import './sidenav.css'; // Import the CSS file
import EmployeePage from './employee.jsx'; // Import the Employee component
import TotalAssetPage from './totalasset.jsx';
import Dashboard from './dashbord.jsx';
import UpdatePage from './udated.jsx';
import UtilizationPage from './utilizeasset.jsx';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('dashboard');
  const [showLogoutPopup, setShowLogoutPopup] = useState(false); // State for showing log-out popup

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleNavClick = (link) => {
    if (link === 'log-out') {
      setShowLogoutPopup(true); // Show the popup when log-out is clicked
    } else {
      setActiveLink(link);
    }
  };

  const handleLogoutConfirm = (confirm) => {
    if (confirm) {
      console.log('User logged out');
      // Perform your logout logic here (e.g., redirect to login page or clear session)
    }
    setShowLogoutPopup(false); // Hide the popup after decision
  };

  const renderContent = () => {
    switch (activeLink) {
      case 'profile':
        return (
          <div> 
            <h4>user email : admin@gmail.com</h4>
            <h4>password : Admin</h4>
          </div>
        );
      case 'no_of_employees':
        return <EmployeePage />;
      case 'dashboard':
        return <Dashboard />;
      case 'total_assets':
        return <TotalAssetPage />;
      case 'updated_assets':
        return <UpdatePage />;
      case 'daily_asset_utilization':
        return <UtilizationPage/>;
      case 'issued_assets':
        return <h1>Issued Assets content</h1>;
      default:
        return <h1>Welcome to the Dashboard!</h1>;
    }
  };

  return (
    <>
      <header className="header">
        <button className="menu-btn" onClick={toggleSidebar}>☰</button>
        <span className="logo">ASSET MANAGEMENT SYSTEM</span>
        <div className="header-right">
          <button
            className={`profile-btn nav-link ${activeLink === 'profile' ? 'active' : ''}`}
            onClick={() => handleNavClick('profile')}
          >
            👤
          </button>
          <button  
            className={`logout-btn nav-link ${activeLink === 'log-out' ? 'active' : ''}`}
            onClick={() => handleNavClick('log-out')}
          >
            🚪
          </button>
        </div>
      </header>

      <div className="container">
        <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
          <nav className="nav">
            <ul>
              <li>
                <a
                  href="#dashboard"
                  className={`nav-link ${activeLink === 'dashboard' ? 'active' : ''}`}
                  onClick={() => handleNavClick('dashboard')}
                >
                  <i className="icon">🏠</i>
                  <span className="text">Dashboard</span>
                </a>
              </li>
              <li>  
                <a
                  href="#employee"
                  className={`nav-link ${activeLink === 'no_of_employees' ? 'active' : ''}`}
                  onClick={() => handleNavClick('no_of_employees')}
                >
                  <i className="icon">👥</i>
                  <span className="text">No. of Employees</span>
                </a>
              </li>
              <li>
                <a
                  href="#totalasset"
                  className={`nav-link ${activeLink === 'total_assets' ? 'active' : ''}`}
                  onClick={() => handleNavClick('total_assets')}
                >
                  <i className="icon">📦</i>
                  <span className="text">Total Assets</span>
                </a>
              </li>
              <li>
                <a
                  href="#update"
                  className={`nav-link ${activeLink === 'updated_assets' ? 'active' : ''}`}
                  onClick={() => handleNavClick('updated_assets')}
                >
                  <i className="icon">🔄</i>
                  <span className="text">Updated Assets</span>
                </a>
              </li>
              <li>
                <a
                  href="#utilizeasset"
                  className={`nav-link ${activeLink === 'daily_asset_utilization' ? 'active' : ''}`}
                  onClick={() => handleNavClick('daily_asset_utilization')}
                >
                  <i className="icon">📊</i>
                  <span className="text">Daily Asset Utilization</span>
                </a>
              </li>
              <li>
                <a
                  href="#issuedasset"
                  className={`nav-link ${activeLink === 'issued_assets' ? 'active' : ''}`}
                  onClick={() => handleNavClick('issued_assets')}
                >
                  <i className="icon">📋</i>
                  <span className="text">Issued Assets</span>
                </a>
              </li>
            </ul>
          </nav>
        </aside>

        <main className="content">
          {renderContent()}
        </main>

        {showLogoutPopup && (
          <div className="logout-popup">
            <div className="popup-content">
              <h3>Do you want to log out?</h3>
              <button  clasName="yesbtn" onClick={() => handleLogoutConfirm(true)}>Yes</button>
              <button clasName="nobtn" onClick={() => handleLogoutConfirm(false)}>No</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;
