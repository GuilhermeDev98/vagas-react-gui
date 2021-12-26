import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import ReactIcon from '../Assets/Images/atom.png'
import { useForm } from "react-hook-form";
import supabase from '../Services/Supabase';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom'


export default function Header() {

  const [user, setUser] = useState({})
  const [auth, setAuth] = useState(false);

  const [open, setOpen] = useState(false);
  const [modalLoginOpen, setModalLoginOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseModalLogin = () => {
    setModalLoginOpen(false)
  }

  const handleMenu = (event) => {
    console.log(event)
    setAnchorEl(event.currentTarget);
  };

  const handleLoginUser = async data => {
    const { email, password } = data

    const { user, session, error } = await supabase.auth.signIn({
      email,
      password,
    })

    if (user) {
      handleCloseModalLogin()
      toast(`${user.user_metadata.name.split(" ")[0]} seja Bem Vindx !`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    if (session) {
      setAuth(true)
    }
  }

  const handleRegisterUser = async (data) => {
    const { email, password, name } = data

    const { user, session, error } = await supabase.auth.signUp(
      {
        email,
        password
      },
      {
        data: {
          name
        }
      }
    )


    if (error) {
      console.log(error)
      if (error.message === "User already registered") {
        toast("E-Mail Já Cadastrado !", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        handleClose()
        setModalLoginOpen(true)
      } else {
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
    }

    if (session) {
      handleClose()
    }

    if (user) {
      handleClose()
      setAuth(true)
      toast(`${user.user_metadata.name.split(" ")[0]} seja Bem Vindx !`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut()

    if(error){
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

    setAuth(false)
  }

  useEffect(() => {
    const session = localStorage.getItem('supabase.auth.token')
    if(session){
      setAuth(true)
    }
  }, [])

  return (
    <>
      <Box sx={{ flexGrow: 1 }}  style={{marginBottom: '12vh'}}>
        <AppBar position="fixed">
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
            >
              <Link to="/"><img src={ReactIcon} alt="React Icon" style={{ width: '32px', height: '32px' }} /></Link>
            </Typography>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link to="/" style={{color: "white", textDecoration: 'none'}}>React Vagas</Link>
            </Typography>
            {!auth &&
              <>
                <Button color="inherit" onClick={() => setModalLoginOpen(true)}>Login</Button>
                <Button color="secondary" variant="contained" onClick={handleClickOpen}>Cadastro</Button>
              </>
            }
            {auth && (
              <>
                <Link to="/vagas-salvas" style={{color: "white", textDecoration: 'none'}}><Button color="inherit" >Vagas Salvas</Button></Link>
                <Button color="inherit" onClick={() => setModalLoginOpen(true)}>Perfil</Button>
                <Button color="inherit" onClick={handleSignOut}>Sair</Button>
              </>
            )}
          </Toolbar>
        </AppBar>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ textAlign: 'center', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
          <div>
            <img src={ReactIcon} alt="React Icon" style={{ width: '100px', height: '100px' }} />
          </div>
          <div>Cadastre-se,<br /> Para Ter Acesso A Todas As Funcionalidades!</div>

        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="name"
            label="Nome Completo"
            type="text"
            fullWidth
            variant="standard"
            {...register("name")}
          />
          <TextField
            autoFocus
            margin="dense"
            id="email"
            name="email"
            label="Email"
            type="email"
            fullWidth
            variant="standard"
            {...register("email", { required: true })}
          />
          <TextField
            autoFocus
            margin="dense"
            id="password"
            name="password"
            label="Senha"
            type="password"
            fullWidth
            variant="standard"
            {...register("password", { required: true })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSubmit(handleRegisterUser)}>Cadastrar-se</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={modalLoginOpen} onClose={handleCloseModalLogin}>
        <DialogTitle sx={{ textAlign: 'center', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
          <div>
            <img src={ReactIcon} alt="React Icon" style={{ width: '100px', height: '100px' }} />
          </div>
          <div>Login,<br /> Para Ter Acesso A Todas As Funcionalidades!</div>

        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            name="email"
            label="Email"
            type="email"
            fullWidth
            variant="standard"
            {...register("email", { required: true })}
          />
          <TextField
            autoFocus
            margin="dense"
            id="password"
            name="password"
            label="Senha"
            type="password"
            fullWidth
            variant="standard"
            {...register("password", { required: true })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModalLogin}>Cancelar</Button>
          <Button onClick={handleSubmit(handleLoginUser)}>Logar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}