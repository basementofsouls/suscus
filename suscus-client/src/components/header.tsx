import "../css/Header.css";

const Header = () => {
  return (
    <header className="header">
      <nav>
        <ul className="header-ul">
          <li>
            <a href="/login" className="button-sign-in">
              Sign In
            </a>
          </li>
          <li>
            <a href="/registration" className="button-sign-up">
              Sign Up
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default Header;
