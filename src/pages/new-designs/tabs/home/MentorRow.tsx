/* eslint-disable no-duplicate-imports */
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
// import frameimg from "../../../../assets/images/frameimg.svg";
import frequency from '../../../../assets/images/frequency.svg';
import chaticon from '../../../../assets/images/chaticon.svg';
// import celendericon from "../../../../assets/images/celendericon.svg";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { useNavigate } from 'react-router-dom';
import { chatProfileActions } from '../../../../redux/slices/chat-profile/chatProfileSlice';
import { Divider } from '@material-ui/core';
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Popover,
  Typography
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useLocation } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import womenimg from '../../../../assets/images/womenimg.svg';
import resumeimg from '../../../../assets/images/resumeimg.svg';
import pencile from '../../../../assets/images/pencil.svg';
import delecticon from '../../../../assets/images/delecticon.svg';
import notesimg from '../../../../assets/images/notesimg.svg';
import Filter from '../../../../assets/images/Filter.svg';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import smileimg from '../../../../assets/images/smileimg.svg';
import CloseIcon from '@mui/icons-material/Close';
import arrowsubtract from '../../../../assets/images/arrowsubtract.svg';
import ChatAvatarComponent from '../chat/ChatAvatarComponent';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import _ from 'lodash';
import AvatarRow from './Avatars';

