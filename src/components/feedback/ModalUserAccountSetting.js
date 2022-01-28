import React, {useEffect, useState} from "react";
import Modal from "@mui/material/Modal";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {CardActionArea} from '@mui/material';
import Box from "@mui/material/Box";
import {connect} from "react-redux";
import feedbackActions from "../../redux/actions/feedbackActions";
import userAccountActions from "../../redux/actions/userAccountActions";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    border: '2px solid #000',
    boxShadow: 24,
    minWidth: 500,
};

function ModalUserAccountSetting(props) {
    const [userAccountSetting, setUserAccountSetting] = useState({})

    useEffect(() => {
        props.getUserAccountSettingById(props.uId, (data) => {
            setUserAccountSetting(data)
        })
    }, [props.uId])

    return (
        <div>
            <Modal open={props.visible} onClose={() => {
                props.setVisible()
            }}>
                <Card sx={style}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="300"
                            image={userAccountSetting.profilePhoto}
                            alt="img"
                        />
                        <CardContent>
                            <Typography variant="body1" gutterBottom style={{marginBottom:"20px"}}>
                                Id: {userAccountSetting.id}
                            </Typography>
                            <Typography variant="body1" gutterBottom style={{marginBottom:"20px"}}>
                                Username: {userAccountSetting.username}
                            </Typography>
                            <Typography variant="body1" gutterBottom style={{marginBottom:"20px"}}>
                                Display name: {userAccountSetting.displayName}
                            </Typography>
                            <Typography variant="body1" gutterBottom style={{marginBottom:"20px"}}>
                                Description: {userAccountSetting.description}
                            </Typography>
                            <Typography variant="body1" gutterBottom style={{marginBottom:"20px"}}>
                                Website: {userAccountSetting.website}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                Posts: {userAccountSetting.posts} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; followers: {userAccountSetting.followers} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; following: {userAccountSetting.following}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Modal>
        </div>
    )
}

function mapStateToProps(state) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {
        getUserAccountSettingById: (uId, callback) => {
            dispatch(userAccountActions.action.getUserAccountSettingById(uId, callback))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalUserAccountSetting)