import React, { useContext, useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import axios from "axios";
import DataTable from "../DataTable";
import { dataValue } from "../header/Header";

const Azurecomp = (props) => {
  const url =
    "https://management.azure.com/subscriptions?api-version=2020-01-01";
  const [resourceGroup, setResourceGroup] = useState([]);
  const [subscription, setSubscription] = useState([]);
  const [resourceName, setResourceName] = useState("");
  const [tableData, setTableData] = useState([]);
  const { list, rowData, columnData } = props;
  const [rowDataAzure, setRowDataAzure] = useState([]);

  useEffect(() => {
    setSubscription(JSON.parse(localStorage.getItem("resourceList")));
  },[tableData]);

  useEffect(() => {
    const newRow = JSON.parse(localStorage.getItem("ResourceItems"));
    setResourceGroup(JSON.parse(localStorage.getItem("resourceGroup")));

    const items =
      newRow != null &&
      newRow.map((items, index) => {
        return {
          id: index + 1,
          Name: items.name,
          Type: items.type,
          Location: items.location,
          Status: items.type.split("/").includes("virtualMachines")
            ? localStorage.getItem(`${items.name}`)
            : "",
        };
      });
      setRowDataAzure(items);
  },[rowDataAzure, resourceGroup])

  const handleResource = (e) => {
    setResourceName(e.target.value);
    localStorage.setItem('groupSelected', e.target.value);
  };

  const handleSearch = async() => {
    const subId = JSON.parse(localStorage.getItem("resourceList"))[0]
      .subscriptionId;
    await axios
      .get(
        `https://management.azure.com/subscriptions/${subId}/resourceGroups/${resourceName}/resources?api-version=2021-04-01`,
        { headers: { Authorization: localStorage.getItem("Token") } }
      )
      .then((res) => {
        localStorage.setItem('ResourceItems', JSON.stringify(res.data.value));
      });
  };

  return (
    <div className="row">
      <div className="col-md-2 inp-field">
        <InputLabel>Select Subscripton</InputLabel>
        <select
          name="subscription"
          id="subscription"
          defaultValue="Brllio MPN"
          style={{ width: "200px", padding: "7px", borderRadius: "10px" }}
        >
          {subscription != null &&
            subscription.map((data) => (
              <option value={data.value}>{data.displayName}</option>
            ))}
        </select>
      </div>
      <div className="col-md-2 inp-field">
        <InputLabel>Select Resource Group</InputLabel>
        <select
          name="cloud"
          id="cloud"
          // value={resourceName}
          style={{ width: "160px", padding: "7px", borderRadius: "10px" }}
          onChange={handleResource}
        >
          {resourceGroup != null && resourceGroup.map((resources) => (
            <option value={resources.name}>{resources.name}</option>
          ))}
        </select>
      </div>
      <div className="col-md-2 inp-field">
        <button
          style={{
            width: "120px",
            padding: "7px",
            borderRadius: "18px",
            backgroundColor: "green",
            color: "white",
            position: "relative",
            top: 20,
          }}
          onClick={handleSearch}
        >
          <i class="fa-solid fa-magnifying-glass"></i>
          Search
        </button>
      </div>
      <div className="container mt-5">
        <DataTable columns={columnData} rows={rowDataAzure} />
      </div>
    </div>
  );
};

export default Azurecomp;
