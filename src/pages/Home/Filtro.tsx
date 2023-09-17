import { Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { IRoles } from '../../firebase/config/interface/IRoles'
import { getRoles } from '../../firebase/FBroles';

export const Filtro = () => {

    const [roles, setRoles] = useState<IRoles[]>([]);

    useEffect(() => {
        getRoles()
        .then (res => {
        console.log(res)
        setRoles(res) 
        })
    }, [])

    console.log(roles)
    

  return (
    <>
        {
            roles.map( (rol) => (
                <Grid container>
                    <Grid item></Grid>
                    <Grid item></Grid>
                    <Grid item></Grid>
                    <Grid item></Grid>
                </Grid>
            ) )
            
        }
        
    </>
  )
}
