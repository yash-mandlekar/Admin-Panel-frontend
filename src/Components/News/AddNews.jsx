import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "../Axios/Axios";
import Style from "./News.module.css";
const AddNews = () => {
  const navigation = useNavigate();
  const [Categories, setCategories] = useState([]);
  const [Focused, setFocused] = useState(false);
  const [NewsForm, setNewsForm] = useState({
    categoryInp: "",
    category: [],
    showInSlider: false,
    sliderPriority: "",
    publishDateTime: "",
    latestNews: false,
    latestNewsPriority: "",
    file: "",
    aboutImage: "",
    imageSource: "",
    metaTitle: "",
    metaDescription: "",
    hashTags: [],
    shortDescription: "",
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
    hashTags,
    shortDescription,
  } = NewsForm;
  useEffect(() => {
    getCategories();
  }, []);
  const getCategories = async () => {
    const config = {
      headers: {
        token: JSON.parse(localStorage.getItem("accessToken")),
      },
    };
    const { data } = await Axios.get("/category", config);
    setCategories(data);
  };
  const handleSubmit = async (e) => {
    // e.preventDefault();
    // const config = {
    //   headers: {
    //     token: JSON.parse(localStorage.getItem("accessToken")),
    //   },
    // };
    // const { data } = await Axios.post("/news", config);
    // console.log(data);
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
    console.log(e.target.value);
  };
  return (
    <>
      <h2 className={Style.h2}>Add News :- </h2>
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
              <div
                className={Style.searchBox}
                style={{ border: Focused && "0.1em solid rgb(114, 114, 114)" }}
              >
                {Focused &&
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
                    ))}
              </div>
              {/* selected boxes */}
              <div className={Style.selectedBox}>
                {category.map((item) => (
                  <div className={Style.selectedItem}>
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
            {/* Button Group */}
            <div className={Style.btnGroup}>
              {/* Cancel Button */}
              <button
                onClick={() => navigation("/news")}
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
