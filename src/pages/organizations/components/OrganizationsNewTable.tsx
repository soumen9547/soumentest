import React from 'react';
import _ from 'lodash';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { Delete, Add } from '@mui/icons-material';
import SettingsIcon from '@mui/icons-material/Settings';

import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TableBody,
  Box,
  IconButton,
  Popover
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import pluscircle from '../../../assets/images/pluscircle.svg';
import ChatAvatarComponent from '../../new-designs/tabs/chat/ChatAvatarComponent';

const OrganizationsNewTable = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const { data } = useSelector((state: RootState) => state.organizations);

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const groupNameAbbriviation = 'puskar'
    .split(' ')
    .map((each) => each[0])
    .join('')
    .toUpperCase();

  const tableStyle = {
    fontWeigth: '600 !important',
    color: ' #68717A',
    fontSize: '12px',
    fontFamily: 'Open Sans'
  };

  const textCells = {
    fontWeigth: '400!important',
    color: '#152536',
    fontSize: '16px',
    fontFamily: 'Open Sans'
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  /**
   * return JSX
   */
  return (
    <>
      {/* New table design */}
      <TableContainer sx={{ marginTop: '2rem' }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table" className="tableBody">
          <TableHead>
            <TableRow sx={{ borderBottom: '1px solid #EFF0F4' }}>
              <TableCell colSpan={2} width="50%" align="left">
                <Typography
                  sx={{
                    fontFamily: 'Open Sans',
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#152536',
                    textAlign: 'left'
                  }}
                >
                  All Organizations
                </Typography>
              </TableCell>
              <TableCell colSpan={3} width="50%">
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <img
                    src={pluscircle}
                    alt="pluscircle"
                    // onClick={() => onClickAddOrganization(true)}
                    style={{
                      padding: 0,
                      margin: 0,
                      width: '34px',
                      height: '34px',
                      marginRight: '6px',
                      cursor: 'pointer'
                    }}
                  />
                </Box>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={tableStyle} sx={{ fontWeight: '600' }}>
                ORGANIZATIONS NAME
              </TableCell>
              <TableCell style={tableStyle} sx={{ fontWeight: '600' }}>
                LOCATION
              </TableCell>
              <TableCell style={tableStyle} sx={{ fontWeight: '600' }}>
                ACTION
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <ChatAvatarComponent
                    firstLetter={groupNameAbbriviation.slice(0, 3)}
                    width="34px"
                    height="34px"
                    type="no status"
                    image={_.get(data, 'logo', '')}
                    fontSize="11px"
                  />
                  <span>Puskar Raj Koley</span>
                </Box>
              </TableCell>
              <TableCell style={textCells}>
                <Typography>Kolkata</Typography>
              </TableCell>
              <TableCell style={textCells}>
                <IconButton onClick={handleClick}>
                  <MoreVertIcon sx={{ color: '#152536' }} />
                </IconButton>
                <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  // disablePortal={true}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left'
                  }}
                >
                  <Box
                    display="flex"
                    alignItems="center"
                    sx={{ ':hover': { background: '#f0f2f0', cursor: 'pointer' } }}
                  >
                    <IconButton>
                      <Add />
                    </IconButton>
                    <Typography
                      paddingRight={1}
                      sx={{
                        fontFamily: 'Open Sans',
                        fontSize: '14px',
                        fontWeight: '400',
                        color: '#152536'
                      }}
                    >
                      Add
                    </Typography>
                  </Box>
                  <Box
                    display="flex"
                    alignItems="center"
                    sx={{ ':hover': { background: '#f0f2f0', cursor: 'pointer' } }}
                  >
                    <IconButton>
                      <Delete />
                    </IconButton>
                    <Typography
                      paddingRight={1}
                      sx={{
                        fontFamily: 'Open Sans',
                        fontSize: '14px',
                        fontWeight: '400',
                        color: '#152536'
                      }}
                    >
                      Delete
                    </Typography>
                  </Box>
                  <Box
                    display="flex"
                    alignItems="center"
                    sx={{ ':hover': { background: '#f0f2f0', cursor: 'pointer' } }}
                  >
                    <IconButton>
                      <SettingsIcon />
                    </IconButton>
                    <Typography
                      paddingRight={1}
                      sx={{
                        fontFamily: 'Open Sans',
                        fontSize: '14px',
                        fontWeight: '400',
                        color: '#152536'
                      }}
                    >
                      Manage
                    </Typography>
                  </Box>
                </Popover>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default OrganizationsNewTable;
