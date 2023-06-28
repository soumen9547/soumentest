/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';

interface dateProps {
  call_date: string;
}

const Calendar: React.FC<dateProps> = ({ call_date }) => {
  const [day, setDay] = useState<string | null>(null);
  const [weekday, setWeekday] = useState<string | null>(null);
  const [month, setMonth] = useState<string | null>(null);

  useEffect(() => {
    const init = () => {
      const time = new Date(call_date);
      const locale = 'en-gb';

      const DD = time.getDate();
      const DDD = time.toLocaleString(locale, { weekday: 'short' });
      const MMM = time.toLocaleString(locale, { month: 'short' });

      setDay(String(DD));
      setWeekday(DDD);
      setMonth(MMM);

      // var DDDD = time.toLocaleString(locale, { weekday: "long" });
      // var MM   = time.getMonth() + 1;
      // var MMMM = time.toLocaleString(locale, {month: "long"});
      // var YYYY = time.getFullYear();
    };

    init();
  }, []);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Calendar"
      role="img"
      width="75"
      height="75"
      viewBox="0 0 512 512"
    >
      <path
        d="M512 455c0 32-25 57-57 57H57c-32 0-57-25-57-57V128c0-31 25-57 57-57h398c32 0 57 26 57 57z"
        fill="#ffffff"
      />
      {/* <path d="M200 0h-47c2 4 4 9 4 0 28 0 1 1-53-14H124c3 4 4 9 4 0 28 0 1 1 75 0H28C13 0 0 13 0 28v157h512V28c0-15-13-28-28-28z" fill="#276ba9" /> */}
      <path
        d="M484 0h-47c2 4 4 9 4 0 28 0 1 1-53-14H124c3 4 4 9 4 0 28 0 1 1 75 0H28C13 0 0 13 0 18v120h512V18c0-15-13-18-28-18z"
        fill="#1976d2"
      />

      <text id="month" x="256" y="100" fill="#fff" fontFamily="monospace" fontSize="85px" textAnchor="middle">
        {month}
      </text>

      <text id="day" x="256" y="320" fill="#000000" fontFamily="monospace" fontSize="200px" textAnchor="middle">
        {day}
      </text>

      <text id="weekday" x="256" y="460" fill="#66757f" fontFamily="monospace" fontSize="85px" textAnchor="middle">
        {weekday}
      </text>
    </svg>
  );
};

export default Calendar;
