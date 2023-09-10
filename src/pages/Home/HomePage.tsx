import { Box, Card, CardContent, CardHeader, Divider, Grid, TextField, ThemeProvider, Typography, createTheme, styled } from '@mui/material'
import React, { ChangeEvent, useEffect, useState } from 'react'
import ICategoria from '../../firebase/config/interface/ICategoria';
import { getCategorias } from '../../firebase/FBcategoria';


const theme = createTheme();

const CssTextField = styled(TextField)({
  //cambia el foco, es decir el nombre que sale arriba al pinchar
  '& label.Mui-focused': {
    color: '#2F88FF',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'green',
  },
  //cambia el borde permanente sin foco
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'white',
    },
    //cambia el borde al pasar el ratón
    '&:hover fieldset': {
      borderColor: '#2F88FF',
    },
    //cambia el borde al pinchar
    '&.Mui-focused fieldset': {
      borderColor: '#2F88FF',
    },
    //cambia el color del texto al escribir
    '&.css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root':{
      color: 'white'
    },
    
  },
  
});

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

  //setear los hooks useState
  const [ search, setSearch] = useState("")
  const [categorias, setCategorias] = useState<ICategoria[]>([]);

  //función para traer los datos de la API
  useEffect(() => {
      getCategorias()
      .then (res => {
        console.log(res)
        setCategorias(res) 
      })
    }, [])

  //función de búsqueda, con esto recogemos lo que se tipea
  const searcher: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void = (e) => {
      setSearch(e.target.value);
      console.log(e.target.value);
    
    };
  //método de filtrado #1
  // let results = []
  // if(!search)
  // {
  //     results = categorias
  // }else{
  //     results = categorias.filter( (dato) => 
  //     dato.name.toLowerCase().includes(search.toLocaleLowerCase())
  //     )
  // }

  //método de filtrado #2
    const results = !search ? categorias : categorias.filter((dato)=> 
    dato.name.toString().toLowerCase().includes(search.toLowerCase()) )
    
  //renderizamos la vista

    
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
        justifyContent: 'center',
        mb: '20px'
      }}>
        <ThemeProvider theme={theme}>
          <Typography variant="h2" sx={{
            color: '#DAA520',
            letterSpacing: '2px'
          }}
          >Campeones de League of Legends</Typography>
        </ThemeProvider>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <CssTextField
                value={search}
                onChange={searcher}
                label="Campeones"
                type="texto"
                InputLabelProps={{
                    style:{
                        color:'white',
                        fontWeight: 'bolder'
                    }
                }}
    />
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
                   results.map( (categoria) => (
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
