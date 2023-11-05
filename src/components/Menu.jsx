import * as React from 'react';
// import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MenuDetail from './MenuDetail';
import {Constants} from '../assets/Constants';
import { useSelector, useDispatch } from 'react-redux'
import {handleDrawerToggle} from '../redux/reducers/MenuSlice'


const Menu = (props) =>  {
  const drawerWidth = Constants.drawerWidth;
  const { window } = props;
  const mobileOpen = useSelector((state) => state.Menu.mobileOpen);
  const dispatch = useDispatch();
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div sx={{ display: 'flex' }}>
      {/* <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      > */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={()=>dispatch(handleDrawerToggle())}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          <MenuDetail/>
        </Drawer>
      {/* </Box> */}
    </div>
  );
}

export default Menu;