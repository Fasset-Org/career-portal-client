import {
  Alert,
  LinearProgress,
  Paper,
  Snackbar,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import ApiQueries from "../apiQuries";
import AddEducationModal from "./modals/AddEducationModal";

const BasicEducation = () => {
  // const [page, setPage] = React.useState(0);
  // const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["userInfo"],
    queryFn: () => {
      return ApiQueries.userInfo();
    }
  });

  if (isLoading) {
    return <LinearProgress />;
  }

  if (isError) {
    return (
      <Snackbar open={true} autoHideDuration={6000}>
        <Alert severity="error" sx={{ width: "100%" }}>
          Error happened fetching your information
        </Alert>
      </Snackbar>
    );
  }

  return (
    <Stack padding={2} spacing={2} sx={{ overflowY: "auto" }}>
      <Stack direction="row" justifyContent="space-between">
        <Typography
          sx={{ fontSize: 20, textAlign: "center", fontWeight: "bolder" }}
        >
          Basic Education
        </Typography>
        {!data?.basicEducation && <AddEducationModal userId={data.id} />}
      </Stack>

      {data?.basicEducation ? (
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell
                  align="center"
                  sx={{ fontWeight: "bolder", color: "#FFFFFF" }}
                >
                  Highest Grade Passed
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontWeight: "bolder", color: "#FFFFFF" }}
                >
                  High School Name
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontWeight: "bolder", color: "#FFFFFF" }}
                >
                  City
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontWeight: "bolder", color: "#FFFFFF" }}
                >
                  Province
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
              <TableRow>
                <TableCell align="center" component="th" scope="row">
                  {data?.basicEducation?.grade}
                </TableCell>
                <TableCell align="center" component="th" scope="row">
                  {data?.basicEducation?.school}
                </TableCell>
                <TableCell align="center" component="th" scope="row">
                  {data?.basicEducation?.city}
                </TableCell>
                <TableCell align="center">
                  {data?.basicEducation?.province}
                </TableCell>
                <TableCell align="center">
                  <AddEducationModal
                    basicEducation={data.basicEducation}
                    userId={data?.id}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
            {/* <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                // colSpan={3}
                count={employees?.length || 0}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter> */}
          </Table>
        </TableContainer>
      ) : (
        <Alert severity="error">Basic education information required</Alert>
      )}
    </Stack>
  );
};

export default BasicEducation;
