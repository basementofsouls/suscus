import RegistrationForm from "../components/RegistrationForm";
import WelcomeBlock from "../components/WelcomeBlock";
import "../css/LoginPage.css";

const RegistrationPage = () => {
  return (
    <div className="login-page">
      <div className="login-page-form-column">
        <div className="login-page-form">
          <div className="login-page-form-top">
            <h1 className="login-page-form-title">Registration</h1>
            <p className="login-page-form-subtitle">
              Enter your account details
            </p>
          </div>
          <RegistrationForm />
        </div>
      </div>
      <div className="login-page-info">
        <WelcomeBlock />
      </div>
    </div>
  );
};

export default RegistrationPage;
