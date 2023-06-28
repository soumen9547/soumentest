/* eslint-disable @typescript-eslint/prefer-optional-chain */
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable no-duplicate-imports */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  ChangeEvent,
  // DragEventHandler,
  useEffect,
  useRef,
  useState
} from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
// import Filter from "../../../../../../assets/images/Filter.svg";
import pluscircle from '../../../../../../assets/images/pluscircle.svg';
// import smileimg from "../../../../../../assets/images/smileimg.svg";
import bulkupload from '../../../../../../assets/images/bulkupload.svg';
import downloadicon from '../../../../../../assets/images/downloadicon.svg';
import microsoftexcelicon from '../../../../../../assets/images/microsoftexcelicon.svg';
// import SearchIcon from "@mui/icons-material/Search";
import { IconButton, Divider } from '@mui/material';
// import { appColors } from "../../../../../../utils/theme";
// import { makeStyles } from "@mui/styles";
import { useParams } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
// import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
// import LinearProgress, {
//   linearProgressClasses,
// } from "@mui/material/LinearProgress";
// import { styled } from "@mui/material/styles";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import PermIdentityIcon from '@mui/icons-material/PermIdentity';
// import Button from "@mui/material/Button";
// import logo from "../../../../../../assets/images/favicon.png";..
import Popover from '@mui/material/Popover';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import CloseIcon from '@mui/icons-material/Close';
import downloadblue from '../../../../../../assets/images/downloadblue.svg';
import upload from '../../../../../../assets/images/upload.svg';
import { useAppDispatch, useAppSelector } from '../../../../../../redux/hooks';
import { AppLoader } from '../../../../../../components/AppLoader';
import { IGroupUser, fetchGroupUsers } from '../../../../../../redux/slices/group-users/groupUsersSlice';
import _ from 'lodash';
import { API } from '../../../../../../api';
import { toast } from 'react-toastify';
import ProgramUserDetails from './ProgramUserDetails';
import { LoadingButton } from '@mui/lab';
import ProgramUserTableRow from './ProgramUserTableRow';
import ProgramInvitedUsers from './ProgramInvitedUsers';
import InviteUserDialog from '../InviteUserDialog';

// import { green } from "@mui/material/colors";
// import * as XLSX from "xlsx";
const XLSX = require('xlsx');

