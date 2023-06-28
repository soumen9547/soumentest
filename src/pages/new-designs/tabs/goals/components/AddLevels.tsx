import React from 'react';
import { Grid, IconButton, Stack, Divider, Typography } from '@mui/material';
import { MyCheckbox, MyTextField, MyInputLabel, MyCheckboxBox } from '../../../style-components/FormInput';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import pencil from '../../../../../assets/images/pencil.svg';

export const AddLevels = () => {
  return (
    <Grid container rowSpacing={2}>
      <Grid item sm={12}>
        <MyInputLabel>level</MyInputLabel>
        <MyTextField fullWidth disabled value={1} />
      </Grid>
      <Grid item sm={12}>
        <MyInputLabel>Level Name *</MyInputLabel>
        <MyTextField fullWidth />
      </Grid>
      <Grid item xs={12}>
        <MyCheckboxBox control={<MyCheckbox />} label="Check in with mentor" />
      </Grid>
    </Grid>
  );
};

export const AllLevels = () => {
  return (
    <Stack direction="column" spacing={2}>
      <Grid container>
        <Grid item sm={2}>
          <IconButton>
            <DragHandleIcon sx={{ color: '#ABB5BE' }} />
          </IconButton>
        </Grid>
        <Grid item sm={8}>
          <Typography
            sx={{
              color: '#DF6438',
              fontSize: '14px',
              fontWeight: '700',
              fontFamily: 'Open Sans'
            }}
          >
            Level 1
          </Typography>
          <Typography
            noWrap
            sx={{
              color: '#000000',
              fontSize: '16px',
              fontWeight: '600',
              fontFamily: 'Open Sans'
            }}
          >
            Understanding your goal
          </Typography>
          <Typography
            noWrap
            sx={{
              color: '#ABB5BE',
              fontSize: '12px',
              fontWeight: '400',
              fontFamily: 'Open Sans'
            }}
          >
            I think the simplest way is to create an object to define the font color and pass it
          </Typography>
        </Grid>
        <Grid item sm={2}>
          <IconButton>
            <img
              src={pencil}
              alt="pencil"
              style={{
                padding: 0,
                margin: 0,
                width: '20px',
                height: '20px'
              }}
            />
          </IconButton>
        </Grid>
      </Grid>
      <Divider />
      <Grid container>
        <Grid item sm={2}>
          <IconButton>
            <DragHandleIcon sx={{ color: '#ABB5BE' }} />
          </IconButton>
        </Grid>
        <Grid item sm={8}>
          <Typography
            sx={{
              color: '#ABB5BE',
              fontSize: '14px',
              fontWeight: '700',
              fontFamily: 'Open Sans'
            }}
          >
            Level 2
          </Typography>
          <Typography
            noWrap
            sx={{
              color: '#000000',
              fontSize: '16px',
              fontWeight: '600',
              fontFamily: 'Open Sans'
            }}
          >
            Understanding your goal
          </Typography>
          <Typography
            noWrap
            sx={{
              color: '#ABB5BE',
              fontSize: '12px',
              fontWeight: '400',
              fontFamily: 'Open Sans'
            }}
          >
            I think the simplest way is to create an object to define the font color and pass it
          </Typography>
        </Grid>
        <Grid item sm={2}>
          <IconButton>
            <img
              src={pencil}
              alt="pencil"
              style={{
                padding: 0,
                margin: 0,
                width: '20px',
                height: '20px'
              }}
            />
          </IconButton>
        </Grid>
      </Grid>
    </Stack>
  );
};
