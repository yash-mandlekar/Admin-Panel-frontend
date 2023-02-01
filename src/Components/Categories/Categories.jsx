import React, { useEffect, useState } from "react";
import Axios from "../Axios/Axios";
import { confirmAlert } from "react-confirm-alert";
import { motion } from "framer-motion";
import { Metronome } from "@uiball/loaders";
const EditCategory = React.lazy(() => import("./EditCategory"));
const Alert = React.lazy(() => import("../Alert/Alert"));

const Categories = () => {
  const [ShowForm, setShowForm] = useState(false);
  const [loader, setloader] = useState(true);
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
    const res = await Axios.get("/category", config);
    setloader(false);
    setcategories(res.data);
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
    const res = await Axios.put(
      `/category/${EditForm._id}`,
      {
        parentCategory: EditForm.parentCategory,
        hindiName: EditForm.hindiName,
        englishName: EditForm.englishName,
        startingAlphabet: EditForm.startingAlphabet,
        categoryUrl: EditForm.categoryUrl,
        sortOrder: EditForm.sortOrder,
        showInChild: EditForm.showInChild,
        showInMenu: EditForm.showInMenu,
        metaTitle: EditForm.metaTitle,
        metaDescription: EditForm.metaDescription,
      },
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
      const res = await Axios.post("/category", EditForm, config);
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
    await Axios.delete(`/category/${item._id}`, config);
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
            <h1 className="display-6">Categories :- </h1>
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
              <div className="card">
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
                                      {index + 1}
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
                                  <td colSpan="10" className="text-center">
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
