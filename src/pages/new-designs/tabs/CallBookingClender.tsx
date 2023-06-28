/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment-timezone';
import _ from 'lodash';
import { toast } from 'react-toastify';
import { useAuth0 } from '@auth0/auth0-react';
import { useAppSelector } from '../../../redux/hooks';
import { getUserDetails } from '../../../utils/orgName';
import { timezones } from '../../profile-page/timeZones';
// import instantCallEvent  from './instantCallEvent';
import {
  TextareaAutosize,
  Grid,
  InputLabel,
  Autocomplete,
  TextField,
  Button,
  Typography,
  DialogActions,
  DialogContent,
  Divider,
  Stack,
  Box
} from '@mui/material';
// import { makeStyles } from "@mui/styles";
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import './../../../assets/style/CallBookingCalendar.css';

// Get props
interface CallBookingCalendarProps {
  onClose: () => void; // Function to close the calendar
  channelNaame: string;
  chatType: string;
  threadParticipantsUsers: any[];
  pageName: string;
}

let chatThreadId = '';
let currentUserTimeZone: string | null;
let currentUsercommunicationId: string | null;
let callBookedWith: string | null;
let selectedCommIds: any[];
let participantscommunicationId: any[];

const CallBookingCalendar: React.FC<CallBookingCalendarProps> = ({
  onClose,
  channelNaame,
  threadParticipantsUsers,
  chatType,
  pageName
}) => {
  // State variables for selected date and time, invitees, and description
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null);
  const [ParticipantUsers, setParticipantUsers] = useState<any[]>([]);
  const [description, setDescription] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');

  const [searchParams] = useSearchParams();
  const threadId = searchParams.get('threadid') || '';
  const { user } = useAuth0();
  // let user_id = user?.sub ?? null;
  chatThreadId = threadId || '';
  const currentDate = new Date();
  const fetchCommunityMembers = useAppSelector((state) => state.acsCommunityUsers.data);
  const tokens = localStorage.getItem('tokens') ? JSON.parse(localStorage.getItem('tokens') || '') : {};

  // console.log(threadParticipantsUsers, 'sss');
  /**  */
  useEffect(() => {
    if (pageName === 'Chat') {
      participantscommunicationId = threadParticipantsUsers.map((user) => user.id.communicationUserId);
    } else {
      participantscommunicationId = threadParticipantsUsers.map((user) => user.id.communicationId);
    }
    // set all communicationId under the current thread
    if (threadParticipantsUsers && threadParticipantsUsers.length > 0) {
      // Extract communicationUserId from each object
      setParticipantUsers((prevParticipantUsers) => {
        const newParticipantUsers = [...prevParticipantUsers];
        participantscommunicationId.forEach((communicationId) => {
          if (!newParticipantUsers.includes(communicationId)) {
            newParticipantUsers.push(communicationId);
          }
        });
        selectedCommIds = newParticipantUsers;
        return newParticipantUsers;
      });
    }
    if (user) {
      // console.log(user);
      currentUsercommunicationId = user.user_metadata.communicationId;
      setParticipantUsers((prevParticipantUsers) => {
        if (!prevParticipantUsers.includes(currentUsercommunicationId)) {
          return [...prevParticipantUsers, currentUsercommunicationId];
        }
        return prevParticipantUsers;
      });
      currentUserTimeZone = getTimeZoneNameCodeByValue(user.user_metadata.timezone) || '';
    }
    setSelectedDateTime(new Date()); // Set selectedDateTime to current date
    // }, []);
  }, [threadParticipantsUsers, user, pageName]);

  // Handle selected date and time change
  const handleDateTimeChange = (date: Date | null) => {
    setSelectedDateTime(date);
  };

  /**
   * Making selected date Formating for Print Top of the calender and time slots */
  const formatMonthYear = (date: Date | null) => {
    const currentDate = new Date();
    const displayDate = date || currentDate;

    const options: Intl.DateTimeFormatOptions = { month: 'long', year: 'numeric', weekday: 'long' };

    const monthYearWithWeekday = displayDate.toLocaleDateString(undefined, options);

    const [month, year, day] = monthYearWithWeekday.split(' ');
    const monthYear = `${month} ${year}`;
    const monthYearDay = `${month} ${year}, ${day}`;
    return { monthYear, monthYearDay };
  };

  // Handle selected time slot change
  const handleTimeSlotChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTime(event.target.value);
  };

  // Handle selected invitees change
  const handleInviteesChange = (event: React.ChangeEvent<{}>, value: any[]) => {
    const newParticipantUsers = value.map((item) => item.id.communicationId);
    setParticipantUsers((prevParticipantUsers) => {
      const uniqueParticipantUsers = [...prevParticipantUsers];
      newParticipantUsers.forEach((communicationId) => {
        if (!uniqueParticipantUsers.includes(communicationId)) {
          uniqueParticipantUsers.push(communicationId);
        }
      });
      return uniqueParticipantUsers;
    });
  };

  // Handle description change
  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  /** Field Character Count */
  const maxCharacterCount = 1500;
  const totalCharacters = 0 + description.length;

  // Handle the Confirm button click
  const handleConfirm = () => {
    // Validate if a date, time, and time slot are selected
    if (!selectedDateTime || !selectedTime) {
      toast.error('Please select a date, time, and time slot');
      return;
    }

    // Format the selected date and time
    // eslint-disable-next-line prefer-destructuring
    const formattedDate = selectedDateTime.toISOString().split('T')[0];
    // const hours = selectedDateTime.getHours();
    // const minutes = selectedDateTime.getMinutes();
    // const formattedTime = `${hours}:${minutes.toString().padStart(2, '0')}`;

    // Make an API request using Axios
    const { orgId } = getUserDetails();

    /**
     * Header config
     */
    const config = {
      headers: {
        orgId: orgId,
        Authorization: `Bearer ${tokens.access_token}`,
        idtoken: tokens.id_token,
        location: 'us'
      }
    };

    /**
     * Data for call booking api
     */
    const requestBody: {
      callDate: string;
      callTime: string;
      callBookedWith?: string | null;
      callBookedBy: string;
      timeSlot: number;
      participantsUser: any[];
      chatThreadId?: string;
      chatType?: string;
      description?: string;
    } = {
      callDate: formattedDate,
      callTime: selectedTime,
      callBookedBy: currentUsercommunicationId !== null ? currentUsercommunicationId : '',
      timeSlot: 15,
      participantsUser: ParticipantUsers
    };

    if (chatThreadId) {
      requestBody.chatThreadId = chatThreadId;
    }

    if (chatType) {
      requestBody.chatType = chatType;
    }

    if (chatType) {
      if (chatType === 'Groups') {
        callBookedWith = chatThreadId;
      } else {
        const filteredParticipantsCmId = ParticipantUsers.filter((value) => value !== currentUsercommunicationId);

        callBookedWith = filteredParticipantsCmId.length > 0 ? filteredParticipantsCmId[0] : null;
      }
    }
    if (callBookedWith) {
      requestBody.callBookedWith = callBookedWith;
    }
    if (description) {
      requestBody.description = description;
    }

    // console.log('ggggg', requestBody);
    /**
     * Call the api
     */
    axios
      .post('https://dosen-v2.azurewebsites.net/api/scheduleCall', requestBody, config)
      .then((response) => {
        // Handle the API response
        // console.log('API Response:', response.data);
        onClose();
        // Reset the data after a successful API call
        setSelectedDateTime(null);
        setParticipantUsers([]);
        setDescription('');
        toast.success('Call booked successfully');
      })
      .catch((error) => {
        // Handle the API error
        // console.error('API Error:', error);
        toast.error('Something went wrong');
      });
  };

  // Handle the Cancel button click
  const handleCancel = () => {
    // Reset the selected values
    setSelectedDateTime(null);
    setParticipantUsers([]);
    // selectedCommIds = [];
    setDescription('');
    onClose();
  };

  /**
   *
   * @param value
   * @returns get timeZoneNameCode
   */
  function getTimeZoneNameCodeByValue(value: string): string | undefined {
    const timezone = timezones.find((zone) => zone.value === value);
    return timezone ? timezone.timeZoneNameCode : '';
  }

  /**
   * calcluate timezome wise time populate
   */
  const getTimeSlots = () => {
    if (selectedDateTime) {
      const timezone = currentUserTimeZone || '';
      const selectedDate = moment.tz(selectedDateTime, timezone).startOf('day'); // Modified line
      const endTime = moment(selectedDate).endOf('day');
      const timeIntervals = 15;

      const timeSlots = [];
      let currentTimeSlot = selectedDate.clone().startOf('hour');

      while (currentTimeSlot.isSameOrBefore(endTime)) {
        if (currentTimeSlot.isAfter(moment().tz(timezone))) {
          const currentTimeZoneSlot = currentTimeSlot.format('hh:mm a'); // (Format like 12:15 am)
          const utcTimeZoneSlot = moment.tz(currentTimeSlot, 'UTC').format('HH:mm'); // Converting Current timezone to UTC timezone

          const currentTimezoneAbbreviation = moment.tz(timezone).format('z'); // Taking Time zone like (IST, UTC)
          const timeSlotWithTimeZone = `${currentTimeZoneSlot} (${currentTimezoneAbbreviation})`; // (Format like 12:15 am (IST))

          const timeZoneWiseTimeSlot = {
            currentTimeZoneSlot: timeSlotWithTimeZone,
            utcTimeZoneSlot: utcTimeZoneSlot
          };

          timeSlots.push(timeZoneWiseTimeSlot);
        }
        currentTimeSlot = currentTimeSlot.add(timeIntervals, 'minutes');
      }

      return (
        <>
          {timeSlots.map((timeSlot) => (
            <div key={timeSlot.currentTimeZoneSlot}>
              <input
                type="radio"
                name="timeSlot"
                value={timeSlot.utcTimeZoneSlot}
                checked={selectedTime === timeSlot.utcTimeZoneSlot}
                onChange={handleTimeSlotChange}
                className="slotsCheckBtn"
                id={timeSlot.utcTimeZoneSlot}
              />
              <label
                htmlFor={timeSlot.utcTimeZoneSlot}
                className={`checkedBoxs ${selectedTime === timeSlot.utcTimeZoneSlot ? 'Active' : ''}`}
              >
                {timeSlot.currentTimeZoneSlot}
              </label>
            </div>
          ))}
        </>
      );
    }

    return null;
  };

  return (
    <>
      <Divider />
      <DialogContent>
        {/* Calendar section */}
        <div className="availability-calendar-container">
          <div className="calendar-wrapper">
            <h1 className="headingText">{formatMonthYear(selectedDateTime).monthYear}</h1>
            <Typography variant="subtitle2" mb={2}>
              Make sure you agree the meeting time before sending the invite
            </Typography>
            {/* Date picker component */}
            <DatePicker
              selected={selectedDateTime}
              onChange={(date) => handleDateTimeChange(date)}
              // showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="MMMM d, yyyy h:mm aa"
              inline
              minDate={currentDate}
              className="custom-datepicker"
              calendarClassName="custom-calendar"
            />
          </div>
          {/* Time slots */}
          <div className="time-slots">
            <h1 className="text-center headingText">{formatMonthYear(selectedDateTime).monthYearDay}</h1>
            <div className="time-slots-container">{getTimeSlots()}</div>
          </div>
        </div>

        {/* Invite others input */}
        <Typography variant="h6" mt={2} fontWeight="bold">
          Invite others
        </Typography>
        <Grid container spacing={2} mb={2}>
          <Grid item xs={12}>
            <Autocomplete
              multiple
              id="tags-standard"
              options={fetchCommunityMembers}
              getOptionLabel={(option) => option.displayName}
              defaultValue={[]}
              isOptionEqualToValue={(option, value) =>
                _.get(option, 'id.communicationUserId') === _.get(value, 'id.communicationUserId')
              }
              renderOption={(props, option) => {
                // console.log(selectedCommIds, 'selected comm ids');
                if (!selectedCommIds.includes(option.id.communicationId)) {
                  // exclude self in invitee list
                  return (
                    <li {...props} key={_.get(option, 'id.communicationUserId', '')}>
                      {_.startCase(_.get(option, 'displayName'))}
                    </li>
                  );
                }
              }}
              renderInput={(params) => <TextField {...params} placeholder="Select" />}
              onChange={handleInviteesChange}
            />
          </Grid>
          {/* Description input */}
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={0} mb={1}>
              <InputLabel>Context for the call</InputLabel>
              <InputLabel>{`${totalCharacters}/${maxCharacterCount}`}</InputLabel>
            </Stack>
            <TextareaAutosize
              style={{ width: '100%' }}
              minRows={3}
              maxLength={maxCharacterCount}
              onChange={handleDescriptionChange}
              value={description}
              name="description"
              placeholder="Write description about meet agenda"
              className="fieldDesign"
            />
          </Grid>
        </Grid>
        <Box>
          <p className="noteText">
            Once you click the "Confirm button" your call will be scheduled. You can cancel up to 4 days, or reschedule
            up to 4 hours ahead of your scheduled appointment
          </p>
        </Box>
      </DialogContent>
      <Divider />
      <DialogActions className="modalFooter">
        <Button className="modalBtn cancelBtn" onClick={handleCancel}>
          Cancel
        </Button>
        <Button className="modalBtn doneBtn" onClick={handleConfirm}>
          Confirm
        </Button>
      </DialogActions>
    </>
  );
};

export default CallBookingCalendar;
