import * as React from 'react';
import AppAppBar from '../Modules/views/AppAppBar';
import withRoot from '../Modules/withRoot';
import ProductHero from '../Modules/views/ProductHero';
import ProductValues from '../Modules/views/ProductValues';
import ProductCategories from '../Modules/views/ProductCategories';
import ProductHowItWorks from '../Modules/views/ProductHowItWorks';

function  Home () {
    return(

    
    <React.Fragment>
        {/* <AppAppBar/> */}
        <ProductHero/>
        <ProductHowItWorks/>

        <ProductCategories/>

        <ProductValues/>

    {/* <div>aviv ohayon</div> */}
    </React.Fragment>
    )
}

export default withRoot(Home);