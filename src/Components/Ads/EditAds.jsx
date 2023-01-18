import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Alert from "../Alert/Alert";
import Axios from "../Axios/Axios";
import Style from "../News/News.module.css";
const EditAds = () => {
  const navigation = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    getAds();
  }, []);
  const getAds = async () => {
    const config = {
      headers: {
        token: JSON.parse(localStorage.getItem("accessTokenAdmin")),
      },
    };
    const { data } = await Axios.get(`/add/${id}`, config);
    setNewsForm({
      advertisementLocation: data.advertisementLocation,
      title: data.title,
      description: data.description,
      link: data.link,
      sortOrder: data.sortOrder,
      targetAudience: data.targetAudience,
    });
  };
  const [NewsForm, setNewsForm] = useState({
    advertisementLocation: "",
    title: "",
    description: "",
    link: "",
    sortOrder: "",
    targetAudience: "",
  });
  const [alert, setalert] = useState({
    show: false,
    message: "",
  });
  const {
    advertisementLocation,
    title,
    description,
    link,
    sortOrder,
    targetAudience,
  } = NewsForm;
  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        token: JSON.parse(localStorage.getItem("accessTokenAdmin")),
      },
    };
    const formData = new FormData();
    formData.append("advertisementLocation", advertisementLocation);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("file", e.target.file.files[0]);
    formData.append("link", link);
    formData.append("sortOrder", sortOrder);
    formData.append("targetAudience", targetAudience);
    try {
      await Axios.put("/add/" + id, formData, config);  
      setalert({
        show: true,
        message: "News Updated Successfully",
      });
      setTimeout(() => {
        setalert({
          show: false,
          message: "",
        });
      }, 3000);
      navigation("/ads");
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
      <h2 className={Style.h2}>Edit Ads :- </h2>
      {alert.show && <Alert message={alert.message} />}
      <div className="showAllFile-container">
        <div className={Style.formCnt}>
          <form onSubmit={handleSubmit} className={Style.Form}>
            {/* Advertisement Location */}
            <div className={Style.inputGroup}>
              <label className={Style.label} htmlFor="advertisementLocation">
                Advertisement Location:
              </label>
              <input
                type="Text"
                name="advertisementLocation"
                placeholder="Advertisement Location"
                id="advertisementLocation"
                value={advertisementLocation}
                onChange={handleChange}
                className={Style.input}
                required
              />
            </div>
            {/* Title */}
            <div className={Style.inputGroup}>
              <label className={Style.label} htmlFor="title">
                Title:
              </label>
              <input
                type="text"
                name="title"
                placeholder="Title"
                id="title"
                value={title}
                onChange={handleChange}
                className={Style.input}
                required
              />
            </div>
            {/* Description */}
            <div className={Style.inputGroup}>
              <label className={Style.label} htmlFor="description">
                Description:
              </label>
              <input
                type="text"
                name="description"
                placeholder="Description"
                id="description"
                value={description}
                onChange={handleChange}
                className={Style.input}
                required
              />
            </div>
            {/* Link */}
            <div className={Style.inputGroup}>
              <label className={Style.label} htmlFor="link">
                Link:
              </label>
              <input
                type="text"
                name="link"
                placeholder="Link"
                id="link"
                value={link}
                onChange={handleChange}
                className={Style.input}
                required
              />
            </div>
            {/* Sort Order */}
            <div className={Style.inputGroup}>
              <label className={Style.label} htmlFor="sortOrder">
                Sort Order:
              </label>
              <input
                type="number"
                name="sortOrder"
                placeholder="Sort Order"
                id="sortOrder"
                value={sortOrder}
                onChange={handleChange}
                className={Style.input}
                required
              />
            </div>
            {/* Target Audience */}
            <div className={Style.inputGroup}>
              <label className={Style.label} htmlFor="targetAudience">
                Target Audience:
              </label>
              <input
                type="text"
                name="targetAudience"
                placeholder="Target Audience"
                id="targetAudience"
                value={targetAudience}
                onChange={handleChange}
                className={Style.input}
                required
              />
            </div>
            {/* Image */}
            <div className={Style.inputGroup}>
              <label className={Style.label} htmlFor="file">
                Image:
              </label>
              <input
                type="file"
                name="file"
                id="file"
                className={Style.input}
                required
              />
            </div>
            {/* Button Group */}
            <div className={Style.btnGroup}>
              {/* Cancel Button */}
              <button
                onClick={() => navigation("/admin/ads")}
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

export default EditAds;
