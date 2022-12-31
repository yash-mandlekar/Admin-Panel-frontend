import React, { useContext, useEffect, useState } from "react";
import Axios from "../Axios/Axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../App";
import { motion } from "framer-motion";
import { Metronome } from "@uiball/loaders";

const FolderManage = () => {
  const navigate = useNavigate();
  const { userData } = useContext(AuthContext);
  const [loader, setLoader] = useState(true);
  const [folderInput, setfolderInput] = useState("");
  const [dropdown, setdropdown] = useState({
    status: false,
    id: null,
    edit: false,
  });
  const [folders, setfolders] = useState([]);
  const ShowFolder = async (id) => {
    const config = {
      headers: {
        token: JSON.parse(localStorage.getItem("accessTokenAdmin")),
      },
    };
    const res = await Axios.get("/folder", config);
    setLoader(false);
    setfolders(res.data);
  };
  useEffect(() => {
    ShowFolder();
  }, []);
  const handleOpenFolder = (id) => {
    navigate(`/admin/folder/${id}`);
  };
  const handleAddFolder = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        token: JSON.parse(localStorage.getItem("accessTokenAdmin")),
      },
    };
    await Axios.post(
      "/folder",
      { folderName: folderInput, user_id: userData._id },
      config
    );
    setfolderInput("");
    ShowFolder();
  };
  const handleDeleteFolder = async (id) => {
    const config = {
      headers: {
        token: JSON.parse(localStorage.getItem("accessTokenAdmin")),
      },
    };
    const res = await Axios.delete("/folder/", {
      data: { folderId: id },
      headers: config.headers,
    });
    ShowFolder();
    setdropdown({ status: false, id: null, edit: false });
    setfolders(folders.filter((folder) => folder._id !== id));
  };
  const ChangeFolderName = async (e, id) => {
    e.preventDefault();
    const config = {
      headers: {
        token: JSON.parse(localStorage.getItem("accessTokenAdmin")),
      },
    };
    await Axios.put(
      "/folder/",
      { folderId: id, folderName: e.target.folderName.value },
      { headers: config.headers }
    );
    setdropdown({ status: false, id: null, edit: false });
    setfolders(
      folders.map((folder) => {
        if (folder._id === id) {
          folder.folderName = e.target.folderName.value;
        }
        return folder;
      })
    );
  };
  const handleEditFolder = async (id) => {
    setdropdown({ status: false, id: id, edit: true });
  };
  const handleInput = (e) => {
    setfolderInput(e.target.value);
  };
  const handleContextMenu = (e, id) => {
    e.preventDefault();
    setdropdown({ status: true, id: id, edit: false });
  };
  const handleDropdown = (e) => {
    e.preventDefault();
    if (
      e.target.className !== "dropdown-item" &&
      e.target.name !== "folderName" &&
      e.target.id !== dropdown.id
    ) {
      setdropdown({ status: false, id: null, edit: false });
    }
  };
  return (
    <>
      <motion.div
        onClick={handleDropdown}
        className="container-fluid mt-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: "100%" }}
        transition={{ duration: 0.5 }}
      >
        <div className="row">
          <div className="col-12">
            <div className="card ">
              <div className="card-header">
                <h3 className="card-title">Folder Management</h3>
              </div>
              <div
                className="modal fade"
                id="exampleModal"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">
                        Folder Name
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <div className="form-group">
                        <input
                          onChange={handleInput}
                          value={folderInput}
                          type="text"
                          className="form-control"
                          placeholder="Folder name"
                          id="foldername"
                          name="foldername"
                        />
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button
                        type="submit"
                        onClick={handleAddFolder}
                        className="btn btn-dark"
                        data-bs-dismiss="modal"
                      >
                        Create Folder
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* show folders like windows */}
              <div className="card-body ">
                <div className="row ">
                  <div className="col-12 px-2 ">
                    <div
                      className="folder-container showAllFile-container"
                      style={{ maxHeight: "78vh" }}
                    >
                      {/* Add new Folder */}
                      <div className="folder">
                        <button
                          type="button"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                        >
                          <div className="folder-icon">
                            <i className="bi bi-folder-plus"></i>
                          </div>
                          <span>Create</span>
                        </button>
                      </div>
                      {loader ? (
                        <div
                          className="loader"
                          style={{
                            width: "80vw",
                            height: "15vh",
                          }}
                        >
                          <Metronome
                            size={40}
                            lineWeight={5}
                            speed={2}
                            color="black"
                          />
                          <p>Loading...</p>
                        </div>
                      ) : (
                        folders.map((folder) => (
                          <div
                            key={folder._id}
                            className="folder"
                            onContextMenu={(e) =>
                              handleContextMenu(e, folder._id)
                            }
                            onDoubleClick={() => handleOpenFolder(folder._id)}
                          >
                            <i
                              id={folder._id}
                              className="bi bi-folder-fill"
                            ></i>
                            <div className="folder-name">
                              {dropdown.id === folder._id && dropdown.edit ? (
                                <form
                                  onSubmit={(e) =>
                                    ChangeFolderName(e, folder._id)
                                  }
                                >
                                  <input
                                    type="text"
                                    name="folderName"
                                    defaultValue={folder.folderName}
                                  />
                                </form>
                              ) : (
                                <span>{folder.folderName}</span>
                              )}
                            </div>
                            <span
                              style={{
                                color: "grey",
                                fontSize: "10px",
                                textAlign: "center",
                              }}
                            >
                              by: {folder.author.username}
                            </span>
                            {/* dropdown menu */}
                            {dropdown.status && dropdown.id === folder._id && (
                              <div
                                className="dropdown-menu"
                                style={{ display: "block" }}
                              >
                                <button
                                  className="dropdown-item"
                                  onClick={() => handleEditFolder(folder._id)}
                                >
                                  Edit
                                </button>
                                <button
                                  className="dropdown-item"
                                  onClick={() => handleDeleteFolder(folder._id)}
                                >
                                  Delete
                                </button>
                              </div>
                            )}
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default FolderManage;
