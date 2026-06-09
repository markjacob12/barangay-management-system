import React from "react";
import style from "./Navbar.module.css";
import Logo from "../../assets/Logo/Logo.png";

const Navbar = () => {
  return (
    <>
      <nav className={style["nav-bar"]}>
        {/* Left Side: Logo Branding Container */}
        <div className={style.logo}>
          <img src={Logo} alt="PAPA Barangay Official Logo" />
        </div>

        {/* Center Side: Clean Government Institutional Subtag */}
        <div className={style.govCenterTag}>
          <span className={style.republicText}>REPUBLIKA NG PILIPINAS</span>
          <span className={style.localText}>
            Lokal na Pamahalaan ng Barangay
          </span>
        </div>

        {/* Right Side: Elite Admin Profile Card Badge */}
        <div className={style.info}>
          <div className={style.profileBadge}>
            <div className={style.avatarCircle}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <div className={style.profileDetails}>
              <span className={style.accountName}>Admin Account</span>
              <span className={style.accountRole}>Tagapangasiwa</span>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
