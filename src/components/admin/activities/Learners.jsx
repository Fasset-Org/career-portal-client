import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, LinearProgress, Stack, Typography } from "@mui/material";
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
      editable: true,
    },
    {
      field: "passportNumber",
      headerName: "Passport Number",
      editable: true
    },
    {
      field: "firstName",
      headerName: "First Name",
      editable: true,
    },
    {
      field: "lastName",
      headerName: "Last Name",
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      editable: true,
      width: 200
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
    },
    {
      field: "basicEducation",
      headerName: "Basic Education",
      editable: true,
      renderCell: (params) => {
        return (
          <Stack height="100%" justifyContent="center">
            <Typography sx={{ textWrap: "wrap", fontSize: 11 }}>
              {params.row.basicEducation}
            </Typography>
          </Stack>
        );
      }
    },
    {
      field: "tertiaryEducation",
      headerName: "Teriary Education",
      editable: true,
      width: 300,
      renderCell: (params) => {
        const tertiaryEducations = params.row.tertiaryEducation?.split(",");

        return (
          <Stack height="100%" justifyContent="center">
            <Typography sx={{ textWrap: "wrap", fontSize: 11 }}>
              {tertiaryEducations?.map((education) => {
                return (
                  <span>
                    &#9642; {education}
                    <br />
                  </span>
                );
              })}
            </Typography>
          </Stack>
        );
      }
    },
    {
      field: "studentProgrammes",
      headerName: "Learner Interests",
      editable: true,
      width: 300,
      renderCell: (params) => {
        const studentProgrammes = params.row.studentProgrammes?.split(",");

        return (
          <Stack height="100%" justifyContent="center">
            <Typography sx={{ textWrap: "wrap", fontSize: 11 }}>
              {studentProgrammes?.map((programme) => {
                return (
                  <span>
                    &#9642; {programme}
                    <br />
                  </span>
                );
              })}
            </Typography>
          </Stack>
        );
      }
    },

    {
      field: "profileProgress",
      headerName: "Profile Completion",
      editable: true,
      width: 200,
      renderCell: (params) => {
        return (
          <Box display="flex" alignItems="center" width="100%">
            <Box width="100%" mr={1}>
              <LinearProgress
                variant="determinate"
                value={params?.row?.profileProgress}
                color={
                  params?.row?.profileProgress < 50
                    ? "error"
                    : params?.row?.profileProgress >= 50 &&
                      params?.row?.profileProgress < 75
                    ? "warning"
                    : "success"
                }
              />
            </Box>
            <Box minWidth={35}>
              <Typography variant="body2" color="textSecondary">{`${Math.round(
                params?.row?.profileProgress
              )}%`}</Typography>
            </Box>
          </Box>
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
              Object.values(student?.studentAddress).join(" "),
            basicEducation:
              student?.basicEducation &&
              Object.values(student?.basicEducation).join(" "),
            tertiaryEducation:
              student?.tertiaryEducation &&
              student?.tertiaryEducation
                .map((edu) => Object.values(edu).join(" "))
                .join(", "),
            studentProgrammes:
              student?.studentProgrammes &&
              student?.studentProgrammes
                .map((programe) => Object.values(programe.programmes).join(" "))
                .join(", ")
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
      <div style={{ height: 670, width: "100%", overflow: "auto", border: 1 }}>
        <DataGrid
          rows={rows.length > 0 && rows}
          columns={columns}
          autoHeight
          getRowHeight={() => "auto"}
          autoHeightMax={400}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10
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
          sx={{
            "& .MuiDataGrid-columnHeaders": {
              // backgroundColor: "#163683", // Header background color
              fontWeight: "bolder", // Bold font
              fontSize: 13
            },
            "& .MuiDataGrid-cell": {
              display: "flex",
              alignItems: "center" // Vertically align row content
              // justifyContent: 'center', // Optional: horizontally center content
            }
          }}
        />
      </div>
    </Stack>
  );
};

export default Learners;
