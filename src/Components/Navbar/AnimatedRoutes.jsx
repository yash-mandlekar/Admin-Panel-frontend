import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "../Home/Home";
import Channel from "../Channel/Channel";
import Profile from "../Profile/Profile";
import UserProfile from "../Profile/UserProfile";
import FolderManage from "../FolderManage/FolderManage";
import VideoData from "../FolderManage/SingleFolder";
import SeniorEditor from "../List/SeniorEditor";
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
        <Route path="/requests" element={<Requests />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/news">
          <Route index element={<News />} />
          <Route path=":id" element={<SingleNews />} />
          <Route path="new" element={<AddNews />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/seniorEditor" element={<SeniorEditor />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/repoter" element={<Repoter />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
