/* eslint-disable react/self-closing-comp */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React from "react";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
// import { SelectChangeEvent } from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import thumbsupimg from "../../../../../assets/images/thumbsupimg.svg";
import womencircle from "../../../../../assets/images/womencircle.svg";

// assign a menter popup
// import { makeStyles } from "@mui/styles";

function MatchesTableList() {
  // const useStyles = makeStyles({
  //   memberCircleImage: {
  //     display: "flex",
  //     alignItems: "center",
  //     justifyContent: "center",
  //     width: "50px",
  //     height: "50px",
  //     position: "relative",
  //   },
  //   memberCircleInner: {
  //     display: "flex",
  //     alignItems: "center",
  //     justifyContent: "center",
  //     width: "50px",
  //     height: "50px",
  //     background: "#fff",
  //     borderRadius: "50%",
  //   },
  //   membersNameText: {
  //     fontSize: "16px !important",
  //     fontFamily: "Open Sans !important",
  //     fontWeight: "600 !important",
  //     color: "#152536 !important",
  //     marginRight: "10px !important",
  //   },
  //   membersButton: {
  //     borderRadius: "5px",
  //     fontFamily: "Open Sans",
  //     fontSize: "12px",
  //     fontWeight: "600",
  //     width: "62px",
  //     height: "24px",
  //   },
  //   menberDetailsText: {
  //     fontSize: "14px !important",
  //     fontWeight: "400 !important",
  //     fontFamily: "Open Sans !important",
  //     color: "#68717A !important",
  //   },
  // });
  const textStyle = {
    fontWeigth: "600!important",
    color: "#152536 !important",
    fontSize: "16px !important",
    fontFamily: "Open Sans",
    cursor: "pointer",
  };
  const tableStyle = {
    fontWeigth: "600",
    color: "#68717A",
    fontSize: "12px",
    fontFamily: "Open Sans",
    marginBottom: "0 !important",
  };

  const marketingTextStyle = {
    fontWeigth: "400 !important",
    color: "#68717A",
    fontSize: "14px",
    fontFamily: "Open Sans",
    cursor: "pointer",
  };
  const sendMessageText = {
    fontWeigth: "400 !important",
    color: "#0071A9",
    fontSize: "13px",
    fontFamily: "Open Sans",
    cursor: "pointer",
    Height: "35px",
    padding: "5px",
    border: "1px solid #0071A9",
    borderRadius: "8px",
  };
  // const matchText = {
  //   fontWeigth: "400 !important",
  //   color: "#152536 !important",
  //   fontSize: "14px !important",
  //   fontFamily: "Open Sans !important",
  // };

  // popup code
  // const [open, setOpen] = React.useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };
  // switch code
  // const label = { inputProps: { "aria-label": "Switch demo" } };

  // progress bar code
  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor:
        theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: "#28A745",
    },
  }));

  // const [age, setAge] = React.useState("");

  // const handleChange = (event: SelectChangeEvent) => {
  //   setAge(event.target.value as string);
  // };
  // const classes = useStyles();
  return (
    <div>
      <TableContainer>
        <Table className="tableBody" width="100%" aria-label="simple table">
          <TableHead>
            <TableRow sx={{ borderBottom: "1px solid #EFF0F4" }}>
              <TableCell style={tableStyle}>STUDENT</TableCell>
              <TableCell style={tableStyle}>MENTOR</TableCell>
              <TableCell style={tableStyle}>STATUS</TableCell>
              <TableCell style={tableStyle}>GOAL PROGRESS</TableCell>
              <TableCell style={tableStyle}>UPVOTES</TableCell>
              <TableCell style={tableStyle}>TOTAL CONNECTION</TableCell>
              <TableCell style={tableStyle}>LAST CONNECTION</TableCell>
              <TableCell style={tableStyle}>ACTION</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            <TableRow>
              <TableCell>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={womencircle}
                    alt="womencircle"
                    style={{
                      padding: 0,
                      margin: 0,
                      width: "40px",
                      height: "40px",
                    }}
                  />
                  <Box sx={{ marginLeft: "10px" }}>
                    <Typography style={textStyle}>Megan Thompson</Typography>
                    <Typography style={marketingTextStyle}>
                      CMO, PNC Bank
                    </Typography>
                  </Box>
                </Box>
              </TableCell>

              <TableCell>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={womencircle}
                    alt="womencircle"
                    style={{
                      padding: 0,
                      margin: 0,
                      width: "40px",
                      height: "40px",
                    }}
                  />
                  <Box sx={{ marginLeft: "10px" }}>
                    <Typography style={textStyle}>Amy Rodriguez</Typography>
                    <Typography style={marketingTextStyle}>
                      Marketing
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                <Box
                  sx={{
                    background: "#fff",
                    border: "1px solid #28A745",
                    borderRadius: "5px",
                    width: "64px",
                    height: "20px",
                    color: "#28A745",
                    fontSize: "12px",
                    fontWeight: "600",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  Matched
                </Box>
              </TableCell>

              <TableCell>
                {" "}
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <BorderLinearProgress
                    variant="determinate"
                    value={30}
                    sx={{
                      width: "70px",
                      height: "8px",
                      background: "#DF6438",
                    }}
                  />
                  <span
                    style={{
                      color: "#68717A",
                      opacity: "0.8",
                      marginLeft: "6px",
                      fontSize: "14px",
                    }}
                  >
                    30%
                  </span>
                </Box>
              </TableCell>
              <TableCell>
                {" "}
                <Box
                  display="flex"
                  alignItems={"center"}
                  justifyContent={"space-around"}
                  border={`1px solid #EFF0F4`}
                  borderRadius={2}
                  height="25px"
                  width="55px"
                >
                  <img
                    src={thumbsupimg}
                    style={{ width: "14px", height: "14px" }}
                    alt="logo"
                  />
                  <Typography
                    sx={{
                      fontFamily: "Open Sans",
                      fontSize: "12px",
                      fontWeight: 600,
                    }}
                  >
                    86
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>25</TableCell>
              <TableCell>15 days ago</TableCell>
              <TableCell>
                <MoreVertIcon sx={{ color: "#152536" }} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={womencircle}
                    alt="womencircle"
                    style={{
                      padding: 0,
                      margin: 0,
                      width: "40px",
                      height: "40px",
                    }}
                  />
                  <Box sx={{ marginLeft: "10px" }}>
                    <Typography style={textStyle}>Amy Rodriguez</Typography>
                    <Typography style={marketingTextStyle}>
                      Marketing
                    </Typography>
                  </Box>
                </Box>
              </TableCell>

              <TableCell>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={womencircle}
                    alt="womencircle"
                    style={{
                      padding: 0,
                      margin: 0,
                      width: "40px",
                      height: "40px",
                    }}
                  />
                  <Box sx={{ marginLeft: "10px" }}>
                    <Typography style={textStyle}>Amy Rodriguez</Typography>
                    <Typography style={marketingTextStyle}>
                      Marketing
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                <Box
                  sx={{
                    background: "#fff",
                    border: "1px solid #28A745",
                    borderRadius: "5px",
                    width: "64px",
                    height: "20px",
                    color: "#28A745",
                    fontSize: "12px",
                    fontWeight: "600",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  Matched
                </Box>
              </TableCell>

              <TableCell>
                {" "}
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <BorderLinearProgress
                    variant="determinate"
                    value={30}
                    sx={{
                      width: "70px",
                      height: "8px",
                      background: "#DF6438",
                    }}
                  />
                  <span
                    style={{
                      color: "#68717A",
                      opacity: "0.8",
                      marginLeft: "6px",
                      fontSize: "14px",
                    }}
                  >
                    30%
                  </span>
                </Box>
              </TableCell>
              <TableCell>
                {" "}
                <Box
                  display="flex"
                  alignItems={"center"}
                  justifyContent={"space-around"}
                  border={`1px solid #EFF0F4`}
                  borderRadius={2}
                  height="25px"
                  width="55px"
                >
                  <img
                    src={thumbsupimg}
                    style={{ width: "14px", height: "14px" }}
                    alt="logo"
                  />
                  <Typography
                    sx={{
                      fontFamily: "Open Sans",
                      fontSize: "12px",
                      fontWeight: 600,
                    }}
                  >
                    86
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>25</TableCell>
              <TableCell>15 days ago</TableCell>
              <TableCell>
                <MoreVertIcon sx={{ color: "#152536" }} />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={womencircle}
                    alt="womencircle"
                    style={{
                      padding: 0,
                      margin: 0,
                      width: "40px",
                      height: "40px",
                    }}
                  />
                  <Box sx={{ marginLeft: "10px" }}>
                    <Typography style={textStyle}>Megan Thompson</Typography>
                    <Typography style={marketingTextStyle}>
                      CMO, PNC Bank
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                <Box sx={{ textAlign: "center" }} style={sendMessageText}>
                  Assign a mentor
                </Box>
              </TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>

              <TableCell>
                <MoreVertIcon sx={{ color: "#152536" }} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Box sx={{ textAlign: "center" }} style={sendMessageText}>
                  Assign a mentee
                </Box>
              </TableCell>
              <TableCell>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={womencircle}
                    alt="womencircle"
                    style={{
                      padding: 0,
                      margin: 0,
                      width: "40px",
                      height: "40px",
                    }}
                  />
                  <Box sx={{ marginLeft: "10px" }}>
                    <Typography style={textStyle}>Bob Horan</Typography>
                    <Typography style={marketingTextStyle}>
                      Civil Engineering
                    </Typography>
                  </Box>
                </Box>
              </TableCell>

              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>

              <TableCell>
                <MoreVertIcon sx={{ color: "#152536" }} />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default MatchesTableList;
