import { useContext, useEffect, useState } from "react";
import Axios from "../Axios/Axios";
import { AuthContext } from "../../App";
import { confirmAlert } from "react-confirm-alert";
import ListComp from "./ListComp";

const Editor = () => {
  const [List, setList] = useState([]);

  const GetEditor = async () => {
    const config = {
      headers: {
        token: JSON.parse(localStorage.getItem("accessToken")),
      },
    };
    const response = await Axios.get("/editor", config);
    setList(response.data.data);
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
        token: JSON.parse(localStorage.getItem("accessToken")),
      },
    };
    const response = await Axios.post("/block-user", { user2: id }, config);
    GetEditor();
  };
  return <ListComp List={List} confirmBox={confirmBox} role="Editors" />;
};

export default Editor;
