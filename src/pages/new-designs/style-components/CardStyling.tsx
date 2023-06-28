import { styled } from '@mui/system';
import { Box, Typography, CardMedia } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const MyCardBox = styled(Box)({
  borderRadius: 8,
  border: '1px solid #EFF0F4',
  background: '#FFFFFF',
  padding: 15,
  minHeight: 240,
  height: '100%'
});

export const MyCardHeading = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: '#152536',
  fontSize: 14,
  fontFamily: 'Open Sans'
}));

export const MyTypography = styled(Typography)(({ theme }) => ({
  color: '#808080',
  fontSize: 12,
  fontFamily: ' Open Sans',
  fontWeight: 400
}));

export const BigValueTypography = styled(Typography)(({ theme }) => ({
  color: '#152536',
  fontSize: 60,
  fontFamily: ' Open Sans',
  fontWeight: 700,
  textAlign: 'center'
}));

export const MyCardMedia = styled(CardMedia)({
  padding: 0,
  margin: 0,
  width: 14,
  height: 13
});

export const CardStyle = makeStyles(() => ({
  cardBox: {
    borderRadius: 8,
    border: '1px solid #EFF0F4',
    background: '#FFFFFF',
    padding: 15,
    // boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
    minHeight: 240
  },
  mainBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
}));
