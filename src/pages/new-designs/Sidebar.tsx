/* eslint-disable no-duplicate-imports */
import { Box } from '@mui/system';
import favicon from '../../assets/images/favicon.png';
import { IconButton, Typography } from '@mui/material';
import { AiFillHome } from 'react-icons/ai';
import { BsFillChatLeftTextFill } from 'react-icons/bs';
import { MdGroups } from 'react-icons/md';
import { RiBook2Fill } from 'react-icons/ri';
import { FaList } from 'react-icons/fa';
import { BsCalendar2WeekFill } from 'react-icons/bs';
import { BsCameraVideoFill } from 'react-icons/bs';
import { appColors } from '../../utils/theme';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { CgOrganisation } from 'react-icons/cg';
import { getUserDetails } from '../../utils/orgName';
import { auto } from '@popperjs/core';
import { breadCrumbsActions } from '../../redux/slices/breadcrumbs/breadcrumbsSlice';
import ROLES from '../../utils/roles';
import { makeStyles } from '@mui/styles';
import _ from 'lodash';

const useStyles = makeStyles({
  notificationText: {
    color: '#fff',
    backgroundColor: '#F79420',
    fontSize: 17,
    position: 'absolute',
    bottom: '25px',
    right: '-12px',
    borderRadius: '50%',
    padding: '0px 8px'
  }
});

const Sidebar = () => {
  const classes = useStyles();
  const adminArray = useAppSelector((state) => state.userProfile.data?.admins) || [];
  const menteeArray = useAppSelector((state) => state.userProfile.data?.mentee) || [];
  const mentorArray = useAppSelector((state) => state.userProfile.data?.mentors) || [];
  const orgGroupData = useAppSelector((state) => state.orgLevelGroup);
  const grpId = orgGroupData.data?.grpId || 'admin';
  const { coId } = getUserDetails();
  const { orgId } = getUserDetails();
  const dispatch = useAppDispatch();
  const role = localStorage.getItem('role') || '';
  const navigate = useNavigate();
  const location = useLocation();
  const chatNotifications = useAppSelector((state) => state.messageNotifications.notifications);
  const pathName = location.pathname;
  const homeRoute =
    mentorArray.length > 0 ? '/app/home/mentor' : menteeArray.length > 0 ? '/app/home/mentee' : '/app/home';
  const sideNavbarArray = [
    {
      id: 'home',
      name: 'Home',
      icon: <AiFillHome color={appColors.white} size="30px" />,
      notActive: <AiFillHome color="gray" size="30px" />,
      route: homeRoute
    },
    {
      id: 'organizations',
      name: 'Orgs',
      icon: <CgOrganisation color={appColors.white} size="25px" />,
      notActive: <CgOrganisation color="gray" size="25px" />,
      route: '/app/organizations'
    },
    {
      id: 'programdetails',
      name: 'Program',
      icon: <FaList color={appColors.white} size="25px" />,
      notActive: <FaList color="gray" size="25px" />,
      route: `/app/programdetails/${orgId}/${coId}/${grpId}/overview`
    },
    {
      id: 'chat',
      name: 'Chat',
      icon: <BsFillChatLeftTextFill color={appColors.white} size="25px" />,
      notActive: <BsFillChatLeftTextFill color="gray" size="25px" />,
      route: '/app/chat'
    },
    {
      id: 'community',
      name: 'Community',
      icon: <MdGroups color={appColors.white} size="35px" />,
      notActive: <MdGroups color="gray" size="35px" />,
      route: '/app/community'
    },
    {
      id: 'library',
      name: 'Library',
      icon: <RiBook2Fill color={appColors.white} size="30px" />,
      notActive: <RiBook2Fill color="gray" size="30px" />,
      route: '/app/library'
    },
    // {
    //   id: "knowledge",
    //   name: "Knowledge",
    //   icon: <RiBook2Fill color={appColors.white} size={"30px"} />,
    //   notActive: <RiBook2Fill color="gray" size={"30px"} />,
    //   route: "/app/knowledge",
    // },
    {
      id: 'calls',
      name: 'Calls',
      icon: <BsCameraVideoFill color={appColors.white} size="25px" />,
      notActive: <BsCameraVideoFill color="gray" size="25px" />,
      route: '/app/calls'
    },
    {
      id: 'calendar',
      name: 'Calendar',
      icon: <BsCalendar2WeekFill color={appColors.white} size="25px" />,
      notActive: <BsCalendar2WeekFill color="gray" size="25px" />,
      route: '/app/calendar'
    }
  ];

  return (
    <Box minWidth="110px" sx={{ backgroundColor: appColors.black1 }} height="100vh" overflow={auto}>
      <Box
        display="flex"
        flexDirection="column"
        sx={{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          height: '110px'
        }}
      >
        <img src={favicon} alt="logo" style={{ width: '35px', height: '35px' }} />
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: '14px',
            fontFamily: 'Open Sans',
            lineHeight: '19.07px',
            color: '#FFFFFF',
            paddingTop: '5px'
          }}
        >
          Dosen
        </Typography>
      </Box>
      <Box
        className="scroll-channel"
        sx={{
          overflowY: 'hidden',
          height: 'calc(100vh - 120px)',
          ':hover': {
            overflow: 'overlay'
          }
        }}
        width="100%"
      >
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          {sideNavbarArray.map((each) => {
            if (each.id === 'home') {
              if (role === ROLES.orgAdmin || role === ROLES.platAdmin) return null;
              if (
                (role === ROLES.grpAdmin || adminArray.length > 0) &&
                menteeArray.length === 0 &&
                mentorArray.length === 0
              ) {
                return null;
              }
            }
            if (each.id === 'programdetails') {
              if (role === ROLES.platAdmin || (role === ROLES.member && adminArray.length === 0)) {
                return null;
              }
            }
            if (each.id === 'organizations') {
              if (role !== ROLES.platAdmin) {
                return null;
              }
            }
            if (each.id === 'chat') {
              if (role === ROLES.platAdmin) {
                return null;
              }
            }
            if (each.id === 'community') {
              if (role === ROLES.platAdmin) {
                return null;
              }
            }
            if (each.id === 'library' && role !== ROLES.member && role !== ROLES.grpAdmin) {
              return null;
            }

            const activeCondition =
              pathName.includes(`/app/${each.id}`) ||
              (each.id === 'organizations' && pathName.includes('programdetails'));

            return (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column',
                  marginBottom: '20px',
                  cursor: 'pointer',
                  position: 'relative'
                }}
                onClick={() => {
                  if (each.id === 'programdetails') {
                    dispatch(
                      breadCrumbsActions.removeBreadCrumbs({
                        id: grpId,
                        name: 'Program',
                        url: `/app/programdetails/${orgId}/${coId}/${grpId}/overview`
                      })
                    );
                  }
                  navigate(each.route);
                }}
                key={each.id}
              >
                <IconButton>{activeCondition ? each.icon : each.notActive}</IconButton>
                <Typography
                  sx={{
                    padding: 0,
                    marginTop: '-8px',
                    fontSize: '13px',
                    fontFamily: 'Open Sans',
                    fontWeight: 400
                  }}
                  color={activeCondition ? 'white' : 'gray'}
                >
                  {each.name}
                </Typography>
                {each.name === 'Chat' && _.size(chatNotifications) > 0 ? (
                  <Typography className={classes.notificationText}>{_.size(chatNotifications)}</Typography>
                ) : null}
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
