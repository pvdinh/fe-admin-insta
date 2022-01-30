import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import {Avatar, Box, CardActionArea, Grid, Link} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import React, {useEffect, useState} from "react";
import {alpha, styled} from "@mui/material/styles";
import {Icon} from "@iconify/react";
import {Link as RouterLink} from "react-router-dom";
import messageCircleFill from "@iconify/icons-eva/message-circle-fill";
import bookmarkFill from '@iconify/icons-eva/bookmark-fill';
import ReactPlayer from "react-player";
import {connect} from "react-redux";
import heartFill from '@iconify/icons-eva/heart-fill';
import {fDate} from "../../utils/formatTime";
import SvgIconStyle from "../SvgIconStyle";
import {fShortenNumber} from "../../utils/formatNumber";
import postActions from "../../redux/actions/postActions";
import ModalDisplayListUser from "../Modal/ModalDisplayListUser";
import ModalDisplayListUserCommented from "../Modal/ModalDisplayListUserCommented";

const CardMediaStyle = styled('div')({
    position: 'relative',
    paddingTop: 'calc(100% * 3 / 4)'
});
const CardMediaVideoStyle = styled('div')({
    position: 'relative',
});

const TitleStyle = styled(Link)({
    height: 44,
    overflow: 'hidden',
    WebkitLineClamp: 2,
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical'
});

const AvatarStyle = styled(Avatar)(({theme}) => ({
    zIndex: 9,
    width: 32,
    height: 32,
    position: 'absolute',
    left: theme.spacing(3),
    bottom: theme.spacing(-2)
}));

const InfoStyle = styled('div')(({theme}) => ({
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    marginTop: theme.spacing(3),
    color: theme.palette.text.disabled
}));

const CoverImgStyle = styled('img')({
    top: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute'
});

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    border: '2px solid #000',
    boxShadow: 24,
    minWidth: 700,
};

