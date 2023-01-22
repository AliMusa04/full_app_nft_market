import React from "react";
import "./Navbar.scss";
import logo from "../../localPics/Logo.png";
import { AiOutlineUser } from "react-icons/ai";
import { CgMenuLeft } from "react-icons/cg";

import { Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const Navbar = () => {
  return (
    <header>
      <div className="navbar_logo">
        <img src={logo} alt="" />
      </div>
      <div className="navbar_tablet_menu">
        <CgMenuLeft style={{ fontSize: "24px", color: "white" }} />
      </div>
      <div className="navbar_links">
        <div className="navbar_link_route">
          <ul>
            <li>
              <Link to={""}>Marketplace</Link>
            </li>
            <li>
              <Link to={"ranking-artists"}>Rankings</Link>
            </li>
            <li>
              <Link to={"add-artist"}>Add Artist</Link>
            </li>
          </ul>
        </div>
        <button>
          <AiOutlineUser style={{ fontSize: "20px" }} />
          <span>Sign Up</span>
        </button>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </header>
  );
};

export default Navbar;
