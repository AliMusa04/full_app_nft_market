import React, { useEffect, useRef, useState } from "react";
import "./MarketPlace.scss";
import { FiSearch } from "react-icons/fi";
import axios from "axios";

const MarketPlace = () => {
  const [data, setData] = useState([]);

  const [input, setInput] = useState("");

  const [active, setActive] = useState(true);

  const [noActive, setNoActive] = useState(false);

  console.log(input);
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/marketplace")
      .then((res) => setData(res.data));
  }, []);
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
                <input
                  type="text"
                  placeholder="Search your favourite NFTs"
                  onChange={(e) => setInput(e.target.value)}
                />
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
              <li
                onClick={() => {
                  setActive(true);
                  setNoActive(false);
                }}
                className={active ? "activeMarket" : null}>
                NFTs <span>{data.length}</span>
              </li>
              <li
                onClick={() => {
                  setActive(false);
                  setNoActive(true);
                }}
                className={noActive ? "activeMarket" : null}>
                Collections <span>{data.length}</span>
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
            {data &&
              data
                .filter((nft) => {
                  if (nft.title.toLowerCase().includes(input.toLowerCase())) {
                    return nft;
                  }
                })
                .map((nft) => {
                  return (
                    <div key={nft._id} className="card_div">
                      <div className="card_div_img">
                        <img src={`${nft.NFTimg}`} alt="" />
                      </div>
                      <div className="card_div_content">
                        <div className="card_div_content_head">
                          <h2>{nft.title}</h2>
                          <div className="card_div_content_head_artist">
                            <img src={`${nft.artist.img}`} alt="" />
                            <p>{nft.artist.name}</p>
                          </div>
                        </div>
                        <div className="card_div_content_body">
                          <div>
                            <p>Price</p>
                            <h3>
                              <span>{nft.price}</span>ETH
                            </h3>
                          </div>
                          <div style={{ textAlign: "right" }}>
                            <p>Highest Bid</p>
                            <h3>
                              <span>{nft.Hbid}</span> wETH
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
          </div>
        </div>
      </section>
    </>
  );
};

export default MarketPlace;
