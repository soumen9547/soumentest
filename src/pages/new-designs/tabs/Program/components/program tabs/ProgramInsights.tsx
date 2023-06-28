import React from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Button from '@mui/material/Button';
import Filter from '../../../../../../assets/images/Filter.svg';
import programusers from '../../../../../../assets/images/programusers.svg';
import averagescore from '../../../../../../assets/images/averagescore.svg';
import ronanprofile from '../../../../../../assets/images/ronanprofile.svg';
import engmonth from '../../../../../../assets/images/engmonth.svg';
import CloseIcon from '@mui/icons-material/Close';
import Radio from '@mui/material/Radio';
import { Grid, Divider, IconButton, InputLabel, TextField } from '@material-ui/core';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import uparrow from '../../../../../../assets/images/uparrow.svg';
import logo from '../../../../../../assets/images/favicon.png';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { makeStyles } from '@mui/styles';
import Checkbox from '@mui/material/Checkbox';
import SearchIcon from '@mui/icons-material/Search';
import { appColors } from '../../../../../../utils/theme';
const ProgramInsights = () => {
  const usageStyle = {
    fontWeigth: '400',
    color: '#152536',
    fontSize: '14px',
    fontFamily: 'Open Sans'
  };
  const tableStyle = {
    fontWeigth: '400',
    color: '#152536',
    fontSize: '14px',
    fontFamily: 'Open Sans'
  };
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const [selectedValue, setSelectedValue] = React.useState('a');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const useStyles = makeStyles({
    programPopupWrapper: {
      color: '#68717A',
      fontSize: '14px',
      fontFamily: 'Open Sans',
      fontWeigth: '400',
      marginBottom: '10px'
    },
    programDialogTitle: {
      fontFamily: 'Open Sans',
      textAlign: 'center',
      fontSize: '22px',
      fontWeight: '600 !important',
      color: '#152536'
    },
    filterAccordionDetails: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '5px'
    },
    filterDetailsText: {
      FontFamily: 'Open Sans',
      fontWeight: '400!important',
      fontSize: '14px !important',
      color: '#68717A'
    },
    popupSummary: {
      FontFamily: 'Open Sans',
      fontWeight: '600 !important',
      fontSize: '16px !important',
      color: ' #152536'
    }
  });
  const classes = useStyles();
  return (
    <div style={{ height: '86%', overflow: 'auto' }}>
      <Box sx={{ margin: ' 10px 0 20px' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            marginBottom: '15px'
          }}
        >
          <img
            onClick={handleClickOpen}
            src={Filter}
            alt="filtericon"
            style={{
              padding: 0,
              margin: 0,
              width: '32px',
              height: '32px',
              marginRight: '10px',
              cursor: 'pointer'
            }}
          />
          <Button
            sx={{
              border: '1px solid #68717A',
              borderRadius: '8px',
              width: '86px',
              height: '27px',
              color: '#68717A',
              fontSize: '12px',
              fontWeight: '700'
            }}
          >
            Export <KeyboardArrowDownIcon sx={{ fontSize: '19px' }} />
          </Button>
        </Box>

        <Grid container spacing={2}>
          <Grid item lg={3} md={3} sm={3}>
            <Box
              sx={{
                background: '#fff',
                minHeight: '240px',
                border: ' 1px solid #EFF0F4',
                borderRadius: '8px',
                boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'
              }}
            >
              <Typography
                style={{
                  fontSize: '14px',
                  fontWeight: '700',
                  fontFamily: 'Open Sans',
                  padding: '15px 20px'
                }}
              >
                Usage Summary
              </Typography>
              <Divider />
              <Box sx={{ padding: ' 0 20px' }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '15px 0'
                  }}
                >
                  <Typography sx={{ opacity: '0.5' }} style={usageStyle}>
                    Total students
                  </Typography>
                  <Typography style={usageStyle}>641</Typography>
                </Box>
                <Divider />
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '15px 0'
                  }}
                >
                  <Typography sx={{ opacity: '0.5' }} style={usageStyle}>
                    Active students
                  </Typography>
                  <Typography style={usageStyle}>413</Typography>
                </Box>
                <Divider />
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '15px 0'
                  }}
                >
                  <Typography sx={{ opacity: '0.5' }} style={usageStyle}>
                    Total mentors
                  </Typography>
                  <Typography style={usageStyle}>52</Typography>
                </Box>
                <Divider />
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '15px 0'
                  }}
                >
                  <Typography sx={{ opacity: '0.5' }} style={usageStyle}>
                    Active mentors
                  </Typography>
                  <Typography style={usageStyle}>38</Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item lg={9} md={9} sm={9}>
            <Box
              sx={{
                background: '#fff',
                border: ' 1px solid #EFF0F4',
                borderRadius: '8px',
                boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                minHeight: '260px'
              }}
            >
              <Typography
                style={{
                  fontSize: '14px',
                  fontWeight: '700',
                  fontFamily: 'Open Sans',
                  padding: '15px 20px'
                }}
              >
                Program Users
              </Typography>
              <Divider />
              <Box sx={{ padding: '20px' }}>
                <img
                  src={programusers}
                  alt="programusers"
                  style={{
                    padding: 0,
                    margin: 0,
                    width: '100%',
                    height: '100%'
                  }}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item lg={3} md={3} sm={3}>
            <Box
              sx={{
                background: '#fff',
                minHeight: '400px',
                border: ' 1px solid #EFF0F4',
                borderRadius: '8px',
                boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '15px 20px'
                }}
              >
                <Typography
                  style={{
                    fontSize: '14px',
                    fontWeight: '700',
                    fontFamily: 'Open Sans'
                  }}
                >
                  Goal Progress
                </Typography>
                <Typography sx={{ color: '#0071A9 !important' }} style={usageStyle}>
                  View
                </Typography>
              </Box>
              <Divider />
              <Box sx={{ padding: ' 10px 20px 0' }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <img
                    src={averagescore}
                    alt="averagescore"
                    style={{
                      padding: 0,
                      margin: 0,
                      width: '130px',
                      height: '130px'
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '15px 0'
                  }}
                >
                  <Typography sx={{ opacity: '0.5' }} style={usageStyle}>
                    Last 30 days
                  </Typography>
                  <Typography
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      color: '#11895E !important'
                    }}
                    style={usageStyle}
                  >
                    <img
                      src={uparrow}
                      alt="uparrow"
                      style={{
                        padding: 0,
                        margin: 0,
                        width: '12px',
                        height: '12px'
                      }}
                    />
                    6%
                  </Typography>
                </Box>
                <Divider />
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '15px 0'
                  }}
                >
                  <Typography sx={{ opacity: '0.5' }} style={usageStyle}>
                    Average improvement
                  </Typography>
                  <Typography
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      color: '#11895E!important'
                    }}
                    style={usageStyle}
                  >
                    + 21%
                  </Typography>
                </Box>
                <Divider />
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '15px 0'
                  }}
                >
                  <Typography sx={{ opacity: '0.5' }} style={usageStyle}>
                    Goals completed
                  </Typography>
                  <Typography style={usageStyle}>7%</Typography>
                </Box>
                <Divider />
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '15px 0'
                  }}
                >
                  <Typography sx={{ opacity: '0.5' }} style={usageStyle}>
                    Students on track
                  </Typography>
                  <Typography style={usageStyle}>71%</Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item lg={9} md={9} sm={9}>
            <Box
              sx={{
                background: '#fff',
                border: ' 1px solid #EFF0F4',
                borderRadius: '8px',
                boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                minHeight: '400px'
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between !important'
                }}
              >
                <Typography
                  style={{
                    fontSize: '14px',
                    fontWeight: '700',
                    fontFamily: 'Open Sans',
                    padding: '15px 20px'
                  }}
                >
                  Engagement by Month
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    marginRight: '10px'
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      marginRight: '10px'
                    }}
                  >
                    <Typography
                      style={{
                        background: '#7E7AF7',
                        borderRadius: '4px',
                        width: '11px',
                        height: '11px'
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: '10px',
                        fontWeight: '400',
                        fontFamily: 'Open Sans',
                        paddingLeft: '5px'
                      }}
                    >
                      Connections
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      marginRight: '10px'
                    }}
                  >
                    <Typography
                      style={{
                        background: '#66A8F1',
                        borderRadius: '4px',
                        width: '11px',
                        height: '11px'
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: '10px',
                        fontWeight: '400',
                        fontFamily: 'Open Sans',
                        paddingLeft: '5px'
                      }}
                    >
                      Calls
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      marginRight: '10px'
                    }}
                  >
                    <Typography
                      style={{
                        background: '#E18965',
                        borderRadius: '4px',
                        width: '11px',
                        height: '11px'
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: '10px',
                        fontWeight: '400',
                        fontFamily: 'Open Sans',
                        paddingLeft: '5px'
                      }}
                    >
                      Messages
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      marginRight: '10px'
                    }}
                  >
                    <Typography
                      style={{
                        background: '#EEC667',
                        borderRadius: '4px',
                        width: '11px',
                        height: '11px'
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: '10px',
                        fontWeight: '400',
                        fontFamily: 'Open Sans',
                        paddingLeft: '5px'
                      }}
                    >
                      Articles
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Divider />
              <Box sx={{ padding: '20px' }}>
                <img
                  src={engmonth}
                  alt="engmonth"
                  style={{
                    padding: 0,
                    margin: 0,
                    width: '100%',
                    height: '100%'
                  }}
                />
                <Box sx={{ marginTop: '15px' }}>
                  <Grid container spacing={2}>
                    <Grid item lg={3} md={6} sm={6}>
                      <Box
                        sx={{
                          border: '1px solid #EFF0F4',
                          borderRadius: '8px',
                          background: '#fff',
                          minHeight: '150px',
                          boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'
                        }}
                      >
                        <Box
                          sx={{
                            borderRadius: '8px 8px 0 0',
                            borderTop: '10px solid #7E7AF7'
                          }}
                        />
                        <Box sx={{ padding: '15px' }}>
                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center'
                            }}
                          >
                            <Typography
                              style={{
                                fontSize: '14px',
                                fontWeight: '700',
                                fontFamily: 'Open Sans'
                              }}
                            >
                              Connections
                            </Typography>
                            <Typography sx={{ color: '#0071A9 !important' }} style={usageStyle}>
                              View
                            </Typography>
                          </Box>
                          <Typography
                            sx={{
                              fontSize: '44px',
                              fontWeight: '600',
                              textAlign: 'center'
                            }}
                          >
                            401
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item lg={3} md={6} sm={6}>
                      <Box
                        sx={{
                          border: '1px solid #EFF0F4',
                          borderRadius: '8px',
                          background: '#fff',
                          minHeight: '150px',
                          boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'
                        }}
                      >
                        <Box
                          sx={{
                            borderRadius: '8px 8px 0 0',
                            borderTop: '10px solid #66A8F1'
                          }}
                        />
                        <Box sx={{ padding: '15px' }}>
                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center'
                            }}
                          >
                            <Typography
                              style={{
                                fontSize: '14px',
                                fontWeight: '700',
                                fontFamily: 'Open Sans'
                              }}
                            >
                              Calls
                            </Typography>
                            <Typography sx={{ color: '#0071A9 !important' }} style={usageStyle}>
                              View
                            </Typography>
                          </Box>
                          <Typography
                            sx={{
                              fontSize: '44px',
                              fontWeight: '600',
                              textAlign: 'center'
                            }}
                          >
                            577
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: '13px',
                              fontWeight: '400',
                              fontStyle: 'italic',
                              fontFamily: 'Open Sans',
                              textAlign: 'center'
                            }}
                          >
                            26:19 average duration
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item lg={3} md={6} sm={6}>
                      <Box
                        sx={{
                          border: '1px solid #EFF0F4',
                          borderRadius: '8px',
                          background: '#fff',
                          minHeight: '150px',
                          boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'
                        }}
                      >
                        <Box
                          sx={{
                            borderRadius: '8px 8px 0 0',
                            borderTop: '10px solid #E18965'
                          }}
                        />
                        <Box sx={{ padding: '15px' }}>
                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center'
                            }}
                          >
                            <Typography
                              style={{
                                fontSize: '14px',
                                fontWeight: '700',
                                fontFamily: 'Open Sans'
                              }}
                            >
                              Messages
                            </Typography>
                            <Typography sx={{ color: '#0071A9 !important' }} style={usageStyle}>
                              View
                            </Typography>
                          </Box>
                          <Typography
                            sx={{
                              fontSize: '44px',
                              fontWeight: '600',
                              textAlign: 'center'
                            }}
                          >
                            1,109
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: '13px',
                              fontWeight: '400',
                              fontStyle: 'italic',
                              fontFamily: 'Open Sans',
                              textAlign: 'center'
                            }}
                          >
                            2.4 messages per student
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item lg={3} md={6} sm={6}>
                      <Box
                        sx={{
                          border: '1px solid #EFF0F4',
                          borderRadius: '8px',
                          background: '#fff',
                          minHeight: '150px',
                          boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'
                        }}
                      >
                        <Box
                          sx={{
                            borderRadius: '8px 8px 0 0',
                            borderTop: '10px solid #EEC667'
                          }}
                        />
                        <Box sx={{ padding: '15px' }}>
                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center'
                            }}
                          >
                            <Typography
                              style={{
                                fontSize: '14px',
                                fontWeight: '700',
                                fontFamily: 'Open Sans'
                              }}
                            >
                              Articles
                            </Typography>
                            <Typography sx={{ color: '#0071A9 !important' }} style={usageStyle}>
                              View
                            </Typography>
                          </Box>
                          <Typography
                            sx={{
                              fontSize: '44px',
                              fontWeight: '600',
                              textAlign: 'center'
                            }}
                          >
                            1,428
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: '13px',
                              fontWeight: '400',
                              fontStyle: 'italic',
                              fontFamily: 'Open Sans',
                              textAlign: 'center'
                            }}
                          >
                            83.3 hours spent learning
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item lg={6} md={6} sm={12}>
            <Box
              sx={{
                background: '#fff',
                minHeight: '240px',
                border: ' 1px solid #EFF0F4',
                borderRadius: '8px',
                boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '15px 20px'
                }}
              >
                <Typography
                  style={{
                    fontSize: '14px',
                    fontWeight: '700',
                    fontFamily: 'Open Sans'
                  }}
                >
                  Student Ratings
                </Typography>
                <Typography sx={{ color: '#0071A9 !important' }} style={usageStyle}>
                  View
                </Typography>
              </Box>
              <Divider />
              <Box sx={{ padding: '10px 20px' }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 0'
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: 'Open Sans',
                      fontSize: '12px',
                      fontWeight: '600',
                      color: '#68717A'
                    }}
                  >
                    Top Scorers
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      columnGap: '10px'
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: 'Open Sans',
                        fontSize: '12px',
                        fontWeight: '600',
                        color: '#68717A'
                      }}
                    >
                      Average
                    </Typography>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="space-around"
                      border="1px solid #EFF0F4"
                      borderRadius={2}
                      height="25px"
                      width="55px"
                    >
                      <img src={logo} style={{ width: '14px', height: '14px' }} alt="logo" />
                      <Typography
                        sx={{
                          fontFamily: 'Open Sans',
                          fontSize: '12px',
                          fontWeight: 600
                        }}
                      >
                        106
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingBottom: '5px'
                  }}
                >
                  <List>
                    <ListItem sx={{ padding: '0 !important' }}>
                      <ListItemAvatar>
                        <img
                          src={ronanprofile}
                          alt="profile"
                          style={{
                            padding: 0,
                            margin: 0,
                            width: '35px',
                            height: '35px'
                          }}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography
                            style={{
                              fontFamily: 'Open Sans',
                              fontSize: '16px',
                              fontWeight: '400',
                              color: ' #152536'
                            }}
                          >
                            Rob Ross
                          </Typography>
                        }
                        secondary={
                          <Typography
                            style={{
                              fontFamily: 'Open Sans',
                              fontSize: '14px',
                              fontWeight: '400',
                              color: '#68717A'
                            }}
                          >
                            Computer Science
                          </Typography>
                        }
                      />
                    </ListItem>
                  </List>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-around"
                    border="1px solid #EFF0F4"
                    borderRadius={2}
                    height="25px"
                    width="55px"
                  >
                    <img src={logo} style={{ width: '14px', height: '14px' }} alt="logo" />
                    <Typography
                      sx={{
                        fontFamily: 'Open Sans',
                        fontSize: '12px',
                        fontWeight: 600
                      }}
                    >
                      400
                    </Typography>
                  </Box>
                </Box>
                <Divider />
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingBottom: '5px'
                  }}
                >
                  <List>
                    <ListItem sx={{ padding: '0 !important' }}>
                      <ListItemAvatar>
                        <img
                          src={ronanprofile}
                          alt="profile"
                          style={{
                            padding: 0,
                            margin: 0,
                            width: '35px',
                            height: '35px'
                          }}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography
                            style={{
                              fontFamily: 'Open Sans',
                              fontSize: '16px',
                              fontWeight: '400',
                              color: ' #152536'
                            }}
                          >
                            Amy Rodriguez
                          </Typography>
                        }
                        secondary={
                          <Typography
                            style={{
                              fontFamily: 'Open Sans',
                              fontSize: '14px',
                              fontWeight: '400',
                              color: '#68717A'
                            }}
                          >
                            Marketing
                          </Typography>
                        }
                      />
                    </ListItem>
                  </List>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-around"
                    border="1px solid #EFF0F4"
                    borderRadius={2}
                    height="25px"
                    width="55px"
                  >
                    <img src={logo} style={{ width: '14px', height: '14px' }} alt="logo" />
                    <Typography
                      sx={{
                        fontFamily: 'Open Sans',
                        fontSize: '12px',
                        fontWeight: 600
                      }}
                    >
                      94
                    </Typography>
                  </Box>
                </Box>
                <Divider />
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingBottom: '5px'
                  }}
                >
                  <List>
                    <ListItem sx={{ padding: '0 !important' }}>
                      <ListItemAvatar>
                        <img
                          src={ronanprofile}
                          alt="profile"
                          style={{
                            padding: 0,
                            margin: 0,
                            width: '35px',
                            height: '35px'
                          }}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography
                            style={{
                              fontFamily: 'Open Sans',
                              fontSize: '16px',
                              fontWeight: '400',
                              color: ' #152536'
                            }}
                          >
                            Mark Thomas
                          </Typography>
                        }
                        secondary={
                          <Typography
                            style={{
                              fontFamily: 'Open Sans',
                              fontSize: '14px',
                              fontWeight: '400',
                              color: '#68717A'
                            }}
                          >
                            Business
                          </Typography>
                        }
                      />
                    </ListItem>
                  </List>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-around"
                    border="1px solid #EFF0F4"
                    borderRadius={2}
                    height="25px"
                    width="55px"
                  >
                    <img src={logo} style={{ width: '14px', height: '14px' }} alt="logo" />
                    <Typography
                      sx={{
                        fontFamily: 'Open Sans',
                        fontSize: '12px',
                        fontWeight: 600
                      }}
                    >
                      85
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item lg={6} md={6} sm={12}>
            <Box
              sx={{
                background: '#fff',
                minHeight: '240px',
                border: ' 1px solid #EFF0F4',
                borderRadius: '8px',
                boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '15px 20px'
                }}
              >
                <Typography
                  style={{
                    fontSize: '14px',
                    fontWeight: '700',
                    fontFamily: 'Open Sans'
                  }}
                >
                  Mentor Ratings
                </Typography>
                <Typography sx={{ color: '#0071A9 !important' }} style={usageStyle}>
                  View
                </Typography>
              </Box>
              <Divider />
              <Box sx={{ padding: '10px 20px' }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 0'
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: 'Open Sans',
                      fontSize: '12px',
                      fontWeight: '600',
                      color: '#68717A'
                    }}
                  >
                    Top Scorers
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      columnGap: '10px'
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: 'Open Sans',
                        fontSize: '12px',
                        fontWeight: '600',
                        color: '#68717A'
                      }}
                    >
                      Average
                    </Typography>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="space-around"
                      border="1px solid #EFF0F4"
                      borderRadius={2}
                      height="25px"
                      width="55px"
                    >
                      <img src={logo} style={{ width: '14px', height: '14px' }} alt="logo" />
                      <Typography
                        sx={{
                          fontFamily: 'Open Sans',
                          fontSize: '12px',
                          fontWeight: 600
                        }}
                      >
                        106
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingBottom: '5px'
                  }}
                >
                  <List>
                    <ListItem sx={{ padding: '0 !important' }}>
                      <ListItemAvatar>
                        <img
                          src={ronanprofile}
                          alt="profile"
                          style={{
                            padding: 0,
                            margin: 0,
                            width: '35px',
                            height: '35px'
                          }}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography
                            style={{
                              fontFamily: 'Open Sans',
                              fontSize: '16px',
                              fontWeight: '400',
                              color: ' #152536'
                            }}
                          >
                            Ronan Wall
                          </Typography>
                        }
                        secondary={
                          <Typography
                            style={{
                              fontFamily: 'Open Sans',
                              fontSize: '14px',
                              fontWeight: '400',
                              color: '#68717A'
                            }}
                          >
                            CEO, Dosen.io
                          </Typography>
                        }
                      />
                    </ListItem>
                  </List>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-around"
                    border="1px solid #EFF0F4"
                    borderRadius={2}
                    height="25px"
                    width="55px"
                  >
                    <img src={logo} style={{ width: '14px', height: '14px' }} alt="logo" />
                    <Typography
                      sx={{
                        fontFamily: 'Open Sans',
                        fontSize: '12px',
                        fontWeight: 600
                      }}
                    >
                      216
                    </Typography>
                  </Box>
                </Box>
                <Divider />
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingBottom: '5px'
                  }}
                >
                  <List>
                    <ListItem sx={{ padding: '0 !important' }}>
                      <ListItemAvatar>
                        <img
                          src={ronanprofile}
                          alt="profile"
                          style={{
                            padding: 0,
                            margin: 0,
                            width: '35px',
                            height: '35px'
                          }}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography
                            style={{
                              fontFamily: 'Open Sans',
                              fontSize: '16px',
                              fontWeight: '400',
                              color: ' #152536'
                            }}
                          >
                            Christopher Grant
                          </Typography>
                        }
                        secondary={
                          <Typography
                            style={{
                              fontFamily: 'Open Sans',
                              fontSize: '14px',
                              fontWeight: '400',
                              color: '#68717A'
                            }}
                          >
                            Head of Product, SEI
                          </Typography>
                        }
                      />
                    </ListItem>
                  </List>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-around"
                    border="1px solid #EFF0F4"
                    borderRadius={2}
                    height="25px"
                    width="55px"
                  >
                    <img src={logo} style={{ width: '14px', height: '14px' }} alt="logo" />
                    <Typography
                      sx={{
                        fontFamily: 'Open Sans',
                        fontSize: '12px',
                        fontWeight: 600
                      }}
                    >
                      109
                    </Typography>
                  </Box>
                </Box>
                <Divider />
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingBottom: '5px'
                  }}
                >
                  <List>
                    <ListItem sx={{ padding: '0 !important' }}>
                      <ListItemAvatar>
                        <img
                          src={ronanprofile}
                          alt="profile"
                          style={{
                            padding: 0,
                            margin: 0,
                            width: '35px',
                            height: '35px'
                          }}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography
                            style={{
                              fontFamily: 'Open Sans',
                              fontSize: '16px',
                              fontWeight: '400',
                              color: ' #152536'
                            }}
                          >
                            Conor Boylan
                          </Typography>
                        }
                        secondary={
                          <Typography
                            style={{
                              fontFamily: 'Open Sans',
                              fontSize: '14px',
                              fontWeight: '400',
                              color: '#68717A'
                            }}
                          >
                            VP Sales, PharmaCo
                          </Typography>
                        }
                      />
                    </ListItem>
                  </List>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-around"
                    border="1px solid #EFF0F4"
                    borderRadius={2}
                    height="25px"
                    width="55px"
                  >
                    <img src={logo} style={{ width: '14px', height: '14px' }} alt="logo" />
                    <Typography
                      sx={{
                        fontFamily: 'Open Sans',
                        fontSize: '12px',
                        fontWeight: 600
                      }}
                    >
                      85
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item lg={6} md={6} sm={12}>
            <Box
              sx={{
                background: '#fff',
                minHeight: '240px',
                border: ' 1px solid #EFF0F4',
                borderRadius: '8px',
                boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'
              }}
            >
              <TableContainer>
                <Table sx={{ Width: '100%' }} aria-label="simple table" className="tableBody">
                  <TableHead>
                    <TableRow>
                      <TableCell colSpan={4}>
                        <Typography
                          style={{
                            fontSize: '14px',
                            fontFamily: 'Open Sans',
                            fontWeight: '700',
                            color: '#152536'
                          }}
                        >
                          Top Matches
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell
                        width="25%"
                        sx={{
                          fontSize: '12px',
                          fontFamily: 'Open Sans',
                          fontWeight: '600',
                          color: '#68717A'
                        }}
                      >
                        MENTOR
                      </TableCell>
                      <TableCell
                        width="25%"
                        sx={{
                          fontSize: '12px',
                          fontFamily: 'Open Sans',
                          fontWeight: '600',
                          color: '#68717A'
                        }}
                      >
                        {' '}
                        MENTEE{' '}
                      </TableCell>
                      <TableCell
                        width="25%"
                        sx={{
                          fontSize: '12px',
                          fontFamily: 'Open Sans',
                          fontWeight: '600',
                          color: '#68717A',
                          textAlign: 'center'
                        }}
                      >
                        TOTAL <br />
                        CONNECTION
                      </TableCell>
                      <TableCell
                        width="25%"
                        sx={{
                          fontSize: '12px',
                          fontFamily: 'Open Sans',
                          fontWeight: '600',
                          color: '#68717A',
                          textAlign: 'center'
                        }}
                      >
                        LAST
                        <br /> CONNECTION
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            columnGap: '6px'
                          }}
                        >
                          <img
                            src={ronanprofile}
                            alt="profile"
                            style={{
                              padding: 0,
                              margin: 0,
                              width: '35px',
                              height: '35px'
                            }}
                          />
                          <Typography style={tableStyle}>Ahmad Vetrovs</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        {' '}
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            columnGap: '6px'
                          }}
                        >
                          <img
                            src={ronanprofile}
                            alt="profile"
                            style={{
                              padding: 0,
                              margin: 0,
                              width: '35px',
                              height: '35px'
                            }}
                          />
                          <Typography style={tableStyle}>Haylie Dokidis</Typography>
                        </Box>
                      </TableCell>
                      <TableCell style={tableStyle} sx={{ textAlign: 'center' }}>
                        25
                      </TableCell>
                      <TableCell style={tableStyle} sx={{ textAlign: 'center' }}>
                        12 days ago
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            columnGap: '6px'
                          }}
                        >
                          <img
                            src={ronanprofile}
                            alt="profile"
                            style={{
                              padding: 0,
                              margin: 0,
                              width: '35px',
                              height: '35px'
                            }}
                          />
                          <Typography style={tableStyle}>Ruben Bator</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        {' '}
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            columnGap: '6px'
                          }}
                        >
                          <img
                            src={ronanprofile}
                            alt="profile"
                            style={{
                              padding: 0,
                              margin: 0,
                              width: '35px',
                              height: '35px'
                            }}
                          />
                          <Typography style={tableStyle}>Miracle Carder</Typography>
                        </Box>
                      </TableCell>
                      <TableCell style={tableStyle} sx={{ textAlign: 'center' }}>
                        21
                      </TableCell>
                      <TableCell style={tableStyle} sx={{ textAlign: 'center' }}>
                        15 days ago
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            columnGap: '6px'
                          }}
                        >
                          <img
                            src={ronanprofile}
                            alt="profile"
                            style={{
                              padding: 0,
                              margin: 0,
                              width: '35px',
                              height: '35px'
                            }}
                          />
                          <Typography style={tableStyle}>Jaylon Bator</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        {' '}
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            columnGap: '6px'
                          }}
                        >
                          <img
                            src={ronanprofile}
                            alt="profile"
                            style={{
                              padding: 0,
                              margin: 0,
                              width: '35px',
                              height: '35px'
                            }}
                          />
                          <Typography style={tableStyle}>Cheyenne Korsga..</Typography>
                        </Box>
                      </TableCell>
                      <TableCell style={tableStyle} sx={{ textAlign: 'center' }}>
                        20
                      </TableCell>
                      <TableCell style={tableStyle} sx={{ textAlign: 'center' }}>
                        16 days ago
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            columnGap: '6px'
                          }}
                        >
                          <img
                            src={ronanprofile}
                            alt="profile"
                            style={{
                              padding: 0,
                              margin: 0,
                              width: '35px',
                              height: '35px'
                            }}
                          />
                          <Typography style={tableStyle}>Lincoln Botosh</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        {' '}
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            columnGap: '6px'
                          }}
                        >
                          <img
                            src={ronanprofile}
                            alt="profile"
                            style={{
                              padding: 0,
                              margin: 0,
                              width: '35px',
                              height: '35px'
                            }}
                          />
                          <Typography style={tableStyle}>Cooper Torff</Typography>
                        </Box>
                      </TableCell>
                      <TableCell style={tableStyle} sx={{ textAlign: 'center' }}>
                        19
                      </TableCell>
                      <TableCell style={tableStyle} sx={{ textAlign: 'center' }}>
                        18 days ago
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            columnGap: '6px'
                          }}
                        >
                          <img
                            src={ronanprofile}
                            alt="profile"
                            style={{
                              padding: 0,
                              margin: 0,
                              width: '35px',
                              height: '35px'
                            }}
                          />
                          <Typography style={tableStyle}>Zain Schleifer</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        {' '}
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            columnGap: '6px'
                          }}
                        >
                          <img
                            src={ronanprofile}
                            alt="profile"
                            style={{
                              padding: 0,
                              margin: 0,
                              width: '35px',
                              height: '35px'
                            }}
                          />
                          <Typography style={tableStyle}>Marilyn Herwitz</Typography>
                        </Box>
                      </TableCell>
                      <TableCell style={tableStyle} sx={{ textAlign: 'center' }}>
                        18
                      </TableCell>
                      <TableCell style={tableStyle} sx={{ textAlign: 'center' }}>
                        5 days ago
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Grid>

          <Grid item lg={6} md={6} sm={12}>
            <Box
              sx={{
                background: '#fff',
                minHeight: '240px',
                border: ' 1px solid #EFF0F4',
                borderRadius: '8px',
                boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'
              }}
            >
              <TableContainer>
                <Table sx={{ Width: '100%' }} aria-label="simple table" className="tableBody">
                  <TableHead>
                    <TableRow>
                      <TableCell colSpan={4}>
                        <Typography
                          style={{
                            fontSize: '14px',
                            fontFamily: 'Open Sans',
                            fontWeight: '700',
                            color: '#152536'
                          }}
                        >
                          Bottom Matches
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell
                        width="25%"
                        sx={{
                          fontSize: '12px',
                          fontFamily: 'Open Sans',
                          fontWeight: '600',
                          color: '#68717A'
                        }}
                      >
                        MENTOR
                      </TableCell>
                      <TableCell
                        width="25%"
                        sx={{
                          fontSize: '12px',
                          fontFamily: 'Open Sans',
                          fontWeight: '600',
                          color: '#68717A'
                        }}
                      >
                        {' '}
                        MENTEE{' '}
                      </TableCell>
                      <TableCell
                        width="25%"
                        sx={{
                          fontSize: '12px',
                          fontFamily: 'Open Sans',
                          fontWeight: '600',
                          color: '#68717A',
                          textAlign: 'center'
                        }}
                      >
                        TOTAL <br />
                        CONNECTION
                      </TableCell>
                      <TableCell
                        width="25%"
                        sx={{
                          fontSize: '12px',
                          fontFamily: 'Open Sans',
                          fontWeight: '600',
                          color: '#68717A',
                          textAlign: 'center'
                        }}
                      >
                        LAST
                        <br /> CONNECTION
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            columnGap: '6px'
                          }}
                        >
                          <img
                            src={ronanprofile}
                            alt="profile"
                            style={{
                              padding: 0,
                              margin: 0,
                              width: '35px',
                              height: '35px'
                            }}
                          />
                          <Typography style={tableStyle}>Lincoln Mango</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        {' '}
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            columnGap: '6px'
                          }}
                        >
                          <img
                            src={ronanprofile}
                            alt="profile"
                            style={{
                              padding: 0,
                              margin: 0,
                              width: '35px',
                              height: '35px'
                            }}
                          />
                          <Typography style={tableStyle}>Marilyn Workman</Typography>
                        </Box>
                      </TableCell>
                      <TableCell style={tableStyle} sx={{ textAlign: 'center' }}>
                        25
                      </TableCell>
                      <TableCell
                        style={tableStyle}
                        sx={{
                          textAlign: 'center',
                          color: ' #DC3545 !important'
                        }}
                      >
                        30 days ago
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            columnGap: '6px'
                          }}
                        >
                          <img
                            src={ronanprofile}
                            alt="profile"
                            style={{
                              padding: 0,
                              margin: 0,
                              width: '35px',
                              height: '35px'
                            }}
                          />
                          <Typography style={tableStyle}>Nolan Aminoff</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        {' '}
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            columnGap: '6px'
                          }}
                        >
                          <img
                            src={ronanprofile}
                            alt="profile"
                            style={{
                              padding: 0,
                              margin: 0,
                              width: '35px',
                              height: '35px'
                            }}
                          />
                          <Typography style={tableStyle}>Marilyn Schleifer</Typography>
                        </Box>
                      </TableCell>
                      <TableCell style={tableStyle} sx={{ textAlign: 'center' }}>
                        21
                      </TableCell>
                      <TableCell style={tableStyle} sx={{ textAlign: 'center' }}>
                        22 days ago
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            columnGap: '6px'
                          }}
                        >
                          <img
                            src={ronanprofile}
                            alt="profile"
                            style={{
                              padding: 0,
                              margin: 0,
                              width: '35px',
                              height: '35px'
                            }}
                          />
                          <Typography style={tableStyle}>Ann Rhiel Madsen</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        {' '}
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            columnGap: '6px'
                          }}
                        >
                          <img
                            src={ronanprofile}
                            alt="profile"
                            style={{
                              padding: 0,
                              margin: 0,
                              width: '35px',
                              height: '35px'
                            }}
                          />
                          <Typography style={tableStyle}>Brandon Siphron</Typography>
                        </Box>
                      </TableCell>
                      <TableCell style={tableStyle} sx={{ textAlign: 'center' }}>
                        20
                      </TableCell>
                      <TableCell style={tableStyle} sx={{ textAlign: 'center' }}>
                        16 days ago
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            columnGap: '6px'
                          }}
                        >
                          <img
                            src={ronanprofile}
                            alt="profile"
                            style={{
                              padding: 0,
                              margin: 0,
                              width: '35px',
                              height: '35px'
                            }}
                          />
                          <Typography style={tableStyle}>Wilson Westervelt</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        {' '}
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            columnGap: '6px'
                          }}
                        >
                          <img
                            src={ronanprofile}
                            alt="profile"
                            style={{
                              padding: 0,
                              margin: 0,
                              width: '35px',
                              height: '35px'
                            }}
                          />
                          <Typography style={tableStyle}>Carla Carder</Typography>
                        </Box>
                      </TableCell>
                      <TableCell style={tableStyle} sx={{ textAlign: 'center' }}>
                        19
                      </TableCell>
                      <TableCell
                        style={tableStyle}
                        sx={{
                          textAlign: 'center',
                          color: ' #DC3545 !important'
                        }}
                      >
                        50 days ago
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            columnGap: '6px'
                          }}
                        >
                          <img
                            src={ronanprofile}
                            alt="profile"
                            style={{
                              padding: 0,
                              margin: 0,
                              width: '35px',
                              height: '35px'
                            }}
                          />
                          <Typography style={tableStyle}>Miracle Lubin</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        {' '}
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            columnGap: '6px'
                          }}
                        >
                          <img
                            src={ronanprofile}
                            alt="profile"
                            style={{
                              padding: 0,
                              margin: 0,
                              width: '35px',
                              height: '35px'
                            }}
                          />
                          <Typography style={tableStyle}>Tiana Saris</Typography>
                        </Box>
                      </TableCell>
                      <TableCell style={tableStyle} sx={{ textAlign: 'center' }}>
                        18
                      </TableCell>
                      <TableCell
                        style={tableStyle}
                        sx={{
                          textAlign: 'center',
                          color: ' #DC3545 !important'
                        }}
                      >
                        42 days ago
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Dialog open={open} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description" fullWidth>
        <DialogTitle id="alert-dialog-title" className={classes.programDialogTitle}>
          Filter
          <IconButton style={{ float: 'right' }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ padding: '0 !important' }}>
          <Box sx={{ padding: '0px' }}>
            <Accordion sx={{ padding: '0px !important' }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                <Typography className={classes.popupSummary}>TIME</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box className={classes.filterAccordionDetails}>
                  <Typography className={classes.filterDetailsText}>Today</Typography>
                  <Radio onChange={handleChange} value="a" name="radio-buttons" inputProps={{ 'aria-label': 'A' }} />
                </Box>
                <Box className={classes.filterAccordionDetails}>
                  <Typography className={classes.filterDetailsText}>Last 7 days</Typography>
                  <Radio onChange={handleChange} value="a" name="radio-buttons" inputProps={{ 'aria-label': 'A' }} />
                </Box>
                <Box className={classes.filterAccordionDetails}>
                  <Typography className={classes.filterDetailsText}>Last 30 days</Typography>
                  <Radio onChange={handleChange} value="a" name="radio-buttons" inputProps={{ 'aria-label': 'A' }} />
                </Box>
                <Box className={classes.filterAccordionDetails}>
                  <Typography className={classes.filterDetailsText}>All Time</Typography>
                  <Radio onChange={handleChange} value="a" name="radio-buttons" inputProps={{ 'aria-label': 'A' }} />
                </Box>
                <Box className={classes.filterAccordionDetails}>
                  <Typography className={classes.filterDetailsText}>Date Range</Typography>
                  <Radio
                    checked={selectedValue === 'a'}
                    onChange={handleChange}
                    value="a"
                    name="radio-buttons"
                    inputProps={{ 'aria-label': 'A' }}
                  />
                </Box>
                <Grid container spacing={2}>
                  <Grid item md={6}>
                    <InputLabel className={classes.programPopupWrapper} id="demo-simple-select-label">
                      Start Date *
                    </InputLabel>
                    <TextField
                      name="start_date"
                      type="date"
                      placeholder=""
                      variant="outlined"
                      style={{
                        width: '100%',
                        fontWeight: '600',
                        color: '#152536',
                        fontSize: '14px !important'
                      }}
                      size="small"
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item md={6}>
                    <InputLabel className={classes.programPopupWrapper} id="demo-simple-select-label">
                      End Date *
                    </InputLabel>
                    <TextField
                      name="start_date"
                      type="date"
                      placeholder=""
                      variant="outlined"
                      style={{
                        width: '100%',
                        fontWeight: '600',
                        color: '#152536',
                        fontSize: '14px !important'
                      }}
                      size="small"
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>

            <Accordion sx={{ padding: '0px !important' }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                <Typography className={classes.popupSummary}>Organization</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid item md={12}>
                    <Box
                      border="1px solid #EFF0F4"
                      borderRadius={1}
                      display="flex"
                      alignItems="center"
                      width="100%"
                      // height={"20px"}
                      padding={1.2}
                    >
                      <SearchIcon sx={{ color: appColors.gray4, marginRight: '10px' }} />
                      <TextField
                        variant="standard"
                        placeholder="Search Dosen"
                        size="small"
                        type="text"
                        style={{
                          borderColor: 'transparent',
                          padding: '0px !important',
                          margin: 0,
                          paddingBottom: 0
                        }}
                      />
                    </Box>
                  </Grid>
                </Grid>

                <Box className={classes.filterAccordionDetails}>
                  <Typography className={classes.filterDetailsText}> Association of Southeast Asian Nations</Typography>
                  <Checkbox {...label} defaultChecked />
                </Box>
                <Box className={classes.filterAccordionDetails}>
                  <Typography className={classes.filterDetailsText}>Amnesty International</Typography>
                  <Checkbox {...label} />
                </Box>
                <Box className={classes.filterAccordionDetails}>
                  <Typography className={classes.filterDetailsText}>Commonwealth of Nations</Typography>
                  <Checkbox {...label} />
                </Box>
                <Box className={classes.filterAccordionDetails}>
                  <Typography className={classes.filterDetailsText}>
                    International Committee of the Red Cross
                  </Typography>
                  <Checkbox {...label} />
                </Box>
                <Box className={classes.filterAccordionDetails}>
                  <Typography className={classes.filterDetailsText}>World Meteorological Organization</Typography>
                  <Checkbox {...label} />
                </Box>
                <Box className={classes.filterAccordionDetails}>
                  <Typography className={classes.filterDetailsText}>
                    United Nations Industrial Development Organization
                  </Typography>
                  <Checkbox {...label} />
                </Box>
                <Box className={classes.filterAccordionDetails}>
                  <Typography className={classes.filterDetailsText}>Universal Postal Union</Typography>
                  <Checkbox {...label} />
                </Box>
                <Box className={classes.filterAccordionDetails}>
                  <Typography className={classes.filterDetailsText}>United Nations</Typography>
                  <Checkbox {...label} />
                </Box>
              </AccordionDetails>
            </Accordion>
          </Box>
        </DialogContent>
        <Divider />
        <DialogActions
          style={{
            width: '',
            height: '45px',
            justifyContent: 'center',
            padding: '5px 24px 20px',
            marginBottom: '10px'
          }}
        >
          <Button
            style={{
              fontFamily: 'Open Sans',
              textAlign: 'center',
              fontSize: '15px',
              fontWeight: '700',
              color: ' #68717A',
              border: '1px solid #68717A',

              borderRadius: '8px',
              background: '#fff',
              // width: "270px",
              height: '45px'
            }}
            fullWidth
          >
            Reset
          </Button>
          <Button
            style={{
              fontFamily: 'Open Sans',
              textAlign: 'center',
              fontSize: '15px',
              fontWeight: '700',
              color: '#fff',
              background: '#152536',
              borderRadius: '8px',
              width: '560px',
              height: '45px'
            }}
          >
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProgramInsights;
