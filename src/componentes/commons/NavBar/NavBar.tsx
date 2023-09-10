import { AppBar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Typography, createTheme, ThemeProvider } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import { routes } from '../route';
import { rutas } from '../route2';
import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../../../img/logo.png'
import './navbar.css'



export const NavBar = () => {

  
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
 


  return (
  

    <AppBar position="static" style={{
      background: 'linear-gradient(90deg, rgba(0,90,130,1) 0%, rgba(10,181,200,0.7105217086834734) 100%)',
      color: '#785A28',
      boxShadow: '0px 0px 0px 0px',
      padding: '0% 5%',
      borderRadius: '10px',
      height: '90%'
    }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
                component="img"
                sx={{
                height: 64,
                }}
                alt="Your logo."
                src={Logo}
              />
            
            <Typography
                variant="h2"
            // component="a"
            // href="/"
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'BeaufortforLOL-BoldItalic',
                  letterSpacing: '.3rem',
                  color: '#DAA520',
                  textDecoration: 'none',
                  paddingLeft: '10px',
                  width: '40%',
                  
            }}
            >
                Legends
            </Typography>
          <Box sx={{ 
            flexGrow: 1, display: { xs: 'flex', md: 'none' }}}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
              PaperProps={{
                sx: {
                  background: 'linear-gradient(90deg, rgba(0,90,130,1) 0%, rgba(10,181,200,0.7105217086834734) 100%)',
                },
              }}
            >
              {routes.map(({ name, path }) => (
                    <MenuItem key={path} onClick={handleCloseNavMenu} >
                      <NavLink to={path}>
                        <Typography textAlign="center" sx={{
                          color: '#DAA520',
                          fontFamily: 'BeaufortforLOL-BoldItalic',
                          fontSize: '18px',
                          }}
                        >
                          {name}
                        </Typography>
                      </NavLink>
                    </MenuItem>
                  ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: '#DAA520',
              textDecoration: 'none',
              fontFamily: 'BeaufortforLOL-BoldItalic',
              fontSize: '2em'
            }}
          >
            Legends
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {routes.map(({ name, path}) => (
                  <Button
                    key={path}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, display: 'block' }}
                  >
                    <NavLink  to={path} >
                      <Typography sx={{
                        color: '#DAA520',
                        fontFamily: 'BeaufortforLOL-BoldItalic',
                        fontSize: '150%'
                      }}>{name}</Typography>
                    </NavLink>
                  </Button>
            ))}
          </Box>
          {rutas.map(({ name, path}) => (
                  <Button
                    key={path}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, display: 'block' }}
                  >
                    <NavLink to={path} >
                      <Typography sx={{
                        color: 'white',
                        fontSize: '20px',
                        fontWeight: '900',
                        fontFamily: 'monospace',
                        letterSpacing: '.3em'
                      }}>{name}</Typography>
                    </NavLink>
                  </Button>
            ))}

        </Toolbar>
      </Container>
    </AppBar>
  );
}