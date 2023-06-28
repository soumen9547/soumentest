/* eslint-disable @typescript-eslint/prefer-optional-chain */
/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Grid, Popover, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React, { useEffect, useState } from 'react';
import { appColors } from '../../../../utils/theme';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { makeStyles } from '@mui/styles';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { useParams } from 'react-router-dom';
// import axios from "axios";
import _ from 'lodash';
import { toast } from 'react-toastify';
import { AppLoader } from '../../../../components/AppLoader';
import { fetchMatches, matchesActions } from '../../../../redux/slices/getAllMatches/getAllMatchesSlice';
import { IconButton } from '@material-ui/core';
import AssignMatchPopup1 from './components/AssignMatchPopup1';
import AssignMatchPopup2 from './components/AssignMatchPopup2';
import ConfirmationPopup from './components/ConfirmationPopup';
import MatchDetailsPopup from './components/MatchDetailsPopup';
import { setMessageAuto } from '../../../../redux/slices/AutoMatchMessage';
import previewicon from '../../../../assets/images/previewicon.svg';
import profileperson from '../../../../assets/images/profileperson.svg';
import MatchDeleteDialog from './components/MatchDeleteDialog';
import { API } from '../../../../api';
import ChatProfile from '../chat/chat-main/ChatProfile';
interface MatchingFields {
  gender: boolean;
  firstGenStudent: boolean;
  ethnicity: boolean;
  disability: boolean;
  hobbies: boolean;
  major: boolean;
  university: boolean;
  industry: boolean;
  title: boolean;
}

interface Recommendation {
  role: string;
  searchQuery: { field: string; value: string; match: string }[];
  matchedFieldsCount: number;
  mentorId: string;
  menteeId: string;
  headshot: string;
  displayName: string;
  bio: string;
}

interface DataItem {
  message: string;
  data: {
    grpId: string;
    isConfirmed: boolean;
    matchStatus: string;
    id: string;
    searchQuery: {
      field: string;
      value: string;
      isMatched: boolean;
    }[];
    mentee: {
      bio: {
        education: {
          university: string;
          major: string;
          graduationDate: string;
        };
        workHistory: {
          companyName: string;
          role: string;
        };
      };
      displayName: string;
      id: string;
      headshot: string;
    };
    mentor: {
      bio: {
        workHistory: {
          companyName: string;
          role: string;
        };
        education: {
          university: string;
          major: string;
          graduationDate: string;
        };
      };
      displayName: string;
      id: string;
      headshot: string;
    };
  };
}

const initialMatchingFields: MatchingFields = {
  gender: true,
  firstGenStudent: true,
  ethnicity: true,
  disability: true,
  hobbies: true,
  major: true,
  university: true,
  industry: true,
  title: true
};

