import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {connect} from "react-redux";
import postActions from "../../redux/actions/postActions";

function DialogBlockPost(props) {

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
                    Block?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you want to block this post?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        props.blockPost(props.pId,(data)=>{
                            if(data.message === "success"){
                                props.setVisible()
                                alert("Block success!")
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
        blockPost: (pId, callback) => {
            dispatch(postActions.action.blockPost(pId, callback))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DialogBlockPost)