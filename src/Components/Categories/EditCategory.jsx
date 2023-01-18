import React from "react";

const EditCategory = ({
  EditForm,
  setEditForm,
  setShowForm,
  SubmitForm,
  UpdateForm,
  addOrUpdate,
  categories,
}) => {
  const {
    parentCategory,
    hindiName,
    englishName,
    categoryUrl,
    showInChild,
    metaTitle,
    metaDescription,
    sortOrder,
    showInMenu,
    startingAlphabet,
  } = EditForm;

  const handleChange = (e) => {
    if (e.target.name === "categoryUrl") {
      var text = e.target.value.toLowerCase().split(" ").join("-");
      text = text.replace(/[^a-zA-Z0-9-]/g, "");
      setEditForm({
        ...EditForm,
        [e.target.name]: text,
      });
    } else if (e.target.name === "startingAlphabet") {
      if (e.target.value.length > 0) {
        setEditForm({
          ...EditForm,
          [e.target.name]: e.target.value[0].toUpperCase(),
        });
      } else {
        setEditForm({
          ...EditForm,
          [e.target.name]: e.target.value,
        });
      }
    } else {
      setEditForm({ ...EditForm, [e.target.name]: e.target.value });
    }
  };
  return (
    <>
      <div className="container mt-2">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">{addOrUpdate} Category</h4>
              </div>
              <div className="card-body">
                <form onSubmit={SubmitForm}>
                  {/* parentCategory */}
                  <div className="input-group mb-3 mt-3">
                    <label
                      className="input-group-text"
                      htmlFor="inputGroupSelect01"
                    >
                      Category
                    </label>
                    <select
                      onChange={handleChange}
                      value={parentCategory === null ? "" : parentCategory}
                      name="parentCategory"
                      className="form-select"
                      id="inputGroupSelect01"
                    >
                      <option value="">Select...</option>
                      {categories.map(
                        (item) =>
                          item.parentCategory === null && (
                            <option key={item._id} value={item._id}>
                              {item.englishName}
                            </option>
                          )
                      )}
                    </select>
                  </div>
                  {/* English Name */}
                  <div className="col-md-12 pr-1">
                    <div className="input-group">
                      <span className="input-group-text" id="basic-addon1">
                        English Name
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="English Name"
                        name="englishName"
                        value={englishName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  {/* Hindi Name */}
                  <div className="col-md-12 pr-1 mb-3 mt-3">
                    <div className="input-group">
                      <span className="input-group-text" id="basic-addon1">
                        Hindi Name
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Hindi Name"
                        name="hindiName"
                        value={hindiName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  {/* Starting Alphabet */}
                  <div className="col-md-12 pr-1 mb-3 mt-3">
                    <div className="input-group">
                      <span className="input-group-text" id="basic-addon1">
                        Starting Alphabet
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Starting Alphabet"
                        name="startingAlphabet"
                        value={startingAlphabet}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  {/* Category Url */}
                  <div className="col-md-12 pr-1 mb-3 mt-3">
                    <div className="input-group">
                      <span className="input-group-text" id="basic-addon1">
                        Category Url
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Category Url"
                        name="categoryUrl"
                        value={categoryUrl}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  {/* Sort Order */}
                  <div className="col-md-12 pr-1 mb-3 mt-3">
                    <div className="input-group">
                      <span className="input-group-text" id="basic-addon1">
                        Sort Order
                      </span>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Sort Order"
                        name="sortOrder"
                        value={sortOrder}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  {/* show In Child */}
                  <div className="input-group mb-3 mt-3">
                    <label
                      className="input-group-text"
                      htmlFor="inputGroupSelect01"
                    >
                      Show in Child
                    </label>
                    <select
                      onChange={handleChange}
                      value={showInChild}
                      name="showInChild"
                      className="form-select"
                      id="inputGroupSelect02"
                    >
                      <option value="No">No</option>
                      <option value="Yes">Yes</option>
                    </select>
                  </div>
                  {/* Menu */}
                  <div className="col-md-12 pr-1 mb-3 mt-3">
                    <div className="input-group">
                      <label
                        className="input-group-text"
                        htmlFor="inputGroupSelect01"
                      >
                        Menu
                      </label>
                      <select
                        onChange={handleChange}
                        value={showInMenu}
                        name="showInMenu"
                        className="form-select"
                        id="inputGroupSelect02"
                      >
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>
                      </select>
                    </div>
                  </div>
                  {/* Meta Title */}
                  <div className="col-md-12 pr-1 mb-3 mt-3">
                    <div className="input-group">
                      <span className="input-group-text" id="basic-addon1">
                        Meta Title
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Meta Title"
                        name="metaTitle"
                        value={metaTitle}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  {/* Meta Desc */}
                  <div className="col-md-12 pr-1 mb-3 mt-3">
                    <div className="input-group">
                      <span className="input-group-text" id="basic-addon1">
                        Meta Description
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Meta Description"
                        name="metaDescription"
                        value={metaDescription}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  {/* Buttons */}
                  <div className="row mt-2">
                    <div className="update ml-auto mr-auto">
                      <button
                        type="button"
                        className="btn mx-1 btn-danger btn-round"
                        onClick={() => setShowForm(false)}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="btn mx-1 btn-dark btn-round"
                      >
                        {UpdateForm ? "Update Category" : "Add Category"}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditCategory;
