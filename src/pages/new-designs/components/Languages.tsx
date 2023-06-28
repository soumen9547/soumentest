import React from 'react';
import Box from '@mui/material/Box';
import { IconButton } from '@mui/material';
import pencil from '../../../assets/images/pencil.svg';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';

const Languages = () => {
  const [openLanguage, setOpenLanguage] = React.useState(false);

  const handleClickOpenLanguage = () => {
    setOpenLanguage(true);
  };
  const handleCloseLanguage = () => {
    setOpenLanguage(false);
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px  10px  15px 20px'
        }}
      >
        <Box
          sx={{
            fontFamily: 'Open Sans',
            fontSize: '14px',
            fontWeight: '600',
            lineHeight: '19px',
            color: '#0082B6'
          }}
        >
          Language You Speak
        </Box>

        <Box>
          <IconButton onClick={handleClickOpenLanguage}>
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
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          columnGap: '90px',
          padding: '0 20px 10px'
        }}
      >
        <Box>
          <Box
            sx={{
              fontFamily: 'Open Sans',
              fontSize: '14px',
              fontWeight: '600',
              lineHeight: '19px',
              color: '#152536',
              marginBottom: '5px'
            }}
          >
            English
          </Box>
          <Box
            sx={{
              fontFamily: 'Open Sans',
              fontSize: '12px',
              fontWeight: '400',
              lineHeight: '16px',
              color: '#152536'
            }}
          >
            Fluent
          </Box>
        </Box>
        <Box>
          <Box
            sx={{
              fontFamily: 'Open Sans',
              fontSize: '14px',
              fontWeight: '600',
              lineHeight: '19px',
              color: '#152536',
              marginBottom: '5px'
            }}
          >
            French
          </Box>
          <Box
            sx={{
              fontFamily: 'Open Sans',
              fontSize: '12px',
              fontWeight: '400',
              lineHeight: '16px',
              color: '#152536'
            }}
          >
            Natural
          </Box>
        </Box>
      </Box>

      <Dialog
        open={openLanguage}
        onClose={handleCloseLanguage}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Languages You speak?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            English is a West Germanic language that originated in England and is now spoken as a first or second
            language by over 1.5 billion people worldwide. It has a relatively complex grammar system with many
            irregular verbs and noun plurals, but also a large vocabulary with many loanwords from other languages.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseLanguage}>Disagree</Button>
          <Button onClick={handleCloseLanguage} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Languages;
