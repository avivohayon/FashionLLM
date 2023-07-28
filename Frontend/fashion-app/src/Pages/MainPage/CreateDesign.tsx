import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Container as ContainerBS } from 'react-bootstrap'
import { Container as ContainerMUI, Button, Grid, TextField } from '@mui/material'


const CreateDesign = () => {
  console.log('start CreateDesign')
  const [inputValue, setInputValue] = useState('');


  const handleInputChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }
  
  const handleSubmit =() => {
    console.log(inputValue)
    // just for now i will do it btter for other services soon
    const url = `http://localhost:8123/avivohayon/fashionai/data/asos?celebrity_name=${inputValue}`;  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log('Received response:', data);
        // Handle the response data as needed
      })
      .catch(error => {
        console.error('Request error:', error);
        // Handle the request error
      });
  }

  return (
    <ContainerMUI>
      asdasdaasd
     <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Enter your input"
          value={inputValue}
          onChange={handleInputChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Button variant="contained" onClick={handleSubmit} fullWidth>
          Submit
        </Button>
      </Grid>
    </Grid>
    </ContainerMUI>

  )
}

export default CreateDesign