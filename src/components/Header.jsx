import React, {useState, useEffect} from 'react'
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {Constants} from '../assets/Constants';
import {handleDrawerToggle} from '../redux/reducers/MenuSlice'
import {useSelector, useDispatch } from 'react-redux'
import HeaderStyles from '../styles/Header.module.css'
import {
  Stack,
} from '@mui/material';
import Cookies from 'js-cookie';


const Header = ({name, hideMenuIcon}) => {
    const drawerWidth = Constants.drawerWidth;
    const headerHeight = Constants.headerHeight;
    const COOKIE = import.meta.env.VITE_SECRET_COOKIE
    const dispatch = useDispatch()
    const [user, setUser] = useState({})

  useEffect(()=>{
    const userLocalStorage = localStorage.getItem(import.meta.env.VITE_USER_INFO)
    const userData = JSON.parse( userLocalStorage )
    setUser(userData)
  },[])

  return (
    <>
      <AppBar
        position="fixed"
        //color="primary"
        sx={{
          flexDirection:'row',
          alignItems:'center',
          justifyContent: 'space-between'
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
          
          


            <Typography variant="h6" component="div" sx={{justifyContent:'space-between'}} alignItems={'flex-end'}>
              {name}
              
            </Typography>

        </Toolbar>
        <Toolbar>
          Welcome {user.firstName} {user.lastName}!
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Header