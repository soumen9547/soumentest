import io from 'socket.io-client';

const socket = io('http://localhost:3001/'); // Replace with the actual URL of your Socket.io server

const instantCallEvent = (
  callBookedByName: any,
  bookWithUserDetails: any[],
  callBookedBycommunicationUserId: any,
  baseUrl: any,
  meetingId: any,
  currentUnixTime: number
) => {
  // console.log('369', callBookedBycommunicationUserId);
  const eventData = {
    callByName: callBookedByName,
    callBookedBycommunicationUserId: callBookedBycommunicationUserId,
    bookWithUserDetails: bookWithUserDetails,
    baseUrl: baseUrl,
    meetingId: meetingId,
    currentUnixTime: currentUnixTime
  };

  // Emit the video call event with the eventData
  socket.emit('instantCallEvent', eventData);
  /// console.log(eventData);

  // Send the eventData to the server
  fetch('http://localhost:3001/trigger-event', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      channel: 'instantCallChannel',
      event: 'instantCallEvent',
      data: eventData
    })
  })
    .then((response) => {
      if (response.ok) {
        // console.log('Data sent to server successfully');
      } else {
        // console.error('Failed to send data to server');
      }
    })
    .catch((error) => {
      // console.error('Error sending data to server:', error);
    });
};

export default instantCallEvent;
