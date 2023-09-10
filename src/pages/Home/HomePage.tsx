import { Box, Card, CardContent, CardHeader, Divider, Grid, ThemeProvider, Typography, createTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ICategoria from '../../firebase/config/interface/ICategoria';
import { getCategorias } from '../../firebase/FBcategoria';

const theme = createTheme();

theme.typography.h2 = {
  fontSize: '1.5rem',
  '@media (min-width:600px)': {
    fontSize: '2rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '3rem',
  },
};

export const HomePage = () => {

  const [categorias, setCategorias] = useState<ICategoria[]>([]);
    
  //getCategorias()
  //El useEffect hace que hasta que no lleguen los datos de las categorías no manda el return, el "html"
  useEffect(() => {
    getCategorias()
    .then (res => {
      console.log(res)
      setCategorias(res) 
    })
  }, [])

  return (
    <>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center'
      }}>
        <ThemeProvider theme={theme}>
          <Typography variant="h2" sx={{
            color: '#DAA520',
            letterSpacing: '2px'
          }}
          >Campeones de League of Legends</Typography>
        </ThemeProvider>
      </Box>
      <Grid container sx={{ padding: '10px', width: '100%', display: 'flex'}}>
          <Grid item xs={5.8} sx={{ border:'0px solid black'}}>
            <Card sx={{ bgcolor: '#005A82'}}>
              <CardHeader title='Información de Usuarios' 
                           sx={{ textAlign: 'center', display:'flex', fontFamily: 'BeaufortforLOL-BoldItalic',color: '#C89B3C'}}/>
              <Divider/>
              <CardContent>
                <Typography variant="h4" sx={{ fontFamily: 'BeaufortforLOL-BoldItalic',color: '#C89B3C'}}>Listado de Usuarios</Typography>
                <ul>
                  {
                   categorias.map( (categoria) => (
                   <li>{ categoria.name }</li>
                   ))
                  }
                </ul>
              </CardContent>
             </Card>
            </Grid>  
          </Grid>
    </>
  )
}
