import React, {useState, useEffect} from 'react'
import Box from '@mui/material/Box';
import VacancyCard from './VacancyCard';
import axios from 'axios';
import Grid from '@mui/material/Grid'

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
            <Grid style={{textAlign: 'center'}}>
            </Grid>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }} style={{margin: '2%'}}>
                { Vagas && Vagas.map((vaga, index) => <div key={index} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}><VacancyCard vaga={vaga}/></div>)}
            </Box>
        </>
    )
}

export default Main