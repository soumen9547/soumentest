/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable @typescript-eslint/consistent-type-definitions */
/* eslint-disable prettier/prettier */
import { useAuth0 } from "@auth0/auth0-react";
import { Box } from "@mui/system";
import wrong from "../../assets/images/error.avif";
import { useLogout } from "../../hooks";
import {Button, Typography} from '@mui/material'
import "./error.scss";
type Props = {
  message: string;
};

const Error = ({ message }: Props) => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const {doLogout} = useLogout()
  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection={"column"}
      alignItems="center"
      justifyContent={"center"}
    >
      <img src={wrong} alt="error" className="img" />
      <Typography
        variant="h6"
        sx={{
          marginTop: "30px",
          fontWeight: "bold",
          textAlign: "center",
          maxWidth: "600px",
        }}
      >
        {/* This user does not have any role associated */}
        {message}
      </Typography>
      {isAuthenticated ? (
        <Button
          variant="contained"
          size="small"
          onClick={() => doLogout()}
          sx={{ marginTop: "30px" }}
        >
          Logout
        </Button>
      ) : (
        <>
          <p>
            We keep track of these errors and resolve them asap. Try Logging
            in...
          </p>
          <Button
            variant="contained"
            size="small"
            onClick={() => loginWithRedirect()}
            sx={{ marginTop: "30px" }}
          >
            Login
          </Button>
        </>
      )}
    </Box>
  );
};

export default Error;
