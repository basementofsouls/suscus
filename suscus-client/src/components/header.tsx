import "../css/Header.css";

const Header = () => {
  return (
    <header className="header">
      <nav>
        <ul className="header-ul">
          <li>
            <a href="/login">Sign In</a>
          </li>
          <li>
            <a href="/registration">Sign Up</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default Header;
