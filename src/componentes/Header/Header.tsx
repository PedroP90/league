import { Box } from '@mui/material'
import React from 'react'
import { NavBar } from '../commons/NavBar/NavBar'


export const Header = () => {
  return (
    <Box sx={{
      height: '100px',
      paddingTop: '10px',
      paddingBottom: '10px',
      display: 'flex',
      alignItems: 'center',
      width: '85%',
      margin: '0 auto',
    }}>
      <NavBar />
    </Box>
    
  )
}