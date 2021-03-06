import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import MuiAlert from "@mui/material/Alert";
import {connect} from "react-redux";
import feedbackActions from "../../redux/actions/feedbackActions";

function DialogDeleteFeedback(props) {

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
                        Are you want to delete feedback?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        props.deleteFeedback(props.id, (data) => {
                            if (data.message === "success") {
                                props.setVisible()
                                props.reload()
                                alert("delete success!")
                            } else {
                                alert("delete false!")
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
        deleteFeedback: (id, callback) => {
            dispatch(feedbackActions.action.deleteFeedback(id, callback))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DialogDeleteFeedback)