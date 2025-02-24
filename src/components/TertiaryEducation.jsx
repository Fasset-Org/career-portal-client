import {
  Alert,
  LinearProgress,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from "@mui/material";
import React from "react";
import TertiaryEducationModal from "./modals/TertiaryEducationModal";
import { useQuery } from "@tanstack/react-query";
import ApiQueries from "../apiQuries";
import { DeleteTertiaryEducationModal } from "./modals/DeleteTertiaryEducationModal";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";

const TertiaryEducation = () => {

  const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

  const { data, isLoading } = useQuery({
    queryKey: ["userInfo"],
    queryFn: () => {
      return ApiQueries.userInfo();
    }
  });

  if (isLoading) {
    return <LinearProgress />;
  }

  console.log(data);

  return (
    <Stack
      padding={2}
      spacing={2}
      sx={{ overflowY: "auto"}}
    >
      <Stack
        // border={1}
        width="100%"
        direction="row"
        justifyContent="space-between"
      >
        <Typography
          sx={{ fontSize: 20, textAlign: "center", fontWeight: "bolder" }}
        >
          Qualifications
        </Typography>
        <TertiaryEducationModal userId={data?.id} />
      </Stack>
      {data?.tertiaryEducation?.length > 0 ? (
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell
                  align="center"
                  sx={{ fontWeight: "bolder", color: "#FFFFFF" }}
                >
                  Level
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontWeight: "bolder", color: "#FFFFFF" }}
                >
                  Field Of Study
                </TableCell>

                <TableCell
                  align="center"
                  sx={{ fontWeight: "bolder", color: "#FFFFFF" }}
                >
                  Institution
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontWeight: "bolder", color: "#FFFFFF" }}
                >
                  Year Started
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontWeight: "bolder", color: "#FFFFFF" }}
                >
                  Status
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontWeight: "bolder", color: "#FFFFFF" }}
                >
                  Year Completed
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontWeight: "bolder", color: "#FFFFFF" }}
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.tertiaryEducation?.map((education) => {
                return (
                  <TableRow key={education.id}>
                    <TableCell align="center" component="th" scope="row">
                      {education.educationLevel}
                    </TableCell>
                    <TableCell align="center" component="th" scope="row">
                      {education.fieldOfStudy}
                    </TableCell>
                    <TableCell align="center" component="th" scope="row">
                      {education.institution}
                    </TableCell>
                    <TableCell align="center">{education.startYear}</TableCell>
                    <TableCell align="center">{education.status}</TableCell>
                    <TableCell align="center">
                      {education.endYear ? education.endYear : "-"}
                    </TableCell>
                    <TableCell align="center">
                      <Stack direction="row" spacing={2}>
                        <TertiaryEducationModal tertiaryEducation={education} />
                        <DeleteTertiaryEducationModal id={education.id} />
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  // colSpan={3}
                  count={data?.tertiaryEducation?.length || 0}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      "aria-label": "rows per page"
                    },
                    native: true
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      ) : (
        <Alert severity="info">Tertiary education is optional</Alert>
      )}
    </Stack>
  );
};

export default TertiaryEducation;
