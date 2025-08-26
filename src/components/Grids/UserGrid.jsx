import React, {useState} from 'react'
import {
  Button,
  Menu,
  MenuItem,
  TextField
} from '@mui/material';
import {
DataGrid,
GridActionsCellItem
} from '@mui/x-data-grid';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useNavigate } from "react-router-dom";


const UserGrid = ({users}) => {

    const [showMenu, setShowMenu] = useState(false)

    const [anchorEl, setAnchorEl] = useState(null);

    const [selectedEmail, setSelectedEmail] = useState("");

    const navigate = useNavigate();

    const col = [
      { field: 'firstName', headerName: 'First Name',  width: 300},
      { field: 'lastName', headerName: 'Last Name', width: 300},
      {
        field: 'actions',
        type: 'actions',
        headerName: 'Actions',
        width: 100,
        cellClassName: 'actions',
        getActions: ({ id }) => {
          return [
            <GridActionsCellItem
              icon={<MoreHorizIcon/>}
              label="Options"
              className="textPrimary"
              onClick={(event)=>handleAction(event, id)}
              color="inherit"
            />
          ];
        },
      },
    ];

    const handleAction=(event, id)=>{
      setSelectedEmail(id);
      setAnchorEl(event.currentTarget);
      setShowMenu(!showMenu)
    // console.log(id)
    }

    const handleClose = () => {
        setAnchorEl(null);
        setShowMenu(false)
    };

    const handleOrderOption = ()=>{
      navigate(`/orderReport/${selectedEmail}`)
      handleClose()
    }

    const handleExpenseOption = ()=>{
        handleClose()
    }


  return (
    <div
    >
        {/* <TextField/> */}
        <DataGrid
            getRowId={(row) => row.email}
            rows={users}
            columns={col}
            initialState={{
                pagination: {
                paginationModel: { page: 0, pageSize: 5 },
                },
            }}
            pageSizeOptions={[5, 10]}
        />
        <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={showMenu}
        onClose={handleClose}
        slotProps={{
            list: {
            'aria-labelledby': 'basic-button',
            },
        }}
        >
        <MenuItem onClick={handleOrderOption}>Orders</MenuItem>
        <MenuItem onClick={handleExpenseOption}>Expenses</MenuItem>
      </Menu>
    </div>
  )
}

export default UserGrid