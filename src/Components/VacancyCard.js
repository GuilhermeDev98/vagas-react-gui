import React, {useState} from 'react'
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

const VacancyCard = ({vaga}) => {

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const NewLine = (text) => {
        const newText = text.split('\n').map(str => <p>{str}</p>);
        return newText
    }

    return (
        <Card sx={{ maxWidth: 300 }} style={{margin: '2%'}}>
            <CardMedia
                component="img"
                height="140"
                image={ReactImage}
                alt="green iguana"
            />
            <CardContent>
                <Typography gutterBottom component="div" style={{textAlign: 'center'}}>
                    {vaga.title}
                </Typography>
            </CardContent>
            <CardActions style={{display: 'flex', justifyContent: 'space-evenly'}}>
                <div>
                    <Button size="small" onClick={handleOpen}>Mais Informações</Button>
                </div>
                <div>
                    <a  href={vaga.user.html_url} target="_blank" rel="noreferrer"><Avatar alt="Remy Sharp" src={vaga.user.avatar_url} sx={{ width: 30, height: 30 }} /></a>
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
                    <Button onClick={handleClose}>Fechar</Button>
                </DialogActions>
            </Dialog>

            
        </Card>
    )
}

export default VacancyCard