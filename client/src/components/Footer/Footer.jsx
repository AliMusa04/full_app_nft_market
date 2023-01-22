import React from "react";
import "./Footer.scss";
import logo from "../../localPics/Logo.png";
import { RxDiscordLogo } from "react-icons/rx";
import { FiYoutube } from "react-icons/fi";
import { RxTwitterLogo } from "react-icons/rx";
import { BsInstagram } from "react-icons/bs";
import { Link } from "react-router-dom";
import { SlEnvolopeLetter } from "react-icons/sl";

const Footer = () => {
  return (
    <footer>
      <div className="footer_contanier">
        <div className="footer_contanier_links">
          <div className="footer_contanier_links_marketPlace">
            <img src={logo} alt="" />
            <div className="footer_contanier_links_marketPlace_contact">
              <h3>NFT marketplace UI created with Anima for Figma.</h3>
              <div className="footer_contanier_links_marketPlace_contact_bottom">
                <h4>Join our community</h4>
                <RxDiscordLogo />
                <FiYoutube />
                <RxTwitterLogo />
                <BsInstagram />
              </div>
            </div>
          </div>
          <div className="footer_contanier_explore">
            <h5>Explore</h5>
            <ul>
              <li>
                <Link to={""}>Marketplace</Link>
              </li>
              <li>
                <Link to={"/ranking-artists"}>Rankings</Link>
              </li>
              <li>
                <Link to={"add-artist"}>Add Artist</Link>
              </li>
            </ul>
          </div>
          <div className="footer_contanier_input">
            <h5>Join our weekly digest</h5>
            <div className="footer_contanier_input_text">
              <p>Get exclusive promotions & updates straight to your inbox.</p>
              <div className="footer_contanier_input_text_button">
                <input type="email" placeholder="Enter your email here " />
                <button>Subscribe</button>
              </div>

              <div className="footer_input_forPhone">
                <input type="email" placeholder="Enter Your Email Adress" />
                <button>
                  <SlEnvolopeLetter style={{ fontSize: "20px" }} />
                  <span style={{ fontSize: "16px" }}>Subscribe</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="footer_contanier_company">
          <p>Ⓒ NFT Market. Use this template freely.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
