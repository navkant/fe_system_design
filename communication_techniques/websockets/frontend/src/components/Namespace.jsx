import { useEffect } from "react";
import axios from "axios";

const Namespace = () => {
  useEffect(() => {
    fetchNamesapace();
  }, []);

  const fetchNamesapace = async () => {
    const payload = { nsp: "newspace2" };
    const res = await axios.post("http://localhost:3000/namespace/", payload);
    console.log(res);
  };
  return <div>Namespace Component</div>;
};

export default Namespace;
