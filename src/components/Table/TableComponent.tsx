/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
  Tooltip,
  // TablePagination,
} from "@mui/material";
import _ from "lodash";
import { ThreeDots } from "react-loader-spinner";
import { Box } from "@mui/system";
import ROLES from "../../utils/roles";

const TableComponent: React.FC<ITableComponent> = ({
  data,
  columns,
  error,
  errorText,
  loading,
  noDataText,
  onClickActionIcon = (title: string, data: any) => {},
  pagination = false,
  limit = 0,
  total = 5,
  handleRowsPerPage = (value) => {},
  handlePage = (value) => {},
  page = 0,
}) => {
  const role = localStorage.getItem("role");
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table" className="tableBody">
        <TableHead>
          <TableRow>
            {_.map(columns, ({ label, name }, idx) => (
              <TableCell style={{ fontWeight: 600 }} key={idx}>
                {label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell
                colSpan={_.size(columns)}
                align="center"
                style={{ verticalAlign: "top" }}
              >
                <Box display="flex" width="100%" justifyContent={"center"}>
                  <ThreeDots
                    height="50"
                    width="50"
                    radius="5"
                    color="#1a8bed"
                    ariaLabel="three-dots-loading"
                    visible={true}
                  />
                </Box>
              </TableCell>
            </TableRow>
          ) : error ? (
            <TableCell
              colSpan={3}
              align="center"
              style={{ verticalAlign: "top" }}
            >
              <Typography variant="h6" gutterBottom>
                {errorText}
              </Typography>
            </TableCell>
          ) : !_.size(data) ? (
            <TableRow>
              <TableCell
                colSpan={3}
                align="center"
                style={{ verticalAlign: "top" }}
              >
                <Typography variant="h6" gutterBottom>
                  {noDataText}
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            _.map(data, (eachData, idxData) => (
              <TableRow
                key={idxData}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {columns.map((eachCol, idxCol) => (
                  <React.Fragment key={idxCol}>
                    {eachCol.items ? (
                      <TableCell align="center">
                        {_.map(eachCol.items, (each, idx) => (
                          <React.Fragment key={idx}>
                            {each.icon ? (
                              <Tooltip
                                title={
                                  role === ROLES.platAdmin
                                    ? each.title
                                    : "cominig soon"
                                }
                                key={each.title}
                              >
                                <IconButton
                                  onClick={() =>
                                    onClickActionIcon(each.title, eachData)
                                  }
                                  disabled={role === ROLES.orgAdmin}
                                >
                                  {each.icon}
                                </IconButton>
                              </Tooltip>
                            ) : null}
                          </React.Fragment>
                        ))}
                      </TableCell>
                    ) : (
                      <TableCell key={idxCol}>
                        {eachCol?.render
                          ? eachCol?.render(eachData)
                          : _.get(eachData, eachCol.name, "")}
                      </TableCell>
                    )}
                  </React.Fragment>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      {/* {pagination ? (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={total}
          rowsPerPage={limit}
          page={page}
          onRowsPerPageChange={(event) =>
            handleRowsPerPage(parseInt(event.target.value))
          }
          onPageChange={(event, page) => handlePage(page)}
        />
      ) : null} */}
    </TableContainer>
  );
};

export default TableComponent;
