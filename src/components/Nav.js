import React, { useEffect, useState } from "react";
import { MenuOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Drawer, Menu, Button, Avatar, Space } from "antd";
import { FaUserAlt } from "react-icons/fa"; 
import { MdAdminPanelSettings } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import "./Nav.css";
import logoNN from "./assets/images/logoNN.PNG";
import { useAuth } from "../AuthContext";

const Nav = () => {
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 500);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const { isLoggedIn } = useAuth();
  const adminName = "Admin";

  const menuItems = [
    { label: <Link to="/userlist">User-List</Link>, key: "user-list" },
    { label: <Link to="/userreport">User-Report</Link>, key: "user-report" },
    { label: <Link to="/bugreport">Bug-Report</Link>, key: "bug-report" },
    !isLoggedIn && { label: <Link to="/login">Login</Link>, key: "login" },
  ].filter(Boolean);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 500);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="logo">
        <a href="/">
          <img src={logoNN} alt="Logo" />
        </a>
      </div>
      <div className="menu-container">
        {!isMobile && (
          <>
          <Menu mode="horizontal" items={menuItems} className="menu" />
          <div className="admin-info">
          <FaUserCircle className="adminIcon"/>
          <span>{adminName}</span>
          </div>
        </>
        )}
        {isMobile && (
          <Button
            className="menu-button"
            type="primary"
            icon={<MenuOutlined />}
            onClick={showDrawer}
          />
        )}
      </div>

      {isMobile && (
        <Drawer
          placement="right"
          onClose={onClose}
          visible={visible}
          bodyStyle={{ padding: 0 }}
        >
          <Menu mode="vertical" items={menuItems} onClick={onClose} style={{ color: "#001529" }} />
        </Drawer>
      )}
    </nav>
  );
};

export default Nav;