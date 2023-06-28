import React from 'react';
import { Navigate } from 'react-router-dom';

interface Props {
  base_url: string;
  meeting_id: string;
  unix_time: number;
  user_name: any;
}

const LaunchZoomCall: React.FC<Props> = ({ base_url, meeting_id, unix_time, user_name }) => {
  const video_link =
    '/video-call?topic=' +
    meeting_id +
    '&name=' +
    user_name +
    '&role=0&password=20&startTime=' +
    unix_time +
    '&timeSlot=30&baseUrl=' +
    base_url;
  return <Navigate to={video_link} replace />;
};

export default LaunchZoomCall;
