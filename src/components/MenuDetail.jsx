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
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';
import {handleDrawerToggle} from '../redux/reducers/MenuSlice'
import {useDispatch } from 'react-redux'

const MenuDetail = () => {
  const dispatch = useDispatch()

  const list = [
    {
      text: "Home",
      link: "/",
      icon: <HomeIcon/>
    },
    {
      text: "Employee Report",
      link: "employeeReport",
      icon: <AccessTimeIcon/>
    }
  ]

  const otherList = [
    {
      text: "Log Out",
      link: "logOut",
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
          <Link key={index} to={item.link} onClick={()=>dispatch(handleDrawerToggle())} style={{ textDecoration: 'none', color:'black' }} >
            <ListItem  disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        {otherList.map((item, index) => (
          <Link key={index} to={item.link} style={{ textDecoration: 'none', color:'black' }} >
            <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        </Link>
        ))}
      </List>
    </>
  )
}

export default MenuDetail