import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Axios from "../Axios/Axios";
import { confirmAlert } from "react-confirm-alert";
import Style from "../News/News.module.css";
import moment from "moment";
import { Metronome } from "@uiball/loaders";

const EPaper = () => {
  const navigate = useNavigate();
  const [EPaperList, setEPaperList] = useState([]);
  const [loader, setLoader] = useState(true);
  const [filter, setfilter] = useState({
    city: "all",
    date: "",
  });
  const { city, date } = filter;
  useEffect(() => {
    getEPaper();
  }, []);
  const getEPaper = async () => {
    const config = {
      headers: {
        token: JSON.parse(localStorage.getItem("accessToken")),
      },
    };
    setLoader(true);
    const { data } = await Axios.get("/ePaper", config);
    setLoader(false);
    setEPaperList(data);
  };
  const deleteEPaper = async (file) => {
    const config = {
      headers: {
        token: JSON.parse(localStorage.getItem("accessToken")),
      },
    };
    await Axios.delete(`/ePaper/${file._id}`, config);
    getEPaper();
  };
  const confirmBox = (item) => {
    confirmAlert({
      title: "Confirm to Delete",
      message: "Are you sure to delete this News?",
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteEPaper(item),
        },
        {
          label: "No",
        },
      ],
    });
  };
  const handleChange = async (e) => {
    const { value } = e.target;
    setfilter({ ...filter, city: value });
    if (value === "all") {
      getEPaper();
      return;
    }
    setLoader(true);
    const res = await Axios.get(`/ePaper/city/${value}`);
    setLoader(false);
    setEPaperList(res.data);
  };
  const handleDate = async (e) => {
    const { value } = e.target;
    setfilter({ ...filter, date: value });
    setLoader(true);
    if (city === "all") {
      var res = await Axios.get("/ePaper");
    } else {
      var res = await Axios.get(`/ePaper/city/${city}`);
    }
    setLoader(false);
    const filterDate = res.data.filter((item) => {
      return moment(item.date).format("YYYY-MM-DD") === value;
    });
    setEPaperList(filterDate);
  };
  const removeFilter = () => {
    setfilter({
      city: "all",
      date: moment().format("YYYY-MM-DD"),
    });
    getEPaper();
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: "100%" }}
      transition={{ duration: 0.5 }}
      className="container w-100"
    >
      <h1 className="display-6">E-Paper :- </h1>
      <div className="showDropzone-container mt-2 mx-2 d-flex">
        <button
          onClick={() => navigate("/admin/e-paper/new")}
          className="btn btn-dark mx-2"
        >
          <i className="bi bi-plus-circle-dotted"> </i>
          Add E-Paper
        </button>
        <button onClick={removeFilter} className="btn btn-danger mx-2">
          <i className="bi bi-trash"> </i>
          Remove Filter
        </button>
        {/* filter with city   */}
        <div className={Style.inputGroup}>
          <label className={Style.label} htmlFor="inputGroupSelect01">
            Select City :
          </label>
          <select
            onChange={handleChange}
            name="city"
            value={city}
            className={`form-select ${Style.input}`}
            style={{ width: "10vw" }}
            id="inputGroupSelect01"
          >
            <option value="all">All City</option>
            <option value="Bhopal">Bhopal</option>
            <option value="Gwalior">Gwalior</option>
            <option value="Raipur">Raipur</option>
          </select>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <label className={Style.label} htmlFor="date">
            Date:
          </label>
          <input
            type="date"
            name="date"
            id="date"
            value={date}
            onChange={handleDate}
            className={Style.input}
            style={{ width: "12vw" }}
            max={moment().format("YYYY-MM-DD")}
            required
          />
        </div>
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
        ) : EPaperList.length !== 0 ? (
          EPaperList.reverse()
            .sort(function (a, b) {
              if (a.date < b.date) {
                return 1;
              }
              if (a.date > b.date) {
                return -1;
              }
              if (a.city < b.city) {
                return -1;
              }
              if (a.city > b.city) {
                return 1;
              }
              if (a.pageNo < b.pageNo) {
                return -1;
              }
              if (a.pageNo > b.pageNo) {
                return 1;
              }
              return 0;
            })
            .map((file, index) => (
              <div key={file._id}>
                <div
                  className="card mt-1 mx-1"
                  style={{
                    width: "18rem",
                  }}
                >
                  <img
                    src={`data:image/jpeg;base64,${file.image}`}
                    className="card-img-top"
                  />
                  <span
                    style={{
                      fontSize: "13px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingRight: "10px",
                    }}
                  >
                    <strong
                      style={{ color: "black", fontSize: "14px" }}
                      className="px-2 py-1"
                    >
                      City: {file.city}
                    </strong>
                    Page No : {file.pageNo}
                  </span>
                  <div className="card-body px-2 py-1">
                    <button
                      onClick={() => navigate("/admin/"+file._id)}
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
                    <small
                      style={{
                        // color: "grey",
                        fontSize: "13px",
                        marginLeft: "24px",
                      }}
                    >
                      Date : {file.date}
                    </small>
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

export default EPaper;
