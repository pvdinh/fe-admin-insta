import PropTypes from 'prop-types';
import {Icon} from '@iconify/react';
import searchFill from '@iconify/icons-eva/search-fill';
// material
import {styled} from '@mui/material/styles';
import {Box, TextField, Autocomplete, InputAdornment, Toolbar, OutlinedInput} from '@mui/material';
import {connect} from "react-redux";
import {useState} from "react";
import postActions from "../../../redux/actions/postActions";

// ----------------------------------------------------------------------


const RootStyle = styled(Toolbar)(({theme}) => ({
    height: 96,
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 1, 0, 3)
}));

const SearchStyle = styled(OutlinedInput)(({theme}) => ({
    width: 310,
    transition: theme.transitions.create(['box-shadow', 'width'], {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.shorter
    }),
    '&.Mui-focused': {width: 320, boxShadow: theme.customShadows.z8},
    '& fieldset': {
        borderWidth: `1px !important`,
        borderColor: `${theme.palette.grey[500_32]} !important`
    }
}));
// ----------------------------------------------------------------------

BlogPostsSearch.propTypes = {
    posts: PropTypes.array.isRequired
};

function BlogPostsSearch(props) {

    const [page, setPage] = useState(0);
    const [size, setSize] = useState(2147483647);
    const [search, setSearch] = useState("")

    const onChangeSearch = (e) =>{
        if(e.target.value.split(" ").join("") === ""){
            props.setSearch(e.target.value)
        }else {
            props.searchPost({search:e.target.value,page,size},()=>{})
            props.setSearch(e.target.value)
        }
        setSearch(e.target.value)
    }

    return (
        <RootStyle>
            <SearchStyle
                value={search}
                onChange={(e) => {
                    onChangeSearch(e)
                }}
                onInput={(e) => {
                    onChangeSearch(e)
                }}
                placeholder="Search post by id post or id user..."
                startAdornment={
                    <InputAdornment position="start">
                        <Box component={Icon} icon={searchFill} sx={{color: 'text.disabled'}}/>
                    </InputAdornment>
                }
            />
        </RootStyle>
    );
}

function mapStateToProps(state) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {
        searchPost:(payload,callback)=>{
          dispatch(postActions.action.searchPost(payload,callback))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogPostsSearch)
