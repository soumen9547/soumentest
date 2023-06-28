import { Box, Divider, Typography } from '@mui/material';
// import { makeStyles } from "@mui/styles";
// import industriesimg from "./../../../../../assets/images/industriesimg.svg";
// import resumeimg from "./../../../../../assets/images/resumeimg.svg";

function LibraryRecommended() {
  // const useStyles = makeStyles({
  //   memberCommonText: {
  //     display: "flex",
  //     alignItems: "center",
  //     justifyContent: "space-between",
  //   },
  //   LibraryOverviewText: {
  //     fontFamily: "Open Sans",
  //     fontSize: "16px",
  //     fontWeight: "600",
  //     color: "#000000",
  //   },
  //   LibrarySecondText: {
  //     fontFamily: "Open Sans",
  //     fontSize: "14px",
  //     fontWeight: "400",
  //     color: "#68717A",
  //   },
  // });

  // const classes = useStyles();
  return (
    <div>
      <Box
        sx={{
          background: '#FFFFFF',
          border: '1px solid #EFF0F4',
          borderRadius: '8px',
          boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
          marginTop: '20px',
          marginRight: '15px'
        }}
      >
        <Box>
          <Typography
            sx={{
              fontFamily: 'Open Sans',
              fontSize: '16px',
              fontWeight: '600',
              color: '#152536',
              padding: '13px'
            }}
          >
            Recommended Content
          </Typography>

          <Divider />

          {/* <Box sx={{ display: "flex", padding: "13px" }}>
            <img
              src={resumeimg}
              alt="resumeimg"
              style={{
                padding: 0,
                margin: 0,
                width: "100px",
                height: "79px",
                objectFit: "cover",
                marginRight: "10px",
              }}
            />
            <Box>
              <Typography className={classes.LibraryOverviewText}>
                Overview of Top US Industries in 2022
              </Typography>
              <Typography className={classes.LibrarySecondText}>
                4:06
              </Typography>
            </Box>
          </Box>
          <Divider />

          <Box sx={{ display: "flex", padding: "13px" }}>
            <img
              src={industriesimg}
              alt="resumeimg"
              style={{
                padding: 0,
                margin: 0,
                width: "100px",
                height: "79px",
                objectFit: "cover",
                marginRight: "10px",
              }}
            />
            <Box>
              <Typography className={classes.LibraryOverviewText}>
                Overview of Top US Industries in 2022
              </Typography>
              <Typography className={classes.LibrarySecondText}>
                4:06
              </Typography>
            </Box>
          </Box>
          <Divider />
          <Box sx={{ display: "flex", padding: "13px" }}>
            <img
              src={resumeimg}
              alt="resumeimg"
              style={{
                padding: 0,
                margin: 0,
                width: "100px",
                height: "79px",
                objectFit: "cover",
                marginRight: "10px",
              }}
            />
            <Box>
              <Typography className={classes.LibraryOverviewText}>
                Overview of Top US Industries in 2022
              </Typography>
              <Typography className={classes.LibrarySecondText}>
                4:06
              </Typography>
            </Box>
          </Box> */}
        </Box>
      </Box>
    </div>
  );
}

export default LibraryRecommended;
