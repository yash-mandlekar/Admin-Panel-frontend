import React,{ useContext, useEffect, useState, useRef } from "react";
import Axios from "../Axios/Axios";
import { AuthContext } from "../../App";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
const Alert = React.lazy(() => import("../Alert/Alert"));

const Profile = () => {
  const { userData } = useContext(AuthContext);
  const [userDatas, setUserDatas] = useState(userData);
  const fileInputRef = useRef();
  const [ShowPassword, SetshowPassword] = useState(false);
  const [inputData, setinputData] = useState({
    name: "",
    email: "",
    mobile: "",
    country: "",
    state: "",
    city: "",
    password: "",
    newPassword: "",
    cPassword: "",
  });
  const [validation, setvalidation] = useState({
    name: {
      error: false,
      message: "",
    },
    email: {
      error: false,
      message: "",
    },
    mobile: {
      error: false,
      message: "",
    },
    country: {
      error: false,
      message: "",
    },
    state: {
      error: false,
      message: "",
    },
    city: {
      error: false,
      message: "",
    },
    password: {
      error: false,
      message: "",
    },
    newPassword: {
      error: false,
      message: "",
    },
    cPassword: {
      error: false,
      message: "",
    },
  });
  const [alert, setalert] = useState({
    show: false,
    message: "",
  });
  useEffect(() => {
    setinputData({
      name: userData.username,
      email: userData.email,
      mobile: userData.mobile,
      country: userData.country,
      state: userData.state,
      city: userData.city,
      password: "",
      newPassword: "",
      cPassword: "",
    });
  }, []);
  const {
    name,
    email,
    mobile,
    country,
    state,
    city,
    password,
    newPassword,
    cPassword,
  } = inputData;
  const handleChangePassword = () => {
    SetshowPassword(!ShowPassword);
  };
  const handleUpdateProfile = (e) => {
    e.preventDefault();
    if (name.length < 3) {
      setvalidation({
        ...validation,
        name: {
          value: name,
          error: true,
          message: "Name must be greater than 3 characters",
        },
      });
      return;
    }
    if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
      setvalidation({
        ...validation,
        email: { value: email, error: true, message: "Invalid Email" },
      });
      return;
    }
    if (mobile.toString().length !== 10) {
      setvalidation({
        ...validation,
        mobile: { error: true, message: "mobile number must be 10 digits" },
      });
      return;
    }
    if (country.length < 3) {
      setvalidation({
        ...validation,
        country: {
          value: country,
          error: true,
          message: "Please enter a country",
        },
      });
      return;
    }
    if (state.length < 3) {
      setvalidation({
        ...validation,
        state: { value: state, error: true, message: "Please enter a state" },
      });
      return;
    }
    if (city.length < 3) {
      setvalidation({
        ...validation,
        city: { value: city, error: true, message: "Please enter a city" },
      });
      return;
    }
    // submit the form
    const config = {
      headers: {
        token: JSON.parse(localStorage.getItem("accessTokenAdmin")),
      },
    };
    Axios.post(
      "/update/profile",
      {
        username: name,
        email: email,
        mobile: mobile,
        country: country,
        state: state,
        city: city,
      },
      config
    ).then((res) => {
      setalert({
        show: true,
        message: "Profile Updated Successfully",
      });
      setTimeout(() => {
        setalert({
          show: false,
          message: "",
        });
      }, 2000);
    });
  };
  const handleUpdatePassword = (e) => {
    e.preventDefault();
    if (password.length < 6) {
      setvalidation({
        ...validation,
        password: {
          error: true,
          message: "Password must be greater than 6 characters",
        },
      });
      return;
    }
    if (newPassword.length < 6) {
      setvalidation({
        ...validation,
        cPassword: {
          error: true,
          message: "New Password must be greater than 6 characters",
        },
      });
      return;
    }
    if (cPassword.length < 6) {
      setvalidation({
        ...validation,
        cPassword: {
          error: true,
          message: "Confirm Password must be greater than 6 characters",
        },
      });
      return;
    }
    if (newPassword !== cPassword) {
      setvalidation({
        ...validation,
        cPassword: {
          value: cPassword,
          error: true,
          message: "Password does not match",
        },
      });
      return;
    } else {
      setvalidation({
        ...validation,
        confirmPassword: {
          value: cPassword,
          error: false,
          message: "",
        },
      });
      const config = {
        headers: {
          token: JSON.parse(localStorage.getItem("accessTokenAdmin")),
        },
      };
      Axios.post(
        "/change",
        {
          password: password,
          newPassword: newPassword,
        },
        config
      )
        .then((res) => {
          alert("Password Updated");
          setinputData({
            ...inputData,
            password: "",
            newPassword: "",
            cPassword: "",
          });
        })
        .catch((err) => {
          setalert({
            show: true,
            message: "Password does not match",
          });
          setTimeout(() => {
            setalert({
              show: false,
              message: "",
            });
          }, 2000);
        });
    }
  };
  const handleInput = (e) => {
    setinputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === "name") {
      if (e.target.value.length < 3) {
      } else {
        setvalidation({
          ...validation,
          name: {
            error: false,
            message: "",
          },
        });
      }
    }
    if (e.target.name === "email") {
      // using regex to validate email
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(e.target.value)) {
      } else {
        setvalidation({
          ...validation,
          email: {
            error: false,
            message: "",
          },
        });
      }
    }
    if (e.target.name === "mobile") {
      if (e.target.value.length !== 10) {
      } else {
        setvalidation({
          ...validation,
          mobile: {
            error: false,
            message: "",
          },
        });
      }
    }
    if (e.target.name === "country") {
      if (e.target.value === "") {
      } else {
        setvalidation({
          ...validation,
          country: {
            error: false,
            message: "",
          },
        });
      }
    }
    if (e.target.name === "state") {
      if (e.target.value === "") {
      } else {
        setvalidation({
          ...validation,
          state: {
            error: false,
            message: "",
          },
        });
      }
    }
    if (e.target.name === "city") {
      if (e.target.value === "") {
      } else {
        setvalidation({
          ...validation,
          city: {
            error: false,
            message: "",
          },
        });
      }
    }
    if (e.target.name === "password") {
      if (e.target.value.length < 6) {
      } else {
        setvalidation({
          ...validation,
          password: {
            error: false,
            message: "",
          },
        });
      }
    }
    if (e.target.name === "newPassword") {
      setvalidation({
        ...validation,
        newPassword: {
          error: false,
          message: "",
        },
      });
    }
    if (e.target.name === "cPassword") {
      if (e.target.value !== newPassword) {
        setvalidation({
          ...validation,
          cPassword: {
            error: true,
            message: "Password does not match",
          },
        });
      } else {
        setvalidation({
          ...validation,
          cPassword: {
            value: e.target.value,
            error: false,
            message: "",
          },
        });
      }
    }
  };
  const selectImage = (e) => {
    fileInputRef.current.click();
  };
  const changeProfile = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("profilePic", file);
    formData.append("fileType", file.type.split("/")[0]);
    const config = {
      headers: {
        token: JSON.parse(localStorage.getItem("accessTokenAdmin")),
        contentType: "multipart/form-data",
      },
    };
    Axios.post("/profile/pic", formData, config)
      .then((res) => {
        setalert({
          show: true,
          message: "Profile Picture Updated",
        });
        setTimeout(() => {
          setalert({
            show: false,
            message: "",
          });
        }, 2000);
        setUserDatas(res.data.user);
      })
      .catch((err) => {
        console.log(err);
        setalert({
          show: true,
          message: "Something went wrong",
        });
        setTimeout(() => {
          setalert({
            show: false,
            message: "",
          });
        }, 2000);
      });
  };
  return (
    <>
      {/* admin profile page */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: "100%" }}
        transition={{ duration: 0.5 }}
        className="container py-2"
        style={{ backgroundColor: "white", height: "100%" }}
      >
        {alert.show && <Alert message={alert.message} />}
        <div className="row">
          <div className="col-md-3">
            <div className="card">
              <div className="card-body">
                <div className="d-flex flex-column align-items-center text-center">
                  <div className="img-big-cnt">
                    <div className="img-cnt">
                      <img
                        src={userDatas.profileImage}
                        alt="Image not found"
                        className="profileImage"
                        onClick={() => selectImage(userDatas._id)}
                      />
                    </div>
                  </div>
                  <Link
                    to={`/admin/profile/${userDatas._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <div className="position-absolute top-0 end-0 px-2">
                      <i className="bi bi-info-circle"></i>
                    </div>
                  </Link>
                  {/* update profileImage form */}
                  <input
                    type="file"
                    name="profileImage"
                    onChange={changeProfile}
                    ref={fileInputRef}
                    className="form-control"
                    style={{ width: "100%", display: "none" }}
                  />
                  <div className="mt-3">
                    <h4>{name}</h4>
                    <p className="text-secondary mb-1">
                      Role : {userDatas.role}
                    </p>
                    <p className="text-muted font-size-sm">
                      Address : {state},{city}
                    </p>
                    <div className="d-grid gap-2 col-9 mx-auto">
                      <button
                        onClick={handleChangePassword}
                        type="submit"
                        className="btn btn-dark"
                      >
                        {ShowPassword ? "Edit Profile" : "Change Password"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Editable Profile */}
          <div className="col-md-8">
            <div className="card mb-3">
              {/* update Profile */}
              {!ShowPassword && (
                <form onSubmit={handleUpdateProfile} className="card-body">
                  {/* Name */}
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Full Name</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      <input
                        onChange={handleInput}
                        name="name"
                        type="text"
                        className="form-control col-sm-9"
                        value={name || ""}
                      />
                      {/* validation name */}
                    </div>
                  </div>
                  {validation.name.error && (
                    <div className="row">
                      <div className="col-sm-3"></div>
                      <div className="col-sm-9 text-secondary">
                        <p className="text-danger">{name.message}</p>
                      </div>
                    </div>
                  )}
                  <hr />
                  {/* Email */}
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Email</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      <input
                        onChange={handleInput}
                        name="email"
                        type="text"
                        className="form-control col-sm-9"
                        value={email || ""}
                      />
                    </div>
                  </div>
                  {validation.email.error && (
                    <div className="row">
                      <div className="col-sm-3"></div>
                      <div className="col-sm-9 text-secondary">
                        <p className="text-danger">{email.message}</p>
                      </div>
                    </div>
                  )}
                  <hr />
                  {/* mobile */}
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">mobile</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      <input
                        onChange={handleInput}
                        name="mobile"
                        type="text"
                        className="form-control col-sm-9"
                        value={mobile || ""}
                      />
                    </div>
                  </div>
                  {validation.mobile.error && (
                    <div className="row">
                      <div className="col-sm-3"></div>
                      <div className="col-sm-9 text-secondary">
                        <p className="text-danger">{mobile.message}</p>
                      </div>
                    </div>
                  )}
                  <hr />
                  {/* Country */}
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Country</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      <input
                        onChange={handleInput}
                        name="country"
                        type="text"
                        className="form-control col-sm-9"
                        value={country || ""}
                      />
                    </div>
                  </div>
                  {validation.country.error && (
                    <div className="row">
                      <div className="col-sm-3"></div>
                      <div className="col-sm-9 text-secondary">
                        <p className="text-danger">{country.message}</p>
                      </div>
                    </div>
                  )}
                  <hr />
                  {/* State */}
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">State</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      <input
                        onChange={handleInput}
                        name="state"
                        type="text"
                        className="form-control col-sm-9"
                        value={state || ""}
                      />
                    </div>
                  </div>
                  {validation.state.error && (
                    <div className="row">
                      <div className="col-sm-3"></div>
                      <div className="col-sm-9 text-secondary">
                        <p className="text-danger">{state.message}</p>
                      </div>
                    </div>
                  )}
                  <hr />
                  {/* City */}
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">City</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      <input
                        onChange={handleInput}
                        name="city"
                        type="text"
                        className="form-control col-sm-9"
                        value={city || ""}
                      />
                    </div>
                  </div>
                  {validation.city.error && (
                    <div className="row">
                      <div className="col-sm-3"></div>
                      <div className="col-sm-9 text-secondary">
                        <p className="text-danger">{city.message}</p>
                      </div>
                    </div>
                  )}
                  <hr />
                  {/* update button */}
                  <div className="d-grid gap-2 col-6 mx-auto">
                    <button type="submit" className="btn btn-dark">
                      Update Profile
                    </button>
                  </div>
                </form>
              )}
              {/* change password */}
              {ShowPassword && (
                <form onSubmit={handleUpdatePassword} className="card-body">
                  {/* Old Password */}
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Old Password</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      <input
                        onChange={handleInput}
                        value={password || ""}
                        name="password"
                        type="text"
                        className="form-control col-sm-9"
                        placeholder="Old Password"
                      />
                    </div>
                  </div>
                  {validation.password.error && (
                    <div className="row">
                      <div className="col-sm-3"></div>
                      <div className="col-sm-9 text-secondary">
                        <p className="text-danger">
                          {validation.password.message}
                        </p>
                      </div>
                    </div>
                  )}
                  <hr />
                  {/* New Password */}
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">New Password</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      <input
                        onChange={handleInput}
                        value={newPassword || ""}
                        name="newPassword"
                        type="text"
                        className="form-control col-sm-9"
                        placeholder="New Password"
                      />
                    </div>
                  </div>
                  <hr />
                  {/* Confirm Password */}
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Confirm Password</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      <input
                        onChange={handleInput}
                        value={cPassword || ""}
                        name="cPassword"
                        type="text"
                        className="form-control col-sm-9"
                        placeholder="Confirm Password"
                      />
                    </div>
                  </div>
                  {validation.cPassword.error && (
                    <div className="row">
                      <div className="col-sm-3"></div>
                      <div className="col-sm-9 text-secondary">
                        <p className="text-danger">
                          {validation.cPassword.message}
                        </p>
                      </div>
                    </div>
                  )}
                  <hr />
                  {/* update button */}
                  <div className="d-grid gap-2 col-6 mx-auto">
                    <button type="submit" className="btn btn-dark">
                      Update Password
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Profile;
