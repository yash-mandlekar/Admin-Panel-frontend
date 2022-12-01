import React, { useContext, useEffect, useState } from "react";
import Axios from "../Axios/Axios";
import { AuthContext } from "../../App";
import { motion } from "framer-motion";

const Requests = () => {
  const { userData } = useContext(AuthContext);
  const [NewsList, setNewsList] = useState([]);
  const showRequests = async () => {
    const res = await Axios.post("/refreshtoken", {
      token: JSON.parse(localStorage.getItem("refreshToken")),
    });
    setNewsList(res.data.user.requests);
  };
  useEffect(() => {
    showRequests();
  }, []);
  const approved = async (item) => {
    if (window.confirm("Are you sure you want approve this news?")) {
      const config = {
        headers: {
          token: JSON.parse(localStorage.getItem("accessToken")),
        },
      };
      await Axios.post(`/approve-news/${item._id}`, {}, config);
      showRequests();
    }
  };
  const notApproved = async (item) => {
    if (window.confirm("Are you sure you want to Remove this news?")) {
      const config = {
        headers: {
          token: JSON.parse(localStorage.getItem("accessToken")),
        },
      };
      await Axios.delete(`/news`, {
        data: { newsId: item._id, folderId: item.folderId },
        headers: config.headers,
      });
      showRequests();
    }
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
                      <table className="table table-striped" id="table-1">
                        <thead>
                          <tr>
                            <th className="text-center">Image</th>
                            <th>Title</th>
                            <th>Description</th>
                            {/* <th>Category</th> */}
                            <th>Channel</th>
                            <th>Author</th>
                            <th>Date</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {NewsList.length > 0 &&
                            NewsList.map((item, index) => (
                              <tr key={item._id}>
                                <td className="align-middle text-center">
                                  <img
                                    alt="image"
                                    src={item.file}
                                    width={145}
                                    data-toggle="title"
                                  />
                                </td>
                                <td className="align-middle">{item.title}</td>
                                <td className="align-middle">
                                  {item.description}
                                </td>
                                {/* <td className="align-middle">
                                  {item.category}
                                </td> */}
                                <td className="align-middle">
                                  {item.channels.map((e, i) => (
                                    <div key={i}>
                                      {e.channelName} <br />
                                    </div>
                                  ))}
                                </td>
                                <td className="align-middle">
                                  {item.author.username}
                                </td>
                                <td className="align-middle">
                                  {item.createdAt.toString().slice(0, 10)}
                                </td>
                                <td className="align-middle">
                                  <button
                                    onClick={() => approved(item)}
                                    className="btn btn-success"
                                  >
                                    <i className="bi bi-check" />
                                  </button>
                                  <button
                                    onClick={() => notApproved(item)}
                                    className="btn btn-danger"
                                  >
                                    <i className="bi bi-x" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
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
