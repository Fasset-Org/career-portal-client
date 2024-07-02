import {
  Alert,
  IconButton,
  LinearProgress,
  Paper,
  Snackbar,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography
} from "@mui/material";
import React from "react";
import CertificateAndTrainingModal from "./modals/CertificateAndTrainingModal";
import { useQuery } from "@tanstack/react-query";
import ApiQueries from "../apiQuries";
import { DeleteCertificateModal } from "./modals/DeleteCertificateModal";
import { Download } from "@mui/icons-material";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";

const CertificateAndTraining = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
    <Stack
      height={518}
      padding={2}
      spacing={2}
      component={Paper}
      sx={{ overflowY: "auto" }}
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
          Certificate Qualifications
        </Typography>
        <CertificateAndTrainingModal userId={data?.id} />
      </Stack>
      {data?.certificates?.length > 0 ? (
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell
                  align="center"
                  sx={{ fontWeight: "bolder", color: "#FFFFFF" }}
                >
                  No#
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontWeight: "bolder", color: "#FFFFFF" }}
                >
                  Course
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontWeight: "bolder", color: "#FFFFFF" }}
                >
                  Year
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontWeight: "bolder", color: "#FFFFFF" }}
                >
                  File Name
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
              {(rowsPerPage > 0
                ? data?.certificates?.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : data?.certificates
              )?.map((certificate, i) => {
                return (
                  <TableRow key={certificate.id}>
                    <TableCell align="center" component="th" scope="row">
                      {i + 1}
                    </TableCell>
                    <TableCell align="center" component="th" scope="row">
                      {certificate.course}
                    </TableCell>
                    <TableCell align="center" component="th" scope="row">
                      {certificate.year}
                    </TableCell>
                    <TableCell align="center">
                      {certificate.originalFileName}
                    </TableCell>
                    <TableCell align="center">
                      <Stack
                        direction="row"
                        spacing={2}
                        justifyContent="center"
                      >
                        <Tooltip title="Download Certificate">
                          <IconButton
                            sx={{
                              backgroundColor: "secondary.main",
                              color: "#FFFFFF",
                              "&:hover": {
                                backgroundColor: "secondary.light",
                                color: "#FFFFFF",
                                fontWeight: "bolder"
                              }
                            }}
                            onClick={() => {
                              window.open(
                                `${process.env.REACT_APP_API_URL}/student/downloadCertificate?filename=${certificate.certificateFileName}`,
                                "_blank"
                              );
                            }}
                          >
                            <Download />
                          </IconButton>
                        </Tooltip>
                        <CertificateAndTrainingModal
                          certificate={certificate}
                          userId={data?.userId}
                        />
                        <DeleteCertificateModal id={certificate.id} />
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
                  count={data?.certificates?.length || 0}
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
        <Alert severity="info">Basic education information is optional</Alert>
      )}
    </Stack>
  );
};

export default CertificateAndTraining;
