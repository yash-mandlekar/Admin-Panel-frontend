import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Alert from "../Alert/Alert";
import Axios from "../Axios/Axios";
import Style from "../News/News.module.css";
const EditCordinates = () => {
  const navigation = useNavigate();
  const { id } = useParams();
  const [CordinatesForm, setCordinatesForm] = useState({
    city: "",
    pageNo: "",
    date: "",
    leftCoordinate: "",
    topCoordinate: "",
    sectionWidth: "",
    sectionHeight: "",
    newsUrl: "",
  });
  const {
    city,
    pageNo,
    date,
    leftCoordinate,
    topCoordinate,
    sectionWidth,
    sectionHeight,
    newsUrl,
  } = CordinatesForm;
  const [alert, setalert] = useState({
    show: false,
    message: "",
  });
  useEffect(() => {
    if (id) {
      getEditCordinates();
    }
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        token: JSON.parse(localStorage.getItem("accessTokenAdmin")),
      },
    };
    const formData = new FormData();
    formData.append("city", city.length > 0 ? city : "Bhopal");
    formData.append("pageNo", pageNo);
    formData.append("image", e.target.image.files[0]);
    formData.append("date", date);
    formData.append("leftCoordinate", leftCoordinate);
    formData.append("topCoordinate", topCoordinate);
    formData.append("sectionWidth", sectionWidth);
    formData.append("sectionHeight", sectionHeight);
    formData.append("newsUrl", newsUrl);
    try {
      await Axios.post("/ePaperCoord", formData, config);
      setalert({
        show: true,
        message: "Cordinates Added Successfully",
      });
      setTimeout(() => {
        setalert({
          show: false,
          message: "",
        });
      }, 3000);
      navigation("/admin/cordinates");
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
  const getEditCordinates = async () => {
    const config = {
      headers: {
        token: JSON.parse(localStorage.getItem("accessTokenAdmin")),
      },
    };
    const { data } = await Axios.get(`/ePaperCoord/${id}`, config);
    console.log(data);
    setCordinatesForm(data.ewspaper);
  };
  const handleChange = (e) => {
    setCordinatesForm({ ...CordinatesForm, [e.target.name]: e.target.value });
  };
  return (
    <>
      <h2 className={Style.h2}>Add Co-ordinate :- </h2>
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
                name="city"
                value={city}
                className={`form-select ${Style.input}`}
                id="inputGroupSelect01"
              >
                <option>Select City</option>
                <option value="Bhopal">Bhopal</option>
                <option value="Gwalior">Gwalior</option>
                <option value="Raipur">Raipur</option>
              </select>
            </div>
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
                required
              />
            </div>
            {/* Left Co-ordinate */}
            <div className={Style.inputGroup}>
              <label className={Style.label} htmlFor="leftCoordinate">
                Left Co-ordinate:
              </label>
              <input
                type="Number"
                name="leftCoordinate"
                id="leftCoordinate"
                placeholder="Left Co-ordinate"
                value={leftCoordinate}
                onChange={handleChange}
                className={Style.input}
                required
              />
            </div>
            {/* Top Co-ordinate */}
            <div className={Style.inputGroup}>
              <label className={Style.label} htmlFor="topCoordinate">
                Top Co-ordinate:
              </label>
              <input
                type="Number"
                name="topCoordinate"
                id="topCoordinate"
                placeholder="Top Co-ordinate"
                value={topCoordinate}
                onChange={handleChange}
                className={Style.input}
                required
              />
            </div>
            {/* Section Width */}
            <div className={Style.inputGroup}>
              <label className={Style.label} htmlFor="sectionWidth">
                Section Width:
              </label>
              <input
                type="Number"
                name="sectionWidth"
                id="sectionWidth"
                placeholder="Section Width"
                value={sectionWidth}
                onChange={handleChange}
                className={Style.input}
                required
              />
            </div>
            {/* Section Height */}
            <div className={Style.inputGroup}>
              <label className={Style.label} htmlFor="sectionHeight">
                Section Height:
              </label>
              <input
                type="Number"
                name="sectionHeight"
                id="sectionHeight"
                placeholder="Section Height"
                value={sectionHeight}
                onChange={handleChange}
                className={Style.input}
                required
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
                required
              />
            </div>
            {/* News Url */}
            <div className={Style.inputGroup}>
              <label className={Style.label} htmlFor="newsUrl">
                News Url:
              </label>
              <input
                type="text"
                name="newsUrl"
                id="newsUrl"
                placeholder="News Url"
                value={newsUrl}
                onChange={handleChange}
                className={Style.input}
                required
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
                required
              />
            </div>
            {/* Button Group */}
            <div className={Style.btnGroup}>
              {/* Cancel Button */}
              <button
                onClick={() => navigation("/admin/cordinates")}
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

export default EditCordinates;
