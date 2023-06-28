/* eslint-disable prettier/prettier */
export interface TimeZoneType {
  value: string;
  text: string;
  timeZoneNameCode: string;
}

export const timezones: TimeZoneType[] = [
  {
    value: "UTC-12:00",
    text: "(UTC -12:00) Eniwetok, Kwajalein",
    timeZoneNameCode: "Pacific/Kwajalein",
  },
  {
    value: "UTC-11:00",
    text: "(UTC -11:00) Midway Island, Samoa",
    timeZoneNameCode: "Pacific/Midway",
  },
  {
    value: "UTC-10:00",
    text: "(UTC -10:00) Hawaii",
    timeZoneNameCode: "Pacific/Honolulu",
  },
  {
    value: "UTC-9:00",
    text: "(UTC -9:00) Alaska",
    timeZoneNameCode: "America/Anchorage",
  },
  {
    value: "UTC-8:00",
    text: "(UTC -8:00) Pacific Time (US & Canada)",
    timeZoneNameCode: "America/Los_Angeles",
  },
  {
    value: "UTC-7:00",
    text: "(UTC -7:00) Mountain Time (US & Canada)",
    timeZoneNameCode: "America/Denver",
  },
  {
    value: "UTC-6:00",
    text: "(UTC -6:00) Central Time (US & Canada), Mexico City",
    timeZoneNameCode: "America/Chicago",
  },
  {
    value: "UTC-5:00",
    text: "(UTC -5:00) Eastern Time (US & Canada), Bogota, Lima",
    timeZoneNameCode: "America/New_York",
  },
  {
    value: "UTC-4:00",
    text: "(UTC -4:00) Atlantic Time (Canada), Caracas, La Paz",
    timeZoneNameCode: "America/Halifax",
  },
  {
    value: "UTC-3:30",
    text: "(UTC -3:30) Newfoundland",
    timeZoneNameCode: "America/St_Johns",
  },
  {
    value: "UTC-3:00",
    text: "(UTC -3:00) Brazil, Buenos Aires, Georgetown",
    timeZoneNameCode: "America/Sao_Paulo",
  },
  {
    value: "UTC-2:00",
    text: "(UTC -2:00) Mid-Atlantic",
    timeZoneNameCode: "Atlantic/South_Georgia",
  },
  {
    value: "UTC-1:00",
    text: "(UTC -1:00) Azores, Cape Verde Islands",
    timeZoneNameCode: "Atlantic/Cape_Verde",
  },
  {
    value: "UTC",
    text: "(UTC) Western Europe Time, London, Lisbon, Casablanca",
    timeZoneNameCode: "Europe/London",
  },
  {
    value: "UTC+01:00",
    text: "(UTC +1:00) Brussels, Copenhagen, Madrid, Paris",
    timeZoneNameCode: "Europe/Paris",
  },
  {
    value: "UTC+02:00",
    text: "(UTC +2:00) Kaliningrad, South Africa",
    timeZoneNameCode: "Europe/Moscow",
  },
  {
    value: "UTC+03:00",
    text: "(UTC +3:00) Baghdad, Riyadh, Moscow, St. Petersburg",
    timeZoneNameCode: "Asia/Baghdad",
  },
  {
    value: "UTC+03:30",
    text: "(UTC +3:30) Tehran",
    timeZoneNameCode: "Asia/Tehran",
  },
  {
    value: "UTC+04:00",
    text: "(UTC +4:00) Abu Dhabi, Muscat, Baku, Tbilisi",
    timeZoneNameCode: "Asia/Dubai",
  },
  {
    value: "UTC+04:30",
    text: "(UTC +4:30) Kabul",
    timeZoneNameCode: "Asia/Kabul",
  },
  {
    value: "UTC+05:00",
    text: "(UTC +5:00) Ekaterinburg, Islamabad, Karachi, Tashkent",
    timeZoneNameCode: "Asia/Karachi",
  },
  {
    value: "UTC+05:30",
    text: "(UTC +5:30) Bombay, Calcutta, Madras, New Delhi",
    timeZoneNameCode: "Asia/Kolkata",
  },
  {
    value: "UTC+05:45",
    text: "(UTC +5:45) Kathmandu, Pokhara",
    timeZoneNameCode: "Asia/Kathmandu",
  },
  {
    value: "UTC+06:00",
    text: "(UTC +6:00) Almaty, Dhaka, Colombo",
    timeZoneNameCode: "Asia/Almaty",
  },
  {
    value: "UTC+07:00",
    text: "(UTC +7:00) Bangkok, Hanoi, Jakarta",
    timeZoneNameCode: "Asia/Bangkok",
  },
  {
    value: "UTC+08:00",
    text: "(UTC +8:00) Beijing, Perth, Singapore, Hong Kong",
    timeZoneNameCode: "Asia/Singapore",
  },
  {
    value: "UTC+09:00",
    text: "(UTC +9:00) Tokyo, Seoul, Osaka, Sapporo, Yakutsk",
    timeZoneNameCode: "Asia/Tokyo",
  },
  {
    value: "UTC+09:30",
    text: "(UTC +9:30) Adelaide, Darwin",
    timeZoneNameCode: "Australia/Adelaide",
  },
  {
    value: "UTC+10:00",
    text: "(UTC +10:00) Eastern Australia, Guam, Vladivostok",
    timeZoneNameCode: "Australia/Sydney",
  },
  {
    value: "UTC+11:00",
    text: "(UTC +11:00) Magadan, Solomon Islands, New Caledonia",
    timeZoneNameCode: "Asia/Magadan",
  },
  {
    value: "UTC+12:00",
    text: "(UTC +12:00) Auckland, Wellington, Fiji, Kamchatka",
    timeZoneNameCode: "Pacific/Auckland",
  },
  {
    value: "UTC-9:30",
    text: "(UTC -9:30) Taiohae",
    timeZoneNameCode: "Pacific/Marquesas",
  },
  {
    value: "UTC-4:30",
    text: "UTC -4:30 Caracas",
    timeZoneNameCode: "America/Caracas",
  },
  {
    value: "UTC+6:30",
    text: "UTC +6:30 Yangon, Mandalay",
    timeZoneNameCode: "Asia/Yangon",
  },
  {
    value: "UTC+8:45",
    text: "UTC +8:45 Eucla",
    timeZoneNameCode: "Australia/Eucla",
  },
  {
    value: "UTC+10:30",
    text: "UTC +10:30 Lord Howe Island",
    timeZoneNameCode: "Australia/Lord_Howe",
  },
  {
    value: "UTC+11:30",
    text: "UTC +11:30 Norfolk Island",
    timeZoneNameCode: "Pacific/Norfolk",
  },
  {
    value: "UTC+12:45",
    text: "UTC +12:45 Chatham Islands",
    timeZoneNameCode: "Pacific/Chatham",
  },
  {
    value: "UTC+13:00",
    text: "UTC +13:00 Apia, Nukualofa",
    timeZoneNameCode: "Pacific/Tongatapu",
  },
  {
    value: "UTC+14:00",
    text: "UTC +14:00 Line Islands, Tokelau",
    timeZoneNameCode: "Pacific/Kiritimati",
  },
];
