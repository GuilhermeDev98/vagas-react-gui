import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

const Footer = () => {

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography component="div" sx={{ flexGrow: 1}}>
            Desenvolvido com ❤️ por <a href='https://github.com/GuilhermeDev98' target="_blank" rel="noreferrer" style={{color: 'white', textDecoration: 'none'}}>Guilherme Santos</a>
          </Typography>
            <div>
              <a href="https://github.com/GuilhermeDev98" target="_blank" rel="noreferrer" style={{color: 'white', textDecoration: 'none'}}>
                <IconButton
                  color="inherit"
                >
                  <GitHubIcon />
                </IconButton>
              </a>
              <a href="https://www.linkedin.com/in/guilhermesantos98/" target="_blank" rel="noreferrer" style={{color: 'white', textDecoration: 'none'}}>
                <IconButton
                  color="inherit"
                >
                  <LinkedInIcon />
                </IconButton>
              </a>
            </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Footer