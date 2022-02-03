import {Icon} from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import {Link as RouterLink} from 'react-router-dom';
// material
import {Grid, Button, Container, Stack, Typography, MenuItem, TextField} from '@mui/material';
// components
import InfiniteScroll from "react-infinite-scroll-component";
import {connect} from "react-redux";
import {useEffect, useState} from "react";
import Page from '../components/Page';
import {BlogPostCard, BlogPostsSort, BlogPostsSearch} from '../components/_dashboard/blog';
//
import POSTS from '../_mocks_/blog';
import postActions from "../redux/actions/postActions";
import {axiosJwt} from "../axios/axiosConfig";
import {BASE_URL} from "../url";

// ----------------------------------------------------------------------
// ----------------------------------------------------------------------

function Blog(props) {

    const [page, setPage] = useState(0)
    const [size, setSize] = useState(12)
    const [filter, setFilter] = useState(3)
    const [search, setSearch] = useState("")


    useEffect(() => {
        axiosJwt.get(`${BASE_URL}/api/v1/user-account-setting/get`).then((res) => {
            props.getAllPost({filter, page, size}, () => {
            })
        }).catch((err) => {
            console.log('err', err)
        })
    }, [])

    useEffect(()=>{
        console.log(filter)
        console.log(page)
        console.log(size)
        props.getAllPost({filter, page, size}, () => {
        })
    },[filter])

    return (
        <Page title="Dashboard: Blog | Minimal-UI">
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Post
                    </Typography>
                </Stack>

                <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
                    <BlogPostsSearch setSearch={(s)=> {
                        setSearch(s)
                    }}/>
                    <TextField select size="small" value={filter} onChange={(e) => {
                        setFilter(e.target.value)
                        setPage(0)
                    }}>
                        {/* <MenuItem key="1" value={1}> */}
                        {/*    Oldest */}
                        {/* </MenuItem> */}
                        {/* <MenuItem key="2" value={2}> */}
                        {/*    Latest */}
                        {/* </MenuItem> */}
                         <MenuItem key="3" value={3}>
                            Popular
                         </MenuItem>
                    </TextField>
                </Stack>

                <InfiniteScroll
                    dataLength={10}
                    next={() => {
                        console.log(filter)
                        console.log(page)
                        console.log(size)
                        setPage(page + 1)
                        props.fetchMorePost({filter, page: page + 1, size}, () => {
                        })
                    }}
                    hasMore
                >
                    <Grid container spacing={3}>
                        {
                            search.split(" ").join("") !== "" ?

                                props.listResultSearchPost.map((post, index) => (
                                    <BlogPostCard key={post.id} pId={post.id}/>
                                ))

                                :

                                props.listPost.map((post, index) => (
                                    <BlogPostCard key={post.id} pId={post.id}/>
                                ))
                        }
                    </Grid>
                </InfiniteScroll>
            </Container>
        </Page>
    );
}

function mapStateToProps(state) {
    return {
        listPost: state.post.listPost,
        listResultSearchPost: state.post.listResultSearchPost,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAllPost: (payload, callback) => {
            dispatch(postActions.action.getAllPost(payload, callback))
        },
        fetchMorePost: (payload, callback) => {
            dispatch(postActions.action.fetchMorePost(payload, callback))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Blog)
