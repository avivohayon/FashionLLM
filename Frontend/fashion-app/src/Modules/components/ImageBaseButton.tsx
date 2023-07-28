import React, { Children } from 'react'
import { CardProps } from 'react-bootstrap'
import { Card, CardMedia, CardContent, ButtonBase , ButtonBaseProps} from '@mui/material'
import { styled } from '@mui/material/styles';

const ImageBackdrop = styled('div')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    background: '#000',
    opacity: 0.5,
    transition: theme.transitions.create('opacity'),
  }));
  
const ImageIconButton = styled(ButtonBase)(({ theme }) => ({
    position: 'relative',
    // display: 'block',
    borderRadius: 0,
    height: '23vh',
    // margin: theme.spacing(2),
    

    [theme.breakpoints.down('md')]: {
        width: '100% !important',
        height: 100,
        
    },
    '&:hover': {
        zIndex: 1,
 
        

    },
    '&:hover .imageBackdrop': {
        opacity: 0.15,
    },
    '&:hover .imageMarked': {
        opacity: 0,
    },
    '&:hover .imageTitle': {
        border: '4px solid currentColor',
    },
    '& .imageTitle': {
        position: 'relative',
        padding: `${theme.spacing(2)} ${theme.spacing(4)} 14px`,
    },
    '& .imageMarked': {
        height: 3,
        width: 18,
        background: theme.palette.common.white,
        position: 'absolute',
        bottom: -2,
        left: 'calc(50% - 9px)',
        transition: theme.transitions.create('opacity'),
    },
}));


function ImageCard<C extends React.ElementType>(
    props: ButtonBaseProps
    )  {
  return (
    <ImageIconButton>
        {Children}
    </ImageIconButton>
  )
}

export default ImageCard


