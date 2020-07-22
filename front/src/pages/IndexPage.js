import React from "react";
import{useHistory}from 'react-router-dom'
const IndexPage = () => {
  const history=useHistory()
  React.useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    console.log(token);
    if (!token) {
      history.push("/login");
    } else {
      history.push("/dashboard");
    }
    // eslint-disable-next-line
  }, [0]);
  return <div></div>;
};

export default IndexPage;