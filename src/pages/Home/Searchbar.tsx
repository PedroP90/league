import React, {useState, useEffect, ChangeEvent} from 'react'
import { getCategorias } from '../../firebase/FBcategoria';
import ICategoria from '../../firebase/config/interface/ICategoria';
import styled from '@emotion/styled';
import { Box, TextField } from '@mui/material';

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
  

export const Searchbar = () => {

    //setear los hooks useState
    const [ users, setUsers ] = useState([])
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
    //método de filtrado
    let results = []
    if(!search)
    {
        results = categorias
    }else{
        results = categorias.filter( (dato) => 
        dato.name.toLowerCase().includes(search.toLocaleLowerCase())
        )
    }
    //renderizamos la vista

    // useEffect(() => {
    //     console.log("hola mundo")
    //   }, [search])

  return (
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
  )
}
