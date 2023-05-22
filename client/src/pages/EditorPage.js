import React, { useState, useRef, useEffect } from "react";
import Client from "../components/Client";
import Editor from "../components/Editor";
import { initSocket } from "../socket";
import { ACTIONS } from "../Actions";
import { useLocation } from "react-router-dom";

const EditorPage = ({ roomId }) => {
  const socketRef = useRef(null);
  const location = useLocation();
  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        userName: location.state?.userName,
      });
    };
    init();
  }, []);

  const [clients, setClients] = useState([
    {
      socketId: 1,
      userName: "Sherry Bing",
    },
    {
      socketId: 2,
      userName: "Ruby Shih",
    },
    {
      socketId: 3,
      userName: "Jone Doe",
    },
  ]);

  return (
    <div className="mainWrap">
      <div className="asid">
        <div className="asidInner">
          <div className="logo">
            <img className="logoImage" src="/code-sync.png" alt="logo" />
          </div>
          <h4>Connected</h4>
          <div className="clientsList">
            {clients.map((client) => (
              <Client key={client.socketId} userName={client.userName} />
            ))}
          </div>
        </div>
        <button className="btn copyBtn">Copy ROOM ID</button>
        <button className="btn leaveBtn">Leave</button>
      </div>
      <div className="editorWrap">
        <Editor />
      </div>
    </div>
  );
};

export default EditorPage;
