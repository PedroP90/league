import { Button, Card, CardActions, CardContent, CardHeader, Grid, TextField, Typography, styled } from '@mui/material'
import React, {useEffect, useState} from 'react'
import { addCategoria, getCategorias } from '../../../firebase/FBcategoria';
import ICategoria from '../../../firebase/config/interface/ICategoria';
// import { useForm } from 'react-hook-form';

const CssTextField = styled(TextField)({
  //cambia el foco, es decir el nombre que sale arriba al pinchar
  '& label.Mui-focused': {
    color: '#2F88FF',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'green',
  },
  '& .MuiOutlinedInput-root': {
      //cambia el borde permanente
    '& fieldset': {
      borderColor: 'white',
    },
    '&:hover fieldset': {
      //cambia el borde al pasar el ratón
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

export const Linkoform = () => {

       //variable de estado, primero el nombre de la variable seguido de un setNombredelavariable
       const [categorias, setCategorias] = useState<ICategoria[]>([]);
       // getCategorias()
       //   .then(res => {
       //     console.log (...res)
       //     setCategorias([...res])
       //   })
         
       //getCategorias()
       //El useEffect hace que hasta que no lleguen los datos de las categorías no manda el return, el "html"
         useEffect(() => {
           getCategorias()
           .then (res => {
             console.log(res)
             setCategorias(res) //desde aquí categorias= res, cuando nos llegan los datos los metemos a res que van a categorias y se pintan en el return
           })
         }, [])
     
       //register: para introducir los nuevos valores, handleSubmit: manejador de los datos enviados, watch: observar los formularios,formState: comprueba errores
        //  const { register, handleSubmit} = useForm<ICategoria>();
     
       //dataCategoria aquí puede llevar el nombre que queramos, hace referencia a los datos de la coleccion
         const onAddCategoria = async ( dataCategoria:ICategoria) => {
         //console.log('Enviando...')
         //console.log(dataCategoria)
           addCategoria(dataCategoria)
         }

  return (
    <>
        <Grid container sx={{ padding: '10px', width: '100%', display: 'flex', justifyContent: 'center'}}>
            <Grid item xs={5.8} sx={{ padding: '10px', width: '100%', display: 'flex', justifyContent: 'center'}}>
                <Card sx={{ bgcolor: '#005A82'}}>
            {/* onAddCategoria es una función nuestra, generalmente las funciones que empiezan por on son manejadores de eventos */}
            {/* Es necesario añadir en el formulario el onSubmit con nuestra funcion para mandar los datos */}
                <form >
                    <CardHeader title="Zona de Acceso" titleTypographyProps={{ variant: "h4", align: 'center', fontFamily: 'BeaufortforLOL-BoldItalic',color: '#C89B3C'}}
                           sx={{ textAlign: 'center', justifyItems: ''}}/>
                        
                        <CardContent sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        {/* <Typography variant="h4" sx={{ fontFamily: 'BeaufortforLOL-BoldItalic',color: '#C89B3C'}}>Zona de acceso</Typography> */}
                        <CssTextField
                        //   { ...register('name')}
                            label="Email"
                            type="texto"
                            InputLabelProps={{
                                style:{
                                    color:'white'
                                }
                            }}
                        />
                        <CssTextField            
                //   { ...register('logo')}
                            label="Contraseña"
                            type="string"
                            InputLabelProps={{
                                style:{
                                    color:'white'
                                }
                            }}
                        />
                
                        </CardContent>
                        <CardActions>
                            <Button type='submit' color='error' variant='contained'>Add User</Button>
                            <Button id="Login" color='success' variant='contained'>Iniciar Sesión</Button>
                        </CardActions>
                </form>
                </Card>
            </Grid>
        </Grid>
    </>
  )
}
