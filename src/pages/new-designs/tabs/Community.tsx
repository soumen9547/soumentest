/* eslint-disable react-hooks/exhaustive-deps */
import React, { SyntheticEvent, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import '../../../assets/style/Community.css';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography
} from '@mui/material';
import Filter from '../../../assets/images/Filter.svg';
import { makeStyles } from '@mui/styles';
import { Divider } from '@material-ui/core';
import { API } from '../../../api';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getUserDetails } from '../../../utils/orgName';
import { AppLoader } from '../../../components/AppLoader';
import _ from 'lodash';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { fetchCommunityMember } from '../../../redux/slices/communityMembers/communityMembersSlice';

const Community = () => {
  const useStyles = makeStyles({
    allNubWrapper: {
      color: '#6C757D !important',
      fontSize: '16px !important',
      fontFamily: 'Open Sans !important',
      fontWeigth: '400 !important',
      marginRight: '10px !important'
    },

    menberDetailsText: {
      fontSize: '14px !important',
      fontWeight: '400 !important',
      fontFamily: 'Open Sans !important',
      color: ' #ADB5BD !important'
      // wordWrap:"break-word"
    },
    programDialogTitle: {
      fontFamily: 'Open Sans',
      textAlign: 'center',
      fontSize: '22px',
      fontWeight: '600 !important',
      color: '#152536'
    },
    popupSummary: {
      FontFamily: 'Open Sans',
      fontWeight: '600 !important',
      fontSize: '16px !important',
      color: ' #152536'
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

    programBottomText: {
      position: 'absolute',
      bottom: '0px !important',
      width: '100%',
      height: '90px',
      backgroundImage: 'linear-gradient(180deg, rgba(38, 39, 56, 0) 53.24%, #262738 81.49%) !important'
    }
  });

  const dispatch = useAppDispatch();
  const classes = useStyles();
  const navigate = useNavigate();
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  const { user } = useAuth0();
  const orgId: string = user?.org_id || '';
  const { location } = getUserDetails();

  const [loading, setLoading] = useState<boolean>(true);
  const [role, setRole] = useState('');
  const [roleArr, setRoleArr] = useState<string[]>([]);
  const [category, setCategory] = useState('');
  const [categoryArr, setCategoryArr] = useState<string[]>([]);
  const [mentee, setMentee] = useState(false);
  const [mentor, setMentor] = useState(false);
  const [admin, setAAdmin] = useState(false);
  const [student, setStudent] = useState(false);
  const [alumini, setAlumini] = useState(false);
  const [faculty, setFaculty] = useState(false);
  const [programFriend, setProgramFriend] = useState(false);
  const [openFilter, setOpenFilter] = React.useState(false);
  const [allCommunityMembersList, setAllCommunityMembersList] = useState<any[]>([]);
  const [programFriendCat, setProgramFriendCat] = useState(false);

  const communityMembers = useAppSelector((state) => state.getCommunityMembers);

  useEffect(() => {
    getCommunityMembers(role, category);
  }, [role, category]);

  useEffect(() => {
    dispatch(fetchCommunityMember({ orgId, location, role, category }));
  }, []);

  const handleClickOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setRoleArr([]);
    setCategoryArr([]);
    setOpenFilter(false);
  };

  const handleReset = () => {
    setMentee(false);
    setMentor(false);
    setAAdmin(false);
    setStudent(false);
    setAlumini(false);
    setFaculty(false);
    setProgramFriend(false);
    setProgramFriendCat(false);
  };

  const handleApply = () => {
    setRole('');
    if (mentee) {
      roleArr.push('mentee');
      setRoleArr(roleArr);
    }
    if (mentor) {
      roleArr.push('mentor');
      setRoleArr(roleArr);
    }
    if (admin) {
      roleArr.push('admin');
      setRoleArr(roleArr);
    }
    if (programFriend) {
      roleArr?.push('programFriends');
      setRoleArr(roleArr);
    }
    if (student) {
      categoryArr.push('Student');
      setCategoryArr(categoryArr);
    }
    if (faculty) {
      categoryArr.push('Faculty');
      setCategoryArr(categoryArr);
    }
    if (alumini) {
      categoryArr.push('Alumni');
      setCategoryArr(categoryArr);
    }
    if (programFriendCat) {
      categoryArr.push('Program Friend');
      setCategoryArr(categoryArr);
    }
    setRole(roleArr.join(','));
    setCategory(categoryArr.join(','));
    handleCloseFilter();
  };

  const addImageFallback = (event: SyntheticEvent<HTMLImageElement, Event>, displayName: string) => {
    event.currentTarget.src = `https://ui-avatars.com/api/?name=${displayName}`;
  };

  const getBio = (mem: any) => {
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

  const getName = (mem: any) => {
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

  const getCommunityMembers = async (role: string, category: string) => {
    try {
      const response: any = await API.getCommunityMembers(orgId, location, role, category);
      if (response?.status === 200 && response?.statusText === 'OK') {
        if (Array.isArray(response?.data.memberResponse)) {
          setAllCommunityMembersList(response?.data.memberResponse);
        }
        setLoading(false);
      }
    } catch (error) {
      // console.error(error);
      setLoading(false);
    }
  };

  if (loading && communityMembers?.loading) {
    return <AppLoader />;
  }

  if (communityMembers?.error) {
    return <div>{communityMembers?.errorText}</div>;
  }

  return (
    <>
      <Box>
        <Box className="community-header">
          <Typography className="community-text">Community</Typography>
          <Box className="communityRight-header">
            <Typography className={classes.allNubWrapper}>{`All (${allCommunityMembersList?.length})`}</Typography>
            <img src={Filter} alt="filtericon" className="header-img" onClick={handleClickOpenFilter} />
          </Box>
        </Box>
        <Box className="innerHeader">
          <Typography className="allMembers-text community-text ">All Members</Typography>
          <Typography className="favorites-text community-text">Favorites</Typography>
          <Divider />
        </Box>
        <Divider />

        <Box className="communityCardSec">
          {communityMembers?.data && allCommunityMembersList?.length > 0 ? (
            <Grid container spacing={2} marginBottom={2}>
              {allCommunityMembersList?.map((mem: any) => {
                let cat: any = mem?.id.category;
                return (
                  <Grid item lg={2} md={3} sm={4} key={mem.userId}>
                    <Box
                      className="cardBg-img"
                      style={{
                        backgroundImage: `url(${
                          mem?.id.headshot ? mem?.id.headshot : `https://ui-avatars.com/api/?name=${mem?.id.firstName}`
                        })`
                      }}
                      onClick={() =>
                        navigate('/app/communitymember', {
                          state: { mem, allCommunityMembersList }
                        })
                      }
                      onError={(event: any) => addImageFallback(event, mem?.id?.firstName)}
                    >
                      <Box sx={{ padding: '13px' }}>
                        <Button
                          sx={{
                            background: '#FFFFFF',
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
                            borderRadius: '5px',
                            color:
                              cat === 'Student'
                                ? '#2955C7'
                                : cat === 'Faculty'
                                ? '#11895E'
                                : cat === 'Mentor'
                                ? '#E99940'
                                : cat === 'Alumni'
                                ? '#C7A429'
                                : '#000000',
                            fontSize: '12px',
                            fontWeight: '600',
                            height: '24px'
                          }}
                        >
                          {cat ? cat : 'Unknown'}
                        </Button>
                      </Box>

                      <Box className={classes.programBottomText}>
                        <Box sx={{ padding: '13px' }}>
                          <Typography className="member-text community-text">{getName(mem)}</Typography>
                          <Box
                            className="profile-text"
                            sx={{
                              display: 'flex',
                              alignItems: 'center'
                            }}
                          >
                            <Box
                              sx={{
                                display: 'block',
                                alignItems: 'center'
                              }}
                            >
                              {getBio(mem)}
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
          ) : (
            !loading &&
            communityMembers?.data &&
            allCommunityMembersList?.length === 0 && <Typography sx={{ padding: '16px' }}>No Members Found</Typography>
          )}
        </Box>
      </Box>
      <div>
        <Dialog
          open={openFilter}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth
        >
          <DialogTitle id="alert-dialog-title" className={classes.programDialogTitle}>
            Filter
            <IconButton style={{ float: 'right' }} onClick={handleCloseFilter}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <Divider />
          <DialogContent sx={{ padding: '0 !important' }}>
            <Box sx={{ padding: '0px' }}>
              <Accordion sx={{ padding: '0px !important' }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                  <Typography className={classes.popupSummary}>Role</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box className={classes.filterAccordionDetails}>
                    <Typography className={classes.filterDetailsText}> Mentee</Typography>
                    <Checkbox
                      {...label}
                      // defaultChecked
                      checked={mentee}
                      onChange={() => {
                        setMentee(!mentee);
                      }}
                    />
                  </Box>
                  <Box className={classes.filterAccordionDetails}>
                    <Typography className={classes.filterDetailsText}>Mentor</Typography>
                    <Checkbox
                      {...label}
                      checked={mentor}
                      onChange={() => {
                        setMentor(!mentor);
                      }}
                    />
                  </Box>
                  <Box className={classes.filterAccordionDetails}>
                    <Typography className={classes.filterDetailsText}>Admin</Typography>
                    <Checkbox {...label} checked={admin} onChange={() => setAAdmin(!admin)} />
                  </Box>
                  <Box className={classes.filterAccordionDetails}>
                    <Typography className={classes.filterDetailsText}>Program Friend</Typography>
                    <Checkbox {...label} checked={programFriend} onChange={() => setProgramFriend(!programFriend)} />
                  </Box>
                </AccordionDetails>
              </Accordion>
              <Accordion sx={{ padding: '0px !important' }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                  <Typography className={classes.popupSummary}>Function</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box className={classes.filterAccordionDetails}>
                    <Typography className={classes.filterDetailsText}> Student</Typography>
                    <Checkbox
                      {...label}
                      // defaultChecked
                      checked={student}
                      onChange={() => {
                        setStudent(!student);
                      }}
                    />
                  </Box>
                  <Box className={classes.filterAccordionDetails}>
                    <Typography className={classes.filterDetailsText}>Alumini</Typography>
                    <Checkbox
                      {...label}
                      checked={alumini}
                      onChange={() => {
                        setAlumini(!alumini);
                      }}
                    />
                  </Box>
                  <Box className={classes.filterAccordionDetails}>
                    <Typography className={classes.filterDetailsText}>Faculty</Typography>
                    <Checkbox
                      {...label}
                      checked={faculty}
                      onChange={() => {
                        setFaculty(!faculty);
                      }}
                    />
                  </Box>
                  <Box className={classes.filterAccordionDetails}>
                    <Typography className={classes.filterDetailsText}>Program Friend</Typography>
                    <Checkbox
                      {...label}
                      checked={programFriendCat}
                      onChange={() => {
                        setProgramFriendCat(!programFriendCat);
                      }}
                    />
                  </Box>
                </AccordionDetails>
              </Accordion>
            </Box>
          </DialogContent>
          <Divider />
          <DialogActions className="dialog-btn-sec">
            <Button className="dialog-btn dialog-border-btn" onClick={handleReset}>
              Reset
            </Button>
            <Button className="dialog-btn dialog-bg-btn" onClick={handleApply}>
              Apply
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default Community;
