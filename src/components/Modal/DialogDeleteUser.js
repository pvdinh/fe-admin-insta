import React from "react";
import {connect} from "react-redux";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import postActions from "../../redux/actions/postActions";
import userAccountActions from "../../redux/actions/userAccountActions";

function DialogDeleteUser(props) {
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
                    Delete?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you want to delete this user?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        props.deleteUser(props.idUser,(m)=>{
                            props.reload()
                            props.setVisible()
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
        deleteUser:(idUser,callback) =>{
            dispatch(userAccountActions.action.deleteUser(idUser,callback))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DialogDeleteUser)