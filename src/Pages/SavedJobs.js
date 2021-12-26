import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import supabase from '../Services/Supabase'
import Box from '@mui/material/Box';
import VacancyCard from '../Components/VacancyCard'
import { toast } from 'react-toastify';
import Footer from '../Components/Footer';


const SavedJobs = () => {

    const [Loading, SetLoading] = useState(true)
    const [Vagas, SetVagas] = useState(null)

    const GetVagas = async () => {
        const session = JSON.parse(localStorage.getItem('supabase.auth.token'))
        const { data, error } = await supabase.from('saved_jobs').select('*').eq('user_id', session.currentSession.user.id)
        if (error) {
            toast(error.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            const vagas = data.map(vaga => vaga.job)
            if (vagas.length != 0) SetVagas(vagas)
        }

        SetLoading(false)
    }

    useEffect(() => {
        GetVagas()
    }, [])

    return (
        <>
            <Header />
            {Loading && <h1 style={{ textAlign: 'center' }}>Carregando ...</h1>}
            {(!Vagas && !Loading) && <h1 style={{ textAlign: 'center' }}>Nenhuma Vaga Foi Salva !</h1>}
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }} style={{ margin: '2%' }}>
                {Vagas && Vagas.map((vaga, index) => <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><VacancyCard vaga={vaga} /></div>)}
            </Box>
            <Footer />
        </>
    )
}

export default SavedJobs