import React, { useState } from "react";
import "../layout.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge } from "antd";
import { useTranslation } from "react-i18next"; // Import the useTranslation hook

function Layout(props) {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation(); // Initialize the t function

  const userMenu = [
    {
      name: t("Home"), // Translate "Home"
      path: "/",
      icon: "ri-home-gear-line",
    },
    {
      name: t("Appointment"), // Translate "Appointment"
      path: "/appointments",
      icon: "ri-file-list-3-line",
    },
    {
      name: t("Apply Department"), // Translate "Apply Department"
      path: "/apply-department",
      icon: "ri-government-line",
    },
  ];

  const departmentMenu = [
    {
      name: t("Home"), // Translate "Home"
      path: "/",
      icon: "ri-home-gear-line",
    },
    {
      name: t("Appointment"), // Translate "Appointment"
      path: "/department/appointments",
      icon: "ri-file-list-3-line",
    },
    {
      name: t("Profile"), // Translate "Profile"
      path: `/department/profile/${user?._id}`,
      icon: "ri-user-6-line",
    },
  ];

  const adminMenu = [
    {
      name: t("Home"), // Translate "Home"
      path: "/",
      icon: "ri-home-gear-line",
    },
    {
      name: t("Users"), // Translate "Users"
      path: "/admin/userslist",
      icon: "ri-user-add-line",
    },
    {
      name: t("Departments"), // Translate "Departments"
      path: "/admin/departmentlist",
      icon: "ri-government-line",
    },
  ];

  const menuToBeRendered = user?.isAdmin
    ? adminMenu
    : user?.isDepartment
    ? departmentMenu
    : userMenu;

  const role = user?.isAdmin
    ? t("Admin") // Translate "Admin"
    : user?.isDepartment
    ? t("Department") // Translate "Department"
    : t("User"); // Translate "User"

  return (
    <div className="main">
      <div className="d-flex layout">
        <div className="sidebar">
          <div className="sidebar-header">
            <h1 className="logo">PI</h1>
            <h1 className="role">{role}</h1>
          </div>
          <div className="menu">
            {menuToBeRendered.map((menu) => {
              const isActive = location.pathname === menu.path;
              return (
                <div
                  className={`d-flex menu-item ${isActive && "active-menu-item"}`}
                >
                  <i className={menu.icon}></i>
                  {!collapsed && <Link to={menu.path}>{menu.name}</Link>}
                </div>
              );
            })}
            <div
              className={`d-flex menu-item`}
              onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}
            >
              <i className="ri-logout-circle-line"></i>
              {!collapsed && <Link to="/login">{t("Logout")}</Link>}
            </div>
          </div>
        </div>
        <div className="content">
          <div className="header">
            {collapsed ? (
              <i
                className="ri-menu-2-fill header-action-icon"
                onClick={() => setCollapsed(false)}
              ></i>
            ) : (
              <i
                className="ri-close-line header-action-icon"
                onClick={() => setCollapsed(true)}
              ></i>
            )}
            <div className="d-flex align-item-center px-4">
              <Badge
                count={user?.unseenNotifications.length}
                onClick={() => navigate("/notifications")}
              >
                <i className="ri-notification-2-line header-action-icon px-3"></i>
              </Badge>
              <Link className="anchor mx-2" to="/profile">
                {user?.name}
              </Link>
            </div>
          </div>
          <div className="body">{props.children}</div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
