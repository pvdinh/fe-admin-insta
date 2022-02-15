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
import reportActions from "../../redux/actions/reportActions";

function DialogDeleteReport(props) {

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
                        Are you want to delete report?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        props.deleteReport(props.id, (data) => {
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
        deleteReport: (id, callback) => {
            dispatch(reportActions.action.deleteReport(id, callback))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DialogDeleteReport)