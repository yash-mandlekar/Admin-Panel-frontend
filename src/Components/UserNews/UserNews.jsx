import Axios from "../Axios/Axios";
import React, { useEffect, useRef, useState } from "react";
import { Metronome } from "@uiball/loaders";
import { confirmAlert } from "react-confirm-alert";
import ReactPlayer from "../FolderManage/ReactPlayer";
import { useNavigate } from "react-router-dom";
const UserNews = () => {
  const playerRef = useRef();
  const navigate = useNavigate();
  const [newsList, setNewsList] = useState(null);
  const getNews = async () => {
    setNewsList(null);
    const { data } = await Axios.get("/userNews");
    setNewsList(data.userNews);
  };
  useEffect(() => {
    getNews();
  }, []);
  const deleteNews = async (file) => {
    const config = {
      headers: {
        token: JSON.parse(localStorage.getItem("accessTokenAdmin")),
      },
    };
    try {
      await Axios.delete(`/userNews/${file._id}`, config);
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
  const handlePlayerReady = (player) => {
    playerRef.current = player;
  };
  return (
    <>
      <h2> User News</h2>
      {newsList ? (
        newsList.map((file, i) => (
          <div
            key={i}
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
                {/* by: {file.author.username} */}
              </span>
              {file.message.length > 20 ? (
                <h5 className="card-title">{file.message.slice(0, 20)}...</h5>
              ) : (
                <h5 className="card-title">{file.message}</h5>
              )}
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
        ))
      ) : (
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
      )}
    </>
  );
};

export default UserNews;
