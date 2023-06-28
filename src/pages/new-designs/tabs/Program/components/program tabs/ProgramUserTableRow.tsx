/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { IconButton, Typography } from '@mui/material';
import { useParams, useSearchParams } from 'react-router-dom';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import delecticon from '../../../../../../assets/images/delecticon.svg';
import previewicon from '../../../../../../assets/images/previewicon.svg';
// import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
// import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
// import LinearProgress, {
//   linearProgressClasses,
// } from "@mui/material/LinearProgress";

// import logo from "../../../../../../assets/images/favicon.png";
import Popover from '@mui/material/Popover';
import { IGroupUser, groupUsersActions } from '../../../../../../redux/slices/group-users/groupUsersSlice';
import ChatAvatarComponent from '../../../chat/ChatAvatarComponent';
import moment from 'moment';
import _ from 'lodash';
import { API } from '../../../../../../api';
import ProgramDeletDialog from '../ProgramDeletDialog';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../../../../../../redux/hooks';
import groupRoleMappings from '../../../../../../utils/groupRoleMappings';
import { getUserDetails } from '../../../../../../utils/orgName';
// import { green } from "@mui/material/colors";
// import excelimg from "../../../../../../assets/images/excelimg.svg";

interface Props {
  data: IGroupUser;
  setShowProfile: any;
  setActiveUserId: any;
  // anchorAction: any;
  // setAnchorAction: any;
}
const ProgramUserTableRow = ({
  data,
  setActiveUserId,
  setShowProfile
}: // anchorAction,
// setAnchorAction,
Props) => {
  const grpId = useParams().id || '';
  const [openDelete, setDelete] = useState(false);
  const [deleteLoader, setDeleteLoader] = useState(false);
  const [searchParams] = useSearchParams();
  const orgName = searchParams.get('org') || getUserDetails().orgName;
  const [anchorAction, setAnchorAction] = React.useState<HTMLButtonElement | null>(null);

  let roleColor = '#000';
  if (data.role === 'admin') {
    roleColor = '#28A745';
  } else if (data.role === 'member') {
    roleColor = '#0071A9';
  } else {
    roleColor = '#E99940';
  }

  const textStyle = {
    fontWeigth: '600 !important',
    color: '#152536',
    fontSize: '16px',
    fontFamily: 'Open Sans',
    cursor: 'pointer'
  };
  const marketingTextStyle = {
    fontWeigth: '400 !important',
    color: '#68717A',
    fontSize: '14px',
    fontFamily: 'Open Sans'
    // cursor: "pointer",
  };

  const dispatch = useAppDispatch();

  const handleClickAction = (event: any) => {
    setAnchorAction(event.currentTarget);
  };

  const handleCloseAction = () => {
    setAnchorAction(null);
  };

  // const handleDeleteOption = (e: any) => {
  //   setDelete(true);
  //   setAnchorAction(e.currentTarget);
  // };

  const removeUser = async () => {
    setAnchorAction(null);

    setDeleteLoader(true);
    try {
      const response = await API.removeUserFromGroup({
        grpId,
        userId: data.userId
      });
      if (response.status) {
        toast.success('Member successfully removed from the group');
        dispatch(groupUsersActions.removeUser({ userId: data.userId }));
        setDeleteLoader(true);
        setDelete(true);
        handleCloseAction();
      }
    } catch (e) {
      setDeleteLoader(false);
      setAnchorAction(null);
      toast.error("Couldn't remove the user. Try again later");
    }
  };

  const open = Boolean(anchorAction);
  const openAction = Boolean(anchorAction);

  const id = open ? 'simple-popover' : undefined;

  const groupRoleObject = groupRoleMappings[orgName] ? groupRoleMappings[orgName] : groupRoleMappings['default'];

  return (
    <>
      <TableRow>
        <TableCell colSpan={3}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center'
              // cursor: "pointer",
            }}
            // onClick={() => {
            //   setActiveUserId(data.userId);
            //   setShowProfile(true);
            // }}
          >
            <ChatAvatarComponent
              image={_.get(data, 'headshot', '')}
              type="no status"
              firstLetter={data.name.charAt(0)}
              width="40px"
              height="40px"
            />
            <Box sx={{ marginLeft: '10px' }}>
              <Typography
                style={textStyle}
                sx={{ fontWeight: '600' }}
                onClick={() => {
                  setActiveUserId(data.userId);
                  setShowProfile(true);
                }}
              >
                {_.get(data, 'name', '')}
              </Typography>
              <Typography style={marketingTextStyle}>{data.category}</Typography>
            </Box>
          </Box>
        </TableCell>

        <TableCell colSpan={3}>
          <Box
            sx={{
              background: '#fff',
              border: `1px solid ${roleColor}`,
              borderRadius: '5px',
              width: 'fit-content',
              height: '20px',
              padding: '5px',
              color: roleColor,
              fontSize: '12px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {/* {_.capitalize(data.role)} */}
            {_.startCase(groupRoleObject[data.role]) === 'Member' ? 'Mentee' : _.startCase(groupRoleObject[data.role])}
          </Box>
        </TableCell>
        {/* <TableCell>
      {" "}
      <Box
        display="flex"
        alignItems={"center"}
        justifyContent={"space-around"}
        border={`1px solid #EFF0F4`}
        borderRadius={2}
        height="25px"
        width="55px"
      >
        <img
          src={logo}
          style={{ width: "14px", height: "14px" }}
          alt="logo"
        />
        <Typography
          sx={{
            fontFamily: "Open Sans",
            fontSize: "12px", 
            fontWeight: 600,
          }}
        >
          94
        </Typography>
      </Box>
    </TableCell> */}

        {/* <TableCell>
      {" "}
      <Box
        sx={{ display: "flex", alignItems: "center" }}
      >
        <BorderLinearProgress
          variant="determinate"
          value={30}
          sx={{
            width: "70px",
            height: "8px",
            background: "#DF6438",
          }}
        />
        <span
          style={{
            color: "#68717A",
            opacity: "0.8",
            marginLeft: "6px",
            fontSize: "14px",
          }}
        >
          30%
        </span>
      </Box>
    </TableCell> */}
        {/* <TableCell>
      {" "}
      <img
        src={smileimg}
        alt="smileimg"
        style={{
          padding: 0,
          margin: 0,
          width: "24px",
          height: "24px",
        }}
      />
    </TableCell> */}
        {/* <TableCell>152</TableCell>
    <TableCell>65</TableCell>
    <TableCell>12</TableCell> */}
        <TableCell colSpan={3} style={{ textAlign: 'center' }}>
          {moment.unix(data.lastLogin).format('MMM DD,YYYY')}
        </TableCell>
        <TableCell colSpan={3} sx={{ textAlign: 'center' }}>
          <IconButton onClick={handleClickAction}>
            <MoreVertIcon sx={{ color: '#152536', textAlign: 'center' }} />
          </IconButton>
        </TableCell>
        {/* Actions popover code */}
        <Popover
          id={id}
          open={openAction}
          anchorEl={anchorAction}
          onClose={handleCloseAction}
          style={{
            width: '400px !important',
            height: '300px !important',
            padding: '20px'
          }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              padding: '10px 10px',
              cursor: 'pointer',
              ':hover': { background: '#f0f2f0', cursor: 'pointer' }
            }}
            onClick={() => {
              setActiveUserId(data.userId);
              setShowProfile(true);
            }}
          >
            <img
              src={previewicon}
              alt="previewicon"
              style={{
                padding: 0,
                margin: 0,
                width: '20px',
                height: '20px'
              }}
            />

            <Typography
              sx={{
                fontFamily: 'Open Sans',
                fontSize: '14px',
                fontWeight: '400',
                marginLeft: '7px'
              }}
            >
              View User
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              padding: '10px 10px',
              cursor: 'pointer',
              ':hover': { background: '#f0f2f0', cursor: 'pointer' }
            }}
            onClick={() => {
              setDelete(true);
              // setAnchorAction(null);
              // handleDeleteOption;
            }}
          >
            <img
              src={delecticon}
              alt="delecticon"
              style={{
                padding: 0,
                margin: 0,
                // width: "20px",
                width: '15px',
                // height: "20px",
                height: '25px'
              }}
            />

            <Typography
              sx={{
                fontFamily: 'Open Sans',
                fontSize: '14px',
                fontWeight: '400',
                marginLeft: '7px'
              }}
            >
              Remove User
            </Typography>
          </Box>
        </Popover>
      </TableRow>
      <ProgramDeletDialog
        openDelete={openDelete}
        setDelete={setDelete}
        deleteLoader={deleteLoader}
        text="Are you sure you want to remove the user from this group?"
        handleDelete={removeUser}
      />
    </>
  );
};

export default ProgramUserTableRow;
