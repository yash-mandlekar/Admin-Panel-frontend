import React, { useEffect, useState } from "react";
import Axios from "../Axios/Axios";
import { confirmAlert } from "react-confirm-alert";
const ListComp = React.lazy(() => import("./ListComp"));

const Editor = () => {
  const [List, setList] = useState([]);
  const [loader, setLoader] = useState(true);
  const GetEditor = async () => {
    const config = {
      headers: {
        token: JSON.parse(localStorage.getItem("accessTokenAdmin")),
      },
    };
    const response = await Axios.get("/editor", config);
    setList(response.data.data);
    setLoader(false);
  };
  useEffect(() => {
    GetEditor();
  }, []);

  const confirmBox = (item, block) => {
    confirmAlert({
      title: `Confirm to ${block ? "Unblock" : "Block"}`,
      message: `Are you sure to ${block ? "Unblock" : "Block"} this Editor?`,
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
    GetEditor();
  };
  return (
    <ListComp
      List={List}
      loader={loader}
      confirmBox={confirmBox}
      role="Editors"
    />
  );
};

export default Editor;
