import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import logo from "./Logo-removebg-preview.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faBox, faUsers, faClipboardList, faCog, faQuestion, faBars } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const updateMedia = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  return (
    <div className={`sidebar ${showMenu ? 'expanded' : 'collapsed'}`}>
      <div className="profile" onClick={() => setShowMenu(!showMenu)}>
        <FontAwesomeIcon icon={faBars} className="menu-icon" />
        <img src={logo} alt="Logo" className="logo" style={{ display: isMobile && !showMenu ? 'none' : 'block' }} />
        <h3 style={{ display: isMobile && !showMenu ? 'none' : 'block' }}>IntelliShop</h3>
      </div>
      <ul className={`sidebarMenu ${showMenu || !isMobile ? 'show' : ''}`}>
        {[
          { icon: faHome, text: 'Dashboard', link: '/dashboard' },
          { icon: faBox, text: 'Products', link: '/productscreen' },
          { icon: faUsers, text: 'Users', link: '/customerscreen' },
          { icon: faClipboardList, text: 'Orders', link: '/orderscreen' },
          { icon: faCog, text: 'Settings', link: '/settings' },
          { icon: faQuestion, text: 'Help', link: '/help' },
        ].map((item, index) => (
          <li key={index}>
            <Link to={item.link}>
              <FontAwesomeIcon icon={item.icon} className="icon" />
              <span>{item.text}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;