import {
  Alert,
  LinearProgress,
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
import ProfessionalsSkillsModal from "./modals/ProfessionalSkillsModal";
import { useQuery } from "@tanstack/react-query";
import ApiQueries from "../apiQuries";
import { DeleteSkillModal } from "./modals/DeleteSkillModal";

const ProfessionalsSkills = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["userInfo"],
    queryFn: () => {
      return ApiQueries.userInfo();
    }
  });

  console.log(data);

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
          Professional Skills
        </Typography>
        <ProfessionalsSkillsModal userId={data?.id} />
      </Stack>

      {data?.skills?.length > 0 ? (
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
                  Skill
                </TableCell>

                <TableCell
                  align="center"
                  sx={{ fontWeight: "bolder", color: "#FFFFFF" }}
                >
                  Skill Level
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
              {data?.skills?.map((skill, i) => {
                return (
                  <TableRow key={skill.id}>
                    <TableCell align="center" component="th" scope="row">
                      {i + 1}
                    </TableCell>
                    <TableCell align="center" component="th" scope="row">
                      {skill.skill}
                    </TableCell>
                    <TableCell align="center" component="th" scope="row">
                      {skill.skillLevel}
                    </TableCell>
                    <TableCell align="center">
                      <Stack
                        direction="row"
                        spacing={2}
                        justifyContent="center"
                      >
                        <ProfessionalsSkillsModal skill={skill} />
                        <DeleteSkillModal id={skill.id} />
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              })}
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
        <Alert severity="info">Professional skills are optional</Alert>
      )}
    </Stack>
  );
};

export default ProfessionalsSkills;
