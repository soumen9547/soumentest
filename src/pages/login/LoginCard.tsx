import { Grid, Box, Card, CardContent, Button, Typography } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
const constants = {
  title: 'DOSEN',
  text1: "We're all in Business",
  text2: 'together.',
  desc: 'learn from the experience and expertise of others and share the know-how you bring',
  btnOneText: 'Request platform seat',
  loginBtnText: 'Login'
};

const LoginCard = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  const handleLogin = () => {
    const tokens = localStorage.getItem('tokens');
    if (tokens || isAuthenticated) {
      navigate('/app/home');
    } else {
      localStorage.removeItem('invitation');
      loginWithRedirect();
    }
  };
  return (
    <Card
      sx={{
        minWidth: 275,
        paddingTop: 3,
        position: 'relative',
        background: 'rgba(255,255,255,0.8)'
      }}
    >
      <CardContent>
        <Typography mb={2} variant="h5" component="div" textAlign="center">
          {constants.title}
        </Typography>

        <Typography variant="h5" component="div" textAlign="center">
          {constants.text1}
        </Typography>
        <Typography variant="h5" component="div" textAlign="center" color="orange">
          {constants.text2}
        </Typography>

        <Typography variant="body2" textAlign="center" marginX={5} marginY={2}>
          {constants.desc}
        </Typography>
      </CardContent>
      <Box padding={2}>
        <Grid container spacing={6} justifyContent="center">
          {/* <Grid item xs={6}>
            <Button variant="outlined" color="primary" fullWidth>
              {constants.btnOneText}
            </Button>
          </Grid> */}
          <Grid item xs={6}>
            <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
              {constants.loginBtnText}
            </Button>
            {/* <a href={url}>login</a> */}
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

export default LoginCard;