// import excelimg from "../../../../../../assets/images/excelimg.svg";
const ProgramUsers = () => {
  const grpId = useParams().id || '';
  const orgId = useParams().orgId || '';
  const groupUsers = useAppSelector((state) => state.groupUsers);
  const [showProfile, setShowProfile] = useState(false);
  const [activeUserId, setActiveUserId] = useState('');
  const dispatch = useAppDispatch();

  const tableStyle = {
    fontWeigth: '600',
    color: '#68717A',
    fontSize: '12px',
    fontFamily: 'Open Sans',
    marginBottom: '0 !important'
  };

  // const marketingTextStyle = {
  //   fontWeigth: "400 !important",
  //   color: "#68717A",
  //   fontSize: "14px",
  //   fontFamily: "Open Sans",
  //   cursor: "pointer",
  // };

  // const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  //   height: 10,
  //   borderRadius: 5,
  //   [`&.${linearProgressClasses.colorPrimary}`]: {
  //     backgroundColor:
  //       theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  //   },
  //   [`& .${linearProgressClasses.bar}`]: {
  //     borderRadius: 5,
  //     backgroundColor: "#28A745",
  //   },
  // }));

  // const useStyles = makeStyles({
  //   textField: {
  //     padding: "0px !important",
  //   },
  // });
  // const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const [anchorExport, setAnchorExport] = React.useState<HTMLButtonElement | null>(null);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openUploadUsers, setOpenUploadUsers] = React.useState(false);
  const [bulkUserLoading, setBulkUserLoading] = useState(false);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleClickUploadUsers = () => {
    setOpenUploadUsers(true);
  };
  const handleCloseUploadUsers = () => {
    setOpenUploadUsers(false);
    setErrorMessage('');
    setbulkFileName('');
  };

  // const handleClickBulkUsers = () => {
  //   setOpenBulkUsers(true);
  // };
  // const handleCloseBulkUsers = () => {
  //   setBulkUserLoading(false);
  //   reset();
  // };

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // const handleClickExport = (event: any) => {
  //   setAnchorExport(event.currentTarget);
  // };

  const handleCloseExport = () => {
    setAnchorExport(null);
  };

  // Upload Files in Bulk...................

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [bulkfileName, setbulkFileName] = useState<string>('');

  const handleButtonClick = () => {
    fileInputRef.current?.click();
    // if (bulkfileName) {
    //   // setbulkFileName("");
    // }
  };

  const handleBulkFileChanges = (event: ChangeEvent<HTMLInputElement>) => {
    const selectFile = event.target.files?.[0];

    if (selectFile) {
      handleFileInputChange(selectFile);
    }
  };

  const handleDragEnter: React.DragEventHandler<HTMLElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.type === 'dragenter' || event.type === 'dragover') {
      // setIsHovering(true);
    } else if (event.type === 'dragleave') {
      // setIsHovering(false);
    }
  };

  const handleDrop: React.DragEventHandler<HTMLElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const selectFile = event.dataTransfer.files;
    if (selectFile && selectFile[0]) {
      handleFileInputChange(selectFile[0]);
    }
  };

  const handleFileInputChange = (selectFile: File) => {
    const maxFileSize = 50 * 1024; // 50kb file size

    if (selectFile && selectFile.name.endsWith('.xlsx')) {
      if (selectFile.size > maxFileSize) {
        toast.error('File Size limit should not Exceed 50kb.');
        return;
      } else {
        setbulkFileName(selectFile.name);
      }
    } else {
      toast.error('Invalid file type. Please upload a valid file.');
      return;
    }
  };

  const [errorMessage, setErrorMessage] = useState<string>('');
  const handlebulkSubmit = async () => {
    setBulkUserLoading(true);
    if (bulkfileName) {
      const bulkFormData = new FormData();
      bulkFormData.append('xlsx', fileInputRef.current?.files?.[0] as File); // xlsx file accessed

      try {
        const response = await API.bulkFilesUpload({
          data: bulkFormData,
          orgId,
          grpId
        });

        if (response.status === 200 && response.statusText === 'OK') {
          if (response.data.invitedUsers) {
            dispatch(fetchGroupUsers(grpId));
          } else {
            toast.success(_.get(response, 'data.message', 'Invitations Sent Successfully'));
          }
          handleCloseUploadUsers();
          handleClose();
          setBulkUserLoading(false);
        } else {
          toast.error('Error uploading file.');
        }
      } catch (error) {
        setBulkUserLoading(false);
        toast.error('Error uploading file');
      }
    } else {
      setBulkUserLoading(false);
      // toast.error("select a file first");
      setErrorMessage('*Pleae Choose a File to Upload.');
      return;
    }
  };

  const handleDownload = () => {
    const data = [
      ['First name', 'Last name', 'User role', 'email', 'Mobile number (optional)', 'phonePrefix'],
      ['Pavan', 'Kumar', 'mentor', 'rpk24@gmail.com', '9999911111', '+91'],
      ['Thota', 'Varun', 'member', 'varun12@yahoo.com', '', ''],
      ['John', 'Smith', 'admin', 'jsmith007@gmail.com', '9999911111', '+91']
    ];
    const filename = 'template.xlsx';
    const sheet = XLSX.utils.aoa_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, sheet, 'Sheet1');
    XLSX.writeFile(workbook, filename);
  };

  const open = Boolean(anchorEl);
  const openExport = Boolean(anchorExport);

  const id = open ? 'simple-popover' : undefined;

  useEffect(() => {
    dispatch(fetchGroupUsers(grpId));
  }, []);

  if (groupUsers.loading) {
    return <AppLoader height="50vh" />;
  }
  if (groupUsers.error) {
    return <div>{groupUsers.errorText}</div>;
  }
  if (groupUsers.data) {
    return (
      <>
        <div style={{ height: '86%', overflow: 'auto' }}>
          <Box sx={{ margin: ' 10px 0px 20px' }}>
            {showProfile ? (
              <ProgramUserDetails actievUserId={activeUserId} setShowProfile={setShowProfile} grpId={grpId} />
            ) : (
              <Box
                sx={{
                  margin: '20px 0 20px 0',
                  background: '#ffffff',
                  border: '1px solid #EFF0F4',
                  borderRadius: '8px',
                  // height: "calc(100vh - 210px)",
                  overflow: 'hidden auto'
                }}
              >
                <TableContainer>
                  <Table className="tableBody" width="100%" aria-label="simple table">
                    <TableHead>
                      <TableRow sx={{ borderBottom: '1px solid #EFF0F4' }}>
                        <TableCell colSpan={6} width="50%" align="left">
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              columnGap: '50px'
                            }}
                          >
                            <Typography
                              sx={{
                                fontFamily: 'Open Sans',
                                fontSize: '16px',
                                fontWeight: '600',
                                color: '#152536',
                                textAlign: 'left'
                              }}
                            >
                              User List
                            </Typography>
                            {/* <Box
                              border={`1px solid ${appColors.gray1}`}
                              borderRadius={2}
                              display="flex"
                              alignItems={"center"}
                              width="294px"
                              height={"40px"}
                              padding={1.2}
                            >
                              <SearchIcon
                                sx={{
                                  color: appColors.gray4,
                                  marginRight: "7px",
                                  width: "16.6px",
                                  height: "16.6px",
                                }}
                              />
                              <TextField
                                variant="standard"
                                placeholder="Search Dosen"
                                sx={{
                                  borderColor: "transparent",
                                  padding: "0px !important",
                                  margin: 0,
                                  paddingBottom: 0,
                                  color: "#68717A",
                                }}
                                size="small"
                                type="text"
                                InputProps={{
                                  disableUnderline: true,
                                }}
                                className={classes.textField}
                              />
                            </Box> */}
                          </Box>
                        </TableCell>
                        <TableCell colSpan={6} width="50%">
                          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            {/* <img
                              src={Filter}
                              alt="filtericon"
                              style={{
                                padding: 0,
                                margin: 0,
                                width: "32px",
                                height: "32px",
                                marginRight: "10px",
                                cursor: "pointer",
                              }}
                            /> */}

                            <img
                              onClick={handleClick}
                              src={pluscircle}
                              alt="pluscircle"
                              style={{
                                padding: 0,
                                margin: 0,
                                width: '34px',
                                height: '34px',
                                marginRight: '10px',
                                cursor: 'pointer'
                              }}
                            />
                            {/* Add icon popover code */}
                            <Popover
                              id={id}
                              open={open}
                              anchorEl={anchorEl}
                              onClose={handleClose}
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
                                  padding: '15px 10px 5px',
                                  cursor: 'pointer'
                                }}
                                onClick={handleClickOpenDialog}
                              >
                                <PermIdentityIcon sx={{ height: '20px', width: '20px' }} />
                                <Typography
                                  sx={{
                                    fontFamily: 'Open Sans',
                                    fontSize: '14px',
                                    fontWeight: '400',
                                    marginLeft: '7px'
                                  }}
                                >
                                  Add user
                                </Typography>
                              </Box>
                              <Box
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  padding: '10px 10px 15px',
                                  cursor: 'pointer'
                                }}
                                onClick={handleClickUploadUsers}
                              >
                                <img
                                  src={bulkupload}
                                  alt="bulkupload"
                                  style={{
                                    padding: 0,
                                    margin: 0,
                                    width: '15px',
                                    height: '18px'
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
                                  Bulk upload users
                                </Typography>
                              </Box>
                            </Popover>
                            {/* <Button
                              onClick={handleClickExport}
                              sx={{
                                border: "1px solid #68717A",
                                borderRadius: "8px",
                                width: "86px",
                                height: "32px",
                                color: "#68717A",
                                fontSize: "12px",
                                fontWeight: "700",
                                fontFamily: "Open Sans",
                              }}
                            >
                              Export{" "}
                              <KeyboardArrowDownIcon
                                sx={{ fontSize: "19px" }}
                              />
                            </Button> */}
                            {/* Export popover code */}
                            <Popover
                              id={id}
                              open={openExport}
                              anchorEl={anchorExport}
                              onClose={handleCloseExport}
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
                                  padding: '15px 10px 5px',
                                  cursor: 'pointer'
                                }}
                              >
                                <img
                                  src={downloadicon}
                                  alt="downloadicon"
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
                                  Download PDF
                                </Typography>
                              </Box>
                              <Box
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  padding: '10px 10px 15px',
                                  cursor: 'pointer'
                                }}
                              >
                                <img
                                  src={microsoftexcelicon}
                                  alt="microsoftexcelicon"
                                  style={{
                                    padding: 0,
                                    margin: 0,
                                    width: '18px',
                                    height: '24px'
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
                                  Export Excel
                                </Typography>
                              </Box>
                            </Popover>
                          </Box>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={3}>
                          {' '}
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography style={tableStyle} sx={{ fontWeight: '600' }}>
                              USER
                            </Typography>{' '}
                            <ArrowDownwardIcon
                              sx={{
                                width: '15px',
                                height: '15px',
                                color: '#ABB5BE'
                              }}
                            />
                          </Box>
                        </TableCell>
                        <TableCell colSpan={3} style={tableStyle} sx={{ fontWeight: '600' }}>
                          ROLE
                        </TableCell>
                        {/* <TableCell style={tableStyle}>
                          EXPERIENCE POINTS
                        </TableCell>

                        <TableCell style={tableStyle}>GOAL PROGRESS</TableCell>
                        <TableCell style={tableStyle}>
                          ENGAGEMENT / AFFINITY
                        </TableCell>
                        <TableCell style={tableStyle}>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Typography style={tableStyle}>MESSAGES</Typography>{" "}
                            <ArrowUpwardIcon
                              sx={{
                                width: "15px",
                                height: "15px",
                                color: "#ABB5BE",
                              }}
                            />
                          </Box>
                        </TableCell>
                        <TableCell style={tableStyle}>CALLS</TableCell>
                        <TableCell style={tableStyle}>CONTENT VIEWED</TableCell> */}
                        <TableCell colSpan={3} sx={{ textAlign: 'center', fontWeight: '600' }} style={tableStyle}>
                          LAST LOGIN
                        </TableCell>
                        <TableCell colSpan={3} sx={{ textAlign: 'center', fontWeight: '600' }} style={tableStyle}>
                          ACTION
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {groupUsers.data &&
                      (groupUsers.data.users.length > 0 || groupUsers.data.invitedUsers.length > 0) ? (
                        groupUsers.data.users.map((each: IGroupUser) => {
                          return (
                            <ProgramUserTableRow
                              key={each.userId} // unique userid as a key
                              data={each}
                              setShowProfile={setShowProfile}
                              setActiveUserId={setActiveUserId}
                              // anchorAction={anchorAction}
                              // setAnchorAction={setAnchorAction}
                            />
                          );
                        })
                      ) : (
                        <TableRow className="user-found-text" style={{ width: '100%' }}>
                          <TableCell>No Users Found</TableCell>
                        </TableRow>
                      )}

                      {groupUsers.data.invitedUsers &&
                        groupUsers.data.invitedUsers.length > 0 &&
                        groupUsers.data.invitedUsers.map((each) => (
                          <React.Fragment key={each.userId}>
                            <ProgramInvitedUsers data={each} />
                          </React.Fragment>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            )}
          </Box>
        </div>
        <InviteUserDialog handleClose={handleClose} openDialog={openDialog} setOpenDialog={setOpenDialog} type="Add" />

        <div>
          <Dialog
            open={openUploadUsers}
            onClose={handleCloseUploadUsers}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title" sx={{ textAlign: 'center !important' }}>
              <span style={{ fontWeight: '600', fontSize: '22px' }}>Bulk upload users</span>
              <IconButton
                onClick={handleCloseUploadUsers}
                // onclose={handleCloseExport}
                style={{ float: 'right' }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <Divider />
            <DialogContent>
              <DialogContentText id="alert-dialog-description" component="div">
                <Typography
                  sx={{
                    fontFamily: 'Open Sans',
                    fontSize: '14px',
                    fontWeight: '400',
                    color: '#68717A'
                  }}
                >
                  In order to bulk upload users, please download the template file to proceed.
                  <br />
                  First name, last name, email address, and role are required.
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '10px 0'
                  }}
                  onClick={handleDownload}
                >
                  <img
                    src={downloadblue}
                    alt="downloadblueimg"
                    style={{
                      padding: 0,
                      margin: 0,
                      width: '21px',
                      height: '21px',
                      cursor: 'pointer'
                    }}
                  />
                  <Typography
                    sx={{
                      fontFamily: 'Open Sans',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#0071A9',
                      marginLeft: '5px',
                      cursor: 'pointer'
                    }}
                  >
                    Download Bulk Upload Template
                  </Typography>
                </Box>
                {/* <div
                 onDragEnter={handleDragEnter}
                 onDragOver={handleDragOver}
                 onDrop={handleDrop}
                 > */}
                <Box
                  sx={{
                    background: '#FFFFFF',
                    border: '1px dashed #DEDFDF',
                    borderRadius: '8px',
                    padding: '5px 46px 15px',
                    margin: '15px 0',
                    cursor: 'pointer'
                  }}
                  onClick={handleButtonClick}
                >
                  <Box
                    sx={{ textAlign: 'center' }}
                    onDragEnter={handleDragEnter}
                    onDragOver={handleDragEnter}
                    onDrop={handleDrop}
                  >
                    <IconButton>
                      <img
                        src={upload}
                        alt="upload"
                        style={{
                          padding: 0,
                          margin: 0,
                          width: '25px',
                          height: '25px'
                        }}
                      />
                    </IconButton>
                    <input
                      ref={fileInputRef}
                      type="file"
                      style={{ display: 'none' }}
                      accept=".xlsx"
                      onChange={handleBulkFileChanges}
                    />
                    <Box
                      sx={{
                        fontFamily: 'Open Sans',
                        fontWeight: '600',
                        fontSize: '12px',
                        color: ' #999999'
                      }}
                    >
                      <span style={{ color: '#3D8BFD', fontSize: '14' }}> Click to upload </span>
                      or drag
                      <br />
                      Excel file only (max. 50 KB)
                      <br />
                      {bulkfileName ? (
                        <label style={{ color: 'green', fontSize: '20px' }}>{bulkfileName}</label>
                      ) : (
                        <>
                          {' '}
                          <label
                            style={{
                              color: '#d32f2f',
                              textAlign: 'center'
                            }}
                          >
                            {errorMessage}
                          </label>
                        </>
                      )}
                    </Box>
                  </Box>
                </Box>
                {/* </div> */}
              </DialogContentText>
            </DialogContent>

            <DialogActions style={{ padding: '0 20px 20px', justifyContent: 'center' }}>
              <LoadingButton
                style={
                  bulkUserLoading
                    ? { borderRadius: '8px', width: '560px', height: '50px' }
                    : {
                        fontFamily: 'Open Sans',
                        textAlign: 'center',
                        fontSize: '16px',
                        fontWeight: '700',
                        color: '#fff',
                        background: '#152536',
                        borderRadius: '8px',
                        width: '560px',
                        height: '50px'
                      }
                }
                onClick={handlebulkSubmit}
                loading={bulkUserLoading}
              >
                Add
              </LoadingButton>
            </DialogActions>
          </Dialog>
        </div>
        {/* after upload the bulk user code */}
        {/* <div>
          <Dialog
            open={openBulkUsers}
            onClose={handleCloseBulkUsers}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle
              id="alert-dialog-title"
              sx={{ textAlign: "center !important" }}
            >
              <span style={{ fontWeight: "600", fontSize: "22px" }}>
                Bulk upload users
              </span>
              <IconButton
                onClick={handleCloseBulkUsers}
                style={{ float: "right" }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <Divider />
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                  <img
                    src={excelimg}
                    alt="excelimg"
                    style={{
                      padding: 0,
                      margin: 0,
                      width: "24px",
                      height: "24px",
                    }}
                  />
                  <Box sx={{ marginLeft: "10px" }}>
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: "600",
                        fontFamily: "Open Sans",
                      }}
                    >
                      Community Groups users.xlsx
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "10px",
                        fontWeight: "600",
                        fontFamily: "Open Sans",
                        color: "#999999",
                      }}
                    >
                      * Excel file only (max. 10 KB)
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{ display: "flex", alignItems: "center", margin: "10px" }}
                >
                  <BorderLinearProgress
                    variant="determinate"
                    value={89}
                    sx={{
                      width: "465px",
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
                    89%
                  </span>
                </Box>
              </DialogContentText>
            </DialogContent>
            <DialogActions
              style={{ padding: "0 20px 20px", justifyContent: "center" }}
            >
              <Button
                style={{
                  fontFamily: "Open Sans",
                  textAlign: "center",
                  fontSize: "16px",
                  fontWeight: "700",
                  color: "#fff",
                  background: "#152536",
                  borderRadius: "8px",
                  width: "560px",
                  height: "50px",
                }}
                onClick={handleClickBulkUsers}
              >
                Add
              </Button>
            </DialogActions>
          </Dialog>
        </div> */}
      </>
    );
  }
  return null;
};

export default ProgramUsers;
