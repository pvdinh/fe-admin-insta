import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import {useEffect, useState} from "react";
import ModalUserAccountSetting from "../feedback/ModalUserAccountSetting";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: '16px'
};

export default function ModalDisplayListUser(props) {

    const [visible,setVisible] = useState(false)
    const [uIdClick,setUIdClick] = useState("")


    useEffect(()=>{
        console.log(props)
    })

    const handleClose = () => {
        props.setVisible()
    }

    const showModalUserAccountSetting = () =>{
        if(uIdClick !== ""){
            return(
                <ModalUserAccountSetting uId={uIdClick} visible={visible} setVisible={()=>{setVisible(false)}} />
            )
        }
    }

    return (
        <div>
            <Modal
                open={props.visible}
                onClose={() => {
                    handleClose()
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {
                            // eslint-disable-next-line no-nested-ternary
                            props.type === 1 ?
                                'List user liked'
                                :
                                'List user saved'

                        }
                    </Typography>
                    <Typography id="modal-modal-description" sx={{mt: 2}}>
                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                            {
                                props.list.map((value,index)=>(
                                    <div>
                                        <ListItem alignItems="flex-start" style={{cursor:"pointer"}} onClick={()=>{setUIdClick(value.id);setVisible(true)}}>
                                            <ListItemAvatar>
                                                <Avatar alt="image" src={value.profilePhoto} />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={value.username}
                                                secondary={
                                                    <>
                                                        <Typography
                                                            sx={{ display: 'inline' }}
                                                            component="span"
                                                            variant="body2"
                                                            color="text.primary"
                                                        >
                                                            {value.displayName}
                                                        </Typography>
                                                    </>
                                                }
                                            />
                                        </ListItem>
                                        <Divider variant="inset" component="li" />
                                    </div>
                                ))
                            }
                        </List>
                    </Typography>
                </Box>
            </Modal>
            {
                showModalUserAccountSetting()
            }
        </div>
    );
}