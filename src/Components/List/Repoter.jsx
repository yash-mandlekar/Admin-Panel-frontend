import React, { useEffect, useState } from "react";
import Axios from "../Axios/Axios";
import { confirmAlert } from "react-confirm-alert";
const ListComp = React.lazy(() => import("./ListComp"));

const Repoter = () => {
  const [List, setList] = useState([]);
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    GetRepoter();
  }, []);
  const GetRepoter = async () => {
    const config = {
      headers: {
        token: JSON.parse(localStorage.getItem("accessTokenAdmin")),
      },
    };
    const response = await Axios.get("/reporter", config);
    setLoader(false);
    setList(response.data.data);
  };

  const confirmBox = (item, block) => {
    confirmAlert({
      title: `Confirm to ${block ? "Unblock" : "Block"}`,
      message: `Are you sure to ${block ? "Unblock" : "Block"} this Reporter?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => handleBlock(item),
        },
        {
          label: "No",
        },
      ],
    });
  };
  const handleBlock = async (id) => {
    const config = {
      headers: {
        token: JSON.parse(localStorage.getItem("accessTokenAdmin")),
      },
    };
    const response = await Axios.post("/block-user", { user2: id }, config);
    GetRepoter();
  };
  return (
    <ListComp
      List={List}
      loader={loader}
      confirmBox={confirmBox}
      role="Reporters"
    />
  );
};

export default Repoter;
