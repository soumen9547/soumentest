import React, { useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';

// import LinearProgress, {
//   linearProgressClasses,
// } from "@mui/material/LinearProgress";
// import { styled } from "@mui/material/styles";
import { Box, IconButton, Popover, TableCell, TableRow, Typography } from '@mui/material';

import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { IGroupData, groupActions } from '../../../../../redux/slices/getAllGroups/getAllGroupsSlice';
import moment from 'moment';
import _ from 'lodash';
// import { alphaColors } from "../../../../../utils/alphabates-colors";
import ProgramDeletDialog from './ProgramDeletDialog';
import { API } from '../../../../../api';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../../../../../redux/hooks';
import { breadCrumbsActions } from '../../../../../redux/slices/breadcrumbs/breadcrumbsSlice';
import ROLES from '../../../../../utils/roles';
import pencile from '../../../../../assets/images/pencil.svg';
import delecticon from '../../../../../assets/images/delecticon.svg';
import ChatAvatarComponent from '../../chat/ChatAvatarComponent';
import { makeStyles } from '@mui/styles';
interface Props {
  data: IGroupData;
}

const ProgramTableRow = ({ data }: Props) => {
  const navigate = useNavigate();
  const { orgId } = useParams();
  const [openDelete, setDelete] = useState(false);
  const [deleteLoader, setDeleteLoader] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const dispatch = useAppDispatch();

  const [searchParams] = useSearchParams();
  const orgName = searchParams.get('org') || '';
  const role = localStorage.getItem('role') || '';
  let param = '';
  if (role === ROLES.platAdmin) {
    param = `/?org=${orgName}`;
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    setDeleteLoader(true);
    try {
      const response = await API.deleteGroup(data.grpId);
      if (response.status === 200 && response.statusText === 'OK') {
        dispatch(groupActions.deleteGroup(data.grpId));
        setDeleteLoader(false);
        setDelete(false);
        handleClose();
      }
    } catch (e) {
      setDeleteLoader(false);

      toast.error('Could not delete the group');
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const groupNameAbbriviation = data.name
    .split(' ')
    .map((each) => each[0])
    .join('')
    .toUpperCase();

  const startDate = moment.unix(data.startDate).format('MMM DD,YYYY');
  const color = data.status === 'Active' ? '#28A745' : '#6C757D';
  const useStyles = makeStyles({
    textStyle: {
      fontWeigth: '400!important',
      width: '220px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      color: '#0082B6',
      fontSize: '16px',
      fontFamily: 'Open Sans',
      marginLeft: '8px',
      cursor: 'pointer'
    }
  });

  const textCells = {
    fontWeigth: '400!important',
    color: '#152536',
    fontSize: '16px',
    fontFamily: 'Open Sans'
  };

  //   const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  //     height: 10,
  //     borderRadius: 5,
  //     [`&.${linearProgressClasses.colorPrimary}`]: {
  //       backgroundColor:
  //         theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  //     },
  //     [`& .${linearProgressClasses.bar}`]: {
  //       borderRadius: 5,
  //       backgroundColor: "#28A745",
  //     },
  //   }));
  const classes = useStyles();
  return (
    <>
      <TableRow>
        <TableCell>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* <Box
              sx={{
                width: "34px",
                height: "34px",
                background: _.get(
                  alphaColors,
                  `${groupNameAbbriviation.charAt(0)}`,
                  "#fff"
                ),
                borderRadius: "50%",
                color: "#fff",
                fontSize: "11px",
                fontWeight: "600",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {groupNameAbbriviation.slice(0, 3)}
            </Box> */}
            <ChatAvatarComponent
              firstLetter={groupNameAbbriviation.slice(0, 3)}
              width="34px"
              height="34px"
              type="no status"
              image={_.get(data, 'logo', '')}
              fontSize="11px"
            />
            <span
              onClick={() => {
                navigate(`/app/programdetails/${orgId}/${data.orgId}/${data.grpId}/overview${param}`);
              }}
              className={classes.textStyle}
            >
              {data.name}
            </span>
          </Box>
        </TableCell>

        <TableCell style={textCells}>{data.enrolled}</TableCell>
        {/* <TableCell>350</TableCell> */}
        {/* <TableCell>$100</TableCell> */}
        {/* <TableCell>
        {" "}
        <Box sx={{ display: "flex", alignItems: "center" }}>
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
        {/* <TableCell>12</TableCell> */}
        {/* <TableCell>28</TableCell> */}
        <TableCell style={textCells}>{startDate}</TableCell>
        {/* <TableCell>May 14, 2023</TableCell> */}
        <TableCell style={textCells}>
          <Box
            sx={{
              background: '#fff',
              border: `1px solid ${color}`,
              borderRadius: '5px',
              width: '54px',
              height: '20px',
              color,
              fontSize: '12px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {data.status}
          </Box>
        </TableCell>
        <TableCell style={textCells}>
          <IconButton onClick={handleClick}>
            <MoreVertIcon sx={{ color: ' #152536' }} />
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
              onClick={() => {
                dispatch(
                  breadCrumbsActions.updateBreadCrumbs({
                    id: data.grpId,
                    name: data.name,
                    url: `/app/programdetails/${orgId}/${data.orgId}/${data.grpId}/overview`
                  })
                );
                navigate(`/app/programdetails/${orgId}/${data.orgId}/${data.grpId}/settings`, {
                  state: { noUpdateAPICall: true }
                });
              }}
            >
              <IconButton>
                <img
                  src={pencile}
                  alt="pencil"
                  style={{
                    padding: 0,
                    margin: 0,
                    width: '20px',
                    height: '20px'
                  }}
                />
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
                Edit
              </Typography>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              sx={{ ':hover': { background: '#f0f2f0', cursor: 'pointer' } }}
              onClick={() => setDelete(true)}
            >
              <IconButton>
                <img
                  src={delecticon}
                  alt="delecticon"
                  style={{
                    padding: 0,
                    margin: 0,
                    width: '20px',
                    height: '20px'
                  }}
                />
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
          </Popover>
        </TableCell>
      </TableRow>
      <ProgramDeletDialog
        openDelete={openDelete}
        setDelete={setDelete}
        deleteLoader={deleteLoader}
        handleDelete={handleDelete}
        text={`Are you sure you want to delete this group? All of the group details
        and data will be deleted`}
      />
    </>
  );
};

export default ProgramTableRow;