const MatchesMainPage = () => {
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
    },
    profileWrapper: {
      height: '100%',
      padding: 2
    }
  });

  const textStyle = {
    fontWeigth: '600!important',
    color: '#152536 !important',
    fontSize: '16px !important',
    fontFamily: 'Open Sans',
    cursor: 'pointer'
  };

  const tableStyle = {
    fontWeigth: '600',
    color: '#68717A',
    fontSize: '12px',
    fontFamily: 'Open Sans',
    marginBottom: '0 !important'
  };

  const marketingTextStyle = {
    fontWeigth: '400 !important',
    color: '#68717A',
    fontSize: '14px',
    fontFamily: 'Open Sans',
    cursor: 'pointer'
  };

  const sendMessageText = {
    fontWeigth: '400 !important',
    color: '#0071A9',
    fontSize: '13px',
    fontFamily: 'Open Sans',
    cursor: 'pointer',
    padding: '5px',
    border: '1px solid #0071A9',
    borderRadius: '8px'
  };

  const params = useParams();
  const grpId = params.id || '';
  const orgId = params.orgId || '';
  const classes = useStyles();
  const dispatch: any = useAppDispatch();
  const allMatchesData = useAppSelector((state) => state?.getAllMatchesList?.data);
  const loading = useAppSelector((state) => state?.getAllMatchesList?.loading);
  const error = useAppSelector((state) => state?.getAllMatchesList?.error);
  const messageAutoMatch = useAppSelector((state) => state?.message?.message);
  const matchesCount =
    (allMatchesData &&
      Array.isArray(allMatchesData.matches) &&
      allMatchesData.matches.filter((match) => match && !match.isConfirmed).length) ||
    0;
  const [dataArray, setDataArray] = useState<DataItem[]>([]);
  const confirmedCount = dataArray.filter((item) => !item?.data?.isConfirmed).length;
  const [matchingFields, setMatchingFields] = useState<MatchingFields>(initialMatchingFields);

  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [suggestions, setSuggestions] = useState<Recommendation[]>([]);
  const [selectedRecommendation, setSelectedRecommendation] = useState<Recommendation | null>(null);
  const [openAssignMentor, setOpenAssignMentor] = useState(false);
  const [openAssignMentorSecond, setOpenAssignMentorSecond] = useState(false);
  const [userId, setUserId] = useState<string>('');
  let [menteeId, setMenteeId] = useState('');
  let [mentorId, setMentorId] = useState('');
  const [action, setAction] = useState('');
  const [openMatchDetails, setOpenMatchDetails] = useState(false);
  const [modelConfirmMatch, setModelConfirmMatch] = useState(false);
  const [confirmMatchId, setConfirmMatchId] = useState('');
  const [loaderFirstPopup, setLoaderFirstPopup] = useState(false);
  const [loaderFirstPopup1, setLoaderFirstPopup1] = useState(false);
  const [anchorElAssignMentor, setAnchorElAssignMentor] = React.useState<HTMLButtonElement | null>(null);
  const [anchorElAssignMentee, setAnchorElAssignMentee] = React.useState<HTMLButtonElement | null>(null);
  const [anchorElConfirm, setAnchorElConfirm] = React.useState<HTMLButtonElement | null>(null);
  const [anchorElConfirmdataArray, setAnchorElConfirmdataArray] = React.useState<HTMLButtonElement | null>(null);
  const [maxMatchCountMentee, setMatchCountMentee] = useState<number | undefined>();
  const [maxMatchCountMentor, setMatchCountMentor] = useState<number | undefined>();
  const openMentee = Boolean(anchorElAssignMentee);
  const idMentee = openMentee ? 'simple-popover' : undefined;
  const open = Boolean(anchorElAssignMentor);
  const id = open ? 'simple-popover' : undefined;
  const openConfirm = Boolean(anchorElConfirm);
  const openConfirmdataArray = Boolean(anchorElConfirmdataArray);
  const idConfirm = openConfirm ? 'simple-popover' : undefined;
  const idConfirmdataArray = openConfirmdataArray ? 'simple-popover' : undefined;
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteLoader, setDeleteLoader] = useState(false);
  const [matchDetails, setMatchDetails] = useState();
  const [matchSingle, setMatchSingle] = useState<any>();
  const [activeUserId, setActiveUserId] = useState<any>();
  const [activeUserDetails, setActiveUserDetails] = useState<any>();
  const [latestEducation, setLatestEducation] = useState<any>();
  const [latestWorkHistory, setLatestWorkHistory] = useState<any>();
  const [openProfile, setOpenProfile] = useState(false);
  const copiedUserDetails = {
    ...activeUserDetails,
    id: activeUserDetails?.personal_details,
    bio: { education: latestEducation, workHistory: latestWorkHistory },
    education: { data: activeUserDetails?.professional_details?.education },
    workHistory: { data: activeUserDetails?.professional_details?.workHistory },
    digital_intro: activeUserDetails?.digital_intro?.videoUrl
  };

  const handleCloseMatchDetails = () => {
    setOpenMatchDetails(false);
    setLoaderFirstPopup(false);
  };

  const handleOpenMatchDetails = async () => {
    setMatchDetails(undefined);
    setAnchorElConfirm(null);
    setOpenMatchDetails(true);
    const response = await API.getMatchProfile({
      orgId: orgId,
      confirmMatchId: confirmMatchId
    });
    if (response?.status === 200) {
      setMatchDetails(response?.data?.data);
    }
  };

  const handleOpenAssignMentor = (id: string) => {
    setUserId(id);
    setAction('Assign Mentor');
    setOpenAssignMentor(true);
  };

  const handelAssignMentorAction = () => {
    setAction('Assign Mentor');
    setOpenAssignMentor(true);
    setAnchorElAssignMentor(null);
  };

  const handelAssignMenteeAction = () => {
    setAction('Assign Mentee');
    setOpenAssignMentor(true);
    setAnchorElAssignMentee(null);
  };

  const handleOpenAssignMentee = (id: string) => {
    setUserId(id);
    setAction('Assign Mentee');
    setOpenAssignMentor(true);
  };

  const handleCloseAssignMentor = () => {
    setOpenAssignMentor(false);
    setLoaderFirstPopup(false);
    setMatchingFields(initialMatchingFields);
    setLoaderFirstPopup1(false);
  };

  const handleOpenFindmentor = async (event: React.FormEvent) => {
    setLoaderFirstPopup(true);
    event.preventDefault();
    const response = await API.getListToAssignMatch({
      orgId: orgId,
      userId: userId || activeUserId,
      grpId: grpId,
      data: {
        assigneeRole: action === 'Assign Mentor' ? 'Mentee' : 'Mentor',
        matchingFields
      }
    });

    if (response?.status === 200) {
      setRecommendations(response.data?.data?.recommendations);
      setSuggestions(response.data?.data?.suggestions);
      setMenteeId(response.data?.data?.MenteeId);
      setMentorId(response.data?.data?.MentorId);
      setLoaderFirstPopup(false);
      setMatchingFields(initialMatchingFields);
    } else {
      setLoaderFirstPopup(false);
      setMatchingFields(initialMatchingFields);
    }
    setOpenAssignMentorSecond(true);
    setOpenAssignMentor(false);
  };

  const handleClickOpenAutoMatch = () => {
    //   setOpen(true);
    setAction('Auto Match');
    setOpenAssignMentor(true);
  };

  const handelCloseAssineMatch = () => {
    setOpenAssignMentor(false);
    setOpenAssignMentorSecond(false);
    setLoaderFirstPopup(false);
    setLoaderFirstPopup1(false);
  };

  const handleSubmitAssignMatch = async () => {
    setLoaderFirstPopup(true);

    const searchQuery = selectedRecommendation?.searchQuery.map((query) => ({
      field: query.field,
      value: query.value,
      match: query.match
    }));

    const response = await API.assignAMatch({
      orgId: orgId,
      grpId: grpId,
      data: {
        mentorId: action === 'Assign Mentor' ? selectedRecommendation?.mentorId : mentorId || activeUserId,
        menteeId: action === 'Assign Mentor' ? menteeId || activeUserId : selectedRecommendation?.menteeId,
        searchQuery
      }
    });

    if (response?.status === 200) {
      setLoaderFirstPopup(false);
      setDataArray([...dataArray, response.data]);
      if (action === 'Assign Mentor') {
        toast.success('Mentor assigned successfully');
      }
      if (action === 'Assign Mentee') {
        toast.success('Mentee assigned successfully');
      }
      dispatch(
        matchesActions.updateMenteesMentors({
          menteeId: userId,
          mentorId: selectedRecommendation?.mentorId || ''
        })
      );
    } else {
      toast.error('Something went wrong');
    }
    setOpenAssignMentor(false);
    setOpenAssignMentorSecond(false);
    setLoaderFirstPopup(false);
  };

  const handleConfirmMatch = async (id: string) => {
    setConfirmMatchId(id);
    setModelConfirmMatch(true);
    setAnchorElConfirm(null);
  };

  const handleOpenMatchPopover = async (id: string, event: React.MouseEvent<HTMLButtonElement>) => {
    const match = allMatchesData?.matches.find((ele) => ele.id === id);
    if (match) {
      setMatchSingle(match);
    }
    setConfirmMatchId(id);
    setAnchorElConfirm(event.currentTarget);
    setOpenProfile(false);
  };
  // console.log(matchSingle, 'matchSingle');

  const handleCloseConfirmMatch = async () => {
    setModelConfirmMatch(false);
    setLoaderFirstPopup(false);
  };

  const handleConfirmAll = async () => {
    setLoaderFirstPopup1(true);
    try {
      const response = await API.confirmAllMatches({
        orgId: orgId,
        grpId: grpId
      });

      if (response?.status === 200) {
        const updatedDataArray = dataArray.map((item) => {
          item.data.isConfirmed = true;
          return item;
        });
        setDataArray(updatedDataArray);

        dispatch(matchesActions.updateConfirmStatusAll());
        setLoaderFirstPopup1(false);
        setLoaderFirstPopup(false);
        toast.success('All matches are confirmed successfully');
        setAnchorElConfirm(null);
      } else {
        setLoaderFirstPopup1(false);
        setLoaderFirstPopup(false);
        toast.error('Somthing went wrong');
      }
    } catch (error) {}
    setModelConfirmMatch(false);
  };

  const handelSubmitConfirmMatch = async () => {
    setLoaderFirstPopup(true);
    try {
      const response = await API.confirmMatch({
        orgId: orgId,
        grpId: grpId,
        data: {
          id: confirmMatchId
        }
      });

      if (response?.status === 200) {
        const updatedDataArray = dataArray.map((item) => {
          if (item.data.id === response?.data?.data?.id) {
            item.data.isConfirmed = true;
          }
          return item;
        });

        setDataArray(updatedDataArray);
        dispatch(matchesActions.updateConfirmStatus(response?.data?.data?.id));
        setLoaderFirstPopup(false);
        toast.success('Confirm match successfully');
        setAnchorElConfirm(null);
      } else {
        toast.error('Something went wrong');
        setLoaderFirstPopup(false);
      }
    } catch (error) {}
    setModelConfirmMatch(false);
  };

  const handleAssignMentorPopover = async (event: React.MouseEvent<HTMLButtonElement>, id: string) => {
    setAnchorElAssignMentor(event.currentTarget);
    setActiveUserId(id);
    setOpenProfile(false);
  };

  useEffect(() => {
    setLatestEducation(
      activeUserDetails?.professional_details?.education?.sort(
        (a: any, b: any) => b?.graduation_date - a?.graduation_date
      )[0]
    );
  }, [activeUserDetails]);

  useEffect(() => {
    setLatestWorkHistory(
      activeUserDetails?.professional_details?.workHistory
        ?.filter((a: any) => a.currentlyWorking === true)
        ?.sort((a: any, b: any) => b.start_date - a.start_date)[0]
    );
  }, [activeUserDetails]);

  const handelOpenProfile = () => {
    setOpenProfile(true);
    setAnchorElAssignMentor(null);
    setAnchorElAssignMentee(null);
  };

  const handleCloseAssignMentorPopover = (event: React.MouseEvent<HTMLButtonElement>, articleId: string) => {
    setAnchorElAssignMentor(null);
  };

  const getUserProfileDetails = async () => {
    try {
      const response = await API.getUserProfileInAGroup(grpId, activeUserId);
      if (response?.status === 200 && response?.statusText === 'OK') {
        setActiveUserDetails(response?.data?.userDetails);
      } else {
        toast.error('Something went wrong');
      }
    } catch (e) {
      toast.error('Something went wrong');
    }
  };

  useEffect(() => {
    if (activeUserId) {
      getUserProfileDetails();
    }
  }, [activeUserId]);

  const handleAssignMenteePopover = (event: React.MouseEvent<HTMLButtonElement>, id: string) => {
    setAnchorElAssignMentee(event.currentTarget);
    setActiveUserId(id);
    setOpenProfile(false);
  };

  const handleCloseAssignMenteePopover = () => {
    setAnchorElAssignMentee(null);
  };

  const handleConfirmPopoverdataArray = (id: string, event: React.MouseEvent<HTMLButtonElement>) => {
    const match = dataArray.find((ele) => ele?.data?.id === id);
    if (match) {
      setMatchSingle(match);
    }
    setAnchorElConfirmdataArray(event.currentTarget);
    setOpenProfile(false);
  };

  const handleCloseConfirmPopoverdataArray = () => {
    setAnchorElConfirmdataArray(null);
  };

  const handleCloseConfirmPopover = () => {
    setAnchorElConfirm(null);
  };

  const getMaxMatches = async () => {
    try {
      const response = await API.getAllMatchesSetting({
        orgId: orgId,
        grpId: grpId
      });

      if (response?.status === 200) {
        const { maxMatchesPerMentor, maxMatchesPerMentee } = response.data.data.matchesSettings;
        setMatchCountMentee(maxMatchesPerMentee);
        setMatchCountMentor(maxMatchesPerMentor);
      }
    } catch (error) {
      // console.error('Error retrieving max matches:', error);
    }
  };

  const handleOpendelete = () => {
    setOpenDelete(true);
    setAnchorElConfirm(null);
  };

  const handeleDeleteMatch = async () => {
    setDeleteLoader(true);
    try {
      const response = await API.removeMatch({
        orgId: orgId,
        grpId: grpId,
        confirmMatchId: confirmMatchId
      });

      if (response?.status === 200) {
        setDeleteLoader(false);
        setOpenDelete(false);
        const updatedDataArray = dataArray.map((item) => {
          if (item.data.id === confirmMatchId) {
            item.data.matchStatus = 'Inactive';
          }
          return item;
        });
        setDataArray(updatedDataArray);
        dispatch(matchesActions.endMatch(confirmMatchId));
        toast.success('Match Ended Successfully.');
      }
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    getMaxMatches();
  }, []);

  const handleSubmitAutoMatch = async () => {
    setLoaderFirstPopup(true);
    const response = await API.autoMatch({
      orgId: orgId,
      grpId: grpId,
      data: {
        maxMatchesPerMentor: maxMatchCountMentor,
        maxMatchesPerMentee: maxMatchCountMentee,
        matchingFields
      }
    });

    if (response?.status === 200) {
      setOpenAssignMentor(false);
      setLoaderFirstPopup(false);
      dispatch(setMessageAuto(response.data.message));
      toast.success('Auto Matches Successfully');
      setMatchingFields(initialMatchingFields);
      // dispatch(fetchMatches({ orgId, groupId: grpId }));
      if (messageAutoMatch === 'Auto-matching completed') {
        dispatch(fetchMatches({ orgId, groupId: grpId }));
      }
    } else {
      toast.error('Somthing went Wrong');
      setLoaderFirstPopup(false);
    }
  };

  // useEffect(() => {
  //   if (messageAutoMatch === "Auto-matching completed") {
  //     dispatch(fetchMatches({ orgId, groupId: grpId }));
  //   }
  // }, [messageAutoMatch]);

  window.addEventListener('beforeunload', () => {
    dispatch(setMessageAuto(''));
  });

  useEffect(() => {
    dispatch(setMessageAuto(''));
  }, []);

  useEffect(() => {
    if (orgId && grpId) {
      dispatch(fetchMatches({ orgId, groupId: grpId }));
    }
  }, [orgId, grpId, dispatch]);

  if (loading) {
    return (
      <div>
        <AppLoader />
      </div>
    );
  }

  if (error) {
    return <div>Error occurred while fetching matches.</div>;
  }

  const getMatchesList = () => {
    return (
      <Grid container>
        <Grid item xs>
          <TableContainer>
            {allMatchesData && allMatchesData ? (
              <Table className="tableBody" width="100%" aria-label="simple table">
                <TableHead>
                  <TableRow sx={{ borderBottom: '1px solid #EFF0F4' }}>
                    <TableCell style={tableStyle}>STUDENT</TableCell>
                    <TableCell style={tableStyle}>MENTOR</TableCell>
                    <TableCell style={tableStyle}>STATUS</TableCell>
                    <TableCell style={tableStyle}>GOAL PROGRESS</TableCell>
                    <TableCell style={tableStyle}>UPVOTES</TableCell>
                    {/* <TableCell style={tableStyle}>TOTAL CONNECTION</TableCell>
                      <TableCell style={tableStyle}>LAST CONNECTION</TableCell> */}
                    <TableCell style={tableStyle}>ACTION</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {dataArray &&
                    dataArray.map((item) => (
                      <TableRow>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <img
                              src={item?.data?.mentee?.headshot}
                              alt="womencircle"
                              style={{
                                padding: 0,
                                margin: 0,
                                width: '40px',
                                height: '40px'
                              }}
                            />
                            <Box sx={{ marginLeft: '10px' }}>
                              <Typography style={textStyle}>{item.data?.mentee?.displayName}</Typography>
                              <Typography style={marketingTextStyle}>
                                {(
                                  item.data?.mentee?.bio?.workHistory?.role ||
                                  item.data?.mentee?.bio?.education?.major ||
                                  ''
                                ).length > 15
                                  ? `${(
                                      item.data?.mentee?.bio?.workHistory?.role ||
                                      item.data?.mentee?.bio?.education?.major ||
                                      ''
                                    ).substring(0, 15)}...`
                                  : item.data?.mentee?.bio?.workHistory?.role ||
                                    item.data?.mentee?.bio?.education?.major}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <img
                              src={item.data?.mentor?.headshot}
                              alt="womencircle"
                              style={{
                                padding: 0,
                                margin: 0,
                                width: '40px',
                                height: '40px'
                              }}
                            />
                            <Box sx={{ marginLeft: '10px' }}>
                              <Typography style={textStyle}>{item.data?.mentor?.displayName}</Typography>
                              <Typography style={marketingTextStyle}>
                                {(
                                  item.data?.mentor?.bio?.workHistory?.role ||
                                  item.data?.mentor?.bio?.education?.major ||
                                  ''
                                ).length > 15
                                  ? `${(
                                      item.data?.mentor?.bio?.workHistory?.role ||
                                      item.data?.mentor?.bio?.education?.major ||
                                      ''
                                    ).substring(0, 15)}...`
                                  : item.data?.mentor?.bio?.workHistory?.role ||
                                    item.data?.mentor?.bio?.education?.major}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          {item.data?.isConfirmed ? (
                            <Box
                              sx={{
                                background: '#fff',
                                border: '1px solid #28A745',
                                borderRadius: '5px',
                                width: '64px',
                                height: '20px',
                                color: '#28A745',
                                fontSize: '12px',
                                fontWeight: '600',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                            >
                              {item.data?.matchStatus === 'Inactive' ? 'Ended' : 'Matched'}
                            </Box>
                          ) : (
                            <Button
                              className="btnBackGround"
                              style={{
                                background: '#0071A9',
                                borderRadius: '8px',
                                padding: '8px 10px',
                                color: '#FFF', // Change the color to white (#FFF)
                                fontSize: '14px', // Change "fontStyle" to "fontSize"
                                fontWeight: '400',
                                fontFamily: 'Open Sans'
                              }}
                              onClick={() => item?.data && handleConfirmMatch(_.get(item?.data, 'id'))}
                            >
                              Confirm Match
                            </Button>
                          )}
                        </TableCell>
                        <TableCell />
                        <TableCell />
                        <TableCell sx={{ textAlign: 'center' }}>
                          <button
                            onClick={(event) => handleConfirmPopoverdataArray(_.get(item?.data, 'id'), event)}
                            className="cursor-pointer button-reset"
                          >
                            <MoreVertIcon sx={{ color: '#152536' }} />
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}

                  <Popover
                    id={idConfirmdataArray}
                    open={openConfirmdataArray}
                    anchorEl={anchorElConfirmdataArray}
                    onClose={handleCloseConfirmPopoverdataArray}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left'
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        py: 1,
                        px: 3
                      }}
                    >
                      <ul className="p-0 m-0 " style={{ listStyleType: 'none' }}>
                        {matchSingle?.data?.matchStatus === 'Inactive' && (
                          <li>
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center'
                              }}
                            >
                              <IconButton>
                                <img
                                  src={profileperson}
                                  alt="profileperson"
                                  style={{
                                    padding: 0,
                                    margin: 0,
                                    width: '20px',
                                    height: '20px'
                                  }}
                                />
                              </IconButton>
                              <Typography className={classes.listStyle}>Ended</Typography>
                            </Box>
                          </li>
                        )}
                        {matchSingle?.data?.isConfirmed && matchSingle?.data?.matchStatus === 'Active' && (
                          <li onClick={handleOpendelete}>
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center'
                              }}
                            >
                              <IconButton>
                                <img
                                  src={profileperson}
                                  alt="profileperson"
                                  style={{
                                    padding: 0,
                                    margin: 0,
                                    width: '20px',
                                    height: '20px'
                                  }}
                                />
                              </IconButton>
                              <Typography className={classes.listStyle}>End match</Typography>
                            </Box>
                          </li>
                        )}
                        {matchSingle?.data?.isConfirmed === false && (
                          <li onClick={() => handleConfirmMatch(_.get(matchSingle?.data, 'id'))}>
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center'
                              }}
                            >
                              <IconButton>
                                <img
                                  src={profileperson}
                                  alt="profileperson"
                                  style={{
                                    padding: 0,
                                    margin: 0,
                                    width: '20px',
                                    height: '20px'
                                  }}
                                />
                              </IconButton>
                              <Typography className={classes.listStyle}>Confirm Match</Typography>
                            </Box>
                          </li>
                        )}

                        <li onClick={handleOpenMatchDetails}>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center'
                            }}
                          >
                            <IconButton>
                              <img
                                src={previewicon}
                                alt="previewicon"
                                style={{
                                  padding: 0,
                                  margin: 0,
                                  width: '20px',
                                  height: '20px'
                                }}
                              />
                            </IconButton>
                            <Typography className={classes.listStyle}>View match details </Typography>
                          </Box>
                        </li>
                      </ul>
                    </Box>
                  </Popover>

                  {Array.isArray(allMatchesData?.matches) &&
                    allMatchesData?.matches?.map((ele, index) => (
                      <TableRow key={ele.id}>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <img
                              src={ele?.mentee?.headshot}
                              alt="womencircle"
                              style={{
                                padding: 0,
                                margin: 0,
                                width: '40px',
                                height: '40px'
                              }}
                            />
                            <Box sx={{ marginLeft: '10px' }}>
                              <Typography style={textStyle}>
                                {ele?.mentee?.displayName.length > 15
                                  ? `${ele?.mentee?.displayName.substring(0, 15)}...`
                                  : ele?.mentee?.displayName}
                              </Typography>
                              {ele?.mentee?.bio?.workHistory?.role || ele?.mentee?.bio?.education?.major ? (
                                <Typography style={marketingTextStyle}>
                                  {(ele?.mentee?.bio?.workHistory?.role || ele?.mentee?.bio?.education?.major || '')
                                    .length > 15
                                    ? `${(
                                        ele?.mentee?.bio?.workHistory?.role ||
                                        ele?.mentee?.bio?.education?.major ||
                                        ''
                                      ).substring(0, 15)}...`
                                    : ele?.mentee?.bio?.workHistory?.role || ele?.mentee?.bio?.education?.major}
                                </Typography>
                              ) : null}
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <img
                              src={ele?.mentor?.headshot}
                              alt="womencircle"
                              style={{
                                padding: 0,
                                margin: 0,
                                width: '40px',
                                height: '40px'
                              }}
                            />
                            <Box sx={{ marginLeft: '10px' }}>
                              <Typography style={textStyle}>
                                {ele?.mentor?.displayName.length > 15
                                  ? `${ele?.mentor?.displayName.substring(0, 20)}...`
                                  : ele?.mentor?.displayName}
                              </Typography>
                              {ele?.mentor?.bio?.workHistory?.role || ele?.mentor?.bio?.education?.major ? (
                                <Typography style={marketingTextStyle}>
                                  {(ele?.mentor?.bio?.workHistory?.role || ele?.mentor?.bio?.education?.major || '')
                                    .length > 15
                                    ? `${(
                                        ele?.mentor?.bio?.workHistory?.role ||
                                        ele?.mentor?.bio?.education?.major ||
                                        ''
                                      ).substring(0, 15)}...`
                                    : ele?.mentor?.bio?.workHistory?.role || ele?.mentor?.bio?.education?.major}
                                </Typography>
                              ) : null}
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          {ele?.isConfirmed ? (
                            <Box
                              sx={{
                                background: '#fff',
                                border: '1px solid #28A745',
                                borderRadius: '5px',
                                width: '64px',
                                height: '20px',
                                color: '#28A745',
                                fontSize: '12px',
                                fontWeight: '600',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                            >
                              {ele?.matchStatus === 'Inactive' ? 'Ended' : 'Matched'}
                            </Box>
                          ) : (
                            <Button
                              className="btnBackGround"
                              style={{
                                background: '#0071A9',
                                borderRadius: '8px',
                                padding: '8px 10px',
                                color: '#FFF', // Change the color to white (#FFF)
                                fontSize: '14px', // Change "fontStyle" to "fontSize"
                                fontWeight: '400',
                                fontFamily: 'Open Sans'
                              }}
                              onClick={() => ele && handleConfirmMatch(_.get(ele, 'id'))}
                            >
                              Confirm Match
                            </Button>
                          )}
                        </TableCell>
                        <TableCell />
                        <TableCell />
                        <TableCell sx={{ textAlign: 'center' }}>
                          <button
                            onClick={(event) => handleOpenMatchPopover(_.get(ele, 'id'), event)}
                            className="cursor-pointer button-reset"
                          >
                            <MoreVertIcon sx={{ color: '#152536' }} />
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}
                  <Popover
                    id={idConfirm}
                    open={openConfirm}
                    anchorEl={anchorElConfirm}
                    onClose={handleCloseConfirmPopover}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left'
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        py: 1,
                        px: 3
                      }}
                    >
                      <ul className="p-0 m-0 " style={{ listStyleType: 'none' }}>
                        {matchSingle?.matchStatus === 'Inactive' && (
                          <li>
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center'
                              }}
                            >
                              <IconButton>
                                <img
                                  src={profileperson}
                                  alt="profileperson"
                                  style={{
                                    padding: 0,
                                    margin: 0,
                                    width: '20px',
                                    height: '20px'
                                  }}
                                />
                              </IconButton>
                              <Typography className={classes.listStyle}>Ended</Typography>
                            </Box>
                          </li>
                        )}
                        {matchSingle?.isConfirmed && matchSingle?.matchStatus === 'Active' && (
                          <li onClick={handleOpendelete}>
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center'
                              }}
                            >
                              {' '}
                              <IconButton>
                                <img
                                  src={profileperson}
                                  alt="profileperson"
                                  style={{
                                    padding: 0,
                                    margin: 0,
                                    width: '20px',
                                    height: '20px'
                                  }}
                                />
                              </IconButton>
                              <Typography className={classes.listStyle}>End match</Typography>
                            </Box>
                          </li>
                        )}
                        {matchSingle?.isConfirmed === false && (
                          <li onClick={() => handleConfirmMatch(_.get(matchSingle, 'id'))}>
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center'
                              }}
                            >
                              <IconButton>
                                <img
                                  src={profileperson}
                                  alt="profileperson"
                                  style={{
                                    padding: 0,
                                    margin: 0,
                                    width: '20px',
                                    height: '20px'
                                  }}
                                />
                              </IconButton>
                              <Typography className={classes.listStyle}>Confirm Match</Typography>
                            </Box>
                          </li>
                        )}

                        <li onClick={handleOpenMatchDetails}>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center'
                            }}
                          >
                            <IconButton>
                              <img
                                src={previewicon}
                                alt="previewicon"
                                style={{
                                  padding: 0,
                                  margin: 0,
                                  width: '20px',
                                  height: '20px'
                                }}
                              />
                            </IconButton>
                            <Typography className={classes.listStyle}>View match details </Typography>
                          </Box>
                        </li>
                      </ul>
                    </Box>
                  </Popover>

                  {Array.isArray(allMatchesData?.mentees) &&
                    allMatchesData?.mentees?.map((ele, index) => (
                      <TableRow key={ele.id}>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <img
                              src={ele?.headshot}
                              alt="womencircle"
                              style={{
                                padding: 0,
                                margin: 0,
                                width: '40px',
                                height: '40px'
                              }}
                            />
                            <Box sx={{ marginLeft: '10px' }}>
                              <Typography style={textStyle}>
                                {/* {ele?.displayName} */}
                                {ele?.displayName.length > 15
                                  ? `${ele?.displayName.substring(0, 15)}...`
                                  : ele?.displayName}
                              </Typography>
                              {ele?.bio?.workHistory?.role || ele?.bio?.education?.major ? (
                                <Typography style={marketingTextStyle}>
                                  {(ele?.bio?.workHistory?.role || ele?.bio?.education?.major || '').length > 15
                                    ? `${(ele?.bio?.workHistory?.role || ele?.bio?.education?.major || '').substring(
                                        0,
                                        15
                                      )}...`
                                    : ele?.bio?.workHistory?.role || ele?.bio?.education?.major}
                                </Typography>
                              ) : null}
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box
                            sx={{ textAlign: 'center' }}
                            style={sendMessageText}
                            onClick={() => {
                              handleOpenAssignMentor(_.get(ele, 'id'));
                            }}
                          >
                            <span>Assign a mentor</span>
                          </Box>
                        </TableCell>

                        <TableCell> </TableCell>
                        <TableCell />
                        <TableCell />
                        <TableCell sx={{ textAlign: 'center' }}>
                          <button
                            onClick={(event) => handleAssignMentorPopover(event, _.get(ele, 'id'))}
                            className="cursor-pointer button-reset"
                          >
                            <MoreVertIcon sx={{ color: '#152536' }} />
                          </button>
                          <Popover
                            id={id}
                            open={open}
                            anchorEl={anchorElAssignMentor}
                            onClose={handleCloseAssignMentorPopover}
                            anchorOrigin={{
                              vertical: 'bottom',
                              horizontal: 'left'
                            }}
                          >
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                py: 1,
                                px: 3
                              }}
                            >
                              <ul className="p-0 m-0 " style={{ listStyleType: 'none' }}>
                                <li onClick={handelAssignMentorAction}>
                                  <Box
                                    sx={{
                                      display: 'flex',
                                      alignItems: 'center'
                                    }}
                                  >
                                    <IconButton>
                                      <img
                                        src={profileperson}
                                        alt="profileperson"
                                        style={{
                                          padding: 0,
                                          margin: 0,
                                          width: '20px',
                                          height: '20px'
                                        }}
                                      />
                                    </IconButton>
                                    <Typography className={classes.listStyle}>Assign a mentor</Typography>
                                  </Box>
                                </li>
                                <li onClick={handelOpenProfile}>
                                  <Box
                                    sx={{
                                      display: 'flex',
                                      alignItems: 'center'
                                    }}
                                  >
                                    <IconButton>
                                      <img
                                        src={previewicon}
                                        alt="previewicon"
                                        style={{
                                          padding: 0,
                                          margin: 0,
                                          width: '20px',
                                          height: '20px'
                                        }}
                                      />
                                    </IconButton>
                                    <Typography className={classes.listStyle}>View user details</Typography>
                                  </Box>
                                </li>
                              </ul>
                            </Box>
                          </Popover>
                        </TableCell>
                      </TableRow>
                    ))}

                  {Array.isArray(allMatchesData?.mentors) &&
                    allMatchesData?.mentors?.map((ele: any, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Box
                            sx={{
                              textAlign: 'center',
                              width: '146px',
                              height: '35px'
                            }}
                            style={sendMessageText}
                            onClick={() => {
                              handleOpenAssignMentee(_.get(ele, 'id'));
                            }}
                          >
                            <span> Assign a mentee</span>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <img
                              src={ele?.headshot}
                              alt="womencircle"
                              style={{
                                padding: 0,
                                margin: 0,
                                width: '40px',
                                height: '40px'
                              }}
                            />
                            <Box sx={{ marginLeft: '10px' }}>
                              <Typography style={textStyle}>
                                {ele?.displayName.length > 15
                                  ? `${ele?.displayName.substring(0, 15)}...`
                                  : ele?.displayName}{' '}
                              </Typography>
                              {ele?.bio?.workHistory?.role || ele?.bio?.education?.major ? (
                                <Typography style={marketingTextStyle}>
                                  {(ele?.bio?.workHistory?.role || ele?.bio?.education?.major || '').length > 15
                                    ? `${(ele?.bio?.workHistory?.role || ele?.bio?.education?.major || '').substring(
                                        0,
                                        15
                                      )}...`
                                    : ele?.bio?.workHistory?.role || ele?.bio?.education?.major}
                                </Typography>
                              ) : null}
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell> </TableCell>
                        <TableCell />
                        <TableCell />
                        <TableCell sx={{ textAlign: 'center' }}>
                          <button
                            onClick={(event) => handleAssignMenteePopover(event, _.get(ele, 'id'))}
                            className="cursor-pointer button-reset"
                          >
                            <MoreVertIcon sx={{ color: '#152536' }} />
                          </button>
                          <Popover
                            id={idMentee}
                            open={openMentee}
                            anchorEl={anchorElAssignMentee}
                            onClose={handleCloseAssignMenteePopover}
                            anchorOrigin={{
                              vertical: 'bottom',
                              horizontal: 'left'
                            }}
                          >
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                py: 1,
                                px: 3
                              }}
                            >
                              <ul className="p-0 m-0 " style={{ listStyleType: 'none' }}>
                                <li onClick={handelAssignMenteeAction}>
                                  <Box
                                    sx={{
                                      display: 'flex',
                                      alignItems: 'center'
                                    }}
                                  >
                                    <IconButton>
                                      <img
                                        src={profileperson}
                                        alt="profileperson"
                                        style={{
                                          padding: 0,
                                          margin: 0,
                                          width: '20px',
                                          height: '20px'
                                        }}
                                      />
                                    </IconButton>
                                    <Typography className={classes.listStyle}>Assign a mentee </Typography>
                                  </Box>
                                </li>
                                <li onClick={handelOpenProfile}>
                                  <Box
                                    sx={{
                                      display: 'flex',
                                      alignItems: 'center'
                                    }}
                                  >
                                    <IconButton>
                                      <img
                                        src={previewicon}
                                        alt="previewicon"
                                        style={{
                                          padding: 0,
                                          margin: 0,
                                          width: '20px',
                                          height: '20px'
                                        }}
                                      />
                                    </IconButton>
                                    <Typography className={classes.listStyle}>View user details</Typography>
                                  </Box>
                                </li>
                              </ul>
                            </Box>
                          </Popover>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            ) : (
              <div style={{ padding: '16px' }}>No matches found.</div>
            )}
          </TableContainer>
        </Grid>
        {openProfile ? (
          <Grid item xs={3} className={classes.profileWrapper}>
            <ChatProfile
              workHistory={copiedUserDetails?.workHistory}
              educationDetails={copiedUserDetails?.education}
              chatProfile={copiedUserDetails}
              onCloseChatProfile={() => {
                setOpenProfile(false);
              }}
              setActiveChat={() => {}}
              parentComponent="chatMain"
            />
          </Grid>
        ) : null}
      </Grid>
    );
  };

  return (
    <Box>
      <Box
        sx={{
          margin: '20px 0 20px 0',
          background: '#ffffff',
          border: '1px solid #EFF0F4',
          borderRadius: '8px',
          height: 'calc(100vh - 210px)',
          overflow: 'hidden auto'
        }}
      >
        <TableContainer>
          <Table className="tableBody" width="100%" aria-label="simple table">
            <TableHead>
              <TableRow sx={{ borderBottom: '1px solid #EFF0F4' }}>
                <TableCell>
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
                        alignItems: 'center',
                        columnGap: '25px'
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily: 'Open Sans',
                          fontSize: '16px',
                          fontWeight: '600',
                          color: '#152536',
                          textAlign: 'left'
                        }}
                      >
                        Matches List
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          columnGap: '10px'
                        }}
                      >
                        {messageAutoMatch && (
                          <span className="text-success">
                            {' '}
                            <b>{messageAutoMatch} </b>
                          </span>
                        )}
                        <Button
                          onClick={handleClickOpenAutoMatch}
                          sx={{
                            border: '1px solid #0071A9',
                            borderRadius: '8px',
                            width: '86px',
                            height: '36px',
                            color: '#0071A9',
                            fontSize: '12px',
                            fontWeight: '700',
                            fontFamily: 'Open Sans'
                          }}
                          disabled={messageAutoMatch ? true : false}
                        >
                          Auto Match
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>

        {getMatchesList()}

        {/* assign a mentor first */}
        <AssignMatchPopup1
          handleCloseAssignMentor={handleCloseAssignMentor}
          openAssignMentor={openAssignMentor}
          action={action}
          handleOpenFindmentor={handleOpenFindmentor}
          matchingFields={matchingFields}
          setMatchingFields={setMatchingFields}
          handleSubmitAutoMatch={handleSubmitAutoMatch}
          maxMatchCountMentee={maxMatchCountMentee}
          maxMatchCountMentor={maxMatchCountMentor}
          setMatchCountMentee={setMatchCountMentee}
          setMatchCountMentor={setMatchCountMentor}
          loaderFirstPopup={loaderFirstPopup}
        />

        {/* assign a mentor second */}
        <AssignMatchPopup2
          openAssignMentorSecond={openAssignMentorSecond}
          handelCloseAssineMatch={handelCloseAssineMatch}
          action={action}
          recommendations={recommendations}
          suggestions={suggestions}
          setSelectedRecommendation={setSelectedRecommendation}
          handleSubmitAssignMatch={handleSubmitAssignMatch}
          loaderFirstPopup={loaderFirstPopup}
        />

        {/* matches confirmation popup code */}
        <ConfirmationPopup
          matchesCount={matchesCount}
          confirmedCount={confirmedCount}
          modelConfirmMatch={modelConfirmMatch}
          handleCloseConfirmMatch={handleCloseConfirmMatch}
          handelSubmitConfirmMatch={handelSubmitConfirmMatch}
          handleConfirmAll={handleConfirmAll}
          loaderFirstPopup={loaderFirstPopup}
          loaderFirstPopup1={loaderFirstPopup1}
        />

        {/* match details popup */}
        <MatchDetailsPopup
          openMatchDetails={openMatchDetails}
          handleCloseMatchDetails={handleCloseMatchDetails}
          matchDetails={matchDetails}
        />

        <MatchDeleteDialog
          openDelete={openDelete}
          setOpenDelete={setOpenDelete}
          deleteLoader={deleteLoader}
          handeleDeleteMatch={handeleDeleteMatch}
        />
      </Box>
    </Box>
  );
};

export default MatchesMainPage;