function ModalDetailPost(props) {

    const [post, setPost] = useState({})
    const [userAccountSetting, setUserAccountSetting] = useState({})
    const [listComment, setListComment] = useState([])
    const [listUserSavedPost, setListUserSavedPost] = useState([])
    const [listUserLikedPost, setListUserLikedPost] = useState([])
    const [listUser,setListUser] = useState([])
    const [type,setType] = useState([])
    const [visibleModal,setVisibleModal] = useState(false)
    const [visibleModalComment,setVisibleModalComment] = useState(false)

    useEffect(() => {
        props.getPostInformationFromPId(props.pId, (data) => {
            setPost(data.post)
            setUserAccountSetting(data.userAccountSetting)
        })

        props.getAllCommentInPost(props.pId, (data) => {
            setListComment(data)
        })

        props.getAllUserSavedPost(props.pId, (data) => {
            setListUserSavedPost(data)
        })

        props.getAllUserLikedPost(props.pId, (data) => {
            setListUserLikedPost(data)
        })
    }, [props.pId])

    const showModal = () =>{
        if(visibleModal){
            return(
                <ModalDisplayListUser list={listUser} type={type} visible={visibleModal} setVisible={()=>{setVisibleModal(false)}}  />
            )
        }
    }


    const showModalComment = () =>{
        if(visibleModalComment){
            return(
                <ModalDisplayListUserCommented list={listUser} visible={visibleModalComment} setVisible={()=>{setVisibleModalComment(false)}}  />
            )
        }
    }

    return (
        <div>
            <Modal open={props.visible} onClose={() => {
                props.setVisible()
            }}>
                <Card sx={style}>
                    <Grid item xs={12}>
                        <Card sx={{position: 'relative'}}>

                            {
                                post.type === 'image' ?
                                    <CardMediaStyle
                                    >
                                        <SvgIconStyle
                                            color="paper"
                                            src="/static/icons/shape-avatar.svg"
                                            sx={{
                                                width: 80,
                                                height: 36,
                                                zIndex: 9,
                                                bottom: -15,
                                                position: 'absolute',
                                            }}
                                        />
                                        <AvatarStyle
                                            alt="img"
                                            src={userAccountSetting.profilePhoto}
                                        />
                                        <CoverImgStyle alt='image' src={post.imagePath}/>


                                    </CardMediaStyle>
                                    :
                                    <CardMediaVideoStyle
                                    >
                                        <SvgIconStyle
                                            color="paper"
                                            src="/static/icons/shape-avatar.svg"
                                            sx={{
                                                width: 80,
                                                height: 36,
                                                zIndex: 9,
                                                bottom: -15,
                                                position: 'absolute',
                                            }}
                                        />
                                        <AvatarStyle
                                            alt="img"
                                            src={userAccountSetting.profilePhoto}
                                        />
                                        <ReactPlayer muted playing height="450px" width="700"
                                                     controls url={post.videoPath}
                                                     light={post.imagePath !== "" ? post.imagePath : ""}
                                        />
                                    </CardMediaVideoStyle>

                            }


                            <CardContent
                            >
                                <TitleStyle
                                    to="#"
                                    color="inherit"
                                    variant="subtitle2"
                                    underline="hover"
                                    component={RouterLink}
                                >
                                    {userAccountSetting.username}
                                </TitleStyle>

                                <Typography
                                    gutterBottom
                                    variant="caption"
                                    sx={{color: 'text.disabled', display: 'block'}}
                                >
                                    {fDate(post.dateCreated !== undefined ? post.dateCreated : new Date().getTime())}
                                </Typography>

                                <TitleStyle
                                    to="#"
                                    color="inherit"
                                    variant="subtitle2"
                                    underline="hover"
                                    component={RouterLink}
                                >
                                    {post.caption}
                                </TitleStyle>

                                <InfoStyle>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            ml: 0,
                                        }}
                                        style={{cursor: "pointer"}}
                                        onClick={()=>{setListUser(listUserLikedPost);setType(1);setVisibleModal(true)}}
                                    >
                                        <Box component={Icon} icon={heartFill} sx={{width: 16, height: 16, mr: 0.5}}/>
                                        <Typography variant="caption">{fShortenNumber(listUserLikedPost.length)}</Typography>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            ml: 1.5,
                                        }}
                                        style={{cursor: "pointer"}}
                                        onClick={()=>{setListUser(listComment);setVisibleModalComment(true)}}
                                    >
                                        <Box component={Icon} icon={messageCircleFill}
                                             sx={{width: 16, height: 16, mr: 0.5}}/>
                                        <Typography
                                            variant="caption">{fShortenNumber(listComment.length)}</Typography>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            ml: 1.5,
                                        }}
                                        style={{cursor: "pointer"}}
                                        onClick={()=>{setListUser(listUserSavedPost);setType(3);setVisibleModal(true)}}
                                    >
                                        <Box component={Icon} icon={bookmarkFill}
                                             sx={{width: 16, height: 16, mr: 0.5}}/>
                                        <Typography variant="caption">{fShortenNumber(listUserSavedPost.length)}</Typography>
                                    </Box>
                                </InfoStyle>
                            </CardContent>
                        </Card>
                    </Grid>
                </Card>
            </Modal>
            {
                showModal()
            }
            {
                showModalComment()
            }
        </div>
    )
}

function mapStateToProps(state) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {
        getPostInformationFromPId: (pId, callback) => {
            dispatch(postActions.action.getPostInformationFromPId(pId, callback))
        },
        getAllCommentInPost: (pId, callback) => {
            dispatch(postActions.action.getAllCommentInPost(pId, callback))
        },
        getAllUserSavedPost: (pId, callback) => {
            dispatch(postActions.action.getAllUserSavedPost(pId, callback))
        },
        getAllUserLikedPost: (pId, callback) => {
            dispatch(postActions.action.getAllUserLikedPost(pId, callback))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalDetailPost)