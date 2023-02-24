import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useParams } from "react-router-dom";
import { ZegoExpressEngine } from "zego-express-engine-webrtc";
import Axios from "../Axios/Axios";
import "./WatchLive.css";

const WatchLive = () => {
  const videoRef = useRef(null);
  const { roomId } = useParams();
  const zg = new ZegoExpressEngine(
    628726461,
    "wss://webliveroom628726461-api.coolzcloud.com/ws"
  );
  zg.on("playerStateUpdate", (roomID, state, errorCode, extendedData) => {
    console.log(
      "%croomID ",
      "color: black;background-color: yellow;font-size: 30px;"
    );
    console.log(roomID);
    console.log(
      "%croomID ",
      "color: black;background-color: yellow;font-size: 30px;"
    );
  });

  useEffect(() => {
    showLive();
  }, []);
  const showLive = async () => {
    const { data } = await Axios.get(`/user/zego/token/${"lolo"}`);
    const result = await zg.loginRoom(
      roomId,
      data.token,
      { userID: "lolo", userName: "lolo" },
      { userUpdate: true }
    );
    const remoteStream = await zg.startPlayingStream(roomId);
    videoRef.current.srcObject = remoteStream;
  };
  return (
    <div
      className="liveuservideo"
      style={{
        marginTop: "10vh",
      }}
    >
      <video autoPlay={true} ref={videoRef}></video>
    </div>
  );
};

export default WatchLive;
