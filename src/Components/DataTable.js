import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

export default function DataTable(props) {
  const [searchText] = React.useState("");

  return (
    <div
      style={{
        height: 375,
        width: "100%",
        borderRadius: "20px",
        boxShadow: "0px 0px 20px #0d7564",
      }}
    >
      <DataGrid
        rows={props.rows}
        columns={props.columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        componentsProps={{
          toolbar: {
            value: searchText,
          },
        }}
        style={{ borderRadius: "20px" }}
      />
    </div>
  );
}
