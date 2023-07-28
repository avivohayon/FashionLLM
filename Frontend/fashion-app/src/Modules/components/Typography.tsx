import * as React from 'react';
import { styled, Theme } from '@mui/material/styles';
import MuiTypography, { TypographyProps } from '@mui/material/Typography';

// In order to make the Typography generic and control the data in it will override the Typo element that
// we want to customize.


// First will mark the Typo fields we want to override 

/*
markClassesMapping: This *Object* maps different mark classes based on their alignment and heading level.
It provides class names that can be used for styling specific elements. 

Example: if marked is set to 'center' and variant is set to 'h2', the corresponding mark class will be
        'OnePirateTypography-markedH2Center'.  If you have the following JSX code:
        <Typography variant="h2" marked="center">Hello, World!</Typography>
        It will apply the class name 'OnePirateTypography-markedH2Center' to the rendered element for additional styling.
*/
const markClassesMapping: {

  [index: string]: { [subindex: string]: string };
} = {
  center: {
    h1: '',
    h2: 'OnePirateTypography-markedH2Center',
    h3: 'OnePirateTypography-markedH3Center',
    h4: 'OnePirateTypography-markedH4Center',
    h5: '',
    h6: '',
  },
  left: {
    h1: '',
    h2: '',
    h3: '',
    h4: '',
    h5: '',
    h6: 'OnePirateTypography-markedH6Left',
  },
  none: {
    h1: '',
    h2: '',
    h3: '',
    h4: '',
    h5: '',
    h6: '',
  },
};
/**
 * styles: This function takes the theme object as an argument and generates dynamic CSS styles using template 
 * literals and markClassesMapping. The generated styles target specific mark classes based on their
 *  alignment and apply properties like height, width, margin, and backgroundColor.

Example: If the theme object has spacing(1) equal to 8px, the generated CSS styles for the mark class
        'OnePirateTypography-markedH2Center' will be:
        .OnePirateTypography-markedH2Center {
        height: 4px;
        width: 73px;
        display: block;
        margin: 8px auto 0;
        background-color: #ff3366; /theme.palette.secondary.main 
}
for me - In CSS, the & symbol is a special character known as the "parent selector" or "reference to the current selector." 
It is used to refer to the parent selector in a nested context so we can take advantage of the theme (style we provide in the app component) 
we use in the parents components and add css to children components as well
 */
const styles = ({ theme }: { theme: Theme }) => ({
  [`& .${markClassesMapping.center.h2}`]: {
    height: 4,
    width: 73,
    display: 'block',
    //display block like the default div, it takes the entire width given to is and force a new line above and below it
    margin: `${theme.spacing(1)} auto 0`,
    backgroundColor: theme.palette.secondary.main,

    
    
  },
  [`& .${markClassesMapping.center.h3}`]: {
    height: 4,
    width: 55,
    display: 'block',
    margin: `${theme.spacing(1)} auto 0`,
    backgroundColor: theme.palette.secondary.main,
  },
  [`& .${markClassesMapping.center.h4}`]: {
    height: 4,
    width: 55,
    display: 'block',
    margin: `${theme.spacing(1)} auto 0`,
    backgroundColor: theme.palette.secondary.main,
  },
  [`& .${markClassesMapping.left.h6}`]: {
    height: 2,
    width: 28,
    display: 'block',
    marginTop: theme.spacing(0.5),
    background: 'currentColor',
  },
});

/**
 * ExtraTypographyProps: Custom interface for our custom Typography components
 *  (we are not forced to pass marked props thanks to the '?' unlike the ProductHeroLayout component). 
 * This interface defines additional props that can be passed to the Typography component. 
 * It includes an optional prop called marked, which can have values of 'center', 'left', or 'none'. 
 * These props allow customization of the alignment of the typography component.
 */
interface ExtraTypographyProps {
  marked?: 'center' | 'left' | 'none';
}

/**
 * variantMapping: This *Object* maps specific MUI variants to their corresponding HTML elements.
 *  It helps in mapping the correct HTML element based on the provided variant.

Example: If the variant prop is set to 'h2', it will be mapped to the HTML element 'h1' using the variantMapping object.
 */
const variantMapping = {
  h1: 'h1',
  h2: 'h1',
  h3: 'h1',
  h4: 'h1',
  h5: 'h3',
  h6: 'h2',
  subtitle1: 'h3',
};

/**
 * Typography: This is the main function that defines the Typography component.
 * It . 
 * The function extracts the necessary props using destructuring and checks if the provided variant exists as a key
 * in markClassesMapping[marked]. If it does, it assigns the corresponding mark class to markedClassName.
 * The component then renders the MuiTypography component and the mark class <span> element 
 * if markedClassName is not empty.
 * @param props props of type TypographyProps along with the ExtraTypographyProps interface
 * @returns the custom Typography that implement the ExtraTypographyProps interface we'll use for the project
  
 Example: If you have the following JSX code:
          <Typography variant="h2" marked="center">Hello, World!</Typography>
          The Typography component will render the following JSX:
          <MuiTypography variantMapping={variantMapping} variant="h1">
          Hello, World!
          <span className="OnePirateTypography-markedH2Center" />
          </MuiTypography>
 */
function Typography<C extends React.ElementType>(props: TypographyProps<C, { component?: C }> & ExtraTypographyProps,) {
  const { children, variant, marked = 'none', ...other } = props;

  let markedClassName = '';
  if (variant && variant in markClassesMapping[marked]) {
    markedClassName = markClassesMapping[marked][variant];
  }

  return (
    <MuiTypography  variantMapping={variantMapping} variant={variant} {...other}>
      {children}
      {markedClassName ? <span className={markedClassName} /> : null}
    </MuiTypography>
  );
}

export default styled(Typography)(styles);