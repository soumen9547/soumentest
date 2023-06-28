import io from 'socket.io-client';
import React, { useEffect, useState } from 'react';
// import { useAuth0 } from '@auth0/auth0-react';
import { getUserDetails } from '../../../utils/orgName';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import LaunchZoomCall from '../../LaunchZoomCall';

const ReceiveInstantCall = () => {
  const [callFrom, setCallFrom] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isCallAccepted, setIsCallAccepted] = useState(false);
  const [zoomCallProps, setZoomCallProps] = useState({
    base_url: '',
    meetingId: '',
    unix_time: 0,
    userName: ''
  });
  useEffect(() => {
    const socket = io('http://localhost:3001/'); // Connect to the Socket.io server

    // Log socket connection events
    socket.on('connect', () => {
      console.log('Socket connected');
    });

    socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });

    socket.on('error', (error) => {
      console.error('Socket error:', error);
    });
    
    socket.on('instantCallChannel:instantCallEvent', (eventData) => {
      const data = eventData;
      console.log('User ID:', getUserDetails().communicationUserId);
      console.log('ccmm', eventData?.callBookedBycommunicationUserId);
      console.log('+++', eventData)
      const indexToRemove = data?.bookWithUserDetails?.findIndex(
        (item: any) => item.id.communicationUserId === data?.callBookedBycommunicationUserId
      );

      if (indexToRemove !== -1) {
        data.bookWithUserDetails.splice(indexToRemove, 1);
      }
      const isMatch = data?.bookWithUserDetails?.some(
        (item: any) => item.id.communicationUserId === getUserDetails().communicationUserId
      );

      console.log('isMatch:', isMatch);

      if (isMatch) {
        setZoomCallProps({
          base_url: data?.baseUrl,
          meetingId: data?.meetingId,
          unix_time: data?.currentUnixTime,
          userName: getUserDetails().name
        });
        setCallFrom(data?.callByName);
       // setIsMatchFound(true);
        setShowModal(true);
      } else {
        console.log('No match found');
       // setIsMatchFound(false);
        setShowModal(false);
      }

    });


    return () => {
      // Clean up the socket connection when the component is unmounted
      socket.disconnect();
    };
  }, []);


  const acceptCall = () => {
    // Perform actions when call is accepted
    setShowModal(false);
    setIsCallAccepted(true);
    setTimeout(() => {
      setIsCallAccepted(false);
    }, 2000);
    
  };

  const declineCall = () => {
    setShowModal(false);
  };


  return (
    <div>
      <Dialog open={showModal} onClose={() => setShowModal(false)}>
        <DialogTitle>Call from {callFrom}</DialogTitle>
        <DialogContent>
          {/* Add any additional content you want to display inside the dialog */}
        </DialogContent>
        <DialogActions>
          <Button onClick={acceptCall}>Accept the call</Button>
          <Button onClick={declineCall}>Decline</Button>
        </DialogActions>
      </Dialog>
      {/* Render the new component when call is accepted */}
      {isCallAccepted && (
        <LaunchZoomCall
          base_url={zoomCallProps.base_url}
          meeting_id={zoomCallProps.meetingId}
          unix_time={zoomCallProps.unix_time}
          user_name={zoomCallProps.userName}
        />
      )}
    </div>
  );
};

export default ReceiveInstantCall;
