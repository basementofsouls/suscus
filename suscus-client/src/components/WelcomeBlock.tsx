import "../css/WelcomeBlock.css";

const WelcomeBlock = () => {
  return (
    <div className="welcome-block">
      <div>
        <h1 className="welcome-block-title poppins-bold">
          Welcome to
          <br /> Sus Custom app
        </h1>
        <p className="welcome-block-subtitle">Login to access your account</p>
      </div>
    </div>
  );
};

export default WelcomeBlock;
