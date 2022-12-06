import React, { useCallback, useEffect, useRef, useState } from "react";
import Axios from "../Axios/Axios";
import { useParams, useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import getCroppedImg from "./CropImage";
import { motion } from "framer-motion";
import ReactPlayer from "./ReactPlayer";
import DropZone from "./DropZone";
import { confirmAlert } from "react-confirm-alert";
import Alert from "../Alert/Alert";
import { Metronome } from "@uiball/loaders";

const SingleFolder = () => {
  const playerRef = useRef();
  const navigate = useNavigate();
  const { id } = useParams();
  const [blobUrl, setblobUrl] = useState();
  const [fileType, setfileType] = useState();
  const [showDropzone, setshowDropzone] = useState(false);
  const [showDropdown, setshowDropdown] = useState(false);
  const [CategoryList, setCategoryList] = useState([]);
  const [progress, setprogress] = useState(0);
  const [EditForm, setEditForm] = useState(false);
  const [ChannelList, setChannelList] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [FormDatas, setFormDatas] = useState({
    title: "",
    _id: "",
    channelInput: "",
    category: "",
    channels: [],
  });
  const { title, _id, channels, channelInput, category } = FormDatas;
  const [Files, setFiles] = useState([]);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [loader, setloader] = useState(true);
  const [alert, setalert] = useState({
    show: false,
    message: "",
  });
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);
  useEffect(() => {
    ShowFiles();
    showChannelList();
    showCategories();
  }, []);
  const showCategories = async () => {
    try {
      const config = {
        headers: {
          token: JSON.parse(localStorage.getItem("accessToken")),
        },
      };
      const res = await Axios.get("/category", config);
      setCategoryList(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const ShowFiles = async () => {
    const config = {
      headers: {
        token: JSON.parse(localStorage.getItem("accessToken")),
      },
    };
    const res = await Axios.get(`/open/folder/${id}`, config);
    setFiles(res.data.shorts);
    setloader(false);
  };
  const showChannelList = async () => {
    const config = {
      headers: {
        token: JSON.parse(localStorage.getItem("accessToken")),
      },
    };
    const res = await Axios.get("/channel", config);
    setChannelList(res.data);
  };
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setblobUrl(URL.createObjectURL(acceptedFiles[0]));
      setfileType(acceptedFiles[0].type.split("/")[0]);
    },
  });
  const handleDropzoneSubmit = useCallback(async () => {
    if (blobUrl && fileType && title && channels.length > 0 && true) {
      if (fileType === "image") {
        var croppedImage = await getCroppedImg(blobUrl, croppedAreaPixels);
        var file = await fetch(croppedImage)
          .then((r) => r.blob())
          .then(
            (blobFile) =>
              new File([blobFile], "croppedImage.png", { type: "image" })
          );
      } else if (fileType === "video") {
        var croppedImage = blobUrl;
        var file = await fetch(blobUrl)
          .then((r) => r.blob())
          .then(
            (blobFile) => new File([blobFile], "video.mp4", { type: "video" })
          );
      } else {
        var croppedImage = blobUrl;
        var file = await fetch(blobUrl)
          .then((r) => r.blob())
          .then(
            (blobFile) => new File([blobFile], "audio.mp3", { type: "audio" })
          );
      }
      // file to formdata
      setshowDropzone(false);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", title);
      formData.append("category", category);
      formData.append("folderId", id);
      formData.append("fileType", fileType);
      channels.map((channel) => formData.append("channels[]", channel._id));

      const res = await Axios.post(
        "/shorts",
        formData,
        {
          headers: {
            token: JSON.parse(localStorage.getItem("accessToken")),
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            setprogress(
              parseInt(
                Math.round((progressEvent.loaded * 100) / progressEvent.total)
              )
            );
          },
        },
        []
      );
      console.log(res.data);
      setFormDatas({
        title: "",
        _id: "",
        channelInput: "",
        category: "",
        channels: [],
      });
      setblobUrl();
      setfileType();
      ShowFiles();
      setprogress(0);
    } else {
      setalert({
        show: true,
        message: "Please fill all the fields",
      });
      setTimeout(() => {
        setalert({
          show: false,
          message: "",
        });
      }, 3000);
    }
  }, [
    croppedAreaPixels,
    blobUrl,
    fileType,
    title,
    id,
    Files,
    channels,
    channelInput,
  ]);
  const updateForm = useCallback(async () => {
    if (blobUrl && fileType && title && channels.length > 0 && true) {
      if (fileType === "image") {
        var croppedImage = await getCroppedImg(blobUrl, croppedAreaPixels);
        var file = await fetch(croppedImage)
          .then((r) => r.blob())
          .then(
            (blobFile) =>
              new File([blobFile], "croppedImage.png", { type: "image" })
          );
      } else if (fileType === "video") {
        var croppedImage = blobUrl;
        var file = await fetch(blobUrl)
          .then((r) => r.blob())
          .then(
            (blobFile) => new File([blobFile], "video.mp4", { type: "video" })
          );
      } else {
        var croppedImage = blobUrl;
        var file = await fetch(blobUrl)
          .then((r) => r.blob())
          .then(
            (blobFile) => new File([blobFile], "audio.mp3", { type: "audio" })
          );
      }
      // file to formdata
      setshowDropzone(false);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", title);
      formData.append("folderId", id);
      formData.append("fileType", fileType);
      formData.append("newsId", _id);
      channels.map((channel) => formData.append("channels[]", channel._id));

      const res = await Axios.put(
        "/shorts",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            token: JSON.parse(localStorage.getItem("accessToken")),
          },
          onUploadProgress: (progressEvent) => {
            setprogress(progressEvent.loaded / progressEvent.total);
          },
        },
        []
      );
      setFormDatas({
        title: "",
        _id: "",
        channelInput: "",
        channels: [],
      });
      setblobUrl();
      setfileType();
      ShowFiles();
      setprogress(0);
    } else {
      setalert({
        show: true,
        message: "Please fill all the fields",
      });
      setTimeout(() => {
        setalert({
          show: false,
          message: "",
        });
      }, 3000);
    }
  }, [
    croppedAreaPixels,
    blobUrl,
    fileType,
    title,
    id,
    Files,
    channels,
    channelInput,
  ]);
  const handleDropzone = () => {
    setshowDropzone(true);
    setIsUpdate(false);
  };
  const handleInput = (e) => {
    setFormDatas({ ...FormDatas, [e.target.name]: e.target.value });
  };
  const selectChannel = (id) => {
    if (!channels.find((channel) => channel._id === id)) {
      const channel = ChannelList.find((channel) => channel._id === id);
      setFormDatas((prev) => ({
        ...prev,
        channels: [...prev.channels, channel],
      }));
    }
    showChannelList();
  };
  const removeChannel = (id) => {
    const newChannels = channels.filter((channel) => channel._id !== id);
    setFormDatas({ ...FormDatas, channels: newChannels });
  };
  const deleteFile = async (fileId, i) => {
    const config = {
      headers: {
        token: JSON.parse(localStorage.getItem("accessToken")),
      },
    };
    await Axios.delete(`/shorts/${fileId}`, {
      headers: config.headers,
    });

    ShowFiles();
  };
  const confirmBox = (item) => {
    confirmAlert({
      title: "Confirm to Delete",
      message: "Are you sure to delete this file.",
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteFile(item),
        },
        {
          label: "No",
        },
      ],
    });
  };
  const editFile = async (fileId, i) => {
    const config = {
      headers: {
        token: JSON.parse(localStorage.getItem("accessToken")),
      },
    };
    const res = await Axios.get(`/shorts/${fileId}`, config);
    console.log(res.data);
    setblobUrl(res.data.file);
    setfileType(res.data.fileType);
    setFormDatas({
      title: res.data.title,
      _id: res.data._id,
      channels: res.data.channels,
      channelInput: "",
    });
    setshowDropzone(true);
    setEditForm(true);
    setIsUpdate(true);
  };
  const handlePlayerReady = (player) => {
    playerRef.current = player;
  };
  const handleDropdown = () => {
    setTimeout(() => {
      setshowDropdown(false);
    }, 200);
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: "100%" }}
      transition={{ duration: 0.5 }}
      style={{ width: "100%" }}
    >
      {alert.show && <Alert message={alert.message} />}
      {!showDropzone && (
        <div className="container">
          <div className="showDropzone-container mt-2 mx-2">
            <button
              onClick={() => navigate("/folderManagement")}
              className="btn btn-danger mx-2"
            >
              <i className="bi bi-arrow-left-circle"> </i>
              Back
            </button>
            <button onClick={handleDropzone} className="btn btn-dark mx-2">
              <i className="bi bi-plus-circle-dotted"> </i>
              Add File
            </button>
          </div>
          {/* Show All File */}
          <div className="showAllFile-container mt-2 ">
            {loader ? (
              <div
                className="loader"
                style={{
                  width: "100%",
                  height: "80vh",
                }}
              >
                <Metronome size={60} lineWeight={5} speed={2} color="black" />
                <p>Loading...</p>
              </div>
            ) : (
              <div className="d-flex flex-wrap">
                {Files.length > 0 ? (
                  Files.map((file, index) => (
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
                                // file in base64
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
                          <img src={file.file} className="card-img-top" />
                        )}
                        {file.fileType === "audio" && (
                          <audio
                            src={file.file}
                            controls
                            className="card-img-top"
                          />
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
                          <button
                            onClick={() => confirmBox(file._id, index)}
                            className="btn btn-danger mx-1"
                          >
                            Delete
                          </button>
                          <button
                            onClick={() => editFile(file._id, index)}
                            className="btn btn-dark mx-1"
                          >
                            Edit
                          </button>
                          <div className="dropdown">
                            <button
                              className="btn btn-secondary btn-sm dropdown-toggle py-2"
                              type="button"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              Channels
                            </button>
                            <ul className="dropdown-menu">
                              {file.channels.map((channel, i) => (
                                <li key={i} className="dropdown-item">
                                  {channel.channelName}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center">
                    <h3>No File Found</h3>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
      {showDropzone && (
        <DropZone
          setshowDropzone={setshowDropzone}
          blobUrl={blobUrl}
          fileType={fileType}
          progress={progress}
          getRootProps={getRootProps}
          getInputProps={getInputProps}
          handleInput={handleInput}
          title={title}
          channels={channels}
          channelInput={channelInput}
          category={category}
          setshowDropdown={setshowDropdown}
          handleDropdown={handleDropdown}
          showDropdown={showDropdown}
          ChannelList={ChannelList}
          selectChannel={selectChannel}
          removeChannel={removeChannel}
          EditForm={EditForm}
          updateForm={updateForm}
          handleDropzoneSubmit={handleDropzoneSubmit}
          handlePlayerReady={handlePlayerReady}
          crop={crop}
          setCrop={setCrop}
          zoom={zoom}
          setZoom={setZoom}
          onCropComplete={onCropComplete}
          acceptedFiles={acceptedFiles}
          CategoryList={CategoryList}
          isUpdate={isUpdate}
        />
      )}
    </motion.div>
  );
};

export default SingleFolder;
