import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../Alert/Alert";
import Axios from "../Axios/Axios";
import Style from "./News.module.css";
import CKeditor from "./CKeditor";
const AddNews = () => {
  const navigate = useNavigate();
  const [Categories, setCategories] = useState([]);
  const [Focused, setFocused] = useState(false);
  const [btnloader, setBtnloader] = useState(false);
  const [catloader, setCatloader] = useState(true);
  const [NewsForm, setNewsForm] = useState({
    categoryInp: "",
    category: [],
    showInSlider: "True",
    sliderPriority: "",
    publishDateTime: "",
    latestNews: "True",
    latestNewsPriority: "",
    file: "",
    aboutImage: "",
    location: "",
    imageSource: "",
    metaTitle: "",
    metaDescription: "",
    hashTags: [],
    shortDescription: "",
    description: "",
  });
  const {
    categoryInp,
    category,
    showInSlider,
    sliderPriority,
    publishDateTime,
    latestNews,
    latestNewsPriority,
    file,
    aboutImage,
    imageSource,
    metaTitle,
    metaDescription,
    location,
    hashTags,
    shortDescription,
    description,
  } = NewsForm;
  const [alert, setalert] = useState({
    show: false,
    message: "",
  });
  useEffect(() => {
    getCategories();
  }, []);
  const getCategories = async () => {
    setCatloader(true);
    const config = {
      headers: {
        token: JSON.parse(localStorage.getItem("accessToken")),
      },
    };
    const { data } = await Axios.get("/news-category", config);
    setCatloader(false);
    setCategories(data);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !showInSlider ||
      !sliderPriority ||
      !latestNews ||
      !latestNewsPriority ||
      !e.target.file.files[0] ||
      !aboutImage ||
      !location ||
      !imageSource ||
      !metaTitle ||
      !metaDescription ||
      !hashTags ||
      !shortDescription ||
      !description
    ) {
      setalert({
        show: true,
        message: "Please fill all the fields",
      });
      setTimeout(() => {
        setalert({
          show: false,
          message: "",
        });
      }, 3000);
      return;
    }
    setBtnloader(true);
    const config = {
      headers: {
        token: JSON.parse(localStorage.getItem("accessToken")),
      },
    };
    const formData = new FormData();
    category.forEach((e) => {
      formData.append("categories[]", e._id);
    });
    formData.append("showInSlider", showInSlider);
    formData.append("sliderPriority", sliderPriority);
    formData.append("publishDateTime", publishDateTime);
    formData.append("latestNews", latestNews);
    formData.append("latestNewsPriority", latestNewsPriority);
    formData.append("file", e.target.file.files[0]);
    formData.append("aboutImage", aboutImage);
    formData.append("location", location);
    formData.append("imageSource", imageSource);
    formData.append("metaTitle", metaTitle);
    formData.append("metaDescription", metaDescription);
    formData.append("hashTags", hashTags);
    formData.append("shortDescription", shortDescription);
    formData.append("description", description);
    try {
      await Axios.post("/news", formData, config);
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
      setBtnloader(false);
      navigate("/admin/news");
    } catch (err) {
      setalert({
        show: true,
        message: err.response.data.message,
      });
      setBtnloader(false);
      setTimeout(() => {
        setalert({
          show: false,
          message: "",
        });
      }, 3000);
    }
  };
  const handleSearch = (e) => {
    const cpy = [...NewsForm.category];
    const index = cpy.indexOf(e);
    if (index === -1) {
      cpy.push(e);
    } else {
      cpy.splice(index, 1);
    }
    setNewsForm({ ...NewsForm, categoryInp: "", category: cpy });
  };
  const handleChange = (e) => {
    setNewsForm({ ...NewsForm, [e.target.name]: e.target.value });
  };
  return (
    <>
      <h2 className={Style.h2}>Add News :- </h2>
      {alert.show && <Alert message={alert.message} />}
      <div className="showAllFile-container">
        <div className={Style.formCnt}>
          <form onSubmit={handleSubmit} className={Style.Form}>
            <div className={Style.Categories}>
              <label className={Style.label} htmlFor="Categories">
                Categories:
              </label>
              <input
                className={Style.searchInput}
                type="text"
                name="categoryInp"
                placeholder="Search categories by Name"
                id=""
                onChange={handleChange}
                value={categoryInp}
                onFocus={() => setFocused(true)}
                onBlur={() => {
                  setTimeout(() => {
                    setFocused(false);
                  }, 250);
                }}
              />
              <i style={{ marginLeft: "-2rem" }} className="bi bi-search"></i>
              {/* search box */}
              {Focused && (
                <div
                  className={Style.searchBox}
                  style={{
                    border: Focused && "0.1em solid rgb(114, 114, 114)",
                  }}
                >
                  {catloader ? (
                    <div className={Style.searchItem}>Loading...</div>
                  ) : (
                    Categories.filter(function (data) {
                      return data.englishName
                        .toLowerCase()
                        .includes(categoryInp.toLowerCase());
                    })
                      .splice(0, 5)
                      .map((item) => (
                        <div
                          onClick={() => handleSearch(item)}
                          className={Style.searchItem}
                          key={item._id}
                        >
                          {item.englishName}
                        </div>
                      ))
                  )}
                </div>
              )}
              {/* selected boxes */}
              <div className={Style.selectedBox}>
                {category.map((item, i) => (
                  <div key={i} className={Style.selectedItem}>
                    <button
                      onClick={() => handleSearch(item)}
                      className={Style.removeBtn}
                      key={item._id}
                    >
                      <i className="bi bi-x"></i>
                      {item.englishName}
                    </button>
                  </div>
                ))}
              </div>
            </div>
            {/* Show in Slider */}
            <div className={Style.inputGroup}>
              <label className={Style.label} htmlFor="inputGroupSelect01">
                Show In Slider :
              </label>
              <select
                onChange={handleChange}
                value={showInSlider}
                name="showInSlider"
                className={`form-select ${Style.input}`}
                id="inputGroupSelect01"
              >
                <option value="True">Yes</option>
                <option value="False">No</option>
              </select>
            </div>
            {/* Slider Priority */}
            <div className={Style.inputGroup}>
              <label className={Style.label} htmlFor="sliderPriority">
                Slider Priority:
              </label>
              <input
                type="Number"
                name="sliderPriority"
                placeholder="Slider Priority"
                id="sliderPriority"
                value={sliderPriority}
                onChange={handleChange}
                className={Style.input}
              />
            </div>
            {/* Publish Date Time */}
            <div className={Style.inputGroup}>
              <label className={Style.label} htmlFor="publishDateTime">
                Publish Date Time:
              </label>
              <input
                type="datetime-local"
                name="publishDateTime"
                id="publishDateTime"
                value={publishDateTime}
                onChange={handleChange}
                className={Style.input}
              />
            </div>
            {/* Latest News */}
            <div className={Style.inputGroup}>
              <label className={Style.label} htmlFor="inputGroupSelect01">
                Latest News :
              </label>
              <select
                onChange={handleChange}
                value={latestNews}
                name="latestNews"
                className={`form-select ${Style.input}`}
                id="inputGroupSelect01"
              >
                <option value="True">Yes</option>
                <option value="False">No</option>
              </select>
            </div>
            {/* Latest News Priority */}
            <div className={Style.inputGroup}>
              <label className={Style.label} htmlFor="latestNewsPriority">
                Latest News Priority:
              </label>
              <input
                type="Number"
                name="latestNewsPriority"
                placeholder="Latest News Priority"
                id="latestNewsPriority"
                value={latestNewsPriority}
                onChange={handleChange}
                className={Style.input}
              />
            </div>
            {/* File */}
            <div className={Style.inputGroup}>
              <label className={Style.label} htmlFor="file">
                File:
              </label>
              <input
                type="file"
                name="file"
                id="file"
                value={file}
                onChange={handleChange}
                className={Style.input}
              />
            </div>
            {/* location */}
            <div className={Style.inputGroup}>
              <label className={Style.label} htmlFor="location">
                Location:
              </label>
              <input
                type="text"
                name="location"
                placeholder="Location"
                id="location"
                value={location}
                onChange={handleChange}
                className={Style.input}
              />
            </div>
            {/* About Image */}
            <div className={Style.inputGroup}>
              <label className={Style.label} htmlFor="aboutImage">
                About Image:
              </label>
              <input
                type="text"
                name="aboutImage"
                placeholder="About Image"
                id="aboutImage"
                value={aboutImage}
                onChange={handleChange}
                className={Style.input}
              />
            </div>
            {/* Image Source */}
            <div className={Style.inputGroup}>
              <label className={Style.label} htmlFor="imageSource">
                Image Source:
              </label>
              <input
                type="text"
                name="imageSource"
                placeholder="Image Source"
                id="imageSource"
                value={imageSource}
                onChange={handleChange}
                className={Style.input}
              />
            </div>
            {/* Meta Title */}
            <div className={Style.inputGroup}>
              <label className={Style.label} htmlFor="metaTitle">
                Meta Title:
              </label>
              <input
                type="text"
                name="metaTitle"
                placeholder="Meta Title"
                id="metaTitle"
                value={metaTitle}
                onChange={handleChange}
                className={Style.input}
              />
            </div>
            {/* Meta Description */}
            <div className={Style.inputGroup}>
              <label className={Style.label} htmlFor="metaDescription">
                Meta Description:
              </label>
              <textarea
                name="metaDescription"
                placeholder="Meta Description"
                id="metaDescription"
                value={metaDescription}
                onChange={handleChange}
                className={Style.input}
              ></textarea>
            </div>
            {/* Hash Tags */}
            <div className={Style.inputGroup}>
              <label className={Style.label} htmlFor="hashTags">
                Hash Tags:
              </label>
              <textarea
                name="hashTags"
                placeholder="Hash Tags"
                id="hashTags"
                value={hashTags}
                onChange={handleChange}
                className={Style.input}
              ></textarea>
            </div>
            {/* Short Description */}
            <div className={Style.inputGroup}>
              <label className={Style.label} htmlFor="shortDescription">
                Short Description:
              </label>
              <textarea
                name="shortDescription"
                placeholder="Short Description"
                id="shortDescription"
                value={shortDescription}
                onChange={handleChange}
                className={Style.input}
              ></textarea>
            </div>
            {/* Description */}
            <div className={Style.inputGroup}>
              <label className={Style.label} htmlFor="Description">
                Description:
              </label>
              <CKeditor setNewsForm={setNewsForm} />
              {/* <textarea
                name="description"
                placeholder="Description"
                id="Description"
                value={description}
                onChange={handleChange}
                className={Style.input}
              ></textarea> */}
            </div>
            {/* Button Group */}
            <div className={Style.btnGroup}>
              {/* Cancel Button */}
              <button
                onClick={() => navigate("/admin/news")}
                className="btn btn-danger mx-auto col-5"
                type="button"
              >
                {/* <div className="d-grid gap-2 col-6 mx-auto mb-2"> */}
                Cancel
              </button>
              {/* Submit Button */}
              {btnloader ? (
                <button
                  className="btn btn-dark mx-auto col-5"
                  type="button"
                  disabled
                >
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Loading...
                </button>
              ) : (
                <button className="btn btn-dark mx-auto col-5" type="submit">
                  Submit
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddNews;
