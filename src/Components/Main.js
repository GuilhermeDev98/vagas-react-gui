import React, {useState, useEffect} from 'react'
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import SearchIcon from '@mui/icons-material/Search';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import VacancyCard from './VacancyCard';
import axios from 'axios';



const Main = () => {

    const [Vagas, SetVagas] = useState([])

    const GetVagas = async () => {
        const {data} = await axios.get('https://api.github.com/repos/react-brasil/vagas/issues')
        SetVagas(data)
    }

    useEffect(() => {
        GetVagas()
    }, [])

    return (
        <>
            <Grid style={{textAlign: 'center', marginTop: '6%'}}>
            </Grid>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }} style={{margin: '2%'}}>
                { Vagas && Vagas.map(vaga => <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}><VacancyCard vaga={vaga}/></div>)}
            </Box>
        </>
    )
}

export default Main