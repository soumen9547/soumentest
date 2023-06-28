// import { makeStyles } from '@mui/styles';
import { styled } from '@mui/system';
import { Checkbox, TextField, InputLabel, Autocomplete, FormControlLabel } from '@mui/material';
import { appColors } from '../../../utils/theme';

/** Input label */
export const MyInputLabel = styled(InputLabel)({
  marginBottom: '10px',
  fontFamily: 'Open Sans',
  fontSize: '14px',
  fontWeight: '400',
  color: appColors.gray4
});

/** Select field -> Uses example below */
export const MyAutocomplete = styled(Autocomplete)({
  '& .MuiOutlinedInput-root': {
    fontSize: '14px !important',
    fontFamily: 'Open Sans !important',
    border: '1px solid #EFF0F4',
    borderRadius: '8px !important',
    padding: '10px 8px !important',
    fontWeight: 600,
    '& input': {
      padding: '0 !important',
      border: '0 !important'
    },
    '& fieldset': {
      borderRadius: '8px !important',
      border: '1px solid #EFF0F4'
    },
    '&:hover fieldset': {
      border: '1px solid #EFF0F4 !important'
    },
    '&.Mui-focused fieldset': {
      border: '1px solid #EFF0F4 !important'
    }
  }
});

/** Text input fiels -> Uses example below */
export const MyTextField = styled(TextField)({
  '& .MuiInputBase-input.Mui-disabled': {
    background: '#EFF0F4 !important'
  },
  '& input': {
    padding: '10px 8px !important',
    fontSize: '14px !important',
    fontFamily: 'Open Sans !important',
    fontWeight: 600,
    border: '1px solid #EFF0F4',
    borderRadius: '8px !important',
    background: '#FFFFFF !important',
    '&::placeholder': {
      fontWeight: '400 !important',
      color: '#ABB5BE'
    }
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderRadius: '8px !important',
      border: '1px solid #EFF0F4'
    },
    '&:hover fieldset': {
      border: '1px solid #EFF0F4 !important'
    },
    '&.Mui-focused fieldset': {
      border: '1px solid #EFF0F4 !important'
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: '1px solid #EFF0F4 !important'
    }
  }
});

/** Text area -> Uses example below />} */
export const MyTextareaField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    padding: '10px 8px !important',
    fontSize: '14px !important',
    fontFamily: 'Open Sans !important',
    fontWeight: 600,
    border: '1px solid #EFF0F4',
    borderRadius: '8px !important',
    '& fieldset': {
      borderRadius: '8px !important',
      border: '1px solid #EFF0F4'
    },
    '&:hover fieldset': {
      border: '1px solid #EFF0F4 !important'
    },
    '&.Mui-focused fieldset': {
      border: '1px solid #EFF0F4 !important'
    },
    '& textarea': {
      '&::placeholder': {
        fontWeight: '400 !important',
        color: '#ABB5BE'
      }
    }
  }
});

/** MyCheckboxBox -> Uses example below */
export const MyCheckboxBox = styled(FormControlLabel)({
  fontFamily: 'Open Sans !important',
  fontSize: '14px !important',
  fontWeight: '400',
  color: '#68717A !important'
});

/** MyCheckbox -> Uses example below */
export const MyCheckbox = styled(Checkbox)({
  color: '#68717A !important'
});

/** Uses example */
/** Select fiels */
/** <MyAutocomplete
    className={classes.MyAutocomplete}
    disablePortal
    options={options}
    renderInput={(params) => (
        <TextField
        sx={{
            borderRadius:"100px !important"
        }}
        {...params}
        variant="outlined"
        placeholder="Program KPI’s"
        />
    )}
/> */

/** Text Input field  */
/** <MyTextField fullWidth/> */

/** Text area */
/** <MyTextareaField
    fullWidth
    multiline
    rows={2}
    maxRows={3}
    placeholder="Write Description about task"
/> */

/** Checkbox */
/** <MyCheckboxBox
  control={<MyCheckbox />}
  label="No Mentor Question"
/> */
