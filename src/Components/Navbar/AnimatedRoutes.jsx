import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

const Home = React.lazy(() => import("../Home/Home"));
const Channel = React.lazy(() => import("../Channel/Channel"));
const Profile = React.lazy(() => import("../Profile/Profile"));
const UserProfile = React.lazy(() => import("../Profile/UserProfile"));
const AppUser = React.lazy(() => import("../Profile/AppUser"));
const FolderManage = React.lazy(() => import("../FolderManage/FolderManage"));
const VideoData = React.lazy(() => import("../FolderManage/SingleFolder"));
const SeniorEditor = React.lazy(() => import("../List/SeniorEditor"));
const Users = React.lazy(() => import("../Users/Users"));
const Editor = React.lazy(() => import("../List/Editor"));
const Repoter = React.lazy(() => import("../List/Repoter"));
const Register = React.lazy(() => import("../List/Register"));
const Requests = React.lazy(() => import("../Requests/Requests"));
const Categories = React.lazy(() => import("../Categories/Categories"));
const NewsCat = React.lazy(() => import("../NewsCategories/NewsCat"));
const News = React.lazy(() => import("../News/News"));
const SingleNews = React.lazy(() => import("../News/SingleNews"));
const AddNews = React.lazy(() => import("../News/AddNews"));
const EPaper = React.lazy(() => import("../E-Paper/EPaper"));
const AddEPaper = React.lazy(() => import("../E-Paper/AddEPaper"));
const EditEPaper = React.lazy(() => import("../E-Paper/EditEPaper"));
const Cordinates = React.lazy(() => import("../Cordinates/Cordinates"));
const AddCordinates = React.lazy(() => import("../Cordinates/AddCordinates"));
const EditCordinates = React.lazy(() => import("../Cordinates/EditCordinates"));
const EditNews = React.lazy(() => import("../News/EditNews"));
const Ads = React.lazy(() => import("../Ads/Ads"));
const AddAds = React.lazy(() => import("../Ads/AddAds"));
const EditAds = React.lazy(() => import("../Ads/EditAds"));
const UserNews = React.lazy(() => import("../UserNews/UserNews"));

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
        <Route path="/admin/usernews" element={<UserNews />} />
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
        <Route path="/admin/ads">
          <Route index element={<Ads />} />
          <Route path="new" element={<AddAds />} />
          <Route path=":id" element={<EditAds />} />
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
