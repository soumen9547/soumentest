/* eslint-disable react-hooks/exhaustive-deps */
import React, { SyntheticEvent, useEffect, useRef } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import _ from 'lodash';

const CommunitySidebar: React.FC<any> = ({ mem, selectedMember, onClickOnUserIcon, setMember }) => {
  const isActive: any = mem.userId === selectedMember.userId;
  const cat: any = mem.id.category;
  const useStyles = makeStyles({
    memberCommonText: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
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
    membersNameText: {
      fontSize: '16px !important',
      fontFamily: 'Open Sans !important',
      fontWeight: '600 !important',
      color: isActive ? '#FFFFFF' : '#152536',
      marginRight: '10px !important'
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
      color: isActive ? '#FFFFFF' : '#68717A'
    },
    memberChatBttn: {
      fontSize: '14px !important',
      fontWeight: '600 !important',
      fontFamily: 'Open Sans !important',
      color: '#0082B6 !important',
      border: '1px solid #0082B6 !important',
      borderRadius: '29px !important'
    },
    memberHelpBtn: {
      fontSize: '13px !important',
      fontWeight: '400 !important',
      fontFamily: 'Open Sans !important',
      color: '#68717A !important',
      border: '1px solid  #CED4DA !important',
      borderRadius: '29px !important',
      height: '29px',
      textTransform: 'capitalize',
      whiteSpace: 'nowrap'
    },
    priorHelpBtn: {
      fontSize: '13px !important',
      fontWeight: '400 !important',
      fontFamily: 'Open Sans !important',
      color: '#fff !important',
      borderRadius: '16px !important',
      background: '#0071A9 !important',
      height: '29px',
      textTransform: 'capitalize',
      whiteSpace: 'nowrap'
    },
    memberBoxSize: {
      background: '#fff',
      borderRadius: '8px',
      border: '1px solid #EFF0F4',
      margin: '16px 16px 16px 0'
    },
    memberWorkHistory: {
      fontFamily: 'Open Sans',
      fontWeight: '400',
      fontSize: '14px',
      lineHeight: '22px',
      color: ' #68717A',
      fontStyle: 'italic'
    },
    memberLanguage: {
      fontFamily: 'Open Sans',
      fontWeight: '400',
      fontSize: '12px',
      color: '#152536'
    },
    filterAccordionDetails: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '5px'
    },
    filterDetailsText: {
      FontFamily: 'Open Sans',
      fontWeight: '400!important',
      fontSize: '14px !important',
      color: '#68717A'
    },
    programPopupWrapper: {
      color: '#68717A',
      fontSize: '14px',
      fontFamily: 'Open Sans',
      fontWeigth: '400',
      marginBottom: '10px'
    },
    popupSummary: {
      FontFamily: 'Open Sans',
      fontWeight: '600 !important',
      fontSize: '16px !important',
      color: ' #152536'
    },
    programDialogTitle: {
      fontFamily: 'Open Sans',
      textAlign: 'center',
      fontSize: '22px',
      fontWeight: '600 !important',
      color: '#152536'
    },
    chatPersonWrapper: {
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: 'rgba(0,0,0,0.1)'
      }
    },
    activeChatPersonWrapper: {
      backgroundColor: '#0082B6'
    }
  });

  const refrence: any = useRef(null);
  const classes = useStyles();

  useEffect(() => {
    mem.userId === selectedMember.userId && refrence?.current?.scrollIntoView();
  }, [refrence?.current]);

  const addImageFallback = (event: SyntheticEvent<HTMLImageElement, Event>, displayName: string) => {
    event.currentTarget.src = `https://ui-avatars.com/api/?name=${displayName}`;
  };

  const getBio = () => {
    const category: any = mem?.id?.category;
    const major: any = mem?.bio?.education?.major;
    const university: any = mem?.bio?.education?.university;
    const role: any = mem?.bio?.workHistory?.role;
    const company: any = mem?.bio?.workHistory?.companyName;

    return category === 'Student' ? (
      <>
        <Typography className={classes.menberDetailsText}>
          {major
            ?.split(' ')
            ?.map((each: any) => each.charAt(0).toUpperCase().concat(each?.slice(1).toLowerCase()))
            .join(' ')
            .concat(',')}
        </Typography>
        <Typography className={classes.menberDetailsText}>
          {university
            ?.split(' ')
            ?.map((each: any) => each.charAt(0).toUpperCase().concat(each?.slice(1)))
            ?.join(' ')}
        </Typography>
      </>
    ) : (
      <>
        <Typography className={classes.menberDetailsText}>
          {role
            ?.split(' ')
            .map((each: any) => each.charAt(0).toUpperCase().concat(each?.slice(1)))
            .join(' ')
            ?.concat(',')}
        </Typography>
        <Typography className={classes.menberDetailsText}>
          {company
            ?.split(' ')
            ?.map((each: any) => each.charAt(0).toUpperCase().concat(each?.slice(1)))
            ?.join(' ')}
        </Typography>
      </>
    );
  };

  const getName = () => {
    const chatProfileFirstName: any = _.get(mem, 'id.firstName', '');
    const chatProfileLastName: any = _.get(mem, 'id.lastName', '');
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
        borderBottom: '1px solid #EFF0F4',
        padding: '13px'
      }}
      style={{ cursor: 'pointer' }}
      onClick={() => {
        setMember(mem);
        onClickOnUserIcon(mem);
      }}
      className={isActive ? classes.activeChatPersonWrapper : classes.chatPersonWrapper}
      ref={refrence}
    >
      <Box sx={{ marginRight: '8px' }}>
        <Box className={classes.memberCircleImage}>
          <Box className={classes.memberCircleInner}>
            <img
              src={mem?.id.headshot ? mem?.id.headshot : `https://ui-avatars.com/api/?name=${mem?.id.firstName}`}
              alt="imag"
              onError={(e) => addImageFallback(e, mem?.id.firstName)}
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
              <Typography className={classes.membersNameText}>{getName()}</Typography>
              <Button
                className={classes.membersButton}
                style={{
                  border: ` 1px solid ${
                    cat === 'Student'
                      ? '#2955C7'
                      : cat === 'Faculty'
                      ? '#11895E'
                      : cat === 'Mentor'
                      ? '#E99940'
                      : cat === 'Alumni'
                      ? '#C7A429'
                      : '#000000'
                  }`,
                  background: '#FFFFFF',
                  textTransform: 'capitalize',
                  color:
                    cat === 'Student'
                      ? '#2955C7'
                      : cat === 'Faculty'
                      ? '#11895E'
                      : cat === 'Mentor'
                      ? '#E99940'
                      : cat === 'Alumni'
                      ? '#C7A429'
                      : '#000000'
                }}
              >
                {mem?.id?.category ? mem?.id?.category : 'Unknown'}
              </Button>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <Typography className={classes.menberDetailsText} component="div">
                {getBio()}
              </Typography>
            </Box>
          </Box>
          <Box>
            <MoreVertIcon sx={{ color: '#152536' }} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default CommunitySidebar;
