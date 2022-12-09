import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Axios from "../Axios/Axios";
import ReactPlayer from "../FolderManage/ReactPlayer";
import { confirmAlert } from "react-confirm-alert";
import { Metronome } from "@uiball/loaders";
const Home = () => {
  const playerRef = useRef();
  const navigate = useNavigate();
  const [showDesc, setshowDesc] = useState([]);
  const [progress, setProgress] = useState({
    height: 0,
    show: true,
  });
  const { height, show } = progress;
  const [News, setNews] = useState([
    {
      _id: "632961209f9a88b2f983197d",
      approved: false,
      author: {
        username: "Yash Kumar",
      },
      title: "Pan Cake",
      description: "I suggest you to eat this tasty pan Cakes",
      channels: [
        {
          channelName: "vertical",
          description: "vertical slider with 2 partition",
          layout: "vertical",
          partition: 2,
          play: "false",
          titlePosition: "bottom",
          top: "false",
          type: "slider",
          _id: "63294f901d7ddd55c2ce41a2",
        },
      ],
      file: "/folders/1663659496607-745619449-croppedImage.png",
      fileType: "image",
    },
  ]);
  useEffect(() => {
    getNews();
  }, []);
  const getNews = async () => {
    const config = {
      headers: {
        token: JSON.parse(localStorage.getItem("accessToken")),
      },
      onDownloadProgress: function (progressEvent) {
        setProgress({
          ...progress,
          height: Math.round(
            (progressEvent.loaded / progressEvent.total) * 100
          ),
        });
        if (
          Math.round((progressEvent.loaded / progressEvent.total) * 100) === 100
        ) {
          setTimeout(() => {
            setProgress({
              ...progress,
              show: false,
            });
          }, 500);
        }
      },
    };
    const { data } = await Axios.get("/approved/news", config);

    setNews(data);
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
        token: JSON.parse(localStorage.getItem("accessToken")),
      },
    };
    await Axios.delete(`/news/${file._id}`, {
      headers: config.headers,
    });
    getNews();
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
      <h1 className="display-6">Approved News :- </h1>
      <div className="d-flex flex-wrap showAllFile-container">
        {show ? (
          <div
            className="line-cnt"
            style={{
              width: "100%",
              height: "30vh",
              backgroundColor: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              marginTop: "15%",
            }}
          >
            <div
              className="line"
              style={{
                width: "80px",
                height: height + "%",
                backgroundColor: "blue",
                transition: "all 0.5s ease",
                position: "absolute",
                bottom: "18px",
              }}
            ></div>
            <span
              style={{
                position: "absolute",
                bottom: "-2px",
              }}
            >
              Loading...
            </span>
          </div>
        ) : News.length > 0 ? (
          News.map((file, index) => (
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
                            src: `data:video/mp4;base64,${file.file}`,
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
                    onClick={() => navigate(`/news/edit/${file._id}`)}
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
          <div className="noFile">
            <h1>No News Found</h1>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Home;
