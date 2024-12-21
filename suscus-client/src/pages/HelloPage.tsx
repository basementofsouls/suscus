import { Link } from "react-router-dom";
import Header from "../components/header";
import "../css/HelloPage.css";

const HelloPage = () => {
  return (
    <div className="hello-page">
      <Header />
      <div className="hello-page-block">
        <div>
          <img />
        </div>
        <div className="hello-page-block-right-column">
          <h1 className="hello-page-block-title">
            Welcome to
            <br /> Sus Custom app
          </h1>
          <p className="hello-page-block-subtitle">
            Sign Up or Sign In to access your account
          </p>
          <p className="hello-page-block-info">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum
          </p>
          <Link to="/login">
            <div className="button-purple hello-page-button">JOIN US</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HelloPage;
