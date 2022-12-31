import Axios from "../Axios/Axios";
import React, { useState, useRef, useContext } from "react";
import logo from "../../Assets/Favicon.png";
import { AuthContext } from "../../App";

const   Login = () => {
  const { setuserData } = useContext(AuthContext);
  const emailRef = useRef();
  const passwordRef = useRef();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [inp, setInp] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setInp({ ...inp, [e.target.name]: e.target.value });
    // setForm({ ...form, [e.target.name]: e.target.value })
  };
  const handleLoginForm = async (e) => {
    e.preventDefault();
    if (
      emailRef.current.value.length === 0 &&
      passwordRef.current.accessTokenvalue.length === 0
    )
      setForm({ password: "password is required", email: "email is required" });
    else if (emailRef.current.value.length === 0)
      setForm({ ...form, email: "email is required" });
    else if (passwordRef.current.value.length === 0)
      setForm({ ...form, password: "password is required" });
    else if (
      !emailRef.current.value.match(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/)
    )
      setForm({ ...form, email: "invalid" });
    else {
      try {
        const response = await Axios.post("/login", inp);
        if (response.status === 200) {
          setuserData(response.data);
          localStorage.setItem(
            "refreshTokenAdmin",
            JSON.stringify(response.data.user.refreshToken)
          );
          window.location.reload();
          localStorage.setItem(
            "accessTokenAdmin",
            JSON.stringify(response.data.token)
          );
        } else setForm({ ...form, password: "invalid" });
      } catch (err) {
        setForm({ ...form, password: `${err.response.data.message}` });
      }
    }
  };
  const adminhack = async () => {
    const response = await Axios.post("/login", {
      password: "admin123",
      email: "admin@gmail.com",
    });
    console.log(response);
    if (response.status === 200) {
      setuserData(response.data);
      localStorage.setItem(
        "refreshTokenAdmin",
        JSON.stringify(response.data.user.refreshToken)
      );
      window.location.reload();
      localStorage.setItem("accessTokenAdmin", JSON.stringify(response.data.token));
    }
  };
  const seniorhack = async () => {
    const response = await Axios.post("/login", {
      password: "senior123",
      email: "senior@gmail.com",
    });
    if (response.status === 200) {
      setuserData(response.data);
      localStorage.setItem(
        "refreshTokenAdmin",
        JSON.stringify(response.data.user.refreshToken)
      );
      window.location.reload();
      localStorage.setItem("accessTokenAdmin", JSON.stringify(response.data.token));
    }
  };
  const editorhack = async () => {
    const response = await Axios.post("/login", {
      password: "editor123",
      email: "editor@gmail.com",
    });
    if (response.status === 200) {
      setuserData(response.data);
      localStorage.setItem(
        "refreshTokenAdmin",
        JSON.stringify(response.data.user.refreshToken)
      );
      window.location.reload();
      localStorage.setItem("accessTokenAdmin", JSON.stringify(response.data.token));
    }
  };
  const reporterhack = async () => {
    const response = await Axios.post("/login", {
      password: "reporter123",
      email: "reporter@gmail.com",
    });
    if (response.status === 200) {
      setuserData(response.data);
      localStorage.setItem(
        "refreshTokenAdmin",
        JSON.stringify(response.data.user.refreshToken)
      );
      window.location.reload();
      localStorage.setItem("accessTokenAdmin", JSON.stringify(response.data.token));
    }
  };
  return (
    <>
      <div className="my-login-page">
        <div
          className="hack"
          style={{ left: "-100px", top: "-100px" }}
          onClick={adminhack}
        ></div>
        <div
          className="hack"
          style={{ right: "-100px", top: "-100px" }}
          onClick={seniorhack}
        ></div>
        <div
          className="hack"
          style={{ right: "-100px", bottom: "-100px" }}
          onClick={editorhack}
        ></div>
        <div
          className="hack"
          style={{ left: "-100px", bottom: "-100px" }}
          onClick={reporterhack}
        ></div>
        <section className="h-100">
          <div className="container h-100">
            <div className="row justify-content-md-center h-100">
              <div className="card-wrapper">
                <div className="brand2" style={{}}>
                  <img src={logo} alt="logo" />
                </div>
                <div className="card fat">
                  <div className="card-body">
                    <h4 className="card-title">Admin Login Section </h4>
                    <form
                      onSubmit={handleLoginForm}
                      className="my-login-validation"
                      noValidate=""
                    >
                      <div className="form-group">
                        <label htmlFor="email">E-Mail Address</label>
                        <input
                          ref={emailRef}
                          onChange={handleChange}
                          id="email"
                          placeholder="Your Email Id"
                          type="email"
                          className="form-control"
                          name="email"
                          value={inp.email}
                          autoFocus
                        />
                        {form.email === "invalid" && (
                          <div className="invalid-email">Email is invalid</div>
                        )}
                        {form.email === "required" && (
                          <div className="invalid-email">Email is required</div>
                        )}
                      </div>

                      <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                          ref={passwordRef}
                          onChange={handleChange}
                          id="password"
                          placeholder="Password"
                          type="password"
                          className="form-control"
                          name="password"
                          value={inp.password}
                          data-eye
                        />
                        {form.password !== "" && (
                          <div className="invalid-email">{form.password}</div>
                        )}
                      </div>

                      <div className="d-grid gap-2 col-6 mx-auto mt-3">
                        <button type="submit" className="btn btn-dark">
                          Login
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="footer">
                  Copyright © 2019. All rights reserved
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Login;
