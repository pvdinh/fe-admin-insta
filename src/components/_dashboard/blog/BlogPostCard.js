import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import { Link as RouterLink } from 'react-router-dom';
import shareFill from '@iconify/icons-eva/share-fill';
import messageCircleFill from '@iconify/icons-eva/message-circle-fill';
// material
import { alpha, styled } from '@mui/material/styles';
import { Box, Link, Card, Grid, Avatar, Typography, CardContent } from '@mui/material';
// utils
//
import LazyLoad from 'react-lazyload'
import ReactPlayer from "react-player";
import heartFill from "@iconify/icons-eva/heart-fill";
import bookmarkFill from "@iconify/icons-eva/bookmark-fill";
import Modal from "@mui/material/Modal";
import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import { fShortenNumber } from '../../../utils/formatNumber';
import { fDate } from '../../../utils/formatTime';
import SvgIconStyle from '../../SvgIconStyle';
import postActions from "../../../redux/actions/postActions";
import ModalDisplayListUser from "../../Modal/ModalDisplayListUser";
import ModalDisplayListUserCommented from "../../Modal/ModalDisplayListUserCommented";
import ModalUserAccountSetting from "../../feedback/ModalUserAccountSetting";
import ModalDetailPost from "../../report/ModalDetailPost";
import Page from "../../Page";

// ----------------------------------------------------------------------

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


// ----------------------------------------------------------------------
function BlogPostCard(props) {

    const [post, setPost] = useState({})
    const [userAccountSetting, setUserAccountSetting] = useState({})
    const [listComment, setListComment] = useState([])
    const [listUserSavedPost, setListUserSavedPost] = useState([])
    const [listUserLikedPost, setListUserLikedPost] = useState([])
    const [listUser,setListUser] = useState([])
    const [type,setType] = useState([])


    const [visibleModal,setVisibleModal] = useState(false)
    const [visibleModalComment,setVisibleModalComment] = useState(false)
    const [visibleModalUserAST,setVisibleModalUserAST] = useState(false)
    const [reload,setReload] = useState(false)
    const [pIdClick, setPIdClick] = useState("")
    const [visibleModalDetailPost, setVisibleModalDetailPost] = useState(false)

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
    }, [props.pId,reload])

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
                <ModalDisplayListUserCommented reload={()=>{setReload(!reload)}} list={listComment} visible={visibleModalComment} setVisible={()=>{setVisibleModalComment(false)}}  />
            )
        }
    }

    const showModalUserAST = () =>{
        if(visibleModalUserAST){
            return(
                <ModalUserAccountSetting uId={userAccountSetting.id} visible={visibleModalUserAST} setVisible={()=>{setVisibleModalUserAST(false)}} />
            )
        }
    }

    const showModalDetailPost = () =>{
        if(visibleModalDetailPost){
            return(
                <ModalDetailPost reload={()=>{setReload(!reload)}} pId={pIdClick} visible={visibleModalDetailPost} setVisible={()=>{setVisibleModalDetailPost(false)}} />
            )
        }
    }

    return (
    <Grid item xs={12} sm={6} md={3}>
      <Card>
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
                          <LazyLoad>
                              <AvatarStyle
                                  alt="img"
                                  src={userAccountSetting.profilePhoto}
                              />
                          </LazyLoad>
                          <LazyLoad>
                              <CoverImgStyle style={{cursor:"pointer"}} onClick={()=>{setPIdClick(props.pId);setVisibleModalDetailPost(true)}} alt='image' src={post.imagePath}/>
                          </LazyLoad>

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
                          <LazyLoad>
                              <AvatarStyle
                                  alt="img"
                                  src={userAccountSetting.profilePhoto}
                              />
                          </LazyLoad>
                          <ReactPlayer muted playing height="182px" width="700"
                                       controls url={post.videoPath}
                                       light={post.imagePath !== "" ? post.imagePath : ""}
                          />
                      </CardMediaVideoStyle>

              }


              <CardContent
              >
                  <TitleStyle
                      color="inherit"
                      variant="subtitle2"
                      underline="none"
                      style={{cursor:"pointer"}}
                      onClick={()=>{
                          setVisibleModalUserAST(true)
                      }}
                  >
                      {userAccountSetting.username}
                  </TitleStyle>

                  <TitleStyle
                      color="inherit"
                      variant="subtitle2"
                      underline="none"
                      style={{cursor:"pointer"}} onClick={()=>{setPIdClick(props.pId);setVisibleModalDetailPost(true)}}
                  >
                      {post.id !== undefined ? post.id : ""}
                  </TitleStyle>

                  <Typography
                      gutterBottom
                      variant="caption"
                      sx={{color: 'text.disabled', display: 'block'}}
                      style={{cursor:"pointer"}} onClick={()=>{setPIdClick(props.pId);setVisibleModalDetailPost(true)}}
                  >
                      {fDate(post.dateCreated !== undefined ? post.dateCreated : new Date().getTime())}
                  </Typography>

                  <TitleStyle
                      to="#"
                      color="inherit"
                      variant="subtitle2"
                      underline="hover"
                      component={RouterLink}
                      style={{cursor:"pointer"}} onClick={()=>{setPIdClick(props.pId);setVisibleModalDetailPost(true)}}
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
                          onClick={()=>{setVisibleModalComment(true)}}
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
        {
            showModal()
        }
        {
            showModalComment()
        }
        {
            showModalUserAST()
        }
        {
            showModalDetailPost()
        }
    </Grid>
  );
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

export default connect(mapStateToProps, mapDispatchToProps)(BlogPostCard)
