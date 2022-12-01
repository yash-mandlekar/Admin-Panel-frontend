import React, { useContext } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { AuthContext } from "../../App";

const ListComp = ({ List, confirmBox, role }) => {
  const { userData } = useContext(AuthContext);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: "100%" }}
      transition={{ duration: 0.5 }}
      className="container"
      style={{ backgroundColor: "#f3e9cb", height: "100%" }}
    >
      {/* list of senior Editors */}
      <section
        className="w-100 Senior-editor-cnt"
        style={{ backgroundColor: "#f3e9cb" }}
      >
        <h1 className="display-6">{role} : </h1>
        <div className="container py-1">
          <div className="row d-flex h-100">
            {List.map((item, index) => (
              <div key={item._id} className="col">
                <div
                  className="card"
                  style={{ borderRadius: "15px", width: "28rem" }}
                >
                  <Link
                    to={`/profile/${item._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <div className="position-absolute top-0 end-0 px-2">
                      <i className="bi bi-info-circle"></i>
                    </div>
                  </Link>
                  <div className="card-body p-2">
                    <div className="d-flex text-black">
                      <div className="flex-shrink-0">
                        <img
                          src={item.profileImage}
                          alt="image not found"
                          className="img-fluid"
                          style={{ width: "180px", borderRadius: "10px" }}
                        />
                      </div>
                      <div
                        className="flex-grow-1 ms-3"
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                        }}
                      >
                        <h5 className="mb-1">{item.username}</h5>
                        <p className="mb-2 pb-1" style={{ color: "#2b2a2a" }}>
                          {item.role}
                        </p>
                        <div
                          className="d-flex justify-content-start rounded-3 p-2 mb-2"
                          style={{ backgroundColor: "#efefef" }}
                        >
                          <div>
                            <p className="small text-muted mb-1">Channels</p>
                            <p className="mb-0">{item.channels.length}</p>
                          </div>
                          <div className="px-3">
                            <p className="small text-muted mb-1">News</p>
                            <p className="mb-0">{item.news.length}</p>
                          </div>
                        </div>
                        <div className="d-flex pt-1 justify-content-around">
                          {/* contact through email */}
                          <div
                            className="card px-1"
                            style={{
                              zIndex: "1",
                              width: "8.5rem",
                              color: "black",
                            }}
                          >
                            <span>Contact :-</span>
                            +91 {item.mobile}
                          </div>
                          {/* block user */}
                          {userData && userData.role.toLowerCase() === "admin" && (
                            <button
                              type="button"
                              className={`btn  ${
                                item.isBlocked ? "btn-success" : "btn-danger"
                              }`}
                              onClick={() =>
                                confirmBox(item._id, item.isBlocked)
                              }
                            >
                              {item.isBlocked ? "Unblock" : "Block"}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default ListComp;