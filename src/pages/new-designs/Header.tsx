/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import H2 from '../../components/ui/Typography/H2';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Stack, Button, Popover, TextField, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { appColors } from '../../utils/theme';
import { useAppSelector } from '../../redux/hooks';
import _ from 'lodash';
import ChatAvatarComponent from './tabs/chat/ChatAvatarComponent';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useLogout } from '../../hooks';
import ROLES from '../../utils/roles';
import { useEffect, useState } from 'react';

const useStyles = makeStyles({
  textField: {
    padding: '0px !important'
  },
  uiStyles: {
    listStyle: 'none'
  },
  listStyle: {
    '&:hover': {
      backgroundColor: appColors.gray2,
      cursor: 'pointer'
    }
  }
});

const Header = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const { doLogout } = useLogout();

  const [searchParams] = useSearchParams();
  const role = localStorage.getItem('role') || '';
  const name = useAppSelector((state) => state.orgDetails.data?.name) || '';
  const userDetails = useAppSelector((state) => state.userProfile);
  const userProfile = useAppSelector((state) => state.userProfile.data?.personal_details);
  const userProfileImage = _.get(userProfile, 'headshot', '');
  const userFirstName = _.get(userProfile, 'firstName', '');
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const url = window?.location?.hash;

  let orgName = '';

  if (url?.includes('organizations')) {
    orgName = 'Organizations';
  } else if (role === ROLES?.platAdmin) {
    orgName = searchParams?.get('org') || '';
  } else {
    orgName = name;
  }
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  let tabsArray: any = [];

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const [mentorsArr, setMentorsArr] = useState<any>([]);
  const [menteesArr, setMenteesArr] = useState<any>([]);

  useEffect(() => {
    setMenteesArr(userDetails?.data?.mentee);
    setMentorsArr(userDetails?.data?.mentors);
  }, [userDetails?.data?.mentee, userDetails?.data?.mentors]);

  if (menteesArr?.length > 0) {
    tabsArray?.push({ name: 'Mentee View', route: '/app/home/mentee' });
  }
  if (mentorsArr?.length > 0 && role !== ROLES?.orgAdmin) {
    tabsArray?.push({ name: 'Mentor View', route: '/app/home/mentor' });
  }

  return (
    <Box className="topHeader">
      <H2 content={orgName} />
      <Box className="searchBox">
        <SearchIcon
          sx={{
            color: appColors.gray4,
            marginRight: '10px',
            width: '16.6px',
            height: '16.6px'
          }}
        />
        <TextField
          variant="standard"
          placeholder="Search Dosen"
          sx={{
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
          className={classes.textField}
        />
      </Box>
      <Box display="flex" alignItems="center">
        {/* tag */}
        {/* <Box
          display="flex"
          alignItems={"center"}
          justifyContent={"space-around"}
          border={`1px solid ${appColors.gray1}`}
          borderRadius={2}
          height="23px"
          marginRight={1}
          width="45px"
        >
          <img
            src={logo}
            style={{ width: "14px", height: "14px" }}
            alt="logo"
          />
          <Typography
            sx={{
              fontFamily: "Open Sans",
              fontSize: "12px",
              fontWeight: 600,
            }}
          >
            51
          </Typography>
        </Box> */}

        {/* Top right btns section for Home page */}
        {url.includes('/app/home') && (
          <Stack direction="row" spacing={1} sx={{ background: '#EFF0F4', borderRadius: '30px' }}>
            {tabsArray?.map((each: any) => {
              let jsx: any;
              if (each?.name === 'Admin View') {
                jsx = (
                  <Button
                    key={each.route}
                    sx={{
                      background: url?.includes(each.route) ? '#DF6438' : '#EFF0F4',
                      height: '35px',
                      borderRadius: '30px',
                      fontWeight: '600',
                      fontSize: '14px',
                      fontFamily: 'Open Sans',
                      color: url?.includes(each.route) ? '#fff' : '#152536',
                      ':hover': {
                        backgroundColor: url?.includes(each.route) ? '#DF6438' : '##EFF0F4'
                      }
                    }}
                    onClick={() => navigate(each.route)}
                  >
                    {each.name}
                  </Button>
                );
              }
              if (each?.name === 'Mentee View') {
                jsx = (
                  <Button
                    key={each.route}
                    sx={{
                      background: url?.includes(each.route) ? '#DF6438' : '#EFF0F4',
                      height: '35px',
                      borderRadius: '30px',
                      fontWeight: '600',
                      fontSize: '14px',
                      fontFamily: 'Open Sans',
                      color: url.includes(each.route) ? '#fff' : '#152536',
                      ':hover': {
                        backgroundColor: url.includes(each.route) ? '#DF6438' : '##EFF0F4'
                      }
                    }}
                    onClick={() => (menteesArr?.length > 0 ? navigate(each.route) : navigate('/app/home'))}
                  >
                    {each.name}
                  </Button>
                );
              }
              if (each?.name === 'Mentor View') {
                jsx = (
                  <Button
                    key={each.route}
                    sx={{
                      background: url?.includes(each.route) ? '#DF6438' : '#EFF0F4',
                      height: '35px',
                      borderRadius: '30px',
                      fontWeight: '600',
                      fontSize: '14px',
                      fontFamily: 'Open Sans',
                      color: url?.includes(each.route) ? '#fff' : '#152536',
                      ':hover': {
                        backgroundColor: url?.includes(each.route) ? '#DF6438' : '##EFF0F4'
                      }
                    }}
                    onClick={() => (mentorsArr?.length > 0 ? navigate(each.route) : navigate('/app/home'))}
                  >
                    {each.name}
                  </Button>
                );
              }
              return jsx;
            })}
          </Stack>
        )}

        <Box sx={{ cursor: 'pointer' }} onClick={(e) => handleClick(e)}>
          <ChatAvatarComponent
            image={userProfileImage}
            firstLetter={userFirstName?.slice(0, 1)}
            width="40px"
            height="40px"
          />
        </Box>
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
          {/* <Typography
            className={classes.listStyle}
            sx={{ py: 1, px: 4 }}
            onClick={() => {
              navigate("/app/home");
              setAnchorEl(null);
            }}
          >
            Home
          </Typography> */}
          <Typography
            className={classes.listStyle}
            sx={{ py: 1, px: 4 }}
            onClick={() => {
              navigate(role !== ROLES.platAdmin ? '/app/profile' : '/app/profile/security');
              setAnchorEl(null);
            }}
          >
            Profile
          </Typography>
          <Typography
            className={classes.listStyle}
            sx={{ py: 1, px: 4 }}
            onClick={() => {
              doLogout();
              setAnchorEl(null);
            }}
          >
            Logout
          </Typography>
        </Popover>
      </Box>
    </Box>
  );
};

export default Header;
