import * as React from 'react';
import AppAppBar from '../views/AppAppBar';
import withRoot from '../withRoot';

function Header() {

    return(
        <React.Fragment>
            <AppAppBar/>
        </React.Fragment>
    )
}
export default withRoot(Header);