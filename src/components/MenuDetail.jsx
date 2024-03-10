import React from 'react'
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LogoutIcon from '@mui/icons-material/Logout';
import Typography from '@mui/material/Typography';
import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';
import {handleDrawerToggle} from '../redux/reducers/MenuSlice'
import {useDispatch } from 'react-redux'
import LinkApp from './LinkApp';
import useAuth from '../hooks/auth/useAuth';

const MenuDetail = () => {
  const dispatch = useDispatch()
  const {dropCookie} = useAuth();

  const logOut = () =>{
    closeMenu();
    dropCookie();
  }

  const closeMenu = () => {
    dispatch(handleDrawerToggle())
  }

  const list = [
    {
      text: "Home",
      link: "/",
      action: closeMenu,
      icon: <HomeIcon/>
    },
    {
      text: "Employee Report",
      link: "employeeReport",
      action: closeMenu,
      icon: <AccessTimeIcon/>
    },
    {
      text: "Configuration",
      link: "configuration",
      action: closeMenu,
      icon: <SettingsIcon/>
    }
  ]

  const otherList = [
    {
      text: "Log Out",
      link: "/login",
      action: logOut,
      icon: <LogoutIcon/>
    }
  ]




  return (
    <>
    <Toolbar>
      <Typography variant="h6" noWrap component="div">
              ICloud Network
      </Typography>
    </Toolbar>
      <Divider />
      <List>
        {list.map((item, index) => (
          <LinkApp key={index} to={item.link} onClick={()=>item.action()} color="black">
            <ListItem  disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          </LinkApp>
        ))}
      </List>
      <Divider />
      <List>
        {otherList.map((item, index) => (
          <LinkApp key={index} to={item.link} onClick={()=>item.action()} color="black">
            <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        </LinkApp>
        ))}
      </List>
    </>
  )
}

export default MenuDetail