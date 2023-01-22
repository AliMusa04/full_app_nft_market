import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import "./Ranking.scss";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-hot-toast";

const Rankings = () => {
  const [artist, setArtist] = useState([]);

  const [today, setToday] = useState(true);

  const [week, setWeek] = useState(false);

  const [month, setMonth] = useState(false);

  const [allTime, setAllTime] = useState(false);

  const [modalData, setModalData] = useState("");

  console.log(modalData);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const formik = useFormik({
    initialValues: {
      title: "",
      price: "",
      Hbid: "",
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      price: Yup.number().required("Required"),
      Hbid: Yup.number().required("Required"),
    }),
    onSubmit: (values) => {
      // console.log(values);
      axios.post(`http://localhost:8080/api/marketplace/${modalData}`, values);
      toast.success("NFT created !");
    },
  });

  console.log(artist);
  useEffect(() => {
    axios.get("http://localhost:8080/api/artists").then((res) => {
      setArtist(res.data);
    });
  }, []);

  return (
    <>
      <section>
        <div className="rankings_content_contanier">
          <div className="rankings_content_title">
            <div className="responsiv_for_padding">
              <h2>Top Creators</h2>
              <p>Check out top ranking NFT artists on the NFT Marketplace.</p>
            </div>
          </div>
          <div className="rankings_content_time">
            <div className="rankings_content_time_desktop">
              <ul>
                <li
                  onClick={() => {
                    setToday(true);
                    setMonth(false);
                    setAllTime(false);
                    setWeek(false);
                  }}
                  className={today ? "active" : null}>
                  Today
                </li>
                <li
                  onClick={() => {
                    setToday(false);
                    setMonth(false);
                    setAllTime(false);
                    setWeek(true);
                  }}
                  className={week ? "active" : null}>
                  This Week
                </li>
                <li
                  onClick={() => {
                    setToday(false);
                    setMonth(true);
                    setAllTime(false);
                    setWeek(false);
                  }}
                  className={month ? "active" : null}>
                  This Month
                </li>
                <li
                  onClick={() => {
                    setToday(false);
                    setMonth(false);
                    setAllTime(true);
                    setWeek(false);
                  }}
                  className={allTime ? "active" : null}>
                  All Time
                </li>
              </ul>
            </div>
            <div className="rankings_content_time_phone">
              <ul>
                <li className="active">1d</li>
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
                <p className="responsiv_forPhone">Change</p>
                <p className="responsiv_forTable">NFTs Sold</p>
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
                        <span className="responsiv_forPhoneBack">
                          {user.rank}
                        </span>
                        <div className="rankings_content_table_body_artist_left_pics_name">
                          <img src={`${user.img}`} alt="user image" />
                          <h3>{user.name}</h3>
                        </div>
                      </div>
                      <div className="rankings_content_table_body_artist_right">
                        {user.change > 0 ? (
                          <p
                            className="responsiv_forPhone"
                            style={{ color: "green" }}>
                            +{user.change}
                          </p>
                        ) : (
                          <p
                            className="responsiv_forPhone"
                            style={{ color: "rgba(255, 0, 0,0.9)" }}>
                            {user.change}
                          </p>
                        )}

                        {user.NFTsold > 0 ? (
                          <p
                            className="responsiv_forTable"
                            style={{ color: "green" }}>
                            +{user.NFTsold}
                          </p>
                        ) : (
                          <p
                            className="responsiv_forTable"
                            style={{ color: "red" }}>
                            {user.NFTsold}
                          </p>
                        )}
                        <p>{user.volume} ETH</p>
                        <Button
                          type="primary"
                          onClick={() => {
                            showModal();
                            setModalData(user._id);
                          }}>
                          Open Modal
                        </Button>
                        <Modal
                          title="Create NFT"
                          open={isModalOpen}
                          onOk={handleOk}
                          onCancel={handleCancel}>
                          <div className="rankings_form">
                            <form
                              className="formik_artist"
                              onSubmit={formik.handleSubmit}>
                              <input
                                placeholder="Enter your NFT's title "
                                id="title"
                                name="title"
                                type="text"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.title}
                              />
                              {formik.touched.title && formik.errors.title ? (
                                <span>{formik.errors.title} !</span>
                              ) : null}

                              <input
                                placeholder="Enter NFT's price"
                                id="price"
                                name="price"
                                type="number"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.price}
                              />
                              {formik.touched.price && formik.errors.price ? (
                                <span>{formik.errors.price} !</span>
                              ) : null}

                              <input
                                placeholder="Enter Highest Bid"
                                id="Hbid"
                                name="Hbid"
                                type="number"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.Hbid}
                              />
                              {formik.touched.Hbid && formik.errors.Hbid ? (
                                <span>{formik.errors.Hbid} !</span>
                              ) : null}

                              <button
                                type="submit"
                                onClick={() => {
                                  handleCancel();
                                }}>
                                Submit
                              </button>
                            </form>
                          </div>
                        </Modal>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Rankings;
