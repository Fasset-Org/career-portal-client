import {
  Alert,
  IconButton,
  LinearProgress,
  Link,
  Paper,
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
import AddEditAttachmentModal from "./modals/AddEditAttachmentModal";
import { useQuery } from "@tanstack/react-query";
import ApiQueries from "../apiQuries";
import VisibilityIcon from "@mui/icons-material/Visibility";

const Attachments = () => {
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
      height={605}
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
                        <IconButton>
                          <VisibilityIcon />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
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
