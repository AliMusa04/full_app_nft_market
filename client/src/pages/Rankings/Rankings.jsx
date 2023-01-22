import React, { useEffect, useState } from "react";
import "./Ranking.scss";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";

const Rankings = () => {
  const [artist, setArtist] = useState([]);

  console.log(artist);
  useEffect(() => {
    axios.get("http://localhost:8080/api/artists").then((res) => {
      setArtist(res.data);
    });
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      change: "",
      NFTsold: "",
      volume: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      change: Yup.number().required("Required"),
      NFTsold: Yup.number().required("Required"),
      volume: Yup.number().required("Required"),
    }),
    onSubmit: (values) => {
      // console.log(JSON.stringify(values));
      axios.post("http://localhost:8080/api/artists", values);
    },
  });

  return (
    <>
      <section>
        <div className="rankings_content_contanier">
          <div className="rankings_content_title">
            <div style={{ padding: "80px 0px" }}>
              <h2>Top Creators</h2>
              <p>Check out top ranking NFT artists on the NFT Marketplace.</p>
            </div>
          </div>
          <div className="rankings_content_time">
            <div className="rankings_content_time_desktop">
              <ul>
                <li className="active">Today</li>
                <li>This Week</li>
                <li>This Month</li>
                <li>All Time</li>
              </ul>
            </div>
            <div className="rankings_content_time_phone">
              <ul>
                <li>1d</li>
                <li>7d</li>
                <li>30d</li>
                <li>All Time</li>
              </ul>
            </div>
          </div>
          <div className="rankings_content_table">
            <div className="rankings_content_table_head">
              <div className="rankings_content_table_head_left">
                <p>#</p>
                <p>Artist</p>
              </div>
              <div className="rankings_content_table_head_right">
                <p>Change</p>
                <p>NFTs Sold</p>
                <p>Volume</p>
              </div>
            </div>

            <div className="rankings_content_table_body">
              {artist &&
                artist.map((user) => {
                  return (
                    <div
                      key={user._id}
                      className="rankings_content_table_body_artist">
                      <div className="rankings_content_table_body_artist_left">
                        <span>{user.rank}</span>
                        <div className="rankings_content_table_body_artist_left_pics_name">
                          <img src={`${user.img}`} alt="user image" />
                          <h3>{user.name}</h3>
                        </div>
                      </div>
                      <div className="rankings_content_table_body_artist_right">
                        {user.change > 0 ? (
                          <p style={{ color: "green" }}>+{user.change}</p>
                        ) : (
                          <p style={{ color: "rgba(255, 0, 0,0.9)" }}>
                            {user.change}
                          </p>
                        )}

                        {user.NFTsold > 0 ? (
                          <p style={{ color: "green" }}>+{user.NFTsold}</p>
                        ) : (
                          <p style={{ color: "red" }}>{user.NFTsold}</p>
                        )}
                        <p>{user.volume} ETH</p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </section>

      <div className="modal_background">
        <div className="modal_div"></div>
      </div>
    </>
  );
};

export default Rankings;
