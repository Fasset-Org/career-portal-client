import {
  Alert,
  IconButton,
  LinearProgress,
  Link,
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
import AddEditAttachmentModal from "./modals/AddEditAttachmentModal";
import { useQuery } from "@tanstack/react-query";
import ApiQueries from "../apiQuries";
import VisibilityIcon from "@mui/icons-material/Visibility";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import { DeleteAttachmentModal } from "./modals/DeleteAttachmentModal";

const Attachments = () => {
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

  return (
    <Stack
      padding={2}
      spacing={2}
      sx={{ overflowY: "auto", borderRadius: 0, height: "70.2vh" }}
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
          Documents
        </Typography>
        <AddEditAttachmentModal userId={data?.id} />
      </Stack>
      {data?.attachments?.length > 0 ? (
        <TableContainer>
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
                  Document Type
                </TableCell>

                <TableCell
                  align="center"
                  sx={{ fontWeight: "bolder", color: "#FFFFFF" }}
                >
                  FileName
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
              {data?.attachments?.map((document, i) => {
                return (
                  <TableRow key={document.id}>
                    <TableCell align="center" component="th" scope="row">
                      {i + 1}
                    </TableCell>
                    <TableCell align="center" component="th" scope="row">
                      {document.documentName}
                    </TableCell>
                    <TableCell align="center">
                      <Link sx={{ textDecoration: "none", cursor: "pointer" }}>
                        {document?.originalFileName}
                      </Link>
                    </TableCell>
                    <TableCell align="center">
                      <Stack
                        direction="row"
                        spacing={2}
                        justifyContent="center"
                      >
                        <Tooltip title="View">
                          <IconButton
                            onClick={() => {}}
                            sx={{
                              backgroundColor: "primary.main",
                              color: "#FFFFFF",
                              "&:hover": {
                                backgroundColor: "primary.light",
                                color: "#FFFFFF",
                                fontWeight: "bolder"
                              }
                            }}
                          >
                            <VisibilityIcon />
                          </IconButton>
                        </Tooltip>

                        <DeleteAttachmentModal id="" />
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
                  count={data?.attachments?.length || 0}
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
        <Alert severity="error">
          Please note that matric, id copy, and qualification attachments are
          required
        </Alert>
      )}
    </Stack>
  );
};

export default Attachments;
