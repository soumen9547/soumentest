/* eslint-disable @typescript-eslint/prefer-optional-chain */
/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  // InputLabel,
  IconButton,
  // Grid,
  TextField
} from '@material-ui/core';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { Button, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { appColors } from '../../../../../utils/theme';
// assign a menter popup
import { makeStyles } from '@mui/styles';
import { LoadingButton } from '@mui/lab';
// import { featchMatches } from "../../../../redux/slices/getAllMatches/getAllMatchesSlice";
// import { AppLoader } from "../../../../components/AppLoader";
// import { useSelector } from "react-redux";

interface AssignMatchPopup2Props {
  openAssignMentorSecond: any;
  handelCloseAssineMatch: any;
  action: any;
  recommendations: any;
  setSelectedRecommendation: any;
  suggestions: any;
  handleSubmitAssignMatch: any;
  loaderFirstPopup: any;
}
function AssignMatchPopup2({
  openAssignMentorSecond,
  handelCloseAssineMatch,
  action,
  recommendations,
  suggestions,
  setSelectedRecommendation,
  handleSubmitAssignMatch,
  loaderFirstPopup
}: AssignMatchPopup2Props) {
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

  const classes = useStyles();
  // if (!suggestions) {
  //   return <div> No Matching Found</div>;
  // }
  // if (!recommendations) {
  //   return <div> No Matching Found</div>;
  // }
  // console.log(recommendations, "recommendations");
  return (
    <div>
      <div>
        <Dialog
          open={openAssignMentorSecond}
          onClose={handelCloseAssineMatch}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth
        >
          <DialogTitle id="alert-dialog-title" className="informationtext">
            {action === 'Assign Mentor' ? 'Assign a mentor' : 'Assign a mentee'}

            <IconButton onClick={handelCloseAssineMatch} style={{ float: 'right' }}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <Divider />
          <DialogContent>
            <Box
              sx={{
                margin: '15px 0'
              }}
            >
              <Box
                border={`1px solid ${appColors.gray1}`}
                borderRadius={2}
                display="flex"
                alignItems="center"
                width="100%"
                height="40px"
                padding={1.2}
              >
                <SearchIcon
                  sx={{
                    color: appColors.gray4,
                    marginRight: '7px',
                    width: '16.6px',
                    height: '16.6px'
                  }}
                />
                <TextField
                  variant="standard"
                  placeholder="Search Mentor"
                  style={{
                    borderColor: 'transparent',
                    padding: '0px !important',
                    margin: 0,
                    paddingBottom: 0,
                    color: '#68717A'
                  }}
                  size="small"
                  type="text"
                  InputProps={{
                    disableUnderline: true
                  }}
                />
              </Box>
            </Box>
            <Typography
              sx={{
                fontFamily: 'Open Sans',
                fontSize: '16px',
                fontWeight: '600',
                color: '#68717A'
              }}
            >
              Recommended
            </Typography>

            {recommendations &&
              recommendations?.map((ele: any, index: any) => (
                <Box
                  sx={{
                    display: 'flex',
                    borderBottom: '1px solid #EFF0F4',
                    padding: '13px'
                    // maxWidth: "360px",
                  }}
                >
                  <Box sx={{ marginRight: '8px' }}>
                    <Box className={classes.memberCircleImage}>
                      <Box className={classes.memberCircleInner}>
                        <img
                          src={ele?.headshot}
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
                          <Typography className={classes.membersNameText}>{ele?.displayName}</Typography>
                          <Button
                            className={classes.membersButton}
                            style={{
                              border: ' 1px solid #C7A429',
                              textTransform: 'capitalize',
                              color: '#C7A429'
                            }}
                          >
                            {ele?.role}
                          </Button>
                        </Box>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            marginTop: '5px'
                          }}
                        >
                          <Typography className={classes.menberDetailsText}>
                            {ele?.bio?.workHistory?.role || ele?.bio?.education?.major}{' '}
                          </Typography>
                        </Box>
                      </Box>
                      <Box>
                        <input
                          type="radio"
                          id={`radio-${index}`}
                          name="selectedRecommendation"
                          value={ele.mentorId}
                          onChange={() => setSelectedRecommendation(ele)}
                        />
                      </Box>
                    </Box>
                  </Box>
                </Box>
              ))}
            {!recommendations ? (
              <Typography
                sx={{
                  fontFamily: 'Open Sans',
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#68717A',
                  marginTop: '10px'
                }}
              >
                No Matching Found{' '}
              </Typography>
            ) : (
              ''
            )}
            <Divider />

            {suggestions && (
              <Typography
                sx={{
                  fontFamily: 'Open Sans',
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#68717A',
                  marginTop: '10px'
                }}
              >
                All {recommendations[0]?.role === 'Mentor' ? 'Mentor' : 'Mentee'}
              </Typography>
            )}
            {suggestions &&
              suggestions?.map((ele: any, index: any) => (
                <Box
                  sx={{
                    display: 'flex',
                    borderBottom: '1px solid #EFF0F4',
                    padding: '13px'
                    // maxWidth: "360px",
                  }}
                >
                  <Box sx={{ marginRight: '8px' }}>
                    <Box className={classes.memberCircleImage}>
                      <Box className={classes.memberCircleInner}>
                        <img
                          src={ele?.headshot}
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
                          <Typography className={classes.membersNameText}>{ele?.displayName}</Typography>
                          <Button
                            className={classes.membersButton}
                            style={{
                              border: ' 1px solid #C7A429',
                              textTransform: 'capitalize',
                              color: '#C7A429'
                            }}
                          >
                            {ele?.role}
                          </Button>
                        </Box>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            marginTop: '5px'
                          }}
                        >
                          <Typography className={classes.menberDetailsText}>
                            {ele?.bio?.workHistory?.role || ele?.bio?.education?.major}{' '}
                          </Typography>
                        </Box>
                      </Box>
                      <Box>
                        <input
                          type="radio"
                          id={`radio-${index}`}
                          name="selectedRecommendation"
                          value={ele.mentorId}
                          onChange={() => setSelectedRecommendation(ele)}
                        />
                      </Box>
                    </Box>
                  </Box>
                </Box>
              ))}
          </DialogContent>

          <DialogActions style={{ padding: '15px 0', justifyContent: 'center' }}>
            <LoadingButton
              style={
                loaderFirstPopup
                  ? {}
                  : {
                      fontFamily: 'Open Sans',
                      fontSize: '16px',
                      fontWeight: '700',
                      color: '#fff',
                      background: '#152536',
                      borderRadius: '8px',
                      width: '560px',
                      height: '50px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer'
                    }
              }
              loading={loaderFirstPopup}
              onClick={handleSubmitAssignMatch}
            >
              Select
            </LoadingButton>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default AssignMatchPopup2;
