import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {connect} from "react-redux";
import postActions from "../../redux/actions/postActions";

function DialogUnBlockPost(props) {

    return (
        <div>
            <Dialog
                open={props.visible}
                onClose={() => {
                    props.setVisible()
                }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Unblock?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you want to unblock this post?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        props.unBlockPost(props.pId,(data)=>{
                            if(data.message === "success"){
                                props.setVisible()
                                alert("UnBlock success!")
                                props.reload()
                            }
                        })
                    }}>Confirm</Button>
                    <Button onClick={() => {
                        props.setVisible()
                    }} autoFocus>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

function mapStateToProps(state) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {
        unBlockPost: (pId, callback) => {
            dispatch(postActions.action.unBlockPost(pId, callback))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DialogUnBlockPost)