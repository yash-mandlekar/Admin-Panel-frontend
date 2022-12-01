import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Axios from "../Axios/Axios";
import ReactPlayer from "../FolderManage/ReactPlayer";
import { confirmAlert } from "react-confirm-alert";
const Home = () => {
  const playerRef = useRef();
  const [showDesc, setshowDesc] = useState([]);
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
    };
    const { data } = await Axios.get("/all/news", config);
    setNews(data);
    console.log(data);
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
    await Axios.delete(`/news/`, {
      data: { newsId: file._id, folderId: file.folderId },
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
        {News.map(
          (file, index) =>
            file.approved && (
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
                    <img src={file.file} className="card-img-top" />
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
                    {file.title.length > 20 ? (
                      <h5 className="card-title">
                        {file.title.slice(0, 20)}...
                      </h5>
                    ) : (
                      <h5 className="card-title">{file.title}</h5>
                    )}
                    <p className="card-text">
                      {showDesc.indexOf(file._id) !== -1
                        ? file.description + " "
                        : file.description.length < 34
                        ? file.description
                        : file.description.slice(0, 34) + "..."}
                      {file.description.length > 34 && (
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
                    <button onClick={() => {}} className="btn btn-dark mx-1">
                      Show more
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
            )
        )}
      </div>
    </motion.div>
  );
};

export default Home;
