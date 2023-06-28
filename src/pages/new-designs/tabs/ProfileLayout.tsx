/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ProfileSidebar from "../components/ProfileSidebar";
import { AppLoader } from "../../../components/AppLoader";

import { useAppSelector } from "../../../redux/hooks";
import { Outlet } from "react-router-dom";

export type FormValues = {
  email: string;
  country: string;
  firstName: string;
  lastName: string;
  timezone: string;
  headshot: string;
  dob: string;
  phoneNumber: string;
  phonePrefix:string;
  gender: string;
  ethnicity: string;
  firstGenStudent: string;
  social: {
    facebook: string;
    instagram: string;
    youtube: string;
    twitter: string;
    linkedIn: string;
  };
  disability: string[];
  category: string;
  hobbies: string[];
};

export const initialValues: FormValues = {
  email: "",
  firstName: "",
  country: "",
  lastName: "",
  timezone: "",
  headshot: "",
  dob: "",
  phoneNumber: "",
  phonePrefix:"",
  gender: "",
  ethnicity: "",
  firstGenStudent: "",
  social: {
    facebook: "",
    instagram: "",
    youtube: "",
    twitter: "",
    linkedIn: "",
  },
  disability: [],
  category: "",
  hobbies: [],
};

const ProfileLayout = () => {
  const userDetails = useAppSelector((state) => state.userProfile);

  if (userDetails.loading) {
    return (
      <div>
        <AppLoader />
      </div>
    );
  }

  if (userDetails.error) {
    return <div>{userDetails.errorText}</div>;
  }

  if (userDetails.data) {
    return (
      <Box sx={{ background: " #E5E5E5", display: "flex" }}>
        <Grid container spacing={2}>
          <ProfileSidebar />
          <Outlet />
        </Grid>
      </Box>
    );
  }

  return null;
};

export default ProfileLayout;
