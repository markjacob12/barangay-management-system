import { Link } from "react-router-dom";
import style from "./LandingNavBar.module.css";
import Logo from "../../../assets/Logo//Logo.png";
const LandingNavBar = () => {
  return (
    <>
      <nav className={style["nav-bar"]} aria-label="Main Navigation">
        <img src={Logo} alt="PAPA Barangay Logo" />
        <div className={style["nav-links"]}>
          <ul>
            <li>
              <Link to="/Login">Login</Link>
            </li>
            <li>
              {/* Binigyan natin ng special class para standout ang Register */}
              <Link to="/register" className={style["register-btn"]}>
                Register
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default LandingNavBar;
