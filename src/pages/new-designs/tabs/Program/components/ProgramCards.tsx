/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import uparrow from '../../../../../assets/images/uparrow.svg';
import frequency from '../../../../../assets/images/frequency.svg';
import circleicon from '../../../../../assets/images/circleicon.svg';
import AvatarRow from '../../home/Avatars';
import { Typography, Box, Grid, Stack, CardMedia } from '@mui/material';
// import _ from "lodash";
import {
  MyCardBox,
  MyCardMedia,
  MyTypography,
  MyCardHeading,
  BigValueTypography
} from '../../../style-components/CardStyling';

/** Added extra headshots */
const avatars = [
  'https://dosen.io/images/litters-images/d.png',
  'https://dosen.io/images/litters-images/o.png',
  'https://dosen.io/images/litters-images/s.png',
  'https://dosen.io/images/litters-images/e.png',
  'https://dosen.io/images/litters-images/n.png',
  'https://dosen.io/images/litters-images/i.png'
];

const ProgramCards = () => {
  return (
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
            <Typography
              sx={{
                color: '#152536',
                fontSize: '60px',
                fontFamily: ' Open Sans',
                fontWeight: '700',
                textAlign: 'center'
              }}
            >
              {/* {_.get(data, "members", "")} */}
              ---
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <AvatarRow avatars={avatars} />
              <Typography
                style={{
                  color: '#0071A9',
                  fontSize: '14px',
                  fontWeight: '400',
                  fontFamily: 'Open Sans',
                  marginLeft: '20px',
                  cursor: 'pointer'
                }}
              >
                View More
              </Typography>
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
            {/* <img
              src={groupprogram}
              alt="groupprogram"
              style={{
                padding: 0,
                margin: 0,
                width: "150px",
                // height: "13px",
              }}
            /> */}
            <Typography
              sx={{
                color: '#152536',
                fontSize: '50px',
                fontFamily: ' Open Sans',
                fontWeight: '700',
                textAlign: 'center',
                marginLeft: '5px'
              }}
            >
              {/* {_.get(data, "members", "")} */}
              ---
            </Typography>
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
  );
};

export default ProgramCards;
