/* eslint-disable react/jsx-key */
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  // InputLabel,
  IconButton
} from '@material-ui/core';
import CloseIcon from '@mui/icons-material/Close';
import { Button, Grid, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { appColors } from '../../../../../utils/theme';
// assign a menter popup
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { makeStyles } from '@mui/styles';
import { AppLoader } from '../../../../../components/AppLoader';
// import womenimg from "../../../../../assets/images/womenimg.svg";
// import { featchMatches } from "../../../../redux/slices/getAllMatches/getAllMatchesSlice";
// import { AppLoader } from "../../../../components/AppLoader";
// import { useSelector } from "react-redux";

interface MatchDetailsProps {
  openMatchDetails: any;
  handleCloseMatchDetails: any;
  matchDetails: any;
}
function MatchDetailsPopup({ openMatchDetails, handleCloseMatchDetails, matchDetails }: MatchDetailsProps) {
  const useStyles = makeStyles({
    memberCircleImage: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '50px',
      height: '50px',
      position: 'relative'
    },
    memberCircleInner: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '50px',
      height: '50px',
      background: '#fff',
      borderRadius: '50%'
    },
    membersNameText: {
      fontSize: '16px !important',
      fontFamily: 'Open Sans !important',
      fontWeight: '600 !important',
      color: '#152536 !important',
      marginRight: '10px !important'
    },
    membersButton: {
      borderRadius: '5px',
      fontFamily: 'Open Sans',
      fontSize: '12px',
      fontWeight: '600',
      width: '62px',
      height: '24px'
    },
    menberDetailsText: {
      fontSize: '14px !important',
      fontWeight: '400 !important',
      fontFamily: 'Open Sans !important',
      color: '#68717A !important'
    },
    uiStyles: {
      listStyle: 'none'
    },
    listStyle: {
      fontSize: '14px !important',
      fontWeight: '400 !important',
      color: '#152536 !important',
      fontFamily: 'Open Sans !important',
      '&:hover': {
        backgroundColor: appColors.gray2,
        cursor: 'pointer'
      }
    }
  });

  // const textStyle = {
  //   fontWeigth: "600!important",
  //   color: "#152536 !important",
  //   fontSize: "16px !important",
  //   fontFamily: "Open Sans",
  //   cursor: "pointer",
  // };

  // const tableStyle = {
  //   fontWeigth: "600",
  //   color: "#68717A",
  //   fontSize: "12px",
  //   fontFamily: "Open Sans",
  //   marginBottom: "0 !important",
  // };

  // const marketingTextStyle = {
  //   fontWeigth: "400 !important",
  //   color: "#68717A",
  //   fontSize: "14px",
  //   fontFamily: "Open Sans",
  //   cursor: "pointer",
  // };

  // const sendMessageText = {
  //   fontWeigth: "400 !important",
  //   color: "#0071A9",
  //   fontSize: "13px",
  //   fontFamily: "Open Sans",
  //   cursor: "pointer",
  //   Height: "35px",
  //   padding: "5px",
  //   border: "1px solid #0071A9",
  //   borderRadius: "8px",
  // };
  const classes = useStyles();
  // matchType

  const timestamp = matchDetails?.startDate; // Unix timestamp
  const date = new Date(timestamp * 1000); // Multiply by 1000 to convert to milliseconds
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  function capitalizeFirstLetter(string: any) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return (
    <div>
      <div>
        <Dialog
          open={openMatchDetails}
          onClose={handleCloseMatchDetails}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth
        >
          {matchDetails ? (
            <>
              <DialogTitle id="alert-dialog-title" className="informationtext">
                Match Details
                <IconButton onClick={handleCloseMatchDetails} style={{ float: 'right' }}>
                  <CloseIcon />
                </IconButton>
              </DialogTitle>
              <Divider />
              <DialogContent>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      padding: '13px 0'
                    }}
                  >
                    <Box sx={{ marginRight: '8px' }}>
                      <Box className={classes.memberCircleImage}>
                        <Box className={classes.memberCircleInner}>
                          <img
                            src={matchDetails?.mentee?.headshot}
                            alt="womencircle"
                            style={{
                              padding: 0,
                              margin: 0,
                              width: '48px',
                              height: '48px',
                              borderRadius: '50%',
                              objectFit: 'cover'
                            }}
                          />
                        </Box>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        flexGrow: '1'
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          flexGrow: '1'
                        }}
                      >
                        <Box>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography
                              style={{
                                fontSize: '14px',
                                fontFamily: 'Open Sans',
                                fontWeight: '600'
                              }}
                            >
                              {matchDetails?.mentee?.displayName}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              marginTop: '5px'
                            }}
                          >
                            <Typography
                              style={{
                                fontSize: '14px',
                                fontFamily: 'Open Sans',
                                fontWeight: '400',
                                color: '#68717A',
                                marginTop: '-5px'
                              }}
                            >
                              {matchDetails?.mentee?.bio?.workHistory?.role ||
                                matchDetails?.mentee?.bio?.education?.major}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      flexDirection: 'column'
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: '12px',
                        fontFamily: 'Open Sans',
                        fontWeight: '600',
                        color: '#ABB5BE'
                      }}
                    >
                      {matchDetails?.matchType}
                    </Typography>
                    <span style={{ color: '#ABB5BE' }}>
                      <ChevronLeftIcon />
                      ----------
                      <ChevronRightIcon />
                    </span>
                    <Typography
                      sx={{
                        fontSize: '12px',
                        fontFamily: 'Open Sans',
                        fontWeight: '600',
                        color: '#DF6438'
                      }}
                    >
                      {' '}
                      {matchDetails?.startDate !== 'No start Date Yet' && formattedDate}
                      {matchDetails?.startDate === 'No start Date Yet' && matchDetails?.startDate}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      padding: '13px 0'
                    }}
                  >
                    <Box sx={{ marginRight: '8px' }}>
                      <Box className={classes.memberCircleImage}>
                        <Box className={classes.memberCircleInner}>
                          <img
                            src={matchDetails?.mentor?.headshot}
                            alt="womencircle"
                            style={{
                              padding: 0,
                              margin: 0,
                              width: '48px',
                              height: '48px',
                              borderRadius: '50%',
                              objectFit: 'cover'
                            }}
                          />
                        </Box>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        flexGrow: '1'
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          flexGrow: '1'
                        }}
                      >
                        <Box>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography
                              style={{
                                fontSize: '14px',
                                fontFamily: 'Open Sans',
                                fontWeight: '600'
                              }}
                            >
                              {matchDetails?.mentor?.displayName}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              marginTop: '5px'
                            }}
                          >
                            <Typography
                              style={{
                                fontSize: '14px',
                                fontFamily: 'Open Sans',
                                fontWeight: '400',
                                color: '#68717A',
                                marginTop: '-5px'
                              }}
                            >
                              {matchDetails?.mentor?.bio?.workHistory?.role ||
                                matchDetails?.mentor?.bio?.education?.major}{' '}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Divider style={{ margin: '15px 0' }} />
                {/* <Divider style={{ margin: "15px 0" }} /> */}
                <Typography
                  sx={{
                    fontSize: '16x',
                    fontWeight: '400',
                    color: '#152536',
                    fontFamily: 'Open Sans'
                  }}
                >
                  Matching Criteria
                </Typography>
                <Grid container spacing={2} style={{ marginTop: '10px', marginBottom: '10px' }}>
                  {matchDetails?.searchQuery?.map((ele: any) => {
                    if (ele.field === 'gender' || ele.field === 'firstGenStudent' || ele.field === 'ethnicity') {
                      return (
                        <Grid item lg={4} md={4} sm={6}>
                          <Box>
                            <Box
                              sx={{
                                fontFamily: 'Open Sans',
                                fontSize: '12px',
                                fontWeight: '400',
                                lineHeight: '16px',
                                color: '#68717A',
                                marginBottom: '10px'
                              }}
                            >
                              {ele?.field === 'gender'
                                ? 'Gender'
                                : ele?.field === 'firstGenStudent'
                                ? '1st Generation'
                                : ele?.field === 'ethnicity'
                                ? 'Ethnicity'
                                : ''}
                              <CheckCircleIcon
                                sx={{
                                  color: '#20C997',
                                  width: '13px',
                                  height: '13px',
                                  marginLeft: '5px'
                                }}
                              />
                            </Box>

                            <Box
                              className="profile-text"
                              sx={{
                                fontFamily: 'Open Sans',
                                fontSize: '14px',
                                fontWeight: '600',
                                lineHeight: '19px',
                                color: '#152536'
                                // width: "110px",
                              }}
                            >
                              {ele?.value ? ele?.value : '---'}
                            </Box>
                          </Box>
                        </Grid>
                      );
                    } else {
                      return null;
                    }
                  })}
                </Grid>

                <Divider />

                <Box style={{ marginTop: '10px', marginBottom: '10px' }}>
                  {matchDetails?.searchQuery?.map((ele: any, index: number) => (
                    <>
                      {/* {ele?.matchedValues?.length > 0 && (
                  <Typography
                    sx={{
                      fontFamily: "Open Sans",
                      fontSize: "16px",
                      fontWeight: "400",
                      margin: "15px 0",
                    }}
                  >
                    {ele?.field}
                  </Typography>
                )} */}
                      {ele?.matchedValues?.length > 0 && (
                        <Typography
                          sx={{
                            fontFamily: 'Open Sans',
                            fontSize: '16px',
                            fontWeight: '400',
                            margin: '15px 0'
                          }}
                        >
                          {capitalizeFirstLetter(ele?.field)}
                        </Typography>
                      )}
                      {ele?.unmatchedValues?.length > 0 && (
                        <Typography
                          sx={{
                            fontFamily: 'Open Sans',
                            fontSize: '16px',
                            fontWeight: '400',
                            margin: '15px 0'
                          }}
                        >
                          {capitalizeFirstLetter(ele?.field)}
                        </Typography>
                      )}

                      <div style={{ display: 'flex' }}>
                        {ele?.matchedValues?.length > 0 && (
                          <div>
                            {ele.matchedValues?.map((value: any, idx: number) => (
                              <Button
                                key={idx}
                                style={{
                                  background: '#20C997',
                                  borderRadius: '16px',
                                  fontSize: '14px',
                                  fontWeight: '400',
                                  color: '#fff',
                                  marginRight: '10px'
                                }}
                                className="my-2"
                              >
                                {value}
                              </Button>
                            ))}
                          </div>
                        )}

                        {ele?.unmatchedValues?.length > 0 && (
                          <div>
                            {ele.unmatchedValues.map((value: any, idx: number) => (
                              <Button
                                key={idx}
                                style={{
                                  background: '#6C757D',
                                  borderRadius: '16px',
                                  fontSize: '14px',
                                  fontWeight: '400',
                                  color: '#fff',
                                  marginRight: '10px'
                                }}
                                className="my-2"
                              >
                                {value}
                              </Button>
                            ))}
                          </div>
                        )}
                      </div>
                    </>
                  ))}
                </Box>
              </DialogContent>
            </>
          ) : (
            <AppLoader />
          )}
        </Dialog>
      </div>
    </div>
  );
}

export default MatchDetailsPopup;
