/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useCallback, useState } from 'react';
import { TableCell, TableRow } from '@mui/material';
// import {useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../../assets/style/table-row-style.css';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
// eslint-disable-next-line no-duplicate-imports
import { Button } from '@mui/material';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import TimeFormatter from '../home/TimeFormat';
import LaunchZoomCall from '../../../LaunchZoomCall';
import Calendar from '../home/calendar';
import Avatar from 'react-avatar';

interface Props {
  callsData: MyComponentProps;
  user_tz: string;
  user_id: string;
  userName?: string | null;
}

interface MyComponentProps {
  _id: string;
  callDate: string;
  callTime: string;
  timeSlot: number;
  participantsUser?: any[];
  chatType?: string;
  callBookedWith?: {
    id: string;
    name: string;
    headshot: string;
  };
  callBookedBy?: {
    id: string;
    name: string;
    headshot: string;
  };
}

const SchedulecallTableRow: React.FC<Props> = ({ callsData, user_tz, user_id, userName }) => {
  // console.log(callsData, 'row+');
  const [openZoomCall, setOpenZoomCall] = useState(false);
  const [zoomCallProps, setZoomCallProps] = useState({
    base_url: '',
    meetingId: '',
    unix_time: 0,
    userName: ''
  });
  // const navigate = useNavigate();
  const callsRowDynamicDiv = useCallback(() => {
    if (callsData?.chatType === 'Groups') {
      return (
        <div className="d-flex text-center">
          <Avatar
            size="40"
            round={true}
            name={callsData?.callBookedWith?.name}
            src={callsData?.callBookedWith?.headshot}
          />
          <div className="ps-2">
            <div className="d-flex mt-1">
              <p className="mb-0">{callsData?.callBookedWith?.name}</p>
            </div>
          </div>
        </div>
      );
    } else {
      // show booker booked person's details and others booker details
      const userWithId =
        user_id === callsData?.callBookedBy?.id ? callsData?.callBookedWith?.id : callsData?.callBookedBy?.id;
      const matchingParticipant = callsData?.participantsUser?.find((user) => user.mid === userWithId);
      return (
        <div className="d-flex text-center">
          <Avatar size="40" round={true} name={matchingParticipant?.name} src={matchingParticipant?.headshot} />
          <div className="ps-2">
            <div className="d-flex mb-1">
              <p className="mb-0">{matchingParticipant?.name}</p>
              <div className="class1">{matchingParticipant?.category}</div>
            </div>
            {matchingParticipant?.category === 'Student' ? (
              <div className="text-start">
                <p style={{ color: '#9f9f9f' }}>
                  {' '}
                  {stringFormatter(
                    matchingParticipant?.bio?.education?.major,
                    matchingParticipant?.bio?.education?.university
                  )}{' '}
                </p>
              </div>
            ) : (
              <div className="text-start">
                <p style={{ color: '#9f9f9f' }}>
                  {' '}
                  {stringFormatter(
                    matchingParticipant?.bio?.workHistory?.role,
                    matchingParticipant?.bio?.workHistory?.companyName
                  )}{' '}
                </p>
              </div>
            )}
          </div>
        </div>
      );
    }
  }, [callsData]);

  useEffect(() => {
    callsRowDynamicDiv();
  }, [callsRowDynamicDiv]);

  // function GoToCall(callsData: any) {
  //     const callStartTimestamp = new Date(callsData.callDate + 'T' + callsData.callTime + 'Z').getTime();
  //     const callStartUnixTime = Math.floor(callStartTimestamp / 1000);
  //     const currentTimestamp = new Date().getTime();
  //     const currentUnixTime = Math.floor(currentTimestamp / 1000);
  //     const callEndUnixTime = callStartUnixTime + (callsData.timeSlot * 60);
  //     if (currentUnixTime > callEndUnixTime) {
  //         return "hide";
  //     } else {
  //         return "show";
  //     }
  // }

  function stringFormatter(string1: any, string2: any) {
    if (string1) {
      if (string2) {
        return string1 + ' * ' + string2;
      } else {
        return string1;
      }
    }
    return ' - ';
  }

  const handleBookIconClick = (param: any) => {
    const meetingId = callsData._id;
    const baseUrl = window.location.origin;
    // call start time
    // const callStartTimestamp = new Date(callsData.callDate + 'T' + callsData.callTime + 'Z').getTime();
    // const callStartUnixTime = Math.floor(callStartTimestamp / 1000);
    const currentTimestamp = new Date().getTime();
    const currentUnixTime = Math.floor(currentTimestamp / 1000);
    // const callEndUnixTime = callStartUnixTime + (callsData.timeSlot * 60);
    setZoomCallProps({
      base_url: baseUrl,
      meetingId: meetingId,
      unix_time: currentUnixTime,
      userName: userName || ''
    });
    setOpenZoomCall(true);

    // LaunchZoomCallFunction(baseUrl,meetingId,currentUnixTime,userName);
    // if ((currentUnixTime+300)>=callStartUnixTime) {
    //     //if current time is greater than call time
    //     // if(currentUnixTime>callEndUnixTime){
    //     //     toast.error("Call has ended");
    //     // }
    //     //else{
    //         LaunchZoomCallFunction(baseUrl,meetingId,callStartUnixTime,userName);
    //         //<LaunchZoomCall base_url={baseUrl} meetingId={meetingId} unix_time={unixTime} userName={userName} />
    //     //}
    // }else{
    //     console.log("Wait for the call time");
    //     toast.warning("Please wait for the scheduled call time");
    // }
  };

  return (
    <>
      <TableRow className="greyTableRow" key={callsData?._id}>
        <TableCell className="textCells">
          <Calendar call_date={callsData.callDate} />
        </TableCell>
        <TableCell className="textCells">
          <div className="d-flex text-center">{callsRowDynamicDiv()}</div>
        </TableCell>
        <TableCell className="textCells">
          <AccessTimeIcon
            sx={{
              color: '#9f9f9f'
            }}
          />
          &nbsp;
          <TimeFormatter call_date={callsData.callDate} call_time={callsData.callTime} user_tz={user_tz} /> ({user_tz})
        </TableCell>
        <TableCell className="textCells">
          <VideocamOutlinedIcon
            sx={{
              color: '#9f9f9f'
            }}
          />{' '}
          {callsData.timeSlot} Min
        </TableCell>
        <TableCell className="textCells">
          {/* {GoToCall(callsData) === "show" ? (
                        <Button
                            variant="contained"
                            size="small"
                            disableRipple
                            key={callsData?._id}
                            onClick={() => handleBookIconClick(callsData?._id)}
                        >
                            Go To Call
                        </Button>
                    ) : (
                        <span></span>
                    )} */}
          <Button
            variant="contained"
            size="small"
            disableRipple
            key={callsData?._id}
            onClick={() => handleBookIconClick(callsData?._id)}
          >
            Go To Call
          </Button>
        </TableCell>
      </TableRow>
      {openZoomCall && (
        <LaunchZoomCall
          base_url={zoomCallProps.base_url}
          meeting_id={zoomCallProps.meetingId}
          unix_time={zoomCallProps.unix_time}
          user_name={zoomCallProps.userName}
        />
      )}
    </>
  );
};

export default SchedulecallTableRow;
