import { useState, useEffect, use } from "react";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [user, setUser] = useState("");
  const [socketRef, setSocketRef] = useState(null);
  const [messageList, setMessageList] = useState([]);
  const { namespaceId } = useParams();

  useEffect(() => {
    getSocket();
  }, []);

  const getSocket = async () => {
    const socketUrl = `http://localhost:3000/${namespaceId}`;
    const socket = window.io(socketUrl);
    setSocketRef(socket);
    socket.on("chat message", (data) => {
      console.log("message received from server:", data.message);
      messageList.push(data);
      setMessageList([...messageList]);
    });
  };

  console.log("chat rendered");

  return (
    <div className="grid grid-flow-col justify-items-center">
      <div className="m-2">
        <div>
          <Typography variant="h3" align="center" color="#1976d2" gutterBottom>
            /{namespaceId}
          </Typography>
        </div>
        <div className="bg-cyan-100 h-96 w-80">
          <div id="messageScroller">
            {messageList.map((element, index) => {
              if (element.user === user) {
                return (
                  <div
                    className="grid grid-flow-col justify-items-end"
                    key={index}
                  >
                    <p className="bg-amber-100 w-fit m-1 p-1">
                      {element.message}
                    </p>
                  </div>
                );
              } else {
                return (
                  <div className="grid justify-items-start" key={index}>
                    <p className="bg-amber-100 w-fit m-1 p-2">
                      {element.message}
                    </p>
                  </div>
                );
              }
            })}
          </div>
        </div>
        <form id="form" action="">
          <div className="flex flex-col">
            <TextField
              id="outlined-basic"
              label="Your Name"
              variant="outlined"
              value={user}
              onChange={(e) => {
                setUser(e.target.value);
              }}
              sx={{ my: 0.5 }}
            />
            <TextField
              id="outlined-basic"
              label="Message"
              variant="outlined"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              sx={{ my: 0.5 }}
            />
          </div>
        </form>
        <div className="flex">
          <Button
            variant="contained"
            onClick={(e) => {
              if (message && user) {
                console.log("message: ", message);
                socketRef.emit("chat message", {
                  user: user,
                  message: message,
                });
                setMessage("");
              }
            }}
            sx={{ my: 0.5 }}
          >
            SEND
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
