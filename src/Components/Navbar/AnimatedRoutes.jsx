import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "../Home/Home";
import Channel from "../Channel/Channel";
import Profile from "../Profile/Profile";
import UserProfile from "../Profile/UserProfile";
import AppUser from "../Profile/AppUser";
import FolderManage from "../FolderManage/FolderManage";
import VideoData from "../FolderManage/SingleFolder";
import SeniorEditor from "../List/SeniorEditor";
import Users from "../Users/Users";
import Editor from "../List/Editor";
import Repoter from "../List/Repoter";
import { AnimatePresence } from "framer-motion";
import Register from "../List/Register";
import Requests from "../Requests/Requests";
import Categories from "../Categories/Categories";
import NewsCat from "../NewsCategories/NewsCat";
import News from "../News/News";
import SingleNews from "../News/SingleNews";
import AddNews from "../News/AddNews";
import EPaper from "../E-Paper/EPaper";
import AddEPaper from "../E-Paper/AddEPaper";
import EditEPaper from "../E-Paper/EditEPaper";
import Cordinates from "../Cordinates/Cordinates";
import AddCordinates from "../Cordinates/AddCordinates";
import EditCordinates from "../Cordinates/EditCordinates";
import EditNews from "../News/EditNews";
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/admin" element={<Home />} />
        <Route path="/admin/channel" element={<Channel />} />
        <Route path="/admin/folderManagement" element={<FolderManage />} />
        <Route path="/admin/folder/:id" element={<VideoData />} />
        <Route path="/admin/profile" element={<Profile />} />
        <Route path="/admin/news-categories" element={<NewsCat />} />
        <Route path="/admin/profile/:id" element={<UserProfile />} />
        <Route path="/admin/userprofile/:id" element={<AppUser />} />
        <Route path="/admin/requests" element={<Requests />} />
        <Route path="/admin/categories" element={<Categories />} />
        <Route path="/admin/news">
          <Route index element={<News />} />
          <Route path=":id" element={<SingleNews />} />
          <Route path="new" element={<AddNews />} />
          <Route path="edit/:id" element={<EditNews />} />
        </Route>
        <Route path="/admin/e-paper">
          <Route index element={<EPaper />} />
          <Route path="new" element={<AddEPaper />} />
          <Route path=":id" element={<EditEPaper />} />
        </Route>
        <Route path="/admin/cordinates">
          <Route index element={<Cordinates />} />
          <Route path="new" element={<AddCordinates />} />
          <Route path=":id" element={<EditCordinates />} />
        </Route>
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/register" element={<Register />} />
        <Route path="/admin/seniorEditor" element={<SeniorEditor />} />
        <Route path="/admin/editor" element={<Editor />} />
        <Route path="/admin/repoter" element={<Repoter />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
