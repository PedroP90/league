import React from 'react'
import { useEffect, useState } from 'react'
import { Card, CardActionArea, CardActions, CardContent, CardHeader, Divider, Grid } from '@mui/material';
import { IChampion } from '../../../firebase/config/interface/IChampions';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { getChampions } from '../../../firebase/FBChampions';
import { url } from 'inspector';
import Fondo from '../../../img/fondo.jpg'
import './homecard.css'
import { getRoles } from '../../../firebase/FBroles';
import { IRoles } from '../../../firebase/config/interface/IRoles';



export const Homecards = () => {


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
    
  return (
        <Grid container spacing={2} sx={{ 
            padding: '1rem',
            display: 'flex',
            justifyContent: 'center'
            }}>
            {   //.sort para ordenador por el campo que le diga
                champions.sort((a,b) => a.name.localeCompare(b.name)).map( (champion) => (
                    <Grid item  xs={10} sm={6} md={4} lg={3} sx={{borderColor: '1px'}}>
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
                                <Button variant='contained' size="small">
                                    Detalle
                                </Button>
                                {
                                    roles.map( (rol) => (
                                        (rol.id == champion.key) 
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
                                
                            </CardActions>
                        </Card>
                    </Grid>
                ))
            }
        </Grid>
  )
}