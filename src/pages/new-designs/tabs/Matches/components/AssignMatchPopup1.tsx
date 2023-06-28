/* eslint-disable react-hooks/exhaustive-deps */
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  // InputLabel,
  IconButton,
  // Grid,
  TextField
} from '@material-ui/core';
import CloseIcon from '@mui/icons-material/Close';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import { LoadingButton } from '@mui/lab';
import { Grid, InputLabel, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
// import { appColors } from "../../../../../utils/theme";
// assign a menter popup
// import { makeStyles } from "@mui/styles";
// import { featchMatches } from "../../../../redux/slices/getAllMatches/getAllMatchesSlice";
// import { useParams } from "react-router-dom";
// import { AppLoader } from "../../../../components/AppLoader";
// import { useSelector } from "react-redux";

interface MatchingFields {
  gender: boolean;
  firstGenStudent: boolean;
}

// interface Recommendation {
//   role: string;
//   searchQuery: { field: string; value: string; match: string }[];
//   matchedFieldsCount: number;
//   mentorId: string;
//   menteeId: string;
//   headshot: string;
//   displayName: string;
//   bio: string;
// }

// interface DataItem {
//   message: string;
//   data: {
//     grpId: string;
//     isConfirmed: boolean;
//     id: string;
//     searchQuery: {
//       field: string;
//       value: string;
//       isMatched: boolean;
//     }[];
//     mentee: {
//       bio: {
//         education: {
//           university: string;
//           major: string;
//           graduationDate: string;
//         };
//         workHistory: {
//           companyName: string;
//           role: string;
//         };
//       };
//       displayName: string;
//       userId: string;
//       headshot: string;
//     };
//     mentor: {
//       bio: {
//         workHistory: {
//           companyName: string;
//           role: string;
//         };
//         education: {
//           university: string;
//           major: string;
//           graduationDate: string;
//         };
//       };
//       displayName: string;
//       userId: string;
//       headshot: string;
//     };
//   };
// }

interface AssignMatchPopup1Props {
  openAssignMentor: any;
  handleCloseAssignMentor: any;
  action: string;
  handleOpenFindmentor: any;
  matchingFields: MatchingFields;
  setMatchingFields: any;
  handleSubmitAutoMatch: any;
  maxMatchCountMentee: any;
  maxMatchCountMentor: any;
  setMatchCountMentee: any;
  setMatchCountMentor: any;
  loaderFirstPopup: any;
}

function AssignMatchPopup1({
  openAssignMentor,
  handleCloseAssignMentor,
  action,
  handleOpenFindmentor,
  matchingFields,
  setMatchingFields,
  handleSubmitAutoMatch,
  maxMatchCountMentee,
  maxMatchCountMentor,
  setMatchCountMentee,
  setMatchCountMentor,
  loaderFirstPopup
}: AssignMatchPopup1Props) {
  function capitalizeFirstLetter(string: any) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return (
    <div>
      <div>
        <Dialog
          open={openAssignMentor}
          onClose={handleCloseAssignMentor}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth
        >
          <DialogTitle id="alert-dialog-title" className="informationtext">
            {action === 'Auto Match' ? '' : action === 'Assign Mentor' ? 'Assign a mentor' : 'Assign a mentee'}
            {action === 'Auto Match' && 'Auto Match'}
            <IconButton onClick={handleCloseAssignMentor} style={{ float: 'right' }}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <Divider />
          <DialogContent>
            {/* Matching Criteria */}

            {action === 'Auto Match' && (
              <Box sx={{ marginBottom: '20px' }}>
                <Typography
                  sx={{
                    fontSize: '16px',
                    fontWeight: '600',
                    fontFamily: 'Open Sans',
                    color: '#152536',
                    marginBottom: '10px'
                  }}
                >
                  Matching Criteria
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <InputLabel
                      id="demo-simple-select-label"
                      style={{
                        marginBottom: '10px',
                        fontFamily: 'Open Sans',
                        fontSize: '14px',
                        fontWeight: '400',
                        color: '#68717A'
                      }}
                    >
                      Maximum matches per mentee *
                    </InputLabel>
                    <FormControl fullWidth>
                      <TextField
                        required
                        type="text"
                        variant="outlined"
                        style={{ width: '100%' }}
                        value={maxMatchCountMentee} // Set the value from the state
                        onChange={(e) => setMatchCountMentee(Number(e.target.value))} // Update the state when the value changes
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <InputLabel
                      id="demo-simple-select-label"
                      style={{
                        marginBottom: '10px',
                        fontFamily: 'Open Sans',
                        fontSize: '14px',
                        fontWeight: '400',
                        color: '#68717A'
                      }}
                    >
                      Maximum matches per mentor *
                    </InputLabel>
                    <FormControl fullWidth>
                      <TextField
                        required
                        type="text"
                        variant="outlined"
                        style={{ width: '100%' }}
                        value={maxMatchCountMentor} // Set the value from the state
                        onChange={(e) => setMatchCountMentor(Number(e.target.value))} // Update the state when the value changes
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </Box>
            )}
            {/* <Divider /> */}
            <Box sx={{ marginTop: '15px' }}>
              <Typography
                sx={{
                  fontSize: '16px',
                  fontWeight: '600',
                  fontFamily: 'Open Sans',
                  color: '#152536',
                  marginBottom: '10px'
                }}
              >
                Matching Fields
              </Typography>

              <Typography
                sx={{
                  fontSize: '12px',
                  fontWeight: '400',
                  fontFamily: 'Open Sans',
                  color: '#68717A',
                  marginBottom: '10px'
                }}
              >
                Toggle on the fields that you would like your users to be matched on. You can drag and drop the line
                criteria in order of importance.
              </Typography>
              {Object.entries(matchingFields).map(([key, value]) => {
                const isTitle = key === 'title';
                const firtgendration = key === 'firstGenStudent';
                const displayText = isTitle ? 'Role' : firtgendration ? '1st Generation' : capitalizeFirstLetter(key);

                return (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '10px'
                    }}
                    key={key}
                  >
                    {' '}
                    <DragHandleIcon sx={{ color: '#CED4DA' }} />
                    <Switch
                      checked={value}
                      onChange={() =>
                        setMatchingFields((prevState: any) => ({
                          ...prevState,
                          [key]: !value
                        }))
                      }
                      color="primary"
                    />
                    <Typography
                      sx={{
                        fontSize: '14px',
                        fontFamily: 'Open Sans',
                        fontWeight: '400',
                        color: '#152536'
                      }}
                    >
                      {displayText}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          </DialogContent>

          <DialogActions style={{ padding: '15px 0', justifyContent: 'center' }}>
            {action !== 'Auto Match' && (
              <LoadingButton
                style={
                  loaderFirstPopup
                    ? {}
                    : {
                        fontFamily: 'Open Sans',
                        fontSize: '16px',
                        fontWeight: '700',
                        color: '#fff',
                        background: '#152536',
                        borderRadius: '8px',
                        width: '560px',
                        height: '50px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                      }
                }
                loading={loaderFirstPopup}
                onClick={handleOpenFindmentor}
              >
                {action === 'Assign Mentor' && 'Find  Mentor'}
                {action === 'Assign Mentee' && 'Find Mentee'}
              </LoadingButton>
            )}

            {action === 'Auto Match' && (
              <LoadingButton
                style={
                  loaderFirstPopup
                    ? {}
                    : {
                        fontFamily: 'Open Sans',
                        fontSize: '16px',
                        fontWeight: '700',
                        color: '#fff',
                        background: '#152536',
                        borderRadius: '8px',
                        width: '560px',
                        height: '50px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                      }
                }
                loading={loaderFirstPopup}
                onClick={handleSubmitAutoMatch}
              >
                Search Auto Matches
              </LoadingButton>
            )}
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default AssignMatchPopup1;
