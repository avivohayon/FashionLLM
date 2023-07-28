import * as React from 'react';
import MultiAppBar, {AppBarProps} from '@mui/material/AppBar'

function AppBar(props: AppBarProps){
    return (
        <MultiAppBar elevation={0}  {...props}/>
    )
}
export default AppBar