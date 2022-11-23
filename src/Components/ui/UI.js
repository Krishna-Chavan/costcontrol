import React, { useEffect, useState } from "react";
import Azurecomp from "../Azure/Azurecomp";
import Awscomp from "../AWS/Awscomp";
import DataTable from "../DataTable";
import { Card } from "@mui/material";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import "./UI.css";
import DialogBox from "../Dialog/DialogBox";
import axios from "axios";
import DialogStartStop from "../Dialog/dialogStartStop";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";

export default function UI() {
  const url =
    "https://management.azure.com/subscriptions?api-version=2020-01-01";

  const [cloudName, setCloudName] = useState("AZURE");
  const [open, setOpen] = React.useState(false);

  const [subscriptionAzure, setSubscriptionAzure] = useState([]);
  const [statusVM, setStatusVM] = useState([]);
  const [openStartStopDialog, setOpenStartStopDialog] = useState(false);
  const [resourceNameOnClick, setResourceNameOnClick] = useState("");
  const isAuthenticated = useIsAuthenticated();
  const { instance } = useMsal();

  useEffect(() => {
    status();
  }, [resourceNameOnClick]);

  // const handleLinkClick = () => {
  //   axios
  //     .get("http://localhost:3001/subsList")
  //     .then((res) => {
  //       // setAccessToken(res.data)
  //       let Bearer = `Bearer ${res.data}`;
  //       localStorage.setItem("Token", Bearer);
  //       axios
  //         .get(url, { headers: { Authorization: Bearer } })
  //         .then((res) => {
  //           localStorage.setItem(
  //             "resourceList",
  //             JSON.stringify(res.data.value)
  //           );
  //           axios
  //     .get(
  //       `https://management.azure.com/subscriptions/${res.data.value[0].subscriptionId}/resourcegroups?api-version=2021-04-01`,
  //       { headers: { Authorization: Bearer } }
  //     )
  //     .then((res) => {
  //       localStorage.setItem("resourceGroup", JSON.stringify(res.data.value));
  //     })
  //     .catch((err) => console.log(err));
  //         })
  //         .catch((err) => console.info("error in subsList", err));
  //     })
  //     .catch((err) => console.log("error", err));
  //   instance.loginRedirect({
  //     scopes: ["user.read"],
  //   });
  // };

  const handleCloudChange = (e) => {
    setCloudName(e.target.value);
  };

  const startStopCancel = () => {
    setOpenStartStopDialog(false);
  };
  const handleSchedulerClick = (params) => {
    setOpen(true);
    setResourceNameOnClick(params.row.Name);
  };

  const startStopAgree = async () => {
    let urlStart;
    const reourceItems = JSON.parse(localStorage.getItem("ResourceItems"));
    const resources = JSON.parse(localStorage.getItem("resourceList"));
    let groupName = localStorage.getItem("groupSelected");

    reourceItems != null &&
      (await reourceItems.map((items, index) => {
        if (items.type.split("/").includes("virtualMachines")) {
          if (statusVM !== "VM stopped") {
            urlStart = `https://management.azure.com/subscriptions/${resources[0].subscriptionId}/resourceGroups/${groupName}/providers/Microsoft.Compute/virtualMachines/${resourceNameOnClick}/poweroff?api-version=2022-08-01`;
          }
          if (statusVM === "VM stopped" || statusVM === "VM deallocated" || statusVM === "VM stopping") {
            urlStart = `https://management.azure.com/subscriptions/${resources[0].subscriptionId}/resourceGroups/${groupName}/providers/Microsoft.Compute/virtualMachines/${resourceNameOnClick}/start?api-version=2022-08-01`;
          }
          axios({
            method: "post", //you can set what request you want to be
            url: urlStart,
            headers: {
              Authorization: localStorage.getItem("Token"),
            },
          })
        }
      }));
    setOpenStartStopDialog(false);
  };

  const handleCancelDialog = () => {
    setOpen(false);
  };

  const handleJobSchedule = () => {
    const id = JSON.parse(localStorage.getItem("resourceList"));
    axios.post("http://localhost:3001/sendJobData", {
      startDateTime: localStorage.getItem("Start"),
      endDateTime: localStorage.getItem("End"),
      subscriptionId: id[0].subscriptionId,
      vmName: resourceNameOnClick,
      groupSelected: localStorage.getItem("groupSelected"),
      status: localStorage.getItem(`${resourceNameOnClick}`),
    });
    setOpen(false);
  };

  const handleStartStop = (params) => {
    setResourceNameOnClick(params.row.Name);
    setOpenStartStopDialog(true);
  };

  const getResourceName = () => {
    const resourceList = JSON.parse(localStorage.getItem("ResourceItems"));
    if (resourceList != null) {
      const type =
        resourceList != null &&
        resourceList.map((list) => {
          if (list.type.split("/").includes("virtualMachines")) {
            return list.name;
          }
        });
      const name = type.filter((items) => {
        if (items !== undefined) return items;
      });

      return name;
    }
  };

  const status = () => {
    const resourceList = JSON.parse(localStorage.getItem("ResourceItems"));
    const list = JSON.parse(localStorage.getItem("resourceList"));
    const groupSelected = localStorage.getItem("groupSelected");
    const vmName = getResourceName();
    if (resourceList != null) {
      const type =
        resourceList != null &&
        resourceList.map((list) => {
          return list.type;
        });
      if (type != null) {
        const typeName = type.map((name) => {
          return name.split("/");
        });
        typeName.map((types) => {
          if (types.includes("virtualMachines")) {
            vmName.map((name) => {
              axios
                .get(
                  `https://management.azure.com/subscriptions/${list[0] !=
                    null &&
                    list[0]
                      .subscriptionId}/resourceGroups/${groupSelected}/providers/Microsoft.Compute/virtualMachines/${name}/instanceView?api-version=2022-03-01`,
                  {
                    headers: {
                      Authorization: `${localStorage.getItem("Token")}`,
                    },
                  }
                )
                .then((res) => {
                  setStatusVM(res.data.statuses[1].displayStatus);
                  localStorage.setItem(
                    `${name}`,
                    res.data.statuses[1].displayStatus
                  );
                });
            });
          }
        });
      }
    }
  };

  const columnsAzure = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "Name", headerName: "Resource Name", width: 330 },
    { field: "Type", headerName: "Resource Type", width: 330 },
    { field: "Location", headerName: "Location", width: 110 },
    {
      field: "Status",
      headerName: "Status",
      width: 110,
    },
    {
      field: "action",
      headerName: "Action",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 80,
      renderCell: (params) => {
        return (
          <div style={{ cursor: "pointer" }}>
            <div>
              <PlayCircleOutlineIcon onClick={() => handleStartStop(params)} />
            </div>
            <div>
              <AccessTimeFilledIcon
                onClick={() => handleSchedulerClick(params)}
              />
            </div>
          </div>
        );
      },
    },
  ];

  const columnsAws = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "resourceName", headerName: "Resource Name", width: 350 },
    { field: "instanceID", headerName: "Instance ID", width: 350 },
    {
      field: "status",
      headerName: "Status",
      width: 150,
    },
    {
      field: "action",
      headerName: "Action",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 100,
      renderCell: (params) => {
        return (
          <div style={{ cursor: "pointer" }}>
            <PlayCircleOutlineIcon />
            <AccessTimeFilledIcon />
          </div>
        );
      },
    },
  ];

  const rowsAws = [
    {
      id: "1",
      resourceName: "awsData",
      instanceID: "Snow",
      status: 35,
      action: <i class="fa-sharp fa-solid fa-clock"></i>,
    },
    {
      id: "2",
      resourceName: "awsData",
      instanceID: "Lannister",
      status: 42,
    },
    {
      id: "3",
      resourceName: "awsData",
      instanceID: "Lannister",
      status: 45,
    },
    {
      id: "4",
      resourceName: "awssapmleData",
      instanceID: "Stark",
      status: 16,
    },
  ];

  return (
    <div className="container mt-3" style={{ padding: "10px" }}>
      {isAuthenticated ? (
        <div>
          <Card style={{ boxShadow: "0px 0px 20px #0d7564" }}>
            <div className="col-md-2 inp-field">
              {/* <InputLabel id="demo-simple-select-helper-label">Cloud</InputLabel> */}
              <select
                aria-labelledby="Cloud Name"
                name="cloud"
                id="cloud"
                value={cloudName}
                onChange={handleCloudChange}
                style={{ width: "150px", padding: "7px", borderRadius: "10px" }}
              >
                <option value="AWS">AWS</option>
                <option value="AZURE">AZURE</option>
                <option value="GCP">GCP</option>
              </select>
            </div>
            {cloudName === "AZURE" && (
              <Azurecomp list={subscriptionAzure} columnData={columnsAzure} />
            )}
            {cloudName === "AWS" && (
              <div style={{ display: "flex", padding: "10px" }}>
                <Awscomp />
              </div>
            )}
          </Card>
          <div className="container mt-5">
            {cloudName === "AWS" && (
              <DataTable columns={columnsAws} rows={rowsAws} />
            )}
            {cloudName === "GCP" && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  fontSize: 30,
                }}
              >
                Coming Soon ...
              </div>
            )}
          </div>
          <DialogBox
            isDialogOpen={open}
            isDialogClose={open}
            handleClose={handleCancelDialog}
            handleConfirmation={handleJobSchedule}
          />
          <DialogStartStop
            contentText={statusVM === "VM running" ? "stop" : "start"}
            isOpen={openStartStopDialog}
            handleDialogClose={startStopCancel}
            handleDialogConfirm={startStopAgree}
          />
        </div>
      ) : (
        <div style={{ display: "flex", justifyContent: "center" }}>
          You need to login, Please Click SignIn.
        </div>
      )}
    </div>
  );
}
