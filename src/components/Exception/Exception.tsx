/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable prettier/prettier */
import { useAuth0 } from "@auth0/auth0-react";
import { Box, Typography,Button } from "@mui/material";
import _ from "lodash";
import React from "react";
import error from "../../assets/images/error.avif";
import "../ErrorPage/error.scss";
import { useLogout } from "../../hooks";
interface IUnAuthorized {
  http: number;
}
const UnAuthorized: React.FC<IUnAuthorized> = ({ http }) => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const { doLogout } = useLogout()
  const exceptionTitle = {
    402: "UnAuthorized",
    404: "Not Found",
  };
  const exceptionSubTitle = {
    402: "You are not authorized to access this page",
    404: "This page is not found",
  };
  return (
    // <div
    //   style={{
    //     display: "flex",
    //     height: "100vh",
    //     width: "100vw",
    //     backgroundColor: "#eaeaea",
    //     justifyContent: "center",
    //     alignItems: "center",
    //   }}
    // >
    //   <Box
    //     boxShadow={2}
    //     padding={4}
    //     display="flex"
    //     justifyContent="center"
    //     alignItems="center"
    //     bgcolor="#fff"
    //     minWidth={300}
    //   >
    //     <Box>
    //     <Typography variant="h4" textAlign="center" color="red">{_.get(exceptionTitle,[http])}</Typography>
    //     <Typography variant="subtitle1">
    //       {_.get(exceptionSubTitle,[http])}
    //     </Typography>
    //     </Box>
    //   </Box>
    // </div>
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection={"column"}
      alignItems="center"
      justifyContent={"center"}
    >
      <img src={error} alt="error" className="img" />
      <Typography variant="h6" sx={{ marginTop: "30px", fontWeight: "bold" }}>
        {_.get(exceptionTitle, [http])}
      </Typography>
      <Typography variant="subtitle1">
        {_.get(exceptionSubTitle, [http])}
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

export default UnAuthorized;
