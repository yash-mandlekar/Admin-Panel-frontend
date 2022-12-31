import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Axios from "../Axios/Axios";
import ReactPlayer from "../FolderManage/ReactPlayer";
import { confirmAlert } from "react-confirm-alert";
import { Metronome } from "@uiball/loaders";
const News = () => {
  const playerRef = useRef();
  const navigate = useNavigate();
  const [showDesc, setshowDesc] = useState([]);
  const [loader, setLoader] = useState(true);
  const [NewsList, setNewsList] = useState([
    // {
    //   _id: "632961209f9a88b2f983197d",
    //   approved: false,
    //   author: {
    //     username: "Yash Kumar",
    //   },
    //   title: "Pan Cake",
    //   description: "I suggest you to eat this tasty pan Cakes",
    //   channels: [
    //     {
    //       channelName: "vertical",
    //       description: "vertical slider with 2 partition",
    //       layout: "vertical",
    //       partition: 2,
    //       play: "false",
    //       titlePosition: "bottom",
    //       top: "false",
    //       type: "slider",
    //       _id: "63294f901d7ddd55c2ce41a2",
    //     },
    //   ],
    //   file: "/folders/1663659496607-745619449-croppedImage.png",
    //   fileType: "image",
    // },
  ]);
  useEffect(() => {
    getNews();
  }, []);
  const getNews = async () => {
    const config = {
      headers: {
        token: JSON.parse(localStorage.getItem("accessTokenAdmin")),
      },
    };
    const { data } = await Axios.get("/pending/news", config);
    setLoader(false);
    setNewsList(data);
  };
  const handlePlayerReady = (player) => {
    playerRef.current = player;
  };
  const showAndHideBtn = (id) => {
    if (showDesc.includes(id)) {
      setshowDesc(showDesc.filter((item) => item !== id));
    } else {
      setshowDesc([...showDesc, id]);
    }
  };
  const deleteNews = async (file) => {
    const config = {
      headers: {
        token: JSON.parse(localStorage.getItem("accessTokenAdmin")),
      },
    };
    try {
      await Axios.delete(`/news/${file._id}`, config);
      getNews();
    } catch (err) {
      console.log(err);
    }
  };

  const confirmBox = (item) => {
    confirmAlert({
      title: "Confirm to Delete",
      message: "Are you sure to delete this News?",
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteNews(item),
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
      <h1 className="display-6">Pending News :- </h1>
      <div className="showDropzone-container mt-2 mx-2">
        <button
          onClick={() => navigate("/admin/news/new")}
          className="btn btn-dark mx-2"
        >
          <i className="bi bi-plus-circle-dotted"> </i>
          Add News
        </button>
      </div>
      <div className="d-flex flex-wrap showAllFile-container">
        {loader ? (
          <div
            className="loader"
            style={{
              width: "100%",
              height: "78vh",
            }}
          >
            <Metronome size={60} lineWeight={5} speed={2} color="black" />
            <p>Loading...</p>
          </div>
        ) : NewsList.length > 0 ? (
          NewsList.map((file, index) => (
            <div key={file._id} className="">
              <div
                className="card mt-1 mx-1"
                style={{
                  width: "18rem",
                  height: file.fileType === "image" && "26rem",
                  height: file.fileType === "video" && "19rem",
                  height: file.fileType === "audio" && "13rem",
                }}
              >
                {file.fileType === "video" && (
                  <div className="react-player">
                    <ReactPlayer
                      options={{
                        controls: true,
                        responsive: true,
                        fluid: true,
                        sources: [
                          {
                            src: file.file,
                            type: "video/mp4",
                          },
                        ],
                      }}
                      onReady={handlePlayerReady}
                    />
                  </div>
                )}
                {file.fileType === "image" && (
                  <img
                    src={`data:image/jpeg;base64,${file.file}`}
                    className="card-img-top"
                  />
                )}
                {file.fileType === "audio" && (
                  <audio src={file.file} controls className="card-img-top" />
                )}
                <div className="card-body px-2 py-1">
                  <span
                    style={{
                      color: "grey",
                      fontSize: "12px",
                      textAlign: "center",
                    }}
                  >
                    by: {file.author.username}
                  </span>
                  {file.metaTitle.length > 20 ? (
                    <h5 className="card-title">
                      {file.metaTitle.slice(0, 20)}...
                    </h5>
                  ) : (
                    <h5 className="card-title">{file.metaTitle}</h5>
                  )}
                  <p className="card-text">
                    {showDesc.indexOf(file._id) !== -1
                      ? file.metaDescription + " "
                      : file.metaDescription.length < 34
                      ? file.metaDescription
                      : file.metaDescription.slice(0, 34) + "..."}
                    {file.metaDescription.length > 34 && (
                      <button
                        className="show-more"
                        onClick={() => showAndHideBtn(file._id)}
                      >
                        {showDesc.indexOf(file._id) !== -1
                          ? "Hide"
                          : "Show More"}
                      </button>
                    )}
                  </p>
                  <button
                    onClick={() => navigate(`/admin/news/edit/${file._id}`)}
                    className="btn btn-dark mx-1"
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
          <div className="loader" style={{ width: "100%", height: "78vh" }}>
            <h1>No News Found</h1>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default News;
