import * as React from 'react';
import Button from '../components/Button';
import Typography from '../components/Typography';
import backgroundImage from '../../assets/Max_pics/DSC_1.jpg'
import backgroundImage2 from '../../assets/Max_pics/DSC_3.jpg'
import ProductHeroLayout from './ProductHeroLayout';
import theme from '../theme';
import { Container } from '@mui/material';


const backgroundImage3 =
  'https://images.unsplash.com/photo-1534854638093-bada1813ca19?auto=format&fit=crop&w=1400';

export default function ProductHero(){
    return(
        <>
        {/* <Container> */}


        <ProductHeroLayout
            sxBackground={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundColor: '#7fc7d9', // Average color of the background image.
                backgroundPosition: 'center',
            }}
            sxBackground2={{
                backgroundImage: `url(${backgroundImage2})`,
                backgroundColor: '#7fc7d9', // Average color of the background image.
                backgroundPosition: 'center',
            }}
        >
        {/* Increase the network loading priority of the background image. 
        the idea is to preload the img (from src) without render it, that ensures that it is loaded into the browser's 
        cache,so when it is later used as a background image in the ProductHeroLayout component, 
        it can be quickly accessed without causing delays or flickering during rendering. */}
            <img
            style={{display:'none'}}
            src={backgroundImage}
            alt='increase priority'
            />
            <Typography color="inherit" align='center' variant='h2' marked='center' >
                Feel Like the STAR  you are
            </Typography>
            <Typography
            color="inherit"
            align="center"
            variant="h5"
            sx={{ mb: 4, mt: { xs: 4, sm: 10 } }}
            >
           Discover the experience

            </Typography>
            <Button
            color='secondary'
            variant="contained"
            size="large"
            component="a"
            href="/avivohayon/fashionai/"
            sx={{ minWidth: 200 }}
            >
                Start
            </Button>


        </ProductHeroLayout>
        {/* </Container> */}
        {/* <Container> */}



        </>

    )
}



//indianred