const MentorRow = () => {
  const { state } = useLocation();
  // console.log("state",state);
  const tableStyle = {
    fontWeigth: '600',
    color: '#68717A',
    fontSize: '12px',
    fontFamily: 'Open Sans',
    marginBottom: '0 !important'
  };
  const textStyle = {
    fontWeigth: '600 !important',
    color: '#152536',
    fontSize: '16px',
    fontFamily: 'Open Sans',
    cursor: 'pointer'
  };
  const useStyles = makeStyles({
    membersNameText: {
      fontSize: '16px !important',
      fontFamily: 'Open Sans !important',
      fontWeight: '600 !important',
      color: '#152536 !important',
      marginRight: '10px !important'
    },
    mentorCard: {
      color: '#152536 !important',
      fontSize: '16px !important',
      fontFamily: 'Open Sans !important',
      fontWeigth: '400 !important'
    },
    headingText: {
      fontWeigth: '700 !important',
      color: '#152536',
      fontSize: '14px',
      fontFamily: 'Open Sans',
      marginBottom: '20px'
    },
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
    timeText: {
      fontSize: '14px !important',
      fontWeight: '400 !important',
      fontFamily: 'Open Sans !important',
      color: '#68717A !important'
    },
    overviewText: {
      fontSize: '16px !important',
      fontWeight: '600 !important',
      fontFamily: 'Open Sans !important',
      color: '#000000 !important',
      width: '160px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    },

    membersButton: {
      borderRadius: '5px',
      fontFamily: 'Open Sans',
      fontSize: '12px',
      fontWeight: '600',
      minWidth: '62px',
      height: '24px'
    },
    menberDetailsText: {
      fontSize: '14px !important',
      fontWeight: '400 !important',
      fontFamily: 'Open Sans !important',
      color: '#68717A !important'
    }
  });
  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800]
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: '#28A745'
    }
  }));
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [selectedMember, setSelectedMember] = useState<any>({});
  const dispatch = useAppDispatch();
  const personalThreadsArr = useAppSelector((state) => state.acsChannels.personalThreadsArr);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const [openNotes, setOpenNotes] = React.useState(false);
  const [openPeers, setOpenPeers] = React.useState(false);
  const navigate = useNavigate();
  const navigateToChat = () => {
    // console.log('chatprofile', selectedMember);
    let communicationId = _.get(selectedMember, 'communicationUserId', '');
    if (!communicationId) {
      communicationId = _.get(selectedMember, 'communicationId', '');
    }
    const channel = personalThreadsArr?.find((each) => each?.displayNames?.includes(communicationId));
    dispatch(chatProfileActions.atnSetChatProfileState(null));
    // dispatch(userEducationActions.clearEducation(null));
    // dispatch(userWorkHistoryActions.clearWorkHistory(null));
    // setActiveChat("Chats");
    if (communicationId && channel) {
      navigate(`/app/chat/?threadid=${_.get(channel, 'id')}&type=Chats&name=${_.get(channel, 'topic')}`);
    } else if (communicationId && !channel) {
      navigate(`/app/chat/?commId=${communicationId}`);
    }
  };

  // const handleOpenPeers=()=>{
  //   setOpenPeers(true);
  // }

  const handleClosePeers = () => {
    setOpenPeers(false);
  };

  const handleClickOpenNotes = () => {
    setOpenNotes(true);
  };

  const handleCloseNotes = () => {
    setOpenNotes(false);
  };

  /** Taking all mentors headshots */
  // console.log('mentorsArr', state?.mentorsArr);
  const avatars: any = state?.mentorsArr.map((each: any) => each?.headshot);

  const getName = (each: any) => {
    const chatProfileFirstName: any = _.get(each, 'firstName', '');
    const chatProfileLastName: any = _.get(each, 'lastName', '');
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
    <>
      <TableRow>
        <TableCell>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ marginRight: '8px' }}>
              <Box className={classes.memberCircleImage}>
                <Box className={classes.memberCircleInner}>
                  <img
                    src={womenimg}
                    alt="womencircle"
                    style={{
                      padding: 0,
                      margin: 0,
                      width: '34px',
                      height: '34px',
                      borderRadius: '50%',
                      objectFit: 'cover'
                    }}
                  />
                </Box>
              </Box>
            </Box>
            <Box>
              <Typography style={textStyle}>Mallory Capoferri</Typography>
            </Box>
          </Box>
        </TableCell>

        <TableCell>
          <Typography>4th year</Typography>
        </TableCell>
        <TableCell>
          {' '}
          <Typography>Biology Major</Typography>
        </TableCell>
        <TableCell style={{ textAlign: 'center' }}>
          {' '}
          <img
            src={smileimg}
            alt="smileimg"
            style={{
              padding: 0,
              margin: 0,
              width: '24px',
              height: '24px'
            }}
          />
        </TableCell>
        <TableCell>
          {' '}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <BorderLinearProgress
              variant="determinate"
              value={30}
              sx={{
                width: '70px',
                height: '8px',
                background: '#DF6438'
              }}
            />
            <span
              style={{
                color: '#68717A',
                opacity: '0.8',
                marginLeft: '6px',
                fontSize: '14px'
              }}
            >
              30%
            </span>
          </Box>
        </TableCell>

        <TableCell>12 days ago</TableCell>
        <TableCell>2 h 20 m</TableCell>

        <TableCell>
          <IconButton onClick={handleClick}>
            <MoreVertIcon sx={{ color: '#152536' }} />
          </IconButton>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton>
                <img
                  src={pencile}
                  alt="pencil"
                  style={{
                    padding: 0,
                    margin: 0,
                    width: '20px',
                    height: '20px'
                  }}
                />
              </IconButton>
              <Typography
                sx={{
                  fontSize: '14px',
                  fontWeight: '400',
                  fontFamily: 'Open Sans'
                }}
              >
                Edit
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton>
                <img
                  src={notesimg}
                  alt="pencil"
                  style={{
                    padding: 0,
                    margin: 0,
                    width: '20px',
                    height: '20px'
                  }}
                />
              </IconButton>
              <Typography
                sx={{
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '400',
                  fontFamily: 'Open Sans'
                }}
                onClick={handleClickOpenNotes}
              >
                Notes
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton>
                <img
                  src={delecticon}
                  alt="pencil"
                  style={{
                    padding: 0,
                    margin: 0,
                    width: '20px',
                    height: '20px'
                  }}
                />
              </IconButton>
              <Typography
                sx={{
                  fontSize: '14px',
                  fontWeight: '400',
                  fontFamily: 'Open Sans'
                }}
              >
                Delete
              </Typography>
            </Box>
          </Popover>
        </TableCell>
      </TableRow>

      <div>
        <Dialog
          open={openNotes}
          onClose={handleCloseNotes}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth
        >
          <DialogTitle
            id="alert-dialog-title"
            style={{
              fontFamily: 'Open Sans',
              textAlign: 'center',
              fontSize: '22px',
              fontWeight: '600',
              color: '#152536'
            }}
          >
            Notes for Mallory Capoferri
            <IconButton onClick={handleClose} sx={{ float: 'right' }}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <Divider />
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Typography
                  sx={{
                    fontSize: '14px',
                    fontWeight: '600',
                    fontFamily: 'Open Sans',
                    color: '#152536'
                  }}
                >
                  Notes Title
                </Typography>
                <Typography
                  sx={{
                    fontSize: '12px',
                    fontWeight: '400',
                    fontFamily: 'Open Sans',
                    color: '#ABB5BE'
                  }}
                >
                  5 min ago
                </Typography>
              </Box>
              <Typography
                sx={{
                  fontSize: '14px',
                  fontWeight: '400',
                  fontFamily: 'Open Sans',
                  color: '#68717A',
                  margin: '10px 0'
                }}
              >
                Lorem ipsum dolor sit amet consectetur. Sagittis elit quam suspendisse enim. Et praesent consectetur mi
                pulvinar. Ut amet scelerisque mi ultricies semper viverra. Lorem ipsum dolor sit amet consectetur.
                Sagittis elit quam suspendisse enim. Et praesent consectetur mi pulvinar. Ut amet scelerisque mi
                ultricies semper viverra.
              </Typography>
              <Typography
                sx={{
                  fontSize: '10px',
                  fontWeight: '400',
                  fontFamily: 'Open Sans',
                  color: '#DC3545',
                  textAlign: 'right',
                  margin: '15px 0'
                }}
              >
                Remove
              </Typography>
              <Divider style={{ marginBottom: '10px' }} />
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Typography
                  sx={{
                    fontSize: '14px',
                    fontWeight: '600',
                    fontFamily: 'Open Sans',
                    color: '#152536'
                  }}
                >
                  Notes Title
                </Typography>
                <Typography
                  sx={{
                    fontSize: '12px',
                    fontWeight: '400',
                    fontFamily: 'Open Sans',
                    color: '#ABB5BE'
                  }}
                >
                  01/13/2023
                </Typography>
              </Box>
              <Typography
                sx={{
                  fontSize: '14px',
                  fontWeight: '400',
                  fontFamily: 'Open Sans',
                  color: '#68717A',
                  margin: '10px 0'
                }}
              >
                Lorem ipsum dolor sit amet consectetur. Sagittis elit quam suspendisse enim. Et praesent consectetur mi
                pulvinar. Ut amet scelerisque mi ultricies semper viverra. Lorem ipsum dolor sit amet consectetur.
                Sagittis elit quam suspendisse enim. Et praesent consectetur mi pulvinar. Ut amet scelerisque mi
                ultricies semper viverra.
              </Typography>
              <Typography
                sx={{
                  fontSize: '10px',
                  fontWeight: '400',
                  fontFamily: 'Open Sans',
                  color: '#DC3545',
                  textAlign: 'right',
                  margin: '15px 0'
                }}
              >
                Remove
              </Typography>
              <Divider style={{ marginBottom: '10px' }} />

              <Box
                sx={{
                  border: '1px solid #DEE2E6',
                  borderRadius: '8px',
                  width: '100%',
                  height: '99px',
                  marginTop: '30px',
                  position: 'relative'
                }}
              >
                <Box
                  sx={{
                    background: '#0082B6',
                    border: '1px solid #0071A9',
                    boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.08)',
                    borderRadius: '8px',
                    height: '32px',
                    width: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                    right: '15px',
                    bottom: '15px',
                    cursor: 'pointer'
                  }}
                >
                  <img
                    src={arrowsubtract}
                    alt="arrowsubtract"
                    style={{
                      padding: 0,
                      margin: 0,
                      width: '14px',
                      height: '16px'
                    }}
                  />
                </Box>
              </Box>
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default MentorRow;
