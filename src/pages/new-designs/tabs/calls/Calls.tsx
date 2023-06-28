import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { AppLoader } from '../../../../components/AppLoader';
import { getUserDetails } from '../../../../utils/orgName';
import { Typography } from '@mui/material';
import SchedulecallTable from './SchedulecallTable';

const Calls = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [callRows, setCallRows] = useState([]);
  const { user } = useAuth0();
  const tokens = localStorage.getItem('tokens') ? JSON.parse(localStorage.getItem('tokens') || '') : {};

  useEffect(() => {
    let user_id = user?.sub ?? null;
    const acsToken = localStorage.getItem('acsToken');

    const getScheduleCall = async (user_id: string | null, acsToken: string | null) => {
      try {
        const { orgId } = getUserDetails();
        const headerConfig = {
          headers: {
            orgId: orgId,
            Authorization: `Bearer ${tokens.access_token}`,
            idtoken: tokens.id_token,
            location: 'us'
          }
        };
        const response = await axios.get(
          `https://dosen-v2.azurewebsites.net/api/getScheduleCall?userId=${user_id}&azureToken=${acsToken}`,
          headerConfig
        );

        if (response.status === 200) {
          setCallRows(response.data.data);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        // console.error("Error retrieving max matches:", error);
      }
    };

    getScheduleCall(user_id, acsToken);
  }, [user?.sub, user?.user_metadata.timezone, tokens.access_token, tokens.id_token]);

  if (loading) {
    return <AppLoader />;
  }

  return (
    <div>
      <Typography
        sx={{
          fontFamily: 'Open Sans',
          fontWeight: '600',
          fontSize: '16px',
          paddingLeft: '10px'
        }}
      >
        Calls
      </Typography>
      <SchedulecallTable
        callsData={callRows}
        user_tz={user?.user_metadata.timezone}
        user_id={user?.sub}
        user_name={user?.name}
      />
    </div>
  );
};

export default Calls;
