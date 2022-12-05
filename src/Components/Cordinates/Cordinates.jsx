import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Axios from "../Axios/Axios";
import { confirmAlert } from "react-confirm-alert";
const Cordinates = () => {
  const navigate = useNavigate();
  const [CordinatesList, setCordinatesList] = useState([]);
  useEffect(() => {
    getCordinates();
  }, []);
  const getCordinates = async () => {
    const config = {
      headers: {
        token: JSON.parse(localStorage.getItem("accessToken")),
      },
    };
    const { data } = await Axios.get("/ePaperCoord", config);
    console.log(data.ewspaper);
    setCordinatesList(data.ewspaper);
  };
  const deleteCordinates = async (file) => {
    const config = {
      headers: {
        token: JSON.parse(localStorage.getItem("accessToken")),
      },
    };
    await Axios.delete(`/Cordinates/${file}`, config);
    getCordinates();
  };
  const confirmBox = (item) => {
    confirmAlert({
      title: "Confirm to Delete",
      message: "Are you sure to delete this News?",
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteCordinates(item),
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
      <h1 className="display-6">Co-ordinates :- </h1>
      <div className="showDropzone-container mt-2 mx-2">
        <button
          onClick={() => navigate("/cordinates/new")}
          className="btn btn-dark mx-2"
        >
          <i className="bi bi-plus-circle-dotted"> </i>
          Add Co-ordinates
        </button>
      </div>
      {/* <div className="d-flex flex-wrap showAllFile-container"> */}
      <div className="row mt-2">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-12">
                  <div
                    className="table-responsive showAllFile-container"
                    style={{
                      height: "72vh",
                    }}
                  >
                    <table className="table table-striped" id="table-1">
                      <thead>
                        <tr>
                          <th>S NO.</th>
                          <th className="text-center">Image</th>
                          <th>City</th>
                          <th>Link</th>
                          <th>Page No.</th>
                          <th>Left</th>
                          <th>Top</th>
                          <th>Date</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {CordinatesList.length > 0 ? (
                          CordinatesList.map((item, index) => (
                            <tr key={index}>
                              <td className="align-middle">{index + 1}</td>
                              <td className="align-middle text-center">
                                <img
                                  alt="image"
                                  src={`data:image/jpeg;base64,${item.image}`}
                                  width={145}
                                  data-toggle="title"
                                />
                              </td>
                              <td className="align-middle">{item.city}</td>
                              <td className="align-middle">{item.newsUrl}</td>
                              <td className="align-middle">{item.pageNo}</td>
                              <td className="align-middle">
                                {item.leftCoordinate}
                              </td>
                              <td className="align-middle">
                                {item.topCoordinate}
                              </td>
                              <td className="align-middle">{item.date}</td>
                              <td className="align-middle">
                                <button
                                  onClick={() =>
                                    navigate(`/cordinates/${item._id}`)
                                  }
                                  className="btn btn-success"
                                >
                                  <i className="bi bi-pencil-square"></i>
                                </button>
                                <button
                                  onClick={() => confirmBox(item)}
                                  className="btn btn-danger"
                                >
                                  <i className="bi bi-trash3"></i>
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="9" className="text-center">
                              No Data Found
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </motion.div>
  );
};

export default Cordinates;
