import { useContext, useEffect, useState } from "react";
import Axios from "../Axios/Axios";
import { confirmAlert } from "react-confirm-alert";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { AuthContext } from "../../App";
import { Metronome } from "@uiball/loaders";

const Users = () => {
  const { userData } = useContext(AuthContext);
  const [loader, setLoader] = useState(true);
  const [List, setList] = useState([]);
  useEffect(() => {
    GetUsers();
  }, []);
  const GetUsers = async () => {
    const config = {
      headers: {
        token: JSON.parse(localStorage.getItem("accessTokenAdmin")),
      },
    };
    const response = await Axios.get("/users", config);
    setLoader(false);
    setList(response.data.appUsers);
  };
  const confirmBox = (item, block) => {
    confirmAlert({
      title: `Confirm to ${block ? "Unblock" : "Block"}`,
      message: `Are you sure to ${block ? "Unblock" : "Block"} this Reporter?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => handleBlock(item),
        },
        {
          label: "No",
        },
      ],
    });
  };
  const handleBlock = async (id) => {
    const config = {
      headers: {
        token: JSON.parse(localStorage.getItem("accessTokenAdmin")),
      },
    };
    const response = await Axios.post("/block-user", { user2: id }, config);
    GetUsers();
  };

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
        <h1 className="display-6">Users : {List && List.length} </h1>
        <div className="container py-1">
          <div className="row d-flex h-100">
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
            ) : List.length > 0 ? (
              List.map((item, index) => (
                <div key={item._id} className="col mb-2">
                  <div
                    className="card"
                    style={{
                      borderRadius: "15px",
                      width: "28rem",
                      overflow: "hidden",
                      backgroundColor:
                        item.businessAcc !== "no" ? "white" : "#dadada",
                    }}
                  >
                    <Link
                      to={`/userprofile/${item._id}`}
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
                            src={
                              item.profileImage.includes("/avtar")
                                ? item.profileImage
                                : `data:video/mp4;base64,${item?.profileImage}`
                            }
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
                          <h5 className="mb-1">{item.name}</h5>
                          <p className="mb-2 pb-1" style={{ color: "#2b2a2a" }}>
                            {item.businessAcc === "no"
                              ? "Normal Account"
                              : "Bussiness Account"}
                            {item.isVerified && (
                              <i
                                style={{ color: "blue", marginLeft: "5px" }}
                                className="bi bi-patch-check-fill"
                              ></i>
                            )}
                          </p>
                          <div
                            className="d-flex justify-content-between rounded-3 p-2 mb-2"
                            style={{ backgroundColor: "#efefef" }}
                          >
                            <div className="d-flex align-self-center">
                              <p className="small text-muted">
                                Followers : &nbsp;
                              </p>
                              {item.followers.length}
                            </div>
                            <div className="d-flex align-self-center">
                              <p className="small text-muted">
                                Following : &nbsp;
                              </p>
                              {item.following.length}
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
                              +91 {item.phone}
                            </div>
                            {/* block user */}
                            {userData &&
                              userData.role.toLowerCase() === "admin" && (
                                <button
                                  type="button"
                                  className={`btn  ${
                                    item.isBlocked
                                      ? "btn-success"
                                      : "btn-danger"
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
              ))
            ) : (
              <div className="text-center" style={{ width: "100%" }}>
                <h1>No Users Found</h1>
              </div>
            )}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Users;
