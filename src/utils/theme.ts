import { createTheme } from '@mui/material/styles';

export const theme = createTheme();

export const appColors = {
  white: '#FFFFFF',
  black: '#000000',
  gray1: '#EFF0F4',
  gray2: '#F9FAFC',
  orange: '#DF6431',
  gray3: '#ABB5BE',
  lightGreen: '#8BB770',
  gray4: '#68717A',
  black1: '#262738',
  blue1: '#0082B6',
  blue2: '#1a8bed',

  /** Chat */
  ChatTitle: '#152536'
};

export const appFonts = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  xxl: 20
};

/** Only for chats */
export const chatFonts = {
  xs: appFonts.xs,
  sm: appFonts.sm,
  md: appFonts.md,
  lg: appFonts.lg,
  xl: appFonts.xl,
  xxl: appFonts.xxl
};

// breakpoints
//  <576 Extra small
//  >= 576 small
//  >=768 Medium
//  >= 992 Large
//  >=1200 Extra Large

theme.typography.h1 = {
  '@media (max-width:575px)': {
    fontSize: '19px'
  },
  '@media (min-width:768px)': {
    fontSize: '22px'
  },
  '@media (min-width:992px)': {
    fontSize: '25px'
  }
};

theme.typography.body1 = {
  '@media (max-width:575px)': {
    fontSize: '14px'
  },
  '@media (min-width:768px)': {
    fontSize: '17px'
  },
  '@media (min-width:992px)': {
    fontSize: '18px'
  }
};

export const chatTheme = createTheme({
  palette: {
    primary: {
      main: '#d9633e',
      dark: '#262739',
      light: '#0082b6'
    }
  }
});

export const SaveBtn = createTheme({
  palette: {
    primary: {
      main: '#152536',
      contrastText: '#FFFFFF'
    }
  }
});
