import React from "react";
import "./MarketPlace.scss";
import { FiSearch } from "react-icons/fi";

const MarketPlace = () => {
  return (
    <>
      <div className="divFor_responsiv">
        <section className="search_bottom_border">
          <div className="marketplace_contanier">
            <div className="marketplace_search">
              <div className="marketplace_search_text">
                <h2>Browse Marketplace</h2>
                <p>Browse through more than 50k NFTs on the NFT Marketplace.</p>
              </div>
              <div className="marketplace_search_input">
                <input type="text" placeholder="Search your favourite NFTs" />
                <FiSearch />
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="count_background">
        <div className="marketplace_contanier">
          <div className="marketplace_nft_count">
            <ul>
              <li className="activeMarket">
                NFTs <span>302</span>
              </li>
              <li>
                Collections <span>67</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="marketplace_content">
        <div className="marketplace_contanier">
          <div
            className="marketplace_nfts_div"
            style={{ display: "flex", flexWrap: "wrap", gap: "30px" }}>
            <div className="card_div">
              <div className="card_div_img">
                <img
                  src="https://cdn.animaapp.com/projects/63aaf7e2426e9824f0350c11/releases/63aaf8f2426e9824f0350c13/img/image-placeholder@2x.png"
                  alt=""
                />
              </div>
              <div className="card_div_content">
                <div className="card_div_content_head">
                  <h2>Magic Mushroom 0325</h2>
                  <div className="card_div_content_head_artist">
                    <img
                      src="https://cdn.animaapp.com/projects/63aaf7e2426e9824f0350c11/releases/63aaf8f2426e9824f0350c13/img/avatar-placeholder-5@2x.png"
                      alt=""
                    />
                    <p>Shroomie</p>
                  </div>
                </div>
                <div className="card_div_content_body">
                  <div>
                    <p>Price</p>
                    <h3>
                      <span>0.33</span>ETH
                    </h3>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <p>Highest Bid</p>
                    <h3>
                      <span>1.63</span> wETH
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MarketPlace;
