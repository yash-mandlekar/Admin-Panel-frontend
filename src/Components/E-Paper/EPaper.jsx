import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Axios from "../Axios/Axios";
import { confirmAlert } from "react-confirm-alert";
const EPaper = () => {
  const navigate = useNavigate();
  const [EPaperList, setEPaperList] = useState([]);
  useEffect(() => {
    getEPaper();
  }, []);
  const getEPaper = async () => {
    const config = {
      headers: {
        token: JSON.parse(localStorage.getItem("accessToken")),
      },
    };
    const { data } = await Axios.get("/ePaper", config);
    console.log(data);
    setEPaperList(data);
  };
  const deleteEPaper = async (file) => {
    const config = {
      headers: {
        token: JSON.parse(localStorage.getItem("accessToken")),
      },
    };
    await Axios.delete(`/ePaper/${file}`, config);
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
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: "100%" }}
      transition={{ duration: 0.5 }}
      className="container w-100"
    >
      <h1 className="display-6">E-Paper :- </h1>
      <div className="showDropzone-container mt-2 mx-2">
        <button
          onClick={() => navigate("/e-paper/new")}
          className="btn btn-dark mx-2"
        >
          <i className="bi bi-plus-circle-dotted"> </i>
          Add E-Paper
        </button>
      </div>
      <div className="d-flex flex-wrap showAllFile-container">
        {EPaperList.map((file, index) => (
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
                  onClick={() => navigate(file._id)}
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
        ))}
      </div>
    </motion.div>
  );
};

export default EPaper;
