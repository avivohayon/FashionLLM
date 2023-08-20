import {createTheme} from '@mui/material/styles'
import { green, grey, red } from '@mui/material/colors'
// this file will configure the theme for the project, give it to a ThemeProvider which wraps the
//project with this theme (can also be override in child components)

const rawTheme = createTheme({
    palette: {
      primary: {
        light: '#fffef3',
        main: '#FEFCD0',
        dark: '#CFB436',
      },
      secondary: {
        light: '#D0DB61',
        main: '#50C878',
        dark: '#006400',
      },
  
      warning: {
        main: '#ffc071',
        dark: '#ffb25e',
      },
      error: {
        light: red[50],
        main: red[500],
        dark: red[700],
      },
      success: {
        light: green[50],
        main: green[500],
        dark: green[700],
      },
    },
    typography: {
      fontFamily: "'Work Sans', sans-serif, Oxygen",
      fontSize: 14,
      fontWeightLight: 300, // Work Sans
      fontWeightRegular: 400, // Work Sans
      fontWeightMedium: 700, // Roboto Condensed
    },
  });
  
  const fontHeader = {
    color: rawTheme.palette.text.primary,
    fontWeight: rawTheme.typography.fontWeightMedium,
    fontFamily: "'Roboto Condensed', sans-serif, Oxygen",
    textTransform: 'uppercase',
  };
  
  const theme = {
    ...rawTheme,
    palette: {
      ...rawTheme.palette,
      background: {
        ...rawTheme.palette.background,
        default: rawTheme.palette.common.white,
        placeholder: grey[200],
      },
    },
    typography: {
      ...rawTheme.typography,
      fontHeader,
      h1: {
        ...rawTheme.typography.h1,
        ...fontHeader,
        letterSpacing: 0,
        fontSize: 60,
      },
      h2: {
        ...rawTheme.typography.h2,
        ...fontHeader,
        fontSize: 48,
      },
      h3: {
        ...rawTheme.typography.h3,
        ...fontHeader,
        fontSize: 42,
      },
      h4: {
        ...rawTheme.typography.h4,
        ...fontHeader,
        fontSize: 36,
      },
      h5: {
        ...rawTheme.typography.h5,
        fontSize: 20,
        fontWeight: rawTheme.typography.fontWeightLight,
      },
      h6: {
        ...rawTheme.typography.h6,
        ...fontHeader,
        fontSize: 22,
      },
      subtitle1: {
        ...rawTheme.typography.subtitle1,
        fontSize: 18,
      },
      body1: {
        ...rawTheme.typography.body2,
        fontWeight: rawTheme.typography.fontWeightRegular,
        fontSize: 16,
      },
      body2: {
        ...rawTheme.typography.body1,
        fontSize: 14,
      },
    },
  };
  
  export default theme;