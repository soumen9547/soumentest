import React from 'react';
import { Table, TableCell, TableContainer, TableHead, TableRow, Typography, TableBody } from '@mui/material';
import { Box } from '@mui/system';
import SchedulecallTableRow from './SchedulecallTableRow';

interface schedulecallTableProps {
  callsData?: any[];
  user_tz: string;
  user_id: any;
  user_name?: string;
}

const SchedulecallTable: React.FC<schedulecallTableProps> = ({ callsData, user_tz, user_id, user_name }) => {
  // console.log(callsData);
  return (
    <Box
      sx={{
        margin: '20px 0 20px 0',
        background: '#ffffff',
        border: '1px solid #EFF0F4',
        borderRadius: '8px'
      }}
    >
      <TableContainer>
        <Table className="program-table" width="100%" aria-label="simple table">
          <TableHead />
          <TableBody>
            {callsData ? (
              callsData.map((item) => (
                <SchedulecallTableRow
                  callsData={item}
                  user_tz={user_tz}
                  user_id={user_id}
                  userName={user_name}
                  key={item._id}
                />
              ))
            ) : (
              <TableRow>
                <TableCell component="td">
                  <span>
                    <Typography>No calls Found</Typography>
                  </span>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default SchedulecallTable;
