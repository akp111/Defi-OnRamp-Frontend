import Logo from "../../defi-fiat.png";
import { Link } from "react-router-dom";
import "./navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h1>Defi OnRamp</h1>
      <Link to='/login' style={{margin:'auto 0'}}>
        <button className="navbar-button">Launch Dapp</button>
      </Link>
    </nav>
  );
}

export default Navbar;
