import React from 'react';
import { Table, TableCell, TableContainer, TableHead, TableRow, Typography, TableBody } from '@mui/material';
// import { div } from "@mui/system";
import Avatar from 'react-avatar';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../../assets/style/table-row-style.css';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';

interface Props {
  data: MyComponentProps;
}

interface MyComponentProps {
  id: number;
  booker_name: string;
  booker_user_type: string;
  booker_image: string;
  datetime: string;
  time_slot: number;
}

const DivRow: React.FC<Props> = ({ data }) => {
  return (
    <TableRow className="greyTableRow">
      <TableCell>
        <div className="d-flex text-center">
          <div className="d-flex text-center">
            <Avatar size="40" round={true} name={data.booker_name} src={data.booker_image} />
            <div className="row pl-20">
              {data.booker_name}
              <div className="class1">{data.booker_user_type}</div>
            </div>
          </div>
        </div>
      </TableCell>
      <TableCell className="textCells">
        <AccessTimeIcon
          sx={{
            color: '#9f9f9f'
          }}
        />{' '}
        {data.datetime}
      </TableCell>
      <TableCell className="textCells">
        <VideocamOutlinedIcon
          sx={{
            color: '#9f9f9f'
          }}
        />{' '}
        {data.time_slot} Min
      </TableCell>
    </TableRow>
  );
};

export default DivRow;
