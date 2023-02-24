import React, { useContext, useEffect, useState } from "react";
import Axios from "../Axios/Axios";
import { motion } from "framer-motion";
import { confirmAlert } from "react-confirm-alert";
import { Metronome } from "@uiball/loaders";
import { useNavigate } from "react-router-dom";

const Requests = () => {
  const navigate = useNavigate();
  const [LiveList, setLiveList] = useState([]);
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    showRequests();
  }, []);
  const showRequests = async () => {
    const { data } = await Axios.get("/users", {
      token: JSON.parse(localStorage.getItem("refreshTokenAdmin")),
    });
    setLiveList(data.appUsers);
    setLoader(false);
  };
  const approved = async (item) => {
    // const config = {
    //   headers: {
    //     token: JSON.parse(localStorage.getItem("accessTokenAdmin")),
    //   },
    // };
    // /admin/showLive/:roomId
    navigate(`/admin/showLive/${item.userName}`);
    // showRequests();
  };
  const notApproved = async (item) => {
    const config = {
      headers: {
        token: JSON.parse(localStorage.getItem("accessTokenAdmin")),
      },
    };
    await Axios.delete(`/news/${item._id}`, config);
    showRequests();
  };
  const watchLive = async (item) => {
    navigate(`/admin/showLive/${item.userName}`);
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
        <h1 className="display-6">Live Requests :- </h1>
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
                              <th>Name</th>
                              <th>Email</th>
                              <th>Phone</th>
                              <th>Gender</th>
                              <th>Business Acc</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {LiveList.length > 0 ? (
                              LiveList.map((item, index) => (
                                <tr key={item?._id}>
                                  <td className="align-middle text-center">
                                    <img
                                      alt="image"
                                      src={
                                        item?.profileImage.includes("/avtar")
                                          ? item?.profileImage
                                          : `data:image/jpeg;base64,${item?.profileImage}`
                                      }
                                      width={145}
                                      data-toggle="title"
                                    />
                                  </td>
                                  <td className="align-middle">{item?.name}</td>
                                  <td className="align-middle">
                                    {item?.email}
                                  </td>
                                  <td className="align-middle">
                                    {item?.phone}
                                  </td>
                                  <td className="align-middle">
                                    {item?.gender}
                                  </td>
                                  <td className="align-middle">
                                    {item?.businessAcc}
                                  </td>
                                  <td className="align-middle">
                                    <button
                                      onClick={() => watchLive(item)}
                                      className="btn btn-primary mx-1"
                                    >
                                      <i className="bi bi-eye"></i>
                                    </button>
                                    <button
                                      onClick={() =>
                                        confirmBox(item, "approved")
                                      }
                                      className="btn btn-success mx-1"
                                    >
                                      <i className="bi bi-check2"></i>
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
