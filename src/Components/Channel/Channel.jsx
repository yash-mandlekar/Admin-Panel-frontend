import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Axios from "../Axios/Axios";
import { confirmAlert } from "react-confirm-alert";
import Alert from "../Alert/Alert";
import { Metronome } from "@uiball/loaders";
const Channel = () => {
  const [ChannelForm, setChannelForm] = useState({
    channelName: "",
    description: "",
    type: "fixed",
    layout: "horizontal",
    titlePosition: "bottom",
    top: "false",
    play: "false",
    partition: 2,
    slider: [0, 1],
  });
  const {
    channelName,
    description,
    type,
    layout,
    titlePosition,
    top,
    play,
    partition,
  } = ChannelForm;
  const [ChannelList, setChannelList] = useState([]);
  const [ShowForm, setShowForm] = useState(false);
  const [UpdateForm, setUpdateForm] = useState(false);
  const [slider, setslider] = useState([]);
  const [showDesc, setshowDesc] = useState([]);
  const [loader, setLoader] = useState(true);
  const [alert, setalert] = useState({
    show: false,
    message: "",
  });
  useEffect(() => {
    var arr = [];
    for (let i = 0; i < +partition; i++) {
      arr.push(i);
    }
    setslider(arr);
    setChannelForm({ ...ChannelForm, slider: arr });
  }, [partition]);
  useEffect(() => {
    showChannelList();
  }, []);
  const showChannelList = async () => {
    const config = {
      headers: {
        token: JSON.parse(localStorage.getItem("accessTokenAdmin")),
      },
    };
    const res = await Axios.get("/channel", config);
    setLoader(false);
    setChannelList(res.data);
  };
  const showForm = () => {
    setShowForm(true);
  };
  const hideForm = () => {
    setShowForm(false);
  };
  const addChannel = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        token: JSON.parse(localStorage.getItem("accessTokenAdmin")),
      },
    };
    try {
      await Axios.post("/channel", ChannelForm, config);
      showChannelList();
      hideForm();
      setChannelForm({
        channelName: "",
        description: "",
        type: "fixed",
        layout: "horizontal",
        titlePosition: "bottom",
        top: "false",
        play: "false",
        partition: 2,
      });
      setalert({
        show: true,
        message: "Channel Added Successfully",
      });
      setTimeout(() => {
        setalert({
          show: false,
          message: "",
        });
      }, 2000);
    } catch (err) {
      setalert({
        show: true,
        message: err.response.data.message,
      });
      setTimeout(() => {
        setalert({
          show: false,
          message: "",
        });
      }, 3000);
    }
  };
  const handleForm = (e) => {
    setChannelForm({ ...ChannelForm, [e.target.name]: e.target.value });
  };
  const handleclick = (e) => {
    setChannelForm({
      ...ChannelForm,
      [e.target.name]: e.target.value === "false" ? "true" : "false",
    });
  };
  const handleDeleteChannel = (id) => {
    const config = {
      headers: {
        token: JSON.parse(localStorage.getItem("accessTokenAdmin")),
      },
    };
    Axios.delete("/channel", {
      data: { channelId: id },
      headers: config.headers,
    });
    setalert({
      show: true,
      message: "Channel Deleted Successfully",
    });
    setTimeout(() => {
      setalert({
        show: false,
        message: "",
      });
    }, 3000);
    showChannelList();
  };
  const handleEditChannel = async (id) => {
    setShowForm(true);
    const config = {
      headers: {
        token: JSON.parse(localStorage.getItem("accessTokenAdmin")),
      },
    };
    const res = await Axios.get(`/open/channel/${id}`, config);
    setChannelForm(res.data);
    setUpdateForm(true);
  };
  const updateChannel = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        token: JSON.parse(localStorage.getItem("accessTokenAdmin")),
      },
    };
    await Axios.put("/channel", ChannelForm, config);
    showChannelList();
    hideForm();
    setChannelForm({
      channelName: "",
      description: "",
      type: "fixed",
      layout: "horizontal",
      titlePosition: "bottom",
      top: "false",
      play: "false",
      partition: 2,
    });
    setUpdateForm(false);
    setalert({
      show: true,
      message: "Channel Updated Successfully",
    });
    setTimeout(() => {
      setalert({
        show: false,
        message: "",
      });
    }, 2000);
  };
  const showAndHideBtn = (id) => {
    if (showDesc.includes(id)) {
      setshowDesc(showDesc.filter((item) => item !== id));
    } else {
      setshowDesc([...showDesc, id]);
    }
  };
  const confirmBox = (item) => {
    confirmAlert({
      title: "Confirm to Delete",
      message: "Are you sure to delete this Channel?",
      buttons: [
        {
          label: "Yes",
          onClick: () => handleDeleteChannel(item),
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
      className="container"
    >
      {alert.show && <Alert message={alert.message} />}
      {/* Create Channel Button */}
      {!ShowForm && (
        <div className="row">
          <div className="col-12">
            <button onClick={showForm} className="btn btn-dark mt-3">
              <i className="bi bi-plus-circle-dotted"> </i>
              Create Channel
            </button>
          </div>
        </div>
      )}
      {/* Create Channel Form */}
      {ShowForm && (
        <div className="col-12 w-100 d-flex">
          <form
            onSubmit={UpdateForm ? updateChannel : addChannel}
            className="container mt-3"
          >
            {/* Channel Name */}
            <div className="mb-3">
              <label htmlFor="channelName" className="form-label">
                Channel Name
              </label>
              <input
                onChange={handleForm}
                value={channelName}
                type="text"
                placeholder="Enter Your ChannelName"
                name="channelName"
                className="form-control"
                id="channelName"
              />
            </div>
            {/* Channel Description */}
            <div className="mb-3">
              <label htmlFor="channelDescription" className="form-label">
                Channel Description
              </label>
              <input
                onChange={handleForm}
                value={description}
                type="text"
                placeholder="Enter Your Description"
                name="description"
                className="form-control"
                id="channelDescription"
              />
            </div>
            {/* Slider Or Fixed */}
            <div className="input-group mb-3 mt-3">
              <label className="input-group-text" htmlFor="inputGroupSelect01">
                Type :-{" "}
              </label>
              <select
                onChange={handleForm}
                value={type}
                name="type"
                className="form-select"
                id="inputGroupSelect01"
              >
                <option value="slider">Slider</option>
                <option value="fixed">Fixed</option>
              </select>
            </div>
            {/* Layouts */}
            <div className="input-group mb-3 mt-3">
              <label className="input-group-text" htmlFor="inputGroupSelect01">
                Layout
              </label>
              <select
                onChange={handleForm}
                value={layout}
                name="layout"
                className="form-select"
                id="inputGroupSelect01"
              >
                <option value="horizontal">Horizontal</option>
                <option value="vertical">Vertical</option>
                <option value="square">Square</option>
              </select>
            </div>
            {/* Title Position */}
            <div className="input-group mb-3 mt-3">
              <label className="input-group-text" htmlFor="inputGroupSelect01">
                Title Position
              </label>
              <select
                onChange={handleForm}
                value={titlePosition}
                name="titlePosition"
                className="form-select"
                id="inputGroupSelect01"
              >
                <option value="top">Top</option>
                <option value="center">Center</option>
                <option value="bottom">Bottom</option>
              </select>
            </div>
            {/* Partition */}
            {type === "slider" && (
              <div className="input-group mb-3 mt-3">
                <label
                  className="input-group-text"
                  htmlFor="inputGroupSelect01"
                >
                  Partition
                </label>
                <select
                  onChange={handleForm}
                  value={partition}
                  name="partition"
                  className="form-select"
                  id="inputGroupSelect01"
                >
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </div>
            )}
            {/* On Top Or Not */}
            <div className="form-check form-switch form-check-inline form-check-reverse">
              <strong
                className="form-check-label"
                htmlFor="flexSwitchCheckReverse"
              >
                On Top
              </strong>
              <input
                onClick={handleclick}
                value={top}
                name="top"
                className="form-check-input"
                type="checkbox"
                id="flexSwitchCheckReverse"
              />
            </div>
            {/* Play Icon */}
            {type === "fixed" && (
              <div className="form-check form-switch form-check-inline form-check-reverse">
                <strong
                  className="form-check-label"
                  htmlFor="flexSwitchCheckReverse"
                >
                  Play Icon
                </strong>
                {play === "true" ? (
                  <input
                    onClick={handleclick}
                    defaultChecked
                    value={play}
                    name="play"
                    className="form-check-input"
                    type="checkbox"
                    id="flexSwitchCheckReverse"
                  />
                ) : (
                  <input
                    onClick={handleclick}
                    value={play}
                    name="play"
                    className="form-check-input"
                    type="checkbox"
                    id="flexSwitchCheckReverse"
                  />
                )}
              </div>
            )}

            <br />
            <br />
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setUpdateForm(false);
              }}
              className="btn btn-danger mx-1"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-dark mx-1">
              Submit
            </button>
          </form>
          {/* Previews */}
          <div className="col-6">
            <h4>Preview :- </h4>
            {/* Preview Of Horizontal Layout */}
            {layout === "horizontal" && type === "fixed" && (
              <div className="container mt-3">
                <div className="row">
                  <div className="col-12">
                    <div className="card" style={{ width: "28rem" }}>
                      {/* Centered Play Icon */}
                      {play === "true" && (
                        <div className="card-img-overlay d-flex justify-content-center align-items-center">
                          <i
                            className="bi bi-play-circle-fill"
                            style={{
                              fontSize: "3rem",
                              color: "white",
                              marginBottom:
                                titlePosition === "bottom" ? "5rem" : "1rem",
                            }}
                          ></i>
                        </div>
                      )}
                      <div className="card-body">
                        {titlePosition === "top" && (
                          <h5 className="card-title">Channel title</h5>
                        )}
                        <img
                          src="https://images.unsplash.com/photo-1434725039720-aaad6dd32dfe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bGFuZHNjYXBlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                          className="card-img-top"
                          alt="..."
                        />
                        {titlePosition === "bottom" && (
                          <h5 className="card-title">Channel title</h5>
                        )}
                        <p className="card-text">
                          Some quick example text to build on the Channel title
                          and make up the bulk of the card's content.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* Preview Of Vertical Layout */}
            {layout === "vertical" && type === "fixed" && (
              <div className="container mt-3">
                <div className="row">
                  <div className="col-12">
                    <div className="card" style={{ width: "18rem" }}>
                      {play === "true" && (
                        <div className="card-img-overlay d-flex justify-content-center align-items-center">
                          <i
                            className="bi bi-play-circle-fill"
                            style={{
                              fontSize: "3rem",
                              color: "white",
                              marginBottom:
                                titlePosition === "bottom" ? "7rem" : "3rem",
                            }}
                          ></i>
                        </div>
                      )}
                      <div className="card-body">
                        {titlePosition === "top" && (
                          <h5 className="card-title">Channel title</h5>
                        )}
                        <img
                          src="https://images.unsplash.com/photo-1662952208058-2e0dccfe8f7a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNjh8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                          className="card-img-top"
                          alt="..."
                        />
                        {titlePosition === "bottom" && (
                          <h5 className="card-title">Channel title</h5>
                        )}
                        <p className="card-text">
                          Some quick example text to build on the Channel title
                          and make up the bulk of the card's content.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* Preview Of Square Layout */}
            {layout === "square" && type === "fixed" && (
              <div className="container mt-3">
                <div className="row">
                  <div className="col-12">
                    <div className="card" style={{ width: "22rem" }}>
                      {play === "true" && (
                        <div className="card-img-overlay d-flex justify-content-center align-items-center">
                          <i
                            className="bi bi-play-circle-fill"
                            style={{
                              fontSize: "3rem",
                              color: "white",
                              marginBottom:
                                titlePosition === "bottom" ? "6rem" : "2rem",
                            }}
                          ></i>
                        </div>
                      )}
                      <div className="card-body">
                        {titlePosition === "top" && (
                          <h5 className="card-title">Channel title</h5>
                        )}
                        <img
                          src="https://images.unsplash.com/photo-1621342261924-3e2f6c9603f5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8c3F1YXJlJTIwaW1hZ2V8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
                          className="card-img-top"
                          alt="..."
                        />
                        {titlePosition === "bottom" && (
                          <h5 className="card-title">Channel title</h5>
                        )}
                        <p className="card-text">
                          Some quick example text to build on the Channel title
                          and make up the bulk of the card's content.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* Preview Of Horizontal Slider Layout */}
            {layout === "horizontal" && type === "slider" && (
              <div className="container mt-3">
                <div className="row">
                  <div className="col-12">
                    <div
                      className="card text-center"
                      style={{ width: "28rem" }}
                    >
                      <div className="card-body">
                        {titlePosition === "top" && (
                          <h5 className="card-title">Channel title</h5>
                        )}
                        <div className="d-flex">
                          {slider.map((item, index) => {
                            return (
                              <img
                                key={index}
                                src="https://images.unsplash.com/photo-1429704658776-3d38c9990511?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGxhbmRzY2FwZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                                className="d-block"
                                style={{
                                  width: `${26 / partition}rem`,
                                  marginRight: "1px",
                                }}
                              />
                            );
                          })}
                        </div>
                        {titlePosition === "bottom" && (
                          <h5 className="card-title">Channel title</h5>
                        )}
                        <p className="card-text">Some content.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* Preview Of Vertical Slider Layout */}
            {layout === "vertical" && type === "slider" && (
              <div className="container mt-3">
                <div className="row">
                  <div className="col-12">
                    <div
                      className="card text-center"
                      style={{ width: "28rem" }}
                    >
                      <div className="card-body">
                        {titlePosition === "top" && (
                          <h5 className="card-title">Channel title</h5>
                        )}
                        <div className="d-flex">
                          {slider.map((item, index) => {
                            return (
                              <img
                                key={index}
                                src="https://images.unsplash.com/photo-1564754943164-e83c08469116?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8dmVydGljYWx8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
                                className="d-block"
                                style={{
                                  width: `${26 / partition}rem`,
                                  marginRight: "1px",
                                }}
                              />
                            );
                          })}
                        </div>
                        {titlePosition === "bottom" && (
                          <h5 className="card-title">Channel title</h5>
                        )}
                        <p className="card-text">Some content.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* Preview Of Square Slider Layout */}
            {layout === "square" && type === "slider" && (
              <div className="container mt-3">
                <div className="row">
                  <div className="col-12">
                    <div
                      className="card text-center"
                      style={{ width: "28rem" }}
                    >
                      <div className="card-body">
                        {titlePosition === "top" && (
                          <h5 className="card-title">Channel title</h5>
                        )}
                        <div className="d-flex">
                          {slider.map((item, index) => {
                            return (
                              <img
                                key={index}
                                src="https://images.unsplash.com/photo-1633467067670-30701ff2dcbd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHNxdWFyZSUyMGltYWdlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                                className="d-block"
                                style={{
                                  width: `${26 / partition}rem`,
                                  marginRight: "1px",
                                }}
                              />
                            );
                          })}
                        </div>
                        {titlePosition === "bottom" && (
                          <h5 className="card-title">Channel title</h5>
                        )}
                        <p className="card-text">Some content.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {/* Show All ChannelList */}
      {!ShowForm && (
        <div className="mt-3 overflow-auto channellist">
          <div className="d-flex justify-content-start flex-wrap">
            {loader ? (
              <div
                className="loader"
                style={{
                  width: "80vw",
                  height: "70vh",
                }}
              >
                <Metronome size={60} lineWeight={5} speed={2} color="black" />
                <p>Loading...</p>
              </div>
            ) : ChannelList.length > 0 ? (
              ChannelList.map((item, index) => (
                <div key={item._id}>
                  {item.layout === "horizontal" && item.type === "fixed" && (
                    <div className="row mx-1 my-1" style={{ width: "28rem" }}>
                      <div className="">
                        <div className="card text-center">
                          {/* Centered Play Icon */}
                          {item.play === "true" && (
                            <div className="card-img-overlay d-flex justify-content-center align-items-center">
                              <i
                                className="bi bi-play-circle-fill"
                                style={{
                                  fontSize: "3rem",
                                  color: "white",
                                  marginBottom:
                                    item.titlePosition === "bottom"
                                      ? "7rem"
                                      : "3rem",
                                }}
                              ></i>
                            </div>
                          )}
                          <div className="card-body">
                            {item.titlePosition === "top" && (
                              <h5 className="card-title">{item.channelName}</h5>
                            )}
                            <img
                              src="https://images.unsplash.com/photo-1434725039720-aaad6dd32dfe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bGFuZHNjYXBlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                              className="card-img-top"
                              alt="..."
                            />
                            {item.titlePosition === "bottom" && (
                              <h5 className="card-title">{item.channelName}</h5>
                            )}
                            <p className="card-text">
                              {showDesc.indexOf(item._id) !== -1
                                ? item.description + " "
                                : item.description.length < 35
                                ? item.description
                                : item.description.slice(0, 35) + "..."}
                              {item.description.length > 35 && (
                                <button
                                  className="show-more"
                                  onClick={() => showAndHideBtn(item._id)}
                                >
                                  {showDesc.indexOf(item._id) !== -1
                                    ? "Hide"
                                    : "Show More"}
                                </button>
                              )}
                            </p>
                            <button
                              onClick={() => confirmBox(item._id)}
                              className="btn btn-danger mx-1"
                            >
                              Delete
                            </button>
                            <button
                              onClick={() => handleEditChannel(item._id)}
                              className="btn btn-dark mx-1"
                            >
                              Edit
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {item.layout === "horizontal" && item.type === "slider" && (
                    <div className="container mt-3">
                      <div className="row">
                        <div className="col-12">
                          <div
                            className="card text-center"
                            style={{ width: "28rem" }}
                          >
                            <div className="card-body">
                              {item.titlePosition === "top" && (
                                <h5 className="card-title">
                                  {item.channelName}
                                </h5>
                              )}
                              <div className="d-flex">
                                {Array.from(Array(item.partition).keys()).map(
                                  (e, i) => {
                                    return (
                                      <img
                                        key={i}
                                        src="https://images.unsplash.com/photo-1610123598147-f632aa18b275?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGxhbmQlMjBzY2FwZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                                        className="d-block"
                                        style={{
                                          width: `${26 / item.partition}rem`,
                                          marginRight: "1px",
                                        }}
                                      />
                                    );
                                  }
                                )}
                              </div>
                              {item.titlePosition === "bottom" && (
                                <h5 className="card-title">
                                  {item.channelName}
                                </h5>
                              )}
                              <p className="card-text">
                                {showDesc.indexOf(item._id) !== -1
                                  ? item.description + " "
                                  : item.description.length < 35
                                  ? item.description
                                  : item.description.slice(0, 35) + "..."}
                                {item.description.length > 35 && (
                                  <button
                                    className="show-more"
                                    onClick={() => showAndHideBtn(item._id)}
                                  >
                                    {" "}
                                    {showDesc.indexOf(item._id) !== -1
                                      ? "Hide"
                                      : "Show More"}
                                  </button>
                                )}
                              </p>
                              <button
                                onClick={() => confirmBox(item._id)}
                                className="btn btn-danger mx-1"
                              >
                                Delete
                              </button>
                              <button
                                onClick={() => handleEditChannel(item._id)}
                                className="btn btn-dark mx-1"
                              >
                                Edit
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {item.layout === "vertical" && item.type === "fixed" && (
                    <div className="row mx-1 my-1" style={{ width: "28rem" }}>
                      <div className="">
                        <div
                          className="card text-center"
                          style={{ width: "18rem" }}
                        >
                          {item.play === "true" && (
                            <div className="card-img-overlay d-flex justify-content-center align-items-center">
                              <i
                                className="bi bi-play-circle-fill"
                                style={{
                                  fontSize: "3rem",
                                  color: "white",
                                  marginBottom:
                                    item.titlePosition === "bottom"
                                      ? "7rem"
                                      : "3rem",
                                }}
                              ></i>
                            </div>
                          )}
                          <div className="card-body">
                            {item.titlePosition === "top" && (
                              <h5 className="card-title">{item.channelName}</h5>
                            )}
                            <img
                              src="https://images.unsplash.com/photo-1662952208058-2e0dccfe8f7a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNjh8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                              className="card-img-top"
                              alt="..."
                            />
                            {item.titlePosition === "bottom" && (
                              <h5 className="card-title">{item.channelName}</h5>
                            )}
                            <p className="card-text">
                              {showDesc.indexOf(item._id) !== -1
                                ? item.description + " "
                                : item.description.length < 35
                                ? item.description
                                : item.description.slice(0, 35) + "..."}
                              {item.description.length > 35 && (
                                <button
                                  className="show-more"
                                  onClick={() => showAndHideBtn(item._id)}
                                >
                                  {" "}
                                  {showDesc.indexOf(item._id) !== -1
                                    ? "Hide"
                                    : "Show More"}
                                </button>
                              )}
                            </p>
                            <button
                              onClick={() => confirmBox(item._id)}
                              className="btn btn-danger mx-1"
                            >
                              Delete
                            </button>
                            <button
                              onClick={() => handleEditChannel(item._id)}
                              className="btn btn-dark mx-1"
                            >
                              Edit
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {item.layout === "vertical" && item.type === "slider" && (
                    <div className="container mt-3">
                      <div className="row">
                        <div className="col-12">
                          <div
                            className="card text-center"
                            style={{ width: "25rem" }}
                          >
                            <div className="card-body">
                              {item.titlePosition === "top" && (
                                <h5 className="card-title">
                                  {item.channelName}
                                </h5>
                              )}
                              <div className="d-flex">
                                {item.slider}
                                {Array.from(Array(item.partition).keys()).map(
                                  (e, i) => {
                                    return (
                                      <img
                                        key={i}
                                        src="https://images.unsplash.com/photo-1564754943164-e83c08469116?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8dmVydGljYWx8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
                                        className="d-block"
                                        style={{
                                          height: `${34 / item.partition}rem`,
                                          marginRight: "1px",
                                        }}
                                      />
                                    );
                                  }
                                )}
                              </div>
                              {item.titlePosition === "bottom" && (
                                <h5 className="card-title">
                                  {item.channelName}
                                </h5>
                              )}
                              <p className="card-text">
                                {showDesc.indexOf(item._id) !== -1
                                  ? item.description + " "
                                  : item.description.length < 35
                                  ? item.description
                                  : item.description.slice(0, 35) + "..."}
                                {item.description.length > 35 && (
                                  <button
                                    className="show-more"
                                    onClick={() => showAndHideBtn(item._id)}
                                  >
                                    {" "}
                                    {showDesc.indexOf(item._id) !== -1
                                      ? "Hide"
                                      : "Show More"}
                                  </button>
                                )}
                              </p>
                              <button
                                onClick={() => confirmBox(item._id)}
                                className="btn btn-danger mx-1"
                              >
                                Delete
                              </button>
                              <button
                                onClick={() => handleEditChannel(item._id)}
                                className="btn btn-dark mx-1"
                              >
                                Edit
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {item.layout === "square" && item.type === "fixed" && (
                    <div className="row mx-1 my-1" style={{ width: "28rem" }}>
                      <div className="">
                        <div className="card text-center">
                          {item.play === "true" && (
                            <div className="card-img-overlay d-flex justify-content-center align-items-center">
                              <i
                                className="bi bi-play-circle-fill"
                                style={{
                                  fontSize: "3rem",
                                  color: "white",
                                  marginBottom:
                                    item.titlePosition === "bottom"
                                      ? "6rem"
                                      : "2rem",
                                }}
                              ></i>
                            </div>
                          )}
                          <div className="card-body">
                            {item.titlePosition === "top" && (
                              <h5 className="card-title">{item.channelName}</h5>
                            )}
                            <img
                              src="https://images.unsplash.com/photo-1621342261924-3e2f6c9603f5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8c3F1YXJlJTIwaW1hZ2V8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
                              className="card-img-top"
                              alt="..."
                            />
                            {item.titlePosition === "bottom" && (
                              <h5 className="card-title">{item.channelName}</h5>
                            )}
                            <p className="card-text">
                              {showDesc.indexOf(item._id) !== -1
                                ? item.description + " "
                                : item.description.length < 35
                                ? item.description
                                : item.description.slice(0, 35) + "..."}
                              {item.description.length > 35 && (
                                <button
                                  className="show-more"
                                  onClick={() => showAndHideBtn(item._id)}
                                >
                                  {" "}
                                  {showDesc.indexOf(item._id) !== -1
                                    ? "Hide"
                                    : "Show More"}
                                </button>
                              )}
                            </p>
                            <button
                              onClick={() => handleDeleteChannel(item._id)}
                              className="btn btn-danger mx-1"
                            >
                              Delete
                            </button>
                            <button
                              onClick={() => handleEditChannel(item._id)}
                              className="btn btn-dark mx-1"
                            >
                              Edit
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {item.layout === "square" && item.type === "slider" && (
                    <div className="container mt-3">
                      <div className="row">
                        <div className="col-12">
                          <div
                            className="card text-center"
                            style={{ width: "28rem" }}
                          >
                            <div className="card-body">
                              {item.titlePosition === "top" && (
                                <h5 className="card-title">
                                  {item.channelName}
                                </h5>
                              )}
                              <div className="d-flex">
                                {Array.from(Array(item.partition).keys()).map(
                                  (e, i) => {
                                    return (
                                      <img
                                        key={i}
                                        src="https://images.unsplash.com/photo-1633467067670-30701ff2dcbd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHNxdWFyZSUyMGltYWdlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                                        className="d-block"
                                        style={{
                                          height: `${26 / item.partition}rem`,
                                          marginRight: "1px",
                                        }}
                                      />
                                    );
                                  }
                                )}
                              </div>
                              {item.titlePosition === "bottom" && (
                                <h5 className="card-title">
                                  {item.channelName}
                                </h5>
                              )}
                              <p className="card-text">
                                {showDesc.indexOf(item._id) !== -1
                                  ? item.description + " "
                                  : item.description.length < 35
                                  ? item.description
                                  : item.description.slice(0, 35) + "..."}
                                {item.description.length > 35 && (
                                  <button
                                    className="show-more"
                                    onClick={() => showAndHideBtn(item._id)}
                                  >
                                    {" "}
                                    {showDesc.indexOf(item._id) !== -1
                                      ? "Hide"
                                      : "Show More"}
                                  </button>
                                )}
                              </p>
                              <button
                                onClick={() => handleDeleteChannel(item._id)}
                                className="btn btn-danger mx-1"
                              >
                                Delete
                              </button>
                              <button
                                onClick={() => handleEditChannel(item._id)}
                                className="btn btn-dark mx-1"
                              >
                                Edit
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <h5 className="text-center">No Channel Found</h5>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Channel;
