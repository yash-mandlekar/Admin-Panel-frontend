import React, { useContext, useEffect, useState } from "react";
import Axios from "../Axios/Axios";
import { AuthContext } from "../../App";
import { confirmAlert } from "react-confirm-alert";
import { motion } from "framer-motion";
import { Metronome } from "@uiball/loaders";
const EditCategory = React.lazy(() => import("./AddNewsCat"));
const Alert = React.lazy(() => import("../Alert/Alert"));

const Categories = () => {
  const { userData } = useContext(AuthContext);
  const [loader, setLoader] = useState(true);
  const [ShowForm, setShowForm] = useState(false);
  const [UpdateForm, setUpdateForm] = useState(false);
  const [categories, setcategories] = useState([]);
  const [alert, setalert] = useState({
    show: false,
    message: "",
  });
  const [EditForm, setEditForm] = useState({
    parentCategory: "",
    hindiName: "",
    englishName: "",
    startingAlphabet: "",
    categoryUrl: "",
    sortOrder: "",
    showInChild: "",
    showInMenu: "",
    metaTitle: "",
    metaDescription: "",
    icon: "",
  });
  useEffect(() => {
    showCategoryList();
  }, []);
  const handleEdit = async (item) => {
    setUpdateForm(true);
    setShowForm(true);
    setEditForm(item);
  };
  const showCategoryList = async () => {
    const config = {
      headers: {
        token: JSON.parse(localStorage.getItem("accessTokenAdmin")),
      },
    };
    const res = await Axios.get("/news-category", config);
    setcategories(res.data);
    setLoader(false);
  };
  const handleAdd = (e) => {
    setShowForm(true);
    setUpdateForm(false);
    setEditForm({
      parentCategory: "",
      hindiName: "",
      englishName: "",
      startingAlphabet: "",
      categoryUrl: "",
      sortOrder: "",
      showInChild: "No",
      showInMenu: "",
      metaTitle: "",
      metaDescription: "",
    });
  };
  const updateCategory = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        token: JSON.parse(localStorage.getItem("accessTokenAdmin")),
      },
    };
    const formdata = new FormData();
    EditForm.parentCategory &&
      formdata.append("parentCategory", EditForm.parentCategory);
    formdata.append("hindiName", EditForm.hindiName);
    formdata.append("englishName", EditForm.englishName);
    formdata.append("startingAlphabet", EditForm.startingAlphabet);
    formdata.append("categoryUrl", EditForm.categoryUrl);
    formdata.append("sortOrder", EditForm.sortOrder);
    formdata.append("showInChild", EditForm.showInChild);
    formdata.append("showInMenu", EditForm.showInMenu);
    formdata.append("metaTitle", EditForm.metaTitle);
    formdata.append("metaDescription", EditForm.metaDescription);
    formdata.append("icon", EditForm.icon);
    const res = await Axios.put(
      `/news-category/${EditForm._id}`,
      formdata,
      config
    );
    setShowForm(false);
    setUpdateForm(false);
    showCategoryList();
    setalert({
      show: true,
      message: "Category Updated Successfully",
    });
    setTimeout(() => {
      setalert({
        show: false,
        message: "",
      });
    }, 2000);
  };
  const addCategory = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        token: JSON.parse(localStorage.getItem("accessTokenAdmin")),
      },
    };
    try {
      const formdata = new FormData();
      formdata.append("parentCategory", EditForm.parentCategory);
      formdata.append("hindiName", EditForm.hindiName);
      formdata.append("englishName", EditForm.englishName);
      formdata.append("startingAlphabet", EditForm.startingAlphabet);
      formdata.append("categoryUrl", EditForm.categoryUrl);
      formdata.append("sortOrder", EditForm.sortOrder);
      formdata.append("showInChild", EditForm.showInChild);
      formdata.append(
        "showInMenu",
        EditForm.showInMenu.length > 0 ? "Yes" : "No"
      );
      formdata.append("metaTitle", EditForm.metaTitle);
      formdata.append("metaDescription", EditForm.metaDescription);
      formdata.append("icon", e.target.icon.files[0]);
      const res = await Axios.post("/news-category", formdata, config);
      if (res.data) {
        setShowForm(false);
        setUpdateForm(false);
        setalert({
          show: true,
          message: "Category Added Successfully",
        });
        setTimeout(() => {
          setalert({
            show: false,
            message: "",
          });
        }, 3000);
      }
      setShowForm(false);
      showCategoryList();
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
  const confirmBox = (item) => {
    confirmAlert({
      title: "Confirm to Delete",
      message: "Are you sure to delete this Category?",
      buttons: [
        {
          label: "Yes",
          onClick: () => handleDelete(item),
        },
        {
          label: "No",
        },
      ],
    });
  };
  const handleDelete = async (item) => {
    const config = {
      headers: {
        token: JSON.parse(localStorage.getItem("accessTokenAdmin")),
      },
    };
    await Axios.delete(`/news-category/${item._id}`, config);
    showCategoryList();
    setalert({
      show: true,
      message: "Category Deleted Successfully",
    });
    setTimeout(() => {
      setalert({
        show: false,
        message: "",
      });
    }, 3000);
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: "100%" }}
      transition={{ duration: 0.5 }}
      style={{ width: "100%" }}
    >
      {/* news Categories */}
      <div className="container">
        {alert.show && <Alert message={alert.message} />}
        {!ShowForm && (
          <div className="row">
            <h1 className="display-6">News Categories :- </h1>
            <div className="col-12">
              <div className="col-12">
                <button
                  onClick={() => handleAdd()}
                  className="btn btn-dark  mb-2"
                  title="Add New Category"
                >
                  <i className="bi bi-plus-circle-dotted"> </i>
                  Add Category
                </button>
              </div>
              <div
                className="card showAllFile-container"
                style={{ height: "75vh" }}
              >
                <div className="card-body">
                  <div className="row">
                    <div className="col-12">
                      <div className="table-responsive">
                        {loader ? (
                          <div
                            className="loader"
                            style={{
                              width: "100%",
                              height: "70vh",
                            }}
                          >
                            <Metronome
                              size={60}
                              lineWeight={5}
                              speed={2}
                              color="black"
                            />
                            <p>Loading...</p>
                          </div>
                        ) : (
                          <table className="table table-striped" id="table-1">
                            <thead>
                              <tr>
                                <th className="text-center">S.No</th>
                                <th className="text-center">Category</th>
                                <th className="text-center">Parent</th>
                                <th className="text-center">Category Url</th>
                                <th className="text-center">Sort Order</th>
                                <th className="text-center">Show In Child</th>
                                <th className="text-center">Menu</th>
                                <th className="text-center">Meta Title</th>
                                <th className="text-center">Meta Desc.</th>
                                <th className="text-center">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {categories.length > 0 ? (
                                categories.map((item, index) => (
                                  <tr key={index}>
                                    <td className="align-middle text-center text-break">
                                      {/* image in base 64 */}
                                      <img
                                        src={`data:image/jpeg;base64,${item.icon}`}
                                        alt=""
                                        height={60}
                                      />
                                    </td>
                                    <td className="align-middle text-center text-break">
                                      {item.englishName}
                                    </td>
                                    <td className="align-middle text-center text-break">
                                      {item.parentCategory &&
                                        item.parentCategory.englishName}
                                    </td>
                                    <td className="align-middle text-center text-break">
                                      {item.categoryUrl}
                                    </td>
                                    <td className="align-middle text-center text-break">
                                      {item.sortOrder}
                                    </td>
                                    <td className="align-middle text-center text-break">
                                      {item.showInChild}
                                    </td>
                                    <td className="align-middle text-center text-break">
                                      {item.showInMenu}
                                    </td>
                                    <td className="align-middle text-center text-break">
                                      {item.metaTitle}
                                    </td>
                                    <td className="align-middle text-center text-break">
                                      {item.metaDescription}
                                    </td>
                                    <td className="align-middle text-center text-break">
                                      <button
                                        onClick={() => handleEdit(item)}
                                        className="btn btn-success"
                                      >
                                        <i className="bi bi-pencil-square" />
                                      </button>
                                      <button
                                        onClick={() => confirmBox(item)}
                                        className="btn btn-danger"
                                      >
                                        <i className="bi bi-trash" />
                                      </button>
                                    </td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td colSpan={10} className="text-center">
                                    No Data Found
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {ShowForm && (
          <EditCategory
            EditForm={EditForm}
            setEditForm={setEditForm}
            setShowForm={setShowForm}
            SubmitForm={UpdateForm ? updateCategory : addCategory}
            UpdateForm={UpdateForm}
            addOrUpdate={UpdateForm ? "Update" : "Add"}
            categories={categories}
          />
        )}
      </div>
    </motion.div>
  );
};

export default Categories;
