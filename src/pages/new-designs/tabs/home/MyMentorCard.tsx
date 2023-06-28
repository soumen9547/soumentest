/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {
  Box,
  // Grid,
  // Dialog,
  Divider,
  Button,
  Typography,
  IconButton,
  Stack
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import shareimg from '../../../../assets/images/shareimg.svg';
import chaticon from '../../../../assets/images/chaticon.svg';
import celendericon from '../../../../assets/images/celendericon.svg';
import greenthumbsup from '../../../../assets/images/greenthumbsup.svg';
import _ from 'lodash';

const MyMentorCard = ({ myMentorList }: any) => {
  const useStyles = makeStyles({
    profileHeading: {
      color: '#152536 !important',
      fontSize: '16px !important',
      fontFamily: 'Open Sans !important',
      fontWeigth: '600 !important'
    },
    officerHeading: {
      color: '#68717A !important',
      fontSize: '14px !important',
      fontFamily: 'Open Sans !important',
      fontWeigth: '400 !important',
      whiteSpace: 'nowrap'
    },
    greenText: {
      color: '#11895E !important',
      fontSize: '12px !important',
      fontFamily: 'Open Sans !important',
      fontWeigth: '600 !important'
    },
    alumniButton: {
      color: '#C7A429',
      fontSize: '12px',
      fontWeight: '600',
      fontFamily: 'Open Sans',
      border: '1px solid #C7A429',
      borderRadius: '5px',
      width: '54px',
      height: '24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    numberButton: {
      display: 'flex',
      alignItems: 'center',
      columnGap: '5px',
      border: '1px solid #11895E',
      borderRadius: '5px',
      width: '44px',
      height: '24px',
      justifyContent: 'center'
    },
    memberChatBttn: {
      fontSize: '14px !important',
      fontWeight: '600 !important',
      fontFamily: 'Open Sans !important',
      color: '#0082B6 !important',
      border: '1px solid #0082B6 !important',
      borderRadius: '29px !important',
      whiteSpace: 'nowrap'
    }
  });
  const classes = useStyles();

  const mentorCardCount = myMentorList?.length;
  const mentorsFound = mentorCardCount > 0;

  /** Mentor card */
  function MentorCard({ mentor }: any) {
    const getName = (mentor: any) => {
      const chatProfileFirstName: any = mentor?.displayName.split(' ')[0];
      const chatProfileLastName: any = mentor?.displayName.split(' ').slice(1).join(' ');
      return chatProfileFirstName
        ?.charAt(0)
        ?.toUpperCase()
        ?.concat(chatProfileFirstName?.slice(1)?.toLowerCase())
        ?.concat(
          ' ',
          chatProfileLastName?.charAt(0)?.toUpperCase()?.concat(chatProfileLastName?.slice(1)?.toLowerCase())
        );
    };
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            columnGap: '5px'
          }}
        >
          <IconButton sx={{ padding: '0' }}>
            <img
              // src={ronanprofile}
              src={mentor?.headshot}
              alt="profile"
              style={{
                padding: 0,
                margin: 0,
                borderRadius: '50%',
                width: '48px',
                height: '48px'
              }}
            />
          </IconButton>
          <Box>
            <Typography className={classes.profileHeading} sx={{ fontWeight: '600' }}>
              {/* Ronan Wall{" "} */}
              {/* {mentor?.displayName}{" "} */}
              {getName(mentor)}{' '}
            </Typography>
            <Typography className={classes.officerHeading}>
              {/* Chief Executive Officer, Dosen, LLC */}
              {mentor?.bio?.education?.major.concat(',') || mentor?.bio?.workHistory?.role.concat(',')}
              {mentor?.bio?.education?.university || mentor?.bio?.workHistory?.companyName}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                columnGap: '10px',
                marginTop: '10px'
              }}
            >
              <Box className={classes.alumniButton}>
                {/* Alumni */}
                {mentor?.category}
              </Box>
              <Box className={classes.numberButton}>
                <img
                  src={greenthumbsup}
                  alt="greenthumbsup"
                  style={{
                    padding: 0,
                    margin: 0,
                    width: '8px',
                    height: '9px'
                  }}
                />
                <Typography className={classes.greenText} sx={{ fontWeight: '600' }}>
                  94
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                columnGap: '10px',
                marginTop: '15px'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Button style={{ textTransform: 'capitalize' }} className={classes.memberChatBttn}>
                  <Box sx={{ marginRight: '10px' }}>
                    <img
                      src={chaticon}
                      alt="chaticon"
                      style={{
                        padding: 0,
                        width: '21px',
                        height: '21px',
                        marginRight: '10px!important',
                        cursor: 'pointer'
                      }}
                    />
                  </Box>
                  Chat with me
                </Button>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Button style={{ textTransform: 'capitalize' }} className={classes.memberChatBttn}>
                  <Box sx={{ marginRight: '10px' }}>
                    <img
                      src={celendericon}
                      alt="celendericon"
                      style={{
                        padding: 0,

                        width: '19px',
                        height: '19px'
                      }}
                    />
                  </Box>
                  Book a time
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box>
          <IconButton>
            <img
              src={shareimg}
              alt="profile"
              style={{
                padding: 0,
                margin: 0,
                width: '19px',
                height: '18px'
              }}
            />
          </IconButton>
        </Box>
      </Box>
    );
  }

  /** If this User no have any mentor  */
  function MentorNotFound() {
    return (
      <Stack direction="column" justifyContent="center" alignItems="center" spacing={3} padding={5}>
        <Typography sx={{ color: '#68717A', textAlign: 'center' }}>
          You have not assign any mentor yet.
          <br /> Please find mentor for you.
        </Typography>
        <Button
          sx={{
            fontSize: '16px',
            fontWeight: '700',
            fontFamily: 'Open Sans',
            color: '#fff',
            background: '#152536',
            borderRadius: '8px',
            height: '50px',
            width: '146px'
          }}
        >
          Find Mentor
        </Button>
      </Stack>
    );
  }

  return (
    <>
      {!mentorsFound ? (
        <MentorNotFound />
      ) : (
        <Box
          className="scroll-channel"
          sx={{
            padding: '16px 16px 30px',
            overflowX: 'hidden',
            width: '100%',
            ':hover': {
              overflow: 'overlay'
            }
          }}
        >
          <Stack direction="row" divider={<Divider orientation="vertical" flexItem />} spacing={2}>
            {mentorCardCount &&
              _.uniqBy([...myMentorList], 'displayName').map((each, index) => {
                return index < 5 ? <MentorCard key={index} mentor={each} /> : null;
              })}
          </Stack>
        </Box>
      )}
    </>
  );
};

export default MyMentorCard;
