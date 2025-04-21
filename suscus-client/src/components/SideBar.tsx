import { NavLink } from "react-router-dom";
import "../css/Sidebar/Sidebar.css";

const SideBar = () => {
  return (
    <nav className="sidebar">
      <div className="sidebar-notification">
        {/* 
          <NavLink to="/">
            <img src="/ico/notification.svg" className="navbar-ico" />
          </NavLink>
        */}
      </div>
      <ul className="main-navigation">
        <li>
          <NavLink to="/gallery" className={({ isActive }) => (isActive ? "active" : "")}>
            <img src="/ico/home.svg" className="navbar-ico" />
          </NavLink>
        </li>
        <li>
          <NavLink to="/profile" className={({ isActive }) => (isActive ? "active" : "")}>
            <img src="/ico/profile.svg" className="navbar-ico" />
          </NavLink>
        </li>
        <li>
          <NavLink to="/chat" className={({ isActive }) => (isActive ? "active" : "")}>
            <img src="/ico/bxs_chat.svg" className="navbar-ico" />
          </NavLink>
        </li>
        <li>
          <NavLink to="/orders" className={({ isActive }) => (isActive ? "active" : "")}>
            <img src="/ico/blank.svg" className="navbar-ico" />
          </NavLink>
        </li>
        <li>
          <NavLink to="/settings" className={({ isActive }) => (isActive ? "active" : "")}>
            <img src="/ico/gear.svg" className="navbar-ico" />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
export default SideBar;
