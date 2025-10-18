import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import NameSpaceCard from "./NameSpaceCard";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

const Home = () => {
  const [namespaceList, setNameSpaceList] = useState([]);
  const [namespace, setNamespace] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    console.log("use effect called");
    fetchNamesapace();
    return () => {
      console.log("cleanup in home");
    };
  }, [render]);

  const createNamespace = async (namespace) => {
    const payload = { nsp: namespace };
    await axios
      .post("http://localhost:3000/namespace/", payload)
      .then(async (res) => {
        console.log("namespace created", res);
        fetchNamesapace();
      })
      .catch((err) => {
        console.log("error in creating namespace", err.response.data);
        console.log("error message", err);
        setErrorMessage(err.response.data.message);
        setTimeout(() => {
          setErrorMessage("");
        }, 2000);
      });
  };

  const fetchNamesapace = async () => {
    const payload = { nsp: "newspace" };
    const res = await axios.get("http://localhost:3000/namespace", payload);
    const result = res.data.namespaces;
    setNameSpaceList(result);
  };

  console.log("home rendered");

  return (
    <div className="grid grid-flow-col justify-items-center">
      <div className="m-6">
        <div>
          <Typography variant="h3" align="center" color="#1976d2" gutterBottom>
            Select Your namaespace
          </Typography>
        </div>
        <div>
          {namespaceList.length ? (
            namespaceList.map((nsp) => {
              return (
                <Link
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  key={nsp}
                  to={`/chat/${nsp.slice(1)}`}
                >
                  <NameSpaceCard
                    key={nsp}
                    nspInfo={{ namespaceId: nsp.slice(1) }}
                  />
                </Link>
              );
            })
          ) : (
            <div>
              <div>
                <h1></h1>
              </div>
              <div>
                <div>
                  <Typography
                    variant="h6"
                    align="center"
                    color="#1976d2"
                    gutterBottom
                  >
                    No namespace created yet Create one here
                  </Typography>
                </div>
              </div>
            </div>
          )}
          {errorMessage ? <h1>{errorMessage}</h1> : ""}
          <div>
            <div>
              <TextField
                id="outlined-basic"
                label="name your space"
                variant="outlined"
                value={namespace}
                onChange={(e) => {
                  setNamespace(e.target.value);
                }}
                sx={{ my: 0.5 }}
              />
            </div>
            <div>
              <Button
                variant="contained"
                onClick={(e) => {
                  if (namespace) {
                    createNamespace(namespace);
                  }
                }}
                sx={{ my: 0.5 }}
              >
                create
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
