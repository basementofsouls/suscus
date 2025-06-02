import { Link } from "react-router-dom";
import LoginForm from "../components/loginForm";
import WelcomeBlock from "../components/WelcomeBlock";
import "../css/LoginPage.css";

const Login = () => {
  return (
    <div className="login-page">
      <div className="login-page-form-column">
        <div className="login-page-form">
          <div className="login-page-form-top">
            <h1 className="login-page-form-title">Login</h1>
            <p className="login-page-form-subtitle">
              Enter your account details
            </p>
          </div>
          <LoginForm />
          <Link to="/registration">
            <p className="link-gray">Dont have an account? Sign Up now!</p>
          </Link>
        </div>
      </div>
      <div className="login-page-info">
        <WelcomeBlock />
      </div>
    </div>
  );
};

export default Login;
