import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Axios from "../Axios/Axios";
import { confirmAlert } from "react-confirm-alert";
import Style from "../News/News.module.css";
import moment from "moment";
import { Metronome } from "@uiball/loaders";

const Ads = () => {
  const navigate = useNavigate();
  const [AdsList, setAdsList] = useState([]);
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    getAds();
  }, []);
  const getAds = async () => {
    const config = {
      headers: {
        token: JSON.parse(localStorage.getItem("accessTokenAdmin")),
      },
    };
    setLoader(true);
    const { data } = await Axios.get("/add", config);
    console.log(data);
    setLoader(false);
    setAdsList(data);
  };
  const deleteAds = async (file) => {
    const config = {
      headers: {
        token: JSON.parse(localStorage.getItem("accessTokenAdmin")),
      },
    };
    await Axios.delete(`/add/${file._id}`, config);
    getAds();
  };
  const confirmBox = (item) => {
    confirmAlert({
      title: "Confirm to Delete",
      message: "Are you sure to delete this Ads?",
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteAds(item),
        },
        {
          label: "No",
        },
      ],
    });
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: "100%" }}
      transition={{ duration: 0.5 }}
      className="container w-100"
    >
      <h1 className="display-6">Ads :- </h1>
      <div className="showDropzone-container mt-2 mx-2 d-flex">
        <button
          onClick={() => navigate("/admin/ads/new")}
          className="btn btn-dark mx-2"
        >
          <i className="bi bi-plus-circle-dotted"> </i>
          Add Ads
        </button>
      </div>
      <div
        className="d-flex flex-wrap showAllFile-container"
        style={{ height: "76vh" }}
      >
        {loader ? (
          <div
            className="loader"
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            <Metronome size={60} lineWeight={5} speed={2} color="black" />
            <p>Loading...</p>
          </div>
        ) : AdsList.length !== 0 ? (
          AdsList.map((file, index) => (
            <div key={file._id}>
              <div
                className="card mt-1 mx-1"
                style={{
                  width: "18rem",
                }}
              >
                <img
                  src={`data:image/jpeg;base64,${file.file}`}
                  className="card-img-top"
                />
                <span
                  style={{
                    fontSize: "13px",
                    display: "flex",
                    flexDirection: "column",
                    padding: "5px 15px",
                  }}
                >
                  <strong style={{ color: "black", fontSize: "14px" }}>
                    title : {file.title}
                  </strong>
                  <small
                    style={{
                      fontSize: "13px",
                    }}
                  >
                    description : {file.description}
                  </small>
                  <small
                    style={{
                      fontSize: "13px",
                    }}
                  >
                    Location: {file.advertisementLocation}
                  </small>
                  <small
                    style={{
                      fontSize: "13px",
                    }}
                  >
                    Target Audience : {file.targetAudience}
                  </small>
                </span>
                <div className="card-body px-2 py-1">
                  <button
                    onClick={() => navigate("/admin/ads/" + file._id)}
                    className="btn btn-success mx-1"
                  >
                    Edit
                  </button>
                  {/* delete button */}
                  <button
                    onClick={() => {
                      confirmBox(file);
                    }}
                    className="btn btn-danger mx-1"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="container mt-2">
            <div className="row">
              <div className="col-12">
                <div className="alert alert-danger" role="alert">
                  No Data Found
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Ads;
