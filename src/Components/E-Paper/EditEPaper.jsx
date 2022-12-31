import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Alert from "../Alert/Alert";
import Axios from "../Axios/Axios";
import Style from "../News/News.module.css";
const AddNews = () => {
  const navigation = useNavigate();
  const { id } = useParams();
  const [NewsForm, setNewsForm] = useState({
    city: "",
    pageNo: "",
    image: "",
    date: "",
  });
  const [alert, setalert] = useState({
    show: false,
    message: "",
  });
  const { city, pageNo, image, date } = NewsForm;
  useEffect(() => {
    if (id) {
      getEPaper();
    }
  }, []);
  const getEPaper = async () => {
    const config = {
      headers: {
        token: JSON.parse(localStorage.getItem("accessToken")),
      },
    };
    const { data } = await Axios.get(`/ePaper/${id}`, config);
    setNewsForm(data);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        token: JSON.parse(localStorage.getItem("accessToken")),
      },
    };
    const formData = new FormData();
    formData.append("image", e.target.image.files[0]);
    formData.append("city", city);
    formData.append("pageNo", pageNo);
    formData.append("date", date);
    try {
      await Axios.put(`/ePaper/${id}`, formData, config);
      setalert({
        show: true,
        message: "News Added Successfully",
      });
      setTimeout(() => {
        setalert({
          show: false,
          message: "",
        });
      }, 3000);
      navigation("/admin/e-paper");
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
      }, 3000);
    }
  };
  const handleChange = (e) => {
    setNewsForm({ ...NewsForm, [e.target.name]: e.target.value });
  };
  return (
    <>
      <h2 className={Style.h2}>Edit E-Paper :- </h2>
      {alert.show && <Alert message={alert.message} />}
      <div className="showAllFile-container">
        <div className={Style.formCnt}>
          <form onSubmit={handleSubmit} className={Style.Form}>
            {/* Select City */}
            <div className={Style.inputGroup}>
              <label className={Style.label} htmlFor="inputGroupSelect01">
                Select City :
              </label>
              <select
                onChange={handleChange}
                value={city}
                name="city"
                className={`form-select ${Style.input}`}
                id="inputGroupSelect01"
              >
                <option>Select City</option>
                <option value="Bhopal">Bhopal</option>
                <option value="Gwalior">Gwalior</option>
                <option value="Raipur">Raipur</option>
              </select>
            </div>{" "}
            {/* Page No. */}
            <div className={Style.inputGroup}>
              <label className={Style.label} htmlFor="pageNo">
                Page No.:
              </label>
              <input
                type="Number"
                name="pageNo"
                placeholder="Page No."
                id="pageNo"
                value={pageNo}
                onChange={handleChange}
                className={Style.input}
              />
            </div>
            {/* Image */}
            <div className={Style.inputGroup}>
              <label className={Style.label} htmlFor="image">
                Image:
              </label>
              <input
                type="file"
                name="image"
                id="image"
                onChange={handleChange}
                className={Style.input}
              />
            </div>
            {/* Date */}
            <div className={Style.inputGroup}>
              <label className={Style.label} htmlFor="date">
                Date:
              </label>
              <input
                type="date"
                name="date"
                id="date"
                value={date}
                onChange={handleChange}
                className={Style.input}
              />
            </div>
            {/* Button Group */}
            <div className={Style.btnGroup}>
              {/* Cancel Button */}
              <button
                onClick={() => navigation("/admin/e-paper")}
                className="btn btn-danger mx-auto col-5"
                type="button"
              >
                {/* <div className="d-grid gap-2 col-6 mx-auto mb-2"> */}
                Cancel
              </button>
              {/* Submit Button */}
              <button type="submit" className="btn btn-dark mx-auto col-5">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddNews;
