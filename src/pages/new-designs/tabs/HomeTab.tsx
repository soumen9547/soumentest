/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import EditProfile from '../components/EditProfile';
import _ from 'lodash';
import DisabilityModal from '../components/DisabilityModal';
import { disabilityPopupActions } from '../../../redux/slices/disability/disabilityPopupSlice';
/** Home page custom style */
import '../../../assets/style/homeTab.css';
import ROLES from '../../../utils/roles';
import { toast } from 'react-toastify';
import { userInfoUpdate } from '../../../redux/slices/user-profile/userProfieSlice';
import { API } from '../../../api';
import { Outlet } from 'react-router-dom';

/** Added extra headshots */

function HomeTab() {
  const userData = useAppSelector((state) => state.userProfile.data);
  const userProfile = useAppSelector((state) => state.userProfile.data?.personal_details);
  const { category, timezone, phoneNumber, firstName, lastName } = userProfile || {
    category: '',
    timezone: '',
    phoneNumber: '',
    firstName: '',
    lastName: ''
  };
  // const timezone = userProfile?.timezone || "";
  const mandatoryFields = {
    category: true,
    timezone: true,
    phoneNumber: true,
    firstName: true,
    lastName: true
  };
  const settings = useAppSelector((state) => ({
    ...state.userProfile.data?.settings,
    ...mandatoryFields
  })) || {
    gender: false,
    country: false,
    firstGenerationStudent: false,
    ethnicity: false,
    dob: false,
    disabilityType: false,
    ...mandatoryFields
  };
  const isActive = _.get(userProfile, 'isActive', false);
  const [open, setOpen] = useState(false);
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    // because firstGenStudent and firstGenerationStudent are different
    const role = localStorage.getItem('role') || '';
    if (role !== ROLES.platAdmin && userData) {
      const data = {
        gender: userProfile?.gender || '',
        disabilityType: userProfile?.disability || [],
        firstGenerationStudent: userProfile?.firstGenStudent || '',
        country: userProfile?.country || '',
        dob: userProfile?.dob || '',
        ethnicity: userProfile?.ethnicity || '',
        category,
        timezone,
        phoneNumber,
        firstName,
        lastName
      };
      const value = Object.keys(settings).some((each) => {
        if (each === 'disabilityType') {
          return false;
        } else if (settings[each as keyof typeof settings] && _.get(data, `${each}`, '') === '') {
          return true;
        } else {
          return false;
        }
      });

      if (!isActive && value) {
        setDisable(true);
        setOpen(true);
      } else if (!isActive && settings.disabilityType && userProfile?.disability.length === 0) {
        dispatch(
          disabilityPopupActions.handleDisabilityPopup({
            open: true,
            disable: true
          })
        );
      }
    }
  }, [isActive, userData]);
  const dispatch = useAppDispatch();

  const getUserProfile = async () => {
    try {
      const response = await API.getUserProfile();
      if (response.status === 200 && response.statusText === 'OK') {
        dispatch(userInfoUpdate(response.data));
      }
    } catch (e) {
      toast.error('Failed to get user profile');
    }
  };
  useEffect(() => {
    getUserProfile();
  }, []);

  return (
    <>
      <EditProfile disableClose={disable} open={open} setOpen={setOpen} data={userProfile} />
      <DisabilityModal />
      <Outlet />
    </>
  );
}

export default HomeTab;
