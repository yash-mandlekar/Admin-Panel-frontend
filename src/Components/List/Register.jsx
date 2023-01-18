import { useState } from "react";
import Axios from "../Axios/Axios";
import { motion } from "framer-motion";
import Alert from "../Alert/Alert";
import moment from "moment";
const Profile = () => {
  const [parents, setparents] = useState([]);
  const [alert, setalert] = useState({
    show: false,
    message: "",
  });
  const [inputData, setinputData] = useState({
    username: "",
    email: "",
    mobile: "",
    country: "",
    state: "",
    city: "",
    password: "",
    dateOfBirth: "",
    pincode: "",
    role: "",
    gender: "",
    parentId: "",
  });
  const [validation, setvalidation] = useState({
    username: {
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
    dateOfBirth: {
      error: false,
      message: "",
    },
    pincode: {
      error: false,
      message: "",
    },
    role: {
      error: false,
      message: "",
    },
    gender: {
      error: false,
      message: "",
    },
    parentId: {
      error: false,
      message: "",
    },
  });
  const {
    username,
    email,
    mobile,
    country,
    state,
    city,
    password,
    dateOfBirth,
    pincode,
    role,
    gender,
    parentId,
  } = inputData;
  const handleRegister = async (e) => {
    if (username.length < 3) {
      setvalidation({
        ...validation,
        username: {
          error: true,
          message: "Name must be greater than 3 characters",
        },
      });
      return;
    }
    if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
      setvalidation({
        ...validation,
        email: { error: true, message: "Invalid Email" },
      });
      return;
    }
    if (mobile.trim().length !== 10) {
      setvalidation({
        ...validation,
        mobile: { error: true, message: "mobile number must be 10 digits" },
      });
      return;
    }
    if (country.length < 3) {
      setvalidation({
        ...validation,
        country: { error: true, message: "Please enter a country" },
      });
      return;
    }
    if (gender === "") {
      setvalidation({
        ...validation,
        gender: { error: true, message: "Please select gender" },
      });
      return;
    }
    if (state.length < 3) {
      setvalidation({
        ...validation,
        state: { error: true, message: "Please enter a state" },
      });
      return;
    }
    if (city.length < 3) {
      setvalidation({
        ...validation,
        city: { error: true, message: "Please enter a city" },
      });
      return;
    }
    if (pincode === "") {
      setvalidation({
        ...validation,
        pincode: { error: true, message: "Please enter pincode" },
      });
      return;
    }
    if (dateOfBirth === "") {
      setvalidation({
        ...validation,
        dateOfBirth: { error: true, message: "Please select date of birth" },
      });
      return;
    }
    if (role === "") {
      setvalidation({
        ...validation,
        role: { error: true, message: "Please select role" },
      });
      return;
    }
    if (password.length < 6) {
      setvalidation({
        ...validation,
        password: {
          error: true,
          message: "Password must be atleast 6 characters",
        },
      });
      return;
    }
    if (role === "Editor" || role === "Reporter") {
      if (parentId === "") {
        setvalidation({
          ...validation,
          parentId: {
            error: true,
            message: "Please select parent",
          },
        });
        return;
      }
    }
    // submit the form
    const config = {
      headers: {
        token: JSON.parse(localStorage.getItem("accessTokenAdmin")),
      },
    };
    try {
      const res = await Axios.post("/register", inputData, config);

      setalert({
        show: true,
        message: "User registered successfully",
      });
      setTimeout(() => {
        setalert({
          show: false,
          message: "",
        });
      }, 2000);
      setinputData({
        username: "",
        email: "",
        mobile: "",
        country: "",
        state: "",
        city: "",
        password: "",
        dateOfBirth: "",
        pincode: "",
        role: "",
        gender: "",
        parentId: "",
      });
    } catch (err) {
      setalert({
        show: true,
        message: err.response.data.message,
      });
      setTimeout(() => {
        setalert({
          show: false,
          message: "",
        });
      }, 2000);
    }
  };
  const handleInput = async (e) => {
    setinputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === "username") {
      if (e.target.value.length < 3) {
      } else {
        setvalidation({
          ...validation,
          username: {
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
      // triming spaces
      if (e.target.value.trim().length !== 10) {
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
    if (e.target.name === "dateOfBirth") {
      if (e.target.value === "") {
      } else {
        setvalidation({
          ...validation,
          dateOfBirth: {
            error: false,
            message: "",
          },
        });
      }
    }
    if (e.target.name === "pincode") {
      if (e.target.value === "") {
      } else {
        setvalidation({
          ...validation,
          pincode: {
            error: false,
            message: "",
          },
        });
      }
    }
    if (e.target.name === "role") {
      if (e.target.value === "") {
      } else {
        setvalidation({
          ...validation,
          role: {
            error: false,
            message: "",
          },
        });
      }
      const config = {
        headers: {
          token: JSON.parse(localStorage.getItem("accessTokenAdmin")),
        },
      };
      if (e.target.value.toLowerCase() === "editor") {
        const res = await Axios.get("/senior-editor", config);
        setparents(res.data.data);
      } else if (e.target.value.toLowerCase() === "reporter") {
        const res = await Axios.get("/editor", config);
        setparents(res.data.data);
      }
    }
    if (e.target.name === "gender") {
      if (e.target.value === "") {
      } else {
        setvalidation({
          ...validation,
          gender: {
            error: false,
            message: "",
          },
        });
      }
    }
    if (e.target.name === "parentId") {
      if (e.target.value === "") {
      } else {
        setvalidation({
          ...validation,
          parentId: {
            error: false,
            message: "",
          },
        });
      }
    }
  };
  return (
    <>
      {/* admin profile page */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: "100%" }}
        transition={{ duration: 0.5 }}
        className="container py-2"
        style={{ backgroundColor: "white" }}
      >
        {alert.show && <Alert message={alert.message} />}

        <div className="row">
          {/* Editable Profile */}
          <div className="col-md-12">
            <div className="card mb-3">
              {/* update Profile */}
              <form className="card-body d-flex justify-content-around">
                <div className="left col-5">
                  {/* Name */}
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Full Name</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      <input
                        onChange={handleInput}
                        name="username"
                        placeholder="Enter your name"
                        type="text"
                        className="form-control col-sm-9"
                        value={username || ""}
                      />
                      {/* validation name */}
                    </div>
                  </div>
                  {validation.username.error && (
                    <div className="row">
                      <div className="col-sm-3"></div>
                      <div className="col-sm-9 text-secondary">
                        <p className="text-danger">
                          {validation.username.message}
                        </p>
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
                        placeholder="Enter your email"
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
                        <p className="text-danger">
                          {validation.email.message}
                        </p>
                      </div>
                    </div>
                  )}
                  <hr />
                  {/* mobile */}
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Mobile</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      <input
                        onChange={handleInput}
                        name="mobile"
                        placeholder="Enter your mobile"
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
                        <p className="text-danger">
                          {validation.mobile.message}
                        </p>
                      </div>
                    </div>
                  )}
                  <hr />
                  {/* Gender radio */}
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Gender</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      <select
                        onChange={handleInput}
                        name="gender"
                        className="form-control col-sm-9"
                        value={gender || ""}
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                  </div>
                  {validation.gender.error && (
                    <div className="row">
                      <div className="col-sm-3"></div>
                      <div className="col-sm-9 text-secondary">
                        <p className="text-danger">
                          {validation.gender.message}
                        </p>
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
                        placeholder="Enter your country"
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
                        <p className="text-danger">
                          {validation.country.message}
                        </p>
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
                        placeholder="Enter your state"
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
                        <p className="text-danger">
                          {validation.state.message}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="right col-5">
                  {/* City */}
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">City</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      <input
                        onChange={handleInput}
                        name="city"
                        placeholder="Enter your city"
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
                        <p className="text-danger">{validation.city.message}</p>
                      </div>
                    </div>
                  )}
                  <hr />
                  {/* Pincode */}
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Pincode</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      <input
                        onChange={handleInput}
                        name="pincode"
                        placeholder="Enter your pincode"
                        type="text"
                        className="form-control col-sm-9"
                        value={pincode || ""}
                      />
                    </div>
                  </div>
                  {validation.pincode.error && (
                    <div className="row">
                      <div className="col-sm-3"></div>
                      <div className="col-sm-9 text-secondary">
                        <p className="text-danger">
                          {validation.pincode.message}
                        </p>
                      </div>
                    </div>
                  )}
                  <hr />
                  {/* dateOfBirth */}
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">DOB</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      <input
                        onChange={handleInput}
                        name="dateOfBirth"
                        type="date"
                        className="form-control col-sm-9"
                        value={dateOfBirth || ""}
                        max={moment().format("YYYY-MM-DD")}
                      />
                    </div>
                  </div>
                  {validation.dateOfBirth.error && (
                    <div className="row">
                      <div className="col-sm-3"></div>
                      <div className="col-sm-9 text-secondary">
                        <p className="text-danger">
                          {validation.dateOfBirth.message}
                        </p>
                      </div>
                    </div>
                  )}
                  <hr />
                  {/* Role */}
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Role</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      <select
                        onChange={handleInput}
                        name="role"
                        className="form-control col-sm-9"
                        value={role || ""}
                      >
                        <option value="">Select Role</option>
                        <option value="Senior Editor">Senior Editor</option>
                        <option value="Editor">Editor</option>
                        <option value="Reporter">Reporter</option>
                      </select>
                    </div>
                  </div>
                  {validation.role.error && (
                    <div className="row">
                      <div className="col-sm-3"></div>
                      <div className="col-sm-9 text-secondary">
                        <p className="text-danger">{validation.role.message}</p>
                      </div>
                    </div>
                  )}
                  <hr />
                  {/* Password */}
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Password</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      <input
                        onChange={handleInput}
                        name="password"
                        placeholder="Enter your password"
                        type="password"
                        className="form-control col-sm-9"
                        value={password || ""}
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
                  {(role === "Editor" || role === "Reporter") && <hr />}
                  {/* parentId */}
                  {(role === "Editor" || role === "Reporter") && (
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Parent</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        <select
                          onChange={handleInput}
                          name="parentId"
                          className="form-control col-sm-9"
                          value={parentId || ""}
                        >
                          <option value="">Select parent</option>
                          {parents.map((parent) => (
                            <option key={parent._id} value={parent._id}>
                              {parent.username}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}
                  {(role === "Editor" || role === "Reporter") &&
                    validation.parentId.error && (
                      <div className="row">
                        <div className="col-sm-3"></div>
                        <div className="col-sm-9 text-secondary">
                          <p className="text-danger">
                            {validation.parentId.message}
                          </p>
                        </div>
                      </div>
                    )}
                </div>
              </form>
              <div className="d-grid gap-2 col-6 mx-auto mb-2">
                <button
                  onClick={handleRegister}
                  type="submit"
                  className="btn btn-dark"
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Profile;
