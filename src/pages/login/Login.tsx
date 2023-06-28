/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/no-unstable-nested-components */
import * as React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  MenuItem,
  Grid,
  Paper
} from '@mui/material';
import LoginCard from './LoginCard';
import loginImage from '../../assets/images/landing.jpg'; // Import using relative path
import dosenLogo from '../../assets/images/favicon.png';
import { useAuth0 } from '@auth0/auth0-react';
import './index.scss';
import { Navigate, useNavigate } from 'react-router-dom';

const pages = ['Login'];

const styles = {
  paperContainer: {
    backgroundImage: `url(${loginImage})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'cover'
  },
  appBarStyle: {
    backgroundColor: '#000'
  }
};
const Login = () => {
  const invitation = localStorage.getItem('invitation');
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  // console.log(isAuthenticated);

  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  if (isAuthenticated) {
    return <Navigate to="/app/home" />;
  }

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const login = () => {
    const tokens = localStorage.getItem('tokens');
    if (tokens || isAuthenticated) {
      navigate('/app/home');
    } else {
      localStorage.removeItem('invitation');
      loginWithRedirect();
    }
  };

  const AppHeader = () => {
    return (
      <AppBar position="static" style={styles.appBarStyle}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}
            <img src={dosenLogo} alt="logo" className="navbarDosenLogo" />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none'
              }}
            >
              DOSEN
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left'
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' }
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            {/* <img src="" */}
            {/* <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} /> */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Typography
                variant="h5"
                noWrap
                component="a"
                href=""
                sx={{
                  mr: 2,
                  display: { xs: 'flex', md: 'none' },
                  flexGrow: 1,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none'
                }}
              >
                LOGO
              </Typography>
            </Box>

            <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
              {/* {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))} */}
              <Button onClick={login} sx={{ my: 2, color: 'white', display: 'block' }}>
                LOGIN
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    );
  };

  return (
    <>
      {invitation ? (
        login()
      ) : (
        <Paper style={styles.paperContainer}>
          <Box height="100vh">
            <Grid container>
              <Grid item xs={12}>
                <Box zIndex={20}>
                  <AppHeader />
                </Box>
              </Grid>
              <Grid item>
                <Box position="absolute" right="10%" bottom="20%">
                  <LoginCard />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      )}
    </>
  );
};
export default Login;
