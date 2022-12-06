import { useEffect, useState } from "react";
import Axios from "../Axios/Axios";
import { confirmAlert } from "react-confirm-alert";
import ListComp from "./ListComp";

const SeniorEditor = () => {
  const [List, setList] = useState([]);
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    GetSeniorEditor();
  }, []);
  const GetSeniorEditor = async () => {
    const config = {
      headers: {
        token: JSON.parse(localStorage.getItem("accessToken")),
      },
    };
    const response = await Axios.get("/senior-editor", config);
    setList(response.data.data);
    setLoader(false);
  };

  const confirmBox = (item, block) => {
    confirmAlert({
      title: `Confirm to ${block ? "Unblock" : "Block"}`,
      message: `Are you sure to ${
        block ? "Unblock" : "Block"
      } this Senior Editor?`,
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
    GetSeniorEditor();
  };
  return (
    <ListComp
      List={List}
      loader={loader}
      confirmBox={confirmBox}
      role="Senior Editors"
    />
  );
};

export default SeniorEditor;
