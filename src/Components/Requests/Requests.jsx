import React, { useContext, useEffect, useState } from "react";
import Axios from "../Axios/Axios";
import { motion } from "framer-motion";
import { confirmAlert } from "react-confirm-alert";
import { Metronome } from "@uiball/loaders";

const Requests = () => {
  const [NewsList, setNewsList] = useState([]);
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    showRequests();
  }, []);
  const showRequests = async () => {
    const res = await Axios.post("/refreshtoken", {
      token: JSON.parse(localStorage.getItem("refreshToken")),
    });
    setNewsList(res.data.user.requests);
    setLoader(false);
  };
  const approved = async (item) => {
    const config = {
      headers: {
        token: JSON.parse(localStorage.getItem("accessToken")),
      },
    };
    console.log(item);
    await Axios.post(`/approve-news/${item._id}`, {}, config);
    showRequests();
  };
  const notApproved = async (item) => {
    const config = {
      headers: {
        token: JSON.parse(localStorage.getItem("accessToken")),
      },
    };
    await Axios.delete(`/news/${item._id}`, config);
    showRequests();
  };
  const confirmBox = (item, approve) => {
    confirmAlert({
      title: `Confirm to ${approve === "approved" ? "Approve" : "Remove"}`,
      message: `Are you sure to ${
        approve === "approved"
          ? "Approve this News "
          : "Remove this News permanently"
      } this news?`,
      buttons: [
        {
          label: "Yes",
          onClick: () =>
            approve === "approved" ? approved(item) : notApproved(item),
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
      style={{ width: "100%" }}
    >
      {/* news requests */}
      <div className="container">
        <h1 className="display-6">Requests :- </h1>
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-12">
                    <div className="table-responsive">
                      {loader ? (
                        <div
                          className="loader"
                          style={{
                            width: "100%",
                            height: "80vh",
                          }}
                        >
                          <Metronome
                            size={60}
                            lineWeight={5}
                            speed={2}
                            color="black"
                          />
                          <p>Loading...</p>
                        </div>
                      ) : (
                        <table className="table table-striped" id="table-1">
                          <thead>
                            <tr>
                              <th className="text-center">Image</th>
                              <th>Title</th>
                              <th>Description</th>
                              <th>Location</th>
                              <th>Author</th>
                              <th>Date</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {NewsList.length > 0 ? (
                              NewsList.map((item, index) => (
                                <tr key={item._id}>
                                  <td className="align-middle text-center">
                                    <img
                                      alt="image"
                                      src={`data:image/jpeg;base64,${item.file}`}
                                      width={145}
                                      data-toggle="title"
                                    />
                                  </td>
                                  <td className="align-middle">
                                    {item.metaTitle}
                                  </td>
                                  <td className="align-middle">
                                    {item.shortDescription}
                                  </td>
                                  <td className="align-middle">
                                    {item.location}
                                  </td>
                                  <td className="align-middle">
                                    {item.author.username}
                                  </td>
                                  <td className="align-middle col-2">
                                    {item.createdAt.toString().slice(0, 10)}
                                  </td>
                                  <td className="align-middle">
                                    <button
                                      onClick={() =>
                                        confirmBox(item, "approved")
                                      }
                                      className="btn btn-success"
                                    >
                                      <i className="bi bi-check" />
                                    </button>
                                    <button
                                      onClick={() =>
                                        confirmBox(item, "notApproved")
                                      }
                                      className="btn btn-danger"
                                    >
                                      <i className="bi bi-x" />
                                    </button>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan="7" className="text-center">
                                  No Requests
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Requests;
