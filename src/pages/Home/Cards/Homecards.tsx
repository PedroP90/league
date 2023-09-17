import { ChangeEvent } from 'react'
import { useEffect, useState } from 'react'
import { Backdrop, Box, Card, CardActionArea, CardActions, CardContent, Divider, Grid, Modal, TextField, createTheme, makeStyles, styled } from '@mui/material';
import { IChampion } from '../../../firebase/config/interface/IChampions';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { getChampions } from '../../../firebase/FBChampions';
import './homecard.css'
import { getRoles } from '../../../firebase/FBroles';
import { IRoles } from '../../../firebase/config/interface/IRoles';
import { getPosiciones } from '../../../firebase/FBposiciones';
import { IPosiciones } from '../../../firebase/config/interface/IPosiciones';
import React from 'react';


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




export const Homecards = () => {

  //const del modal
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);



    const [ search, setSearch] = useState("")
    const [champions, setChampions] = useState<IChampion[]>([]);

    useEffect(() => {
        getChampions()
        .then (res => {
        console.log(res)
        setChampions(res) 
        })
    }, [])
    const [roles, setRoles] = useState<IRoles[]>([]);

    useEffect(() => {
        getRoles()
        .then (res => {
        console.log(res)
        setRoles(res) 
        })
    }, [])

    //función de búsqueda, con esto recogemos lo que se tipea
    const searcher: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void = (e) => {
    setSearch(e.target.value);
    console.log(e.target.value);
    };

    //método de filtrado #2
    const results = !search ? champions : champions.filter((dato)=> 
    dato.name.toString().toLowerCase().includes(search.toLowerCase())
     )
    
    

    

    const [posiciones, setPosiciones] = useState<IPosiciones[]>([]);

    useEffect(() => {
      getPosiciones()
      .then (res => {
      console.log(res)
      setPosiciones(res) 
      })
  }, [])


    
  return (
    <>
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
        {/* <Box>
          <Button onClick={() => filtroByRol}>Filtrar por asesino</Button>
        </Box> */}
        <Grid container spacing={2} sx={{ 
            padding: '1rem',
            display: 'flex',
            justifyContent: 'center'
            }}>
            {   //.sort para ordenar por el campo que le diga
                results.sort((a,b) => a.name.localeCompare(b.name)).map( (champion) => (
                    <Grid item data-count="Infinity" xs={10} sm={6} md={4} lg={3} sx={{borderColor: '1px'}}>
                        <Card sx={{
                            backgroundColor: 'rgba(0, 0, 0, .5)',
                            }}
                        >
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    image={champion.sprite}
                                    alt="foto campeón"
                                />
                                <CardContent >
                                    <Typography variant="h4" component="div" sx={{ 
                                        fontFamily: 'BeaufortforLOL-BoldItalic',
                                        color:'white', 
                                        mb: 1.5, 
                                        textAlign: "center" 
                                        }}
                                        >
                                        {champion.name}
                                    </Typography>
                                    <Divider sx={{ backgroundColor: 'white'}}/>
                                    <Typography variant="h5" component="div" sx={{ 
                                        fontFamily: 'BeaufortforLOL-BoldItalic',
                                        height: '50px',
                                        color:'gold',
                                        mt: 1.5, 
                                        mb: 1.5,  
                                        textAlign: "center" 
                                        }}
                                        >
                                        {champion.title}
                                    </Typography>
                                    <Typography variant="body2" sx={{ 
                                        height: '130px',
                                        fontFamily: 'BeaufortforLOL-BoldItalic', 
                                        color:'white',
                                        }}
                                        >
                                        {champion.description}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions
                                    sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}
                                  >
                                <Button onClick={handleOpen} variant='contained' size="small">
                                    Detalle
                                </Button>
                                <Modal
                                  open={open}
                                  onClose={handleClose}
                                  aria-labelledby="modal-modal-title"
                                  aria-describedby="modal-modal-description"
                                  sx={{
                                    width: '100vw',
                                    height: '100vh',
                                    position: 'fixed',
                                    top: '0',
                                    left: '0', 
                                    '& .MuiBackdrop-root': { backgroundColor: 'transparent' }
                                  }}
                                >
                                  <Box sx={{
                                    position: 'absolute' as 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    width: 400,
                                    bgcolor: 'background.paper',
                                    border: '2px solid black',
                                    boxShadow: 24,
                                    p: 4,
                                  }}>
                                    <Typography id="modal-modal-title" variant="h6" component="h2">
                                      Text in a modal
                                    </Typography>
                                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                      Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                                    </Typography>
                                  </Box>
                                </Modal>
                                {
                                    roles.map( (rol) => (
                                        (rol.id === champion.key) 
                                        ?
                                            <CardMedia
                                                component="img"
                                                image={rol.icon}
                                                alt="foto rol"
                                                sx={{ width: '50px', marginLeft: '5px'}}
                                                width={50}
                                                height={50}
                                            />
                                        :
                                            ''
                                    ))
                                }
                                {
                                    posiciones.map( (pos) => (
                                        (pos.id === champion.posId) 
                                        ?
                                            <CardMedia
                                                component="img"
                                                image={pos.icon}
                                                alt="foto rol"
                                                sx={{ width: '50px', marginLeft: '5px'}}
                                                width={50}
                                                height={50}
                                            />
                                        :
                                            ''
                                    ))
                                }                           
                                
                            </CardActions>
                        </Card>
                    </Grid>
                ))
            }
        </Grid>
    </>
  )
}