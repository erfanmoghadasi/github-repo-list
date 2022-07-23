import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "repoName", headerName: "Name", width: 130 },
  { field: "stars", headerName: "Stars", width: 90, type: "number" },
  {
    field: "forks",
    headerName: "Forks",
    type: "number",
    width: 90,
  },
];


export default function DataTable({rows}) {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}
