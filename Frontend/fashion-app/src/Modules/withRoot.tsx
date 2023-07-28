import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import  CssBaseline  from '@mui/material/CssBaseline';
import theme from './theme';

// this generic function will wrap each page component will use and init its theme styling
// for me: JSX.IntrinsicAttributes is a built-in TypeScript type that represents the set of attributes that
// can be applied to JSX elements. These attributes include commonly used props like className, style, key, and ref
// P extends JSX.IntrinsicAttributes means that the generic type parameter P should be a type that includes 
// the attributes allowed in JSX elements. It helps ensure that the component can accept valid JSX props.

export default function withRoot<P extends JSX.IntrinsicAttributes>(Component : React.ComponentType<P>){
    // this will be our generic factory function which return the WithRoot .
    // this func will init a Generic component with the needed theme.
    console.log('start withRoot(HOME)')
    function WithRoot(props: P)
    {
        return (
            <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline/>
                <Component {...props}/>

            </ThemeProvider>
        );
    }
    return WithRoot;
}