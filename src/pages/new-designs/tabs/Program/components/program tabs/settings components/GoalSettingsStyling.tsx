import { makeStyles } from '@mui/styles';
// import { styled } from '@mui/system';
// import {
//   TextField,
//   InputLabel,
//   Autocomplete,
// } from "@mui/material";
// import { appColors } from '../../../../../../../utils/theme';

/** * Table */
export const tableStyle = {
  fontWeigth: '600',
  color: '#68717A',
  fontSize: '12px',
  fontFamily: 'Open Sans',
  marginBottom: '0 !important'
};

/** Goals */
export const GoalSettingsStyle = makeStyles(() => ({
  goalHeading: {
    color: '#152536 !important',
    fontSize: '18px !important',
    fontFamily: 'Open Sans !important',
    fontWeigth: '600 !important'
  },
  tableText: {
    color: '#152536',
    fontSize: '16px !important',
    fontFamily: 'Open Sans !important',
    fontWeigth: '400 !important'
  },
  createButton: {
    color: '#0071A9 !important',
    fontSize: '12px !important',
    fontFamily: 'Open Sans !important',
    fontWeigth: '700 !important',
    border: '1px solid #0071A9 !important',
    borderRadius: '8px',
    padding: '10px 16px'
  },

  deleteTextPopup: {
    fontSize: '26px',
    fontWeight: '400',
    fontFamily: 'Open Sans',
    color: '#152536',
    textAlign: 'center',
    padding: '40px 10px'
  }
}));
