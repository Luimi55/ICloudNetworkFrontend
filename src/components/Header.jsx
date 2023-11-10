import React from 'react'
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {Constants} from '../assets/Constants';
import {handleDrawerToggle} from '../redux/reducers/MenuSlice'
import {useDispatch } from 'react-redux'

const Header = ({name, hideMenuIcon}) => {
    const drawerWidth = Constants.drawerWidth;
    const headerHeight = Constants.headerHeight;
    const dispatch = useDispatch()

  return (
    <>
      <AppBar
        position="fixed"
        //color="primary"
        sx={{
        }}
      >
        <Toolbar>
          {!hideMenuIcon&&<IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={()=>dispatch(handleDrawerToggle())}
            sx={{ mr: 2, }}
          >
            <MenuIcon />
          </IconButton>}
            <Typography variant="h6" noWrap component="div">
              {name}
            </Typography>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Header