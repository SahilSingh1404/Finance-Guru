import React,{useEffect, useState} from 'react'
import Modal from 'react-bootstrap/Modal';
import axios from "axios" 
import './GroupCard.css'
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useTheme } from '@mui/material/styles';
import {Button as Buttonmui} from '@mui/material';


const backendURL="https://finance-trackernew.onrender.com"

const ITEM_HEIGHT = 48;

const GroupCard = ({key,setgroupData,groupData,allgroupsdata,setSelectedGroup, selectedGroup,thememode,toggle,user,setgroupflag}) => {
  const navigate = useNavigate()
  const theme = useTheme();
const [showDeleteModal,setShowDeleteModal] = useState(false);
const [checkedState, setCheckedState] = useState(
new Array(user.friends.length).fill(false)
);
const [anchorEl, setAnchorEl] = React.useState(null);
const open = Boolean(anchorEl);
const handleClick = (event) => {
  setAnchorEl(event.currentTarget);
};
const handleCloseDots = () => {
  setAnchorEl(null);
};

const handleOnChange = (position) => {
  const updatedCheckedState = checkedState.map((item, index) =>
    index === position ? !item : item
  );

  setCheckedState(updatedCheckedState);
 
}

const handleDelete = async()=>{
  try{
      await axios.delete(`${backendURL}/api/group/deleteGroup/${groupData._id}`)
      setgroupflag((prev)=>!(prev))
      setShowDeleteModal(false)
  }catch(err){
      console.log(err)
  }
}

const handleopendeletemodal=()=>{
  setShowDeleteModal(true)
}

const handleCloseDeleteModal=()=>{
  setShowDeleteModal(false)
}

console.log(allgroupsdata)
  return (

    <div className='flex justify-center items-center card-parent h-full p-1'>
      <Card sx={{ 
        minWidth: 275,
        backgroundColor: thememode === 'dark' ? theme.palette.grey[900] : theme.palette.background.paper,
        color:thememode==='dark'?"white":"black" }}>
      <CardContent>
        <div className='flex justify-between'>
        <Typography variant="h5" component="div" sx={{fontFamily:'poppins'}}>
          {groupData.title}
        </Typography>
        <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        sx={{
          color:thememode==='dark'?"white":"black"
        }}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseDots}
        
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
          sx: {
            backgroundColor: thememode === 'dark' ? theme.palette.grey[900] : theme.palette.background.paper,
            color: thememode === 'dark' ? 'white' : 'black',
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
          <MenuItem key="deletegroup" onClick={()=>{handleopendeletemodal();handleCloseDots();}}>
          Delete group
          </MenuItem>
    
      </Menu>
    </div>
    </div>
        <Typography variant="body2">
          {groupData.members.length} member{groupData.members.length>1 && "s"}
        </Typography>
      </CardContent>
      <CardActions>
      <Buttonmui 
        size="small"
        sx={{textDecoration:'underline'}}
        onClick={()=>navigate(`/simplifydebt/${groupData._id}`)}
        >Settle transactions⟶</Buttonmui>
      </CardActions>
    </Card>

      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal} centered>
              <Modal.Header closeButton>
                <Modal.Title>Confirm Deletion</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>Are you sure you want to delete this Group?</p>
              </Modal.Body>
              <Modal.Footer>
                <div className='flex w-full justify-end'>
                <button className="bg-[#000080] mx-2 text-white p-2 rounded-md" onClick={handleCloseDeleteModal}>
                  Cancel
                </button>
                <button  className="bg-[#dc2626] text-white p-2 rounded-md" onClick={handleDelete}>
                  Delete
                </button>
                </div>
              </Modal.Footer>
            </Modal>

  </div>
  )
}

export default GroupCard
