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
import {Icon} from "@iconify/react";
import trash2Outline from "@iconify/icons-eva/trash-2-outline";
import {ListItemIcon} from "@mui/material";
import ModalUserAccountSetting from "../feedback/ModalUserAccountSetting";
import DialogDeleteComment from "./DialogDeleteComment";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 600,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
    overflow: 'auto'
};

export default function ModalDisplayListUserCommented(props) {

    const [visible,setVisible] = useState(false)
    const [uIdClick,setUIdClick] = useState("")
    const [visibleDialogDeleteComment,setVisibleDialogDeleteComment] = useState(false)
    const [commentDelete,setCommentDelete] = useState({})


    useEffect(()=>{

    },props.list)

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

    const showDialogDeleteComment = () =>{
        if(visibleDialogDeleteComment){
            return(
                <DialogDeleteComment reload={()=>{props.reload()}} comment={commentDelete} visible={visibleDialogDeleteComment} setVisible={()=>{setVisibleDialogDeleteComment(false)}} />
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
                        List user Commented
                    </Typography>
                    <Typography id="modal-modal-description" sx={{mt: 2}}>
                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                            {
                                props.list.map((value,index)=>(
                                    <div>
                                        <ListItem alignItems="flex-start" style={{cursor:"pointer"}} >
                                            <ListItemAvatar onClick={()=>{setUIdClick(value.userAccountSetting.id);setVisible(true)}}>
                                                <Avatar alt="image" src={value.userAccountSetting.profilePhoto} />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={value.userAccountSetting.username}
                                                secondary={
                                                    <>
                                                        <Typography
                                                            sx={{ display: 'inline' }}
                                                            component="span"
                                                            variant="body2"
                                                            color="text.primary"
                                                        >
                                                            {value.comment.content}
                                                        </Typography>
                                                    </>
                                                }
                                            />
                                            <ListItemIcon>
                                                <Icon icon={trash2Outline} width={24} height={24} onClick={()=>{setCommentDelete(value.comment);setVisibleDialogDeleteComment(true)}} />
                                            </ListItemIcon>
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
            {
                showDialogDeleteComment()
            }
        </div>
    );
}