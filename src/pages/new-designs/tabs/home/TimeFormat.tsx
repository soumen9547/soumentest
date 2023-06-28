import React from 'react';
import { format } from 'date-fns';
import { timezones } from '../../../profile-page/timeZones';
import { utcToZonedTime } from 'date-fns-tz';

interface Props {
  call_time: string;
  call_date: string;
  user_tz: string;
}

function getTimeZoneNameCodeByValue(value: string) {
  const timezone = timezones.find((zone) => zone.value === value);
  return timezone ? timezone.timeZoneNameCode : 'UTC';
}

function utcToGivenTz(call_date: string, utc_time: string, timezone: string) {
  const time = new Date(call_date + 'T' + utc_time + 'Z');
  const utc_to_tz = utcToZonedTime(time, timezone);
  // const formattedTime = format(utc_to_tz, 'do MMM yyyy hh:mm a');
  const formattedTime = format(utc_to_tz, 'hh:mm a');
  return formattedTime;
}

const TimeFormatter = ({ call_date, call_time, user_tz }: Props) => {
  const tz = getTimeZoneNameCodeByValue(user_tz);
  return <span>{utcToGivenTz(call_date, call_time, tz)}</span>;
};

export default TimeFormatter;
