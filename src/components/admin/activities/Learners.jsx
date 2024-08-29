import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { LinearProgress, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import ApiQueries from "../../../apiQuries";

const Learners = () => {
  const [rows, setRows] = useState([]);

  const { isLoading, data } = useQuery({
    queryKey: ["students"],
    queryFn: () => ApiQueries.getAllStudents()
  });

  const columns = [
    {
      field: "identificationNumber",
      headerName: "ID Number",
      editable: true
    },
    {
      field: "passportNumber",
      headerName: "Passport Number",
      editable: true
    },
    {
      field: "firstName",
      headerName: "First Name",
      editable: true
    },
    {
      field: "lastName",
      headerName: "Last Name",
      editable: true
    },
    {
      field: "email",
      headerName: "Email",
      editable: true
    },
    {
      field: "race",
      headerName: "Race",
      editable: true
    },
    {
      field: "studentAddress",
      headerName: "Address",
      editable: true,
      width: 300,
      renderCell: (params) => {
        return (
          <Stack height="100%" justifyContent="center">
            <Typography sx={{ textWrap: "wrap", fontSize: 11 }}>
              {params.row.studentAddress}
            </Typography>
          </Stack>
        );
      }
    }
  ];

  useEffect(() => {
    if (data?.students?.length > 0) {
      setRows(
        data?.students?.map((student) => {
          return {
            ...student,
            ...student.studentInformation,
            studentAddress:
              student?.studentAddress &&
              Object.values(student?.studentAddress).join(", ")
          };
        })
      );
    }
  }, [data?.students]);

  console.log("rows", data?.students);

  if (isLoading) {
    return <LinearProgress />;
  }

  return (
    <Stack spacing={2} mt={8.5} padding={2}>
      <Typography sx={{ fontSize: 20, fontWeight: "bolder" }}>
        Learners
      </Typography>
      <div style={{ height: 680, width: "100%", overflow: "auto" }}>
        <DataGrid
          rows={rows.length > 0 && rows}
          columns={columns}
          autoHeight
          autoHeightMax={400}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5
              }
            }
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
          slots={{
            // noRowsOverlay: CustomNoRowsGridOverlay,
            toolbar: GridToolbar
          }}
          slotProps={{
            toolbar: {
              showQuickFilter: true
            }
          }}
        />
      </div>
    </Stack>
  );
};

export default Learners;
