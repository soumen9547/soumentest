/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import EducationAndSkills from '../../components/EducationAndSkills';
import WorkHistory from '../../components/WorkHistory';
import ProfileHeader from '../../components/ProfileHeader';
import DigitalIntro from '../../components/DigitalIntro';
import SocialHandles from '../../components/SocialHandles';
import { AppLoader } from '../../../../components/AppLoader';
import Disability from '../../components/Disability';
import Hobbies from '../../components/Hobbies';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
// import { API } from "../../../../api";
import { getUserDetails } from '../../../../utils/orgName';
import { fetchOrgDetails } from '../../../../redux/slices/orgDetails/orgDetailsSlice';
import ROLES from '../../../../utils/roles';

export interface FormValues {
  email: string;
  country: string;
  firstName: string;
  lastName: string;
  timezone: string;
  headshot: string;
  dob: string;
  phoneNumber: string;
  phonePrefix: string;
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
}

export const initialValues: FormValues = {
  email: '',
  firstName: '',
  country: '',
  lastName: '',
  timezone: '',
  headshot: '',
  dob: '',
  phoneNumber: '',
  phonePrefix: '',
  gender: '',
  ethnicity: '',
  firstGenStudent: '',
  social: {
    facebook: '',
    instagram: '',
    youtube: '',
    twitter: '',
    linkedIn: ''
  },
  disability: [],
  category: '',
  hobbies: []
};

const Profile = () => {
  const userDetails = useAppSelector((state) => state.userProfile);
  const data = userDetails.data?.personal_details || initialValues;
  const dispatch = useAppDispatch();
  const { orgId } = getUserDetails();

  const [formData, setFormData] = useState<FormValues>(initialValues);

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role !== ROLES.platAdmin) {
      dispatch(fetchOrgDetails(orgId));
    }
  }, []);

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
      <>
        <Grid item xs={6}>
          <Box
            sx={{
              background: '#fff',
              border: '1px solid #EFF0F4',
              borderRadius: '8px',
              marginTop: '20px'
            }}
          >
            <Box
              sx={{
                fontFamily: 'Open Sans',
                fontWeight: '600',
                fontSize: '16px',
                lineHeight: '22px'
              }}
            >
              <Box
                sx={{
                  padding: '12px 16px 20px',
                  fontFamily: 'Open Sans',
                  fontWeight: '600',
                  fontSize: '16px',
                  lineHeight: '22px'
                }}
              >
                Personal information
              </Box>
              <Divider />
              <Box
                sx={{
                  flexGrow: 1,
                  height: 'calc(100vh - 180px)',
                  overflow: 'hidden auto'
                }}
              >
                <ProfileHeader formData={formData} setFormData={setFormData} />
                <Divider />
                <Divider />
                <DigitalIntro />
                <Divider />
                <SocialHandles socialData={data.social} />
                <Divider />
                <Hobbies hobbiesValue={data.hobbies} />
                <Divider />
                <EducationAndSkills />
                <Divider />
                <Disability />
              </Box>
            </Box>
          </Box>
        </Grid>
        <WorkHistory />
      </>
    );
  }

  return null;
};

export default Profile;
