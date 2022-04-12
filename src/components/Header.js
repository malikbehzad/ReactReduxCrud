import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import {FaUserGraduate} from 'react-icons/fa';
import {Link} from 'react-router-dom';
import './Header.scss'

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
          <div className='navbar'>
        <Toolbar>
            <div className='navbar-logo'>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <FaUserGraduate />
          </IconButton>
          <Typography variant="h6" component="div" >
           <Link to='/'> Students Data </Link>
          </Typography>
          </div>
          <div className='header'>
          <Button color="inherit"><Link to='/addStudent'>Add Student</Link></Button>
          
          </div>
        </Toolbar>
        </div>
      </AppBar>
    </Box>
  );
}
