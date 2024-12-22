import { Link } from "react-router-dom";
import "../css/Sidebar.css";

const SideBar = () => {
  return (
    <nav className="sidebar">
      <div className="sidebar-notification">
        {/*
          <Link to="/">
            <img src="/ico/notification.svg" className="navbar-ico" />
          </Link>
        */}
      </div>
      <ul className="main-navigation">
        <li>
          <Link to="/gallery">
            <img src="/ico/home.svg" className="navbar-ico" />
          </Link>
        </li>
        <li>
          <Link to="/profile">
            <img src="/ico/profile.svg" className="navbar-ico" />
          </Link>
        </li>
        <li>
          <Link to="/chat">
            <img src="/ico/bxs_chat.svg" className="navbar-ico" />
          </Link>
        </li>
        <li>
          <Link to="/orders">
            <img src="/ico/blank.svg" className="navbar-ico" />
          </Link>
        </li>
        <li>
          <Link to="/settings">
            <img src="/ico/gear.svg" className="navbar-ico" />
          </Link>
        </li>
      </ul>
    </nav>
  );
};
export default SideBar;
