/* eslint-disable prefer-destructuring */
/* eslint-disable no-restricted-globals */
import React from 'react';
// import ReactDOM from "react-dom/client";
import ZoomVideo from '@zoom/videosdk';
import './index.css';
import ZoomVideoWindow from './ZoomVideoWindow';
import ZoomContext from './context/zoom-context';
import { devConfig } from './config/dev';
import { b64DecodeUnicode, generateVideoToken } from './utils/util';

const ZoomIndex = () => {
  const queryString = window.location.hash.split('?')[1];
  const urlParams = new URLSearchParams(queryString);

  const topic = urlParams.get('topic');
  const name = urlParams.get('name');
  const role = urlParams.get('role');
  const password = urlParams.get('password');
  const startTime = urlParams.get('startTime');
  const endTime = urlParams.get('timeSlot');
  // const baseUrl = urlParams.get("baseUrl");

  // ?topic=Manindar-Test&name=Chrome-789&role=0&password=

  const urlArgs = { topic, name, role, password, startTime, endTime };
  // console.log(urlArgs)
  let meetingArgs: any = Object.fromEntries(new URLSearchParams(location.search));
  // Add enforceGalleryView to turn on the gallery view without SharedAddayBuffer
  if (!meetingArgs.sdkKey || !meetingArgs.topic || !meetingArgs.name || !meetingArgs.signature) {
    meetingArgs = { ...devConfig, ...meetingArgs, ...urlArgs };
    meetingArgs.enforceGalleryView = true;
  }

  if (meetingArgs.web) {
    if (meetingArgs.topic) {
      try {
        meetingArgs.topic = b64DecodeUnicode(meetingArgs.topic);
      } catch (e) {}
    } else {
      meetingArgs.topic = '';
    }

    if (meetingArgs.name) {
      try {
        meetingArgs.name = b64DecodeUnicode(meetingArgs.name);
      } catch (e) {}
    } else {
      meetingArgs.name = '';
    }

    if (meetingArgs.password) {
      try {
        meetingArgs.password = b64DecodeUnicode(meetingArgs.password);
      } catch (e) {}
    } else {
      meetingArgs.password = '';
    }

    if (meetingArgs.sessionKey) {
      try {
        meetingArgs.sessionKey = b64DecodeUnicode(meetingArgs.sessionKey);
      } catch (e) {}
    } else {
      meetingArgs.sessionKey = '';
    }

    if (meetingArgs.userIdentity) {
      try {
        meetingArgs.userIdentity = b64DecodeUnicode(meetingArgs.userIdentity);
      } catch (e) {}
    } else {
      meetingArgs.userIdentity = '';
    }

    if (meetingArgs.role) {
      meetingArgs.role = parseInt(meetingArgs.role, 10);
    } else {
      meetingArgs.role = 1;
    }
  }

  if (!meetingArgs?.cloud_recording_option) {
    meetingArgs.cloud_recording_option = '0';
  }
  if (!meetingArgs?.cloud_recording_election) {
    meetingArgs.cloud_recording_election = '';
  }

  if (!meetingArgs.signature && meetingArgs.sdkSecret && meetingArgs.topic) {
    meetingArgs.signature = generateVideoToken(
      meetingArgs.sdkKey,
      meetingArgs.sdkSecret,
      meetingArgs.topic,
      meetingArgs.password,
      meetingArgs.sessionKey,
      meetingArgs.userIdentity,
      parseInt(meetingArgs.role, 10),
      meetingArgs.startTime,
      meetingArgs.endTime,
      meetingArgs.cloud_recording_option,
      meetingArgs.cloud_recording_election
    );
    // console.log('=====================================');
    // console.log('meetingArgs', meetingArgs);

    // Remove the duplicate declaration of urlArgs here
    // const urlParams = {
    //   topic: meetingArgs.topic,
    //   name: meetingArgs.name,
    //   password: meetingArgs.password,
    //   sessionKey: meetingArgs.sessionKey,
    //   userIdentity: meetingArgs.userIdentity,
    //   role: meetingArgs.role || 1,
    //   cloud_recording_option: meetingArgs.cloud_recording_option,
    //   cloud_recording_election: meetingArgs.cloud_recording_election,
    //   web: "1",
    // };
    // console.log('use url args');
    // console.log(window.location.origin + '/?' + new URLSearchParams(urlParams).toString());
  }

  const zmClient = ZoomVideo.createClient();

  return (
    <ZoomContext.Provider value={zmClient}>
      <ZoomVideoWindow meetingArgs={meetingArgs as any} />
    </ZoomContext.Provider>
  );
};
export default ZoomIndex;
