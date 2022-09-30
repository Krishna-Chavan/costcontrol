import React from "react";
import "./UI.css";

export default function UI() {
  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-2 inp-field">
          <select
            name="cloud"
            id="cloud"
            defaultValue="AZURE"
            style={{ width: "150px", padding: "7px" }}
          >
            <option value="AWS">AWS</option>
            <option value="AZURE">AZURE</option>
            <option value="GCP">GCP</option>
          </select>
        </div>
        <div className="col-md-2 inp-field" style={{ marginLeft: "40px" }}>
          <select
            name="subscription"
            id="subscription"
            defaultValue="Brllio MPN"
            style={{ width: "200px", padding: "7px" }}
          >
            <option value="PRVATE">Private Subscripton</option>
            <option value="Brillio">Brillio MPN</option>
            <option value="VSCode">Visual Studio</option>
          </select>
        </div>
        <div className="col-md-2 inp-field">
          <select
            name="cloud"
            id="cloud"
            defaultValue="Resource Group"
            style={{ width: "160px", padding: "7px" }}
          >
            <option value="RG1">RG1</option>
            <option value="RG2">RG2</option>
            <option value="RG3">RG3</option>
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
            }}
          >
            <i class="fa-solid fa-magnifying-glass"></i>
            Search
          </button>
        </div>
      </div>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-2">
            <div>
              <input
                type="text"
                name="filter"
                id="filter"
                placeholder="Filter"
                style={{ borderStyle: "outset" }}
              />
            </div>
          </div>
          <div className="col-md-2 inp-field">
            <div className="row">
              <div className="col-md-1">
                <a
                  href="/"
                  style={{
                    marginLeft: "630px",
                    backgroundColor: "wheat",
                    borderWidth: "5px",
                    borderColor: "black",
                  }}
                >
                  <i
                    class="fa-sharp fa-solid la fa-rotate-right"
                    style={{ width: "30px", padding: "5px" }}
                  ></i>
                </a>
              </div>
              <div className="col-md-1">
                <a
                  href="/"
                  style={{
                    marginLeft: "650px",
                    backgroundColor: "wheat",
                    borderWidth: "5px",
                    borderColor: "black",
                  }}
                >
                  <i
                    class="fa-solid fa-play"
                    style={{ width: "30px", padding: "7px" }}
                  ></i>
                </a>
              </div>
              <div className="col-md-1">
                <a
                  href="/"
                  style={{
                    marginLeft: "670px",
                    backgroundColor: "wheat",
                    borderWidth: "5px",
                    borderColor: "black",
                  }}
                >
                  <i
                    class="fa-sharp fa-solid fa-square"
                    style={{ width: "30px", padding: "7px" }}
                  ></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        <table class="container table mt-3" style={{
            boxShadow: ' 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
        }}>
          <thead>
            <tr>
              <th scope="col">
              <input type="checkbox" name="checkbox" id="checkbox" />
              </th>
              <th>Resource Name</th>
              <th>Resource Type</th>
              <th>Location</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>
                <input type="checkbox" name="checkbox" id="checkbox" />
              </th>
              <td>BrillioOne-testVM</td>
              <td>Virtual Machines</td>
              <td>us-east-1</td>
              <td>
                <button
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    borderRadius: "12px",
                  }}
                >
                  Stopped
                </button>
              </td>
              <td>
                <a href="" style={{backgroundColor:'lightgreen', width:'30px', padding:'5px'}}>
                <i
                  class="fa-sharp fa-solid fa-square"
                  style={{ width: "30px", padding: "7px" }}
                ></i>
                </a>
                <a href="" style={{backgroundColor:'lightgreen', width:'30px', padding:'5px', marginLeft:'20px'}}>
                <i
                  class="fa-sharp fa-solid fa-clock"
                  style={{ width: "30px", padding: "7px" }}
                ></i>
                </a>
              </td>

            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
