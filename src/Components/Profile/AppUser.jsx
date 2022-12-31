import { useContext, useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import { Link, useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../App";
import Axios from "../Axios/Axios";
const AppUser = () => {
  const { userData } = useContext(AuthContext);
  const navigate = useNavigate();
  const [UserProfile, setUserProfile] = useState({
    businessAcc: "no",
    createdAt: "2022-12-09T09:33:06.497Z",
    dateOfBirth: "2022-12-09T09:33:06.497Z",
    email: "",
    followers: [],
    following: [],
    followrequest: [],
    gender: "Male",
    interest: "",
    isBlocked: false,
    isVerified: false,
    name: "Ankit",
    phone: "7999632726",
    posts: [],
    profileImage: "/images/avtar.jpg",
    publicPro: false,
    __v: 0,
  });
  const { id } = useParams();
  useEffect(() => {
    getUser();
  }, []);
  const getUser = async () => {
    const config = {
      headers: {
        token: JSON.parse(localStorage.getItem("accessToken")),
      },
    };
    const response = await Axios.get(`/user/profile/${id}`, config);
    console.log(response.data.user);
    setUserProfile(response.data.user);
  };
  const confirmBox = (block) => {
    confirmAlert({
      title: `Confirm to ${block ? "Unblock" : "Block"}`,
      message: `Are you sure to ${block ? "Unblock" : "Block"} this User?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => handleBlock(),
        },
        {
          label: "No",
        },
      ],
    });
  };
  const handleBlock = async () => {
    const config = {
      headers: {
        token: JSON.parse(localStorage.getItem("accessToken")),
      },
    };
    await Axios.post("/block-user", { user2: id }, config);
    getUser();
  };
  return (
    <>
      <div className="container Senior-editor-cnt">
        <div className="row d-flex justify-content-center align-items-center py-1">
          <div className="card">
            <div className="rounded-top text-white d-flex flex-row justify-content-between userprofile-cnt">
              <div
                className="ms-4 mt-3 d-flex flex-column"
                style={{ position: "absolute", bottom: "-30px" }}
              >
                <div className="img-cnt2">
                  <img
                    src={UserProfile.profileImage}
                    alt="Generic placeholder image"
                    className="img-fluid img-thumbnail "
                    style={{ width: "100%", zIndex: "1" }}
                  />
                </div>
              </div>
              <div style={{ marginTop: "130px", marginLeft: "20vw" }}>
                <h5>{UserProfile.name}</h5>
              </div>
              <p>
                {UserProfile.businessAcc === "yes"
                  ? "Business Account"
                  : "Normal Account"}
              </p>
              {userData._id === UserProfile._id && (
                <div
                  className="btn btn-dark"
                  onClick={() => navigate("/admin/profile")}
                >
                  Edit Profile
                </div>
              )}
            </div>
            <div
              className="p-2 text-black"
              style={{ backgroundColor: "#f8f9fa" }}
            >
              <div className="d-flex justify-content-between text-center py-1">
                <div className="d-flex">
                  <div
                    className="card px-1 mt-3"
                    style={{ zIndex: "1", width: "14rem", color: "black" }}
                  >
                    Contact :- +91 {UserProfile.phone}
                  </div>
                  {userData.role.toLowerCase() === "admin" &&
                    UserProfile.role !== "admin" && (
                      <button
                        type="button"
                        onClick={() => confirmBox(UserProfile.isBlocked)}
                        className={`btn mx-2 flex-grow-1 ${
                          UserProfile.isBlocked ? "btn-success" : "btn-danger"
                        }`}
                        style={{ zIndex: "1", marginTop: "2px" }}
                      >
                        {UserProfile.isBlocked ? "Unblock" : "Block"}
                      </button>
                    )}
                </div>
                <div className="d-flex ">
                  <div>
                    <p className="mb-1 h5">{UserProfile.following.length}</p>
                    <p className="small text-muted mb-0">Following</p>
                  </div>
                  <div className="px-3">
                    <p className="mb-1 h5">{UserProfile.followers.length}</p>
                    <p className="small text-muted mb-0">Followers</p>
                  </div>
                  <div>
                    <p className="mb-1 h5">{UserProfile.posts.length}</p>
                    <p className="small text-muted mb-0">Posts</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-body p-4 text-black">
              <div className="mb-5">
                <p className="lead fw-normal mb-1">About</p>
                <div className="p-4" style={{ backgroundColor: "#f8f9fa" }}>
                  <p className="font-italic mb-1">
                    Email:- {UserProfile.email}
                  </p>
                  <p className="font-italic mb-1">
                    Gender:- {UserProfile.gender}
                  </p>
                  <p className="font-italic mb-1">
                    DOB:- {UserProfile.dateOfBirth.slice(0, 10)}
                  </p>
                  <p className="font-italic mb-1">
                    Account :- {UserProfile.publicPro ? "Public" : "Private"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppUser;
