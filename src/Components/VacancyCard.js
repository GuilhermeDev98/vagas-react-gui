import React, { useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import ReactImage from '../Assets/Images/atom.png'

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import PushPinIcon from '@mui/icons-material/PushPin'
import supabase from '../Services/Supabase';
import { toast } from 'react-toastify';


const VacancyCard = ({ vaga }) => {

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const NewLine = (text) => {
        const newText = text.split('\n').map(str => <p>{str}</p>);
        return newText
    }

    const HandleSaveJob = async () => {
        const session = JSON.parse(localStorage.getItem('supabase.auth.token'))

        const {data} = await supabase.from('saved_jobs').select('*').match({ 'user_id': session.currentSession.user.id, 'job_id': vaga.number })

        if (data.length > 0) {
            toast('Vaga Já foi Salva Anteriormente !', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            const { data, error } = await supabase.from('saved_jobs').insert({
                job: vaga,
                user_id: session.currentSession.user.id,
                job_id: vaga.number
            })

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
            }

            if (data) {
                toast('Vaga Salva Com Sucesso !', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        }

    }

    return (
        <Card sx={{ maxWidth: 300 }} style={{ margin: '2%' }}>
            <CardMedia
                component="img"
                height="140"
                image={ReactImage}
                alt="green iguana"
            />
            <CardContent>
                <Typography gutterBottom component="div" style={{ textAlign: 'center' }}>
                    {vaga.title}
                </Typography>
            </CardContent>
            <CardActions style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <div>
                    <Button size="small" onClick={handleOpen}>Mais Informações</Button>
                </div>
                <div>
                    <a href={vaga.user.html_url} target="_blank" rel="noreferrer"><Avatar alt="user icon" src={vaga.user.avatar_url} sx={{ width: 30, height: 30 }} /></a>
                </div>
            </CardActions>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll="paper"
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">{vaga.title}</DialogTitle>
                <DialogContent dividers={true}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        tabIndex={-1}
                    >
                        {NewLine(vaga.body)}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={HandleSaveJob}><PushPinIcon /> Salvar</Button>
                    <Button onClick={handleClose}>Fechar</Button>
                </DialogActions>
            </Dialog>


        </Card>
    )
}

export default VacancyCard