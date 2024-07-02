import {
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

const Attachments = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["userInfo"],
    queryFn: () => {
      return ApiQueries.userInfo();
    }
  });

  const documentOptionsTemplate = [
    {
      value: "Matric Certificate",
      label: "Matric Certificate"
    },
    {
      value: "Qualification",
      label: "Qualification"
    },
    {
      value: "Id Document",
      label: "Id Document"
    }
  ];

  let documentOptions = [];

  if (data?.attachments?.length > 0) {
    // let documentNewOptions = [];
    documentOptions = data?.attachments?.map((attachment, i) => {
      return attachment.documentName === documentOptionsTemplate[i].value
        ? {
            value: attachment.documentName,
            label: attachment.documentName,
            fileName: attachment.originalFileName
          }
        : {
            value: attachment.documentName,
            label: attachment.documentName,
            fileName: attachment.originalFileName
          };
    });
  } else {
    documentOptions = [...documentOptionsTemplate];
  }

  console.log(data);

  console.log(documentOptions);

  if (isLoading) {
    return <LinearProgress />;
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
          Documents
        </Typography>
        <AddEditAttachmentModal userId={data?.id} />
      </Stack>
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
            {documentOptions.map((document, i) => {
              return (
                <TableRow key={document.value}>
                  <TableCell align="center" component="th" scope="row">
                    {i + 1}
                  </TableCell>
                  <TableCell align="center" component="th" scope="row">
                    {document.label}
                  </TableCell>
                  <TableCell align="center">
                    {document?.fileName ? (
                      <Link sx={{ textDecoration: "none", cursor: "pointer" }}>
                        {document?.fileName}
                      </Link>
                    ) : (
                      "-"
                    )}
                  </TableCell>
                  <TableCell align="center">
                    <Stack direction="row" spacing={2} justifyContent="center">
                      <AddEditAttachmentModal
                        attachment={document}
                        userId={data?.id}
                      />
                      {/* <Tooltip title="Download">
                        <Button
                          onClick={() => {
                            // window.open(
                            //   `${process.env.REACT_APP_API_URL}/student/downloadCertificate?filename=${certificate.certificateFileName}`,
                            //   "_blank"
                            // );
                          }}
                        >
                          Download
                        </Button>
                      </Tooltip> */}
                    </Stack>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default Attachments;
