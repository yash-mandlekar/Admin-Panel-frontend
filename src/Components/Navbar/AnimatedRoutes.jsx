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
import Users from "../List/Users";
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
        <Route path="/" element={<Home />} />
        <Route path="/channel" element={<Channel />} />
        <Route path="/folderManagement" element={<FolderManage />} />
        <Route path="/folder/:id" element={<VideoData />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/news-categories" element={<NewsCat />} />
        <Route path="/profile/:id" element={<UserProfile />} />
        <Route path="/userprofile/:id" element={<AppUser />} />
        <Route path="/requests" element={<Requests />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/news">
          <Route index element={<News />} />
          <Route path=":id" element={<SingleNews />} />
          <Route path="new" element={<AddNews />} />
          <Route path="edit/:id" element={<EditNews />} />
        </Route>
        <Route path="/e-paper">
          <Route index element={<EPaper />} />
          <Route path="new" element={<AddEPaper />} />
          <Route path=":id" element={<EditEPaper />} />
        </Route>
        <Route path="/cordinates">
          <Route index element={<Cordinates />} />
          <Route path="new" element={<AddCordinates />} />
          <Route path=":id" element={<EditCordinates />} />
        </Route>
        <Route path="/users" element={<Users />} />
        <Route path="/register" element={<Register />} />
        <Route path="/seniorEditor" element={<SeniorEditor />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/repoter" element={<Repoter />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
