import React from 'react';
import { Box, Grid, Stack, Divider, Typography, CardMedia } from '@mui/material';
import { makeStyles } from '@mui/styles';
import uparrow from '../../../../assets/images/uparrow.svg';
import frequency from '../../../../assets/images/frequency.svg';
import groupprogram from '../../../../assets/images/groupprogram.svg';
import circleicon from '../../../../assets/images/circleicon.svg';
import AvatarRow from './Avatars';
import {
  MyCardBox,
  MyCardHeading,
  MyTypography,
  MyCardMedia,
  BigValueTypography
} from '../../style-components/CardStyling';

/** Added extra headshots */
const avatars = [
  'https://dosen.io/images/litters-images/d.png',
  'https://dosen.io/images/litters-images/o.png',
  'https://dosen.io/images/litters-images/s.png',
  'https://dosen.io/images/litters-images/e.png',
  'https://dosen.io/images/litters-images/n.png',
  'https://dosen.io/images/litters-images/i.png'
];

const Admin = () => {
  const useStyles = makeStyles({
    circleBorder: {
      border: '1px solid #339BC5',
      width: '40px',
      borderRadius: '50%',
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    circleText: {
      fontSize: '18px !important',
      fontWeight: '600 !important',
      color: '#0082B6 !important',
      fontFamily: 'Open Sans !important'
    },
    surveyText: {
      fontSize: '14px !important',
      fontWeight: '600 !important',
      color: '#152536 !important',
      fontFamily: 'Open Sans !important'
    },
    buildText: {
      fontSize: '14px !important',
      fontWeight: '400 !important',
      color: '#68717A !important',
      fontFamily: 'Open Sans !important'
    }
  });

  const classes = useStyles();

  return (
    <Box className="bodyBox">
      <Typography
        sx={{ fontSize: '20px', fontFamily: 'Open Sans', fontWeight: '400', color: '#152536', marginBottom: '15px' }}
      >
        Welcome, Sarah
      </Typography>
      <Grid container spacing={3}>
        <Grid item lg={3} md={6} sm={6}>
          <MyCardBox>
            <Box mb={1}>
              <Stack direction="row" justifyContent="space-between">
                <MyCardHeading>Active Users</MyCardHeading>
                <Stack direction="row" justifyContent="center" alignItems="baseline">
                  <MyCardMedia image={uparrow} title="uparrow" />
                  <Typography style={{ color: '#1AA179', fontSize: '18px' }}>24</Typography>
                </Stack>
              </Stack>
              <MyTypography>Last 30 days</MyTypography>
            </Box>
            <Box sx={{ height: '155px' }}>
              <BigValueTypography>
                {/* {_.get(data, "members", "")} */}
                413
              </BigValueTypography>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {/* <img
                  src={frameimg}
                  alt="frameimg"
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "120px",
                    height: "64px",
                  }}
                />
                <Typography
                  style={{
                    color: " #0071A9",
                    fontSize: "14px",
                    fontWeight: "400",
                    fontFamily: "Open Sans",
                    marginLeft: "20px",
                    cursor: "pointer",
                  }}
                >
                  View More
                </Typography> */}
                <AvatarRow avatars={avatars} />
              </Box>
            </Box>
          </MyCardBox>
        </Grid>
        <Grid item lg={3} md={6} sm={6}>
          <MyCardBox>
            <Box mb={1}>
              <Stack sx={{ marginBottom: '6px' }} direction="row" justifyContent="space-between">
                <MyCardHeading>Program ROI</MyCardHeading>
              </Stack>
              <MyTypography>Last 30 days</MyTypography>
            </Box>
            <Box sx={{ height: '155px' }}>
              <BigValueTypography>
                <sup style={{ fontSize: '30px' }}>$</sup>900K
              </BigValueTypography>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <img
                  src={frequency}
                  alt="frequency"
                  style={{
                    padding: 0,
                    margin: 0,
                    width: '100%'
                  }}
                />
              </Box>
            </Box>
          </MyCardBox>
        </Grid>
        <Grid item lg={3} md={6} sm={6}>
          <MyCardBox>
            <Box mb={1}>
              <Stack direction="row" justifyContent="space-between">
                <MyCardHeading>Goal Progress</MyCardHeading>
                <Stack direction="row" justifyContent="center" alignItems="baseline">
                  <MyCardMedia image={uparrow} title="uparrow" />
                  <Typography style={{ color: '#1AA179', fontSize: '18px' }}>21%</Typography>
                </Stack>
              </Stack>
              <MyTypography>Last 30 days</MyTypography>
            </Box>
            <Box sx={{ height: '155px', textAlign: 'center' }}>
              <img
                src={groupprogram}
                alt="groupprogram"
                style={{
                  padding: 0,
                  margin: 0,
                  width: '150px'
                }}
              />
            </Box>
          </MyCardBox>
        </Grid>
        <Grid item lg={3} md={6} sm={6}>
          <MyCardBox>
            <Box mb={1}>
              <Stack direction="row" justifyContent="space-between">
                <MyCardHeading>Experience Points</MyCardHeading>
                <Stack direction="row" justifyContent="center" alignItems="baseline">
                  <MyCardMedia image={uparrow} title="uparrow" />
                  <Typography style={{ color: '#1AA179', fontSize: '18px' }}>203</Typography>
                </Stack>
              </Stack>
              <MyTypography>Last 30 days</MyTypography>
            </Box>
            <Box
              sx={{
                height: '120px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <CardMedia
                image={circleicon}
                title="logo"
                style={{
                  padding: 0,
                  margin: 0,
                  width: '65px',
                  height: '65px'
                }}
              />
              <BigValueTypography>12,971</BigValueTypography>
            </Box>
          </MyCardBox>
        </Grid>
      </Grid>

      {/* Recommended Actions, New Users, Upcoming Events sections */}
      <Box sx={{ background: '#fff', border: '1px solid #EFF0F4', borderRadius: '8px', margin: '20px 0 40px' }}>
        <Box sx={{ display: 'flex', columnGap: '70px', padding: '20px 20px 0' }}>
          <Typography
            style={{
              borderBottom: '3px solid #DF6438',
              color: '#DF6438',
              paddingBottom: '15px',
              fontSize: '14px',
              fontWeight: '600',
              fontFamily: 'Open Sans',
              cursor: 'pointer'
            }}
          >
            Recommended Actions
          </Typography>
          <Typography
            style={{
              fontSize: '14px',
              fontWeight: '400',
              fontFamily: 'Open Sans',
              cursor: 'pointer',
              color: '#152536'
            }}
          >
            New Users
          </Typography>
          <Typography
            style={{
              fontSize: '14px',
              fontWeight: '400',
              fontFamily: 'Open Sans',
              cursor: 'pointer',
              color: '#152536'
            }}
          >
            Upcoming Events
          </Typography>
        </Box>
        <Divider />
        <Box sx={{ padding: '15px 20px 0' }}>
          <Typography sx={{ fontFamily: 'Open Sans', fontSize: '14px', fontWeight: '400' }}>
            Proactive outreach with a simple nudge can help increase engagement from your community.
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', columnGap: '10px' }}>
            <Box className={classes.circleBorder}>
              <Typography className={classes.circleText}>31</Typography>
            </Box>
            <Box sx={{ margin: '10px 0 15px' }}>
              <Typography className={classes.surveyText}>Survey responses</Typography>
              <Typography className={classes.buildText}>
                Build a stronger community by gathering survey data from your users
              </Typography>
            </Box>
          </Box>
          <Divider />
        </Box>
        <Box sx={{ padding: '15px 20px 0' }}>
          <Typography sx={{ fontFamily: 'Open Sans', fontSize: '14px', fontWeight: '400' }}>
            Proactive outreach with a simple nudge can help increase engagement from your community.
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', columnGap: '10px' }}>
            <Box className={classes.circleBorder}>
              <Typography className={classes.circleText}>24</Typography>
            </Box>
            <Box sx={{ margin: '10px 0 15px' }}>
              <Typography className={classes.surveyText}>Inactive members</Typography>
              <Typography className={classes.buildText}>
                Reach out to inactive members to drive account activation users
              </Typography>
            </Box>
          </Box>
          <Divider />
        </Box>
        <Box sx={{ padding: '15px 20px 0' }}>
          <Typography sx={{ fontFamily: 'Open Sans', fontSize: '14px', fontWeight: '400' }}>
            Proactive outreach with a simple nudge can help increase engagement from your community.
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', columnGap: '10px' }}>
            <Box className={classes.circleBorder}>
              <Typography className={classes.circleText}>6</Typography>
            </Box>
            <Box sx={{ margin: '10px 0 15px' }}>
              <Typography className={classes.surveyText}>Unresponsive members</Typography>
              <Typography className={classes.buildText}>
                Reach out to unresponsive members to help them re-engage
              </Typography>
            </Box>
          </Box>
          <Divider />
        </Box>
        <Box sx={{ padding: '15px 20px 0' }}>
          <Typography sx={{ fontFamily: 'Open Sans', fontSize: '14px', fontWeight: '400' }}>
            Proactive outreach with a simple nudge can help increase engagement from your community.
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', columnGap: '10px' }}>
            <Box className={classes.circleBorder}>
              <Typography className={classes.circleText}>19</Typography>
            </Box>
            <Box sx={{ margin: '10px 0 15px' }}>
              <Typography className={classes.surveyText}>Milestone achievements</Typography>
              <Typography className={classes.buildText}>
                Congratulate your community on meaningful progress they have achieved
              </Typography>
            </Box>
          </Box>
          <Divider />
        </Box>
      </Box>
    </Box>
  );
};

export default Admin;
