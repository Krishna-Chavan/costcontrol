import React from "react";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import axios from "axios";


export default function Header() {
  const url =
    "https://management.azure.com/subscriptions?api-version=2020-01-01";
  const { instance } = useMsal();
  const isAuthenticated  = useIsAuthenticated();

  const handleLogin = async() => {
    await axios
      .get("http://localhost:3001/subsList")
      .then((res) => {
        let Bearer = `Bearer ${res.data}`;
        localStorage.setItem("Token", Bearer);
        axios
          .get(url, { headers: { Authorization: Bearer } })
          .then((res) => {
            localStorage.setItem(
              "resourceList",
              JSON.stringify(res.data.value)
            );
            axios
      .get(
        `https://management.azure.com/subscriptions/${res.data.value[0].subscriptionId}/resourcegroups?api-version=2021-04-01`,
        { headers: { Authorization: Bearer } }
      )
      .then((res) => {
        localStorage.setItem("resourceGroup", JSON.stringify(res.data.value));
      })
      .catch((err) => console.log(err));
          })
          .catch((err) => console.info("error in subsList", err));
        })
        .catch((err) => console.log("error", err));
        debugger;
        instance.loginRedirect({
      scopes: ["user.read"],
    });
  };

  const handleSignOut = () => {
    instance.logoutRedirect();
    localStorage.clear();
  };

  return (
    <>
      <div
        class="container-fluid"
        style={{ backgroundColor: "lightseagreen", padding: "10px" }}
      >
        <span style={{ fontSize: 25 }}>
          bri!!io <b style={{ color: "green" }}>one.</b>
          <b>
            <i>ai</i>
          </b>
        </span>
        {!isAuthenticated ? (
          <button
            color="inherit"
            variant="outlined"
            onClick={handleLogin}
            style={{ position: "absolute", right: 20 }}
          >
            SignIn
          </button>
        ) : (
          <button
            color="inherit"
            variant="outlined"
            onClick={handleSignOut}
            style={{ position: "absolute", right: 20 }}
          >
            Sign Out
          </button>
        )}
      </div>
      <div
        style={{
          backgroundColor: "whitesmoke",
          padding: 10,
          boxShadow: "0px 0px 5px",
        }}
      >
        <span style={{ fontSize: 20 }}>
          <i
            class="fa-solid fa-house-chimney"
            style={{ marginRight: "10px", position: "relative", left: 30 }}
          ></i>
          &nbsp;&nbsp;&nbsp;&nbsp;/ Cost Control
        </span>
      </div>
    </>
  );
}
