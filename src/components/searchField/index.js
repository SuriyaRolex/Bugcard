import React from 'react'
import { TextField, InputAdornment, Box,IconButton } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { makeStyles } from "@mui/styles";

const styles = makeStyles((theme) => ({
    searchbox: {
        display: 'flex',
        alignItems: 'center',
        background: "#fdfdfd",
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
        borderRadius: "25px",
        width:"100%",
        maxWidth:"210px",
        "& .MuiOutlinedInput-input":{
            padding:"0px 4px",
            "& input.MuiOutlinedInput-input": {
                padding: "8px 0px",
               
            },
                        },
        
        [theme.breakpoints.down('sm')]: {
            margin:"7px auto",
        }
    },
    noBorder:{
        border: "none",
    }
   
}));

const SearchField = ({searchprojects = "",onSearch=()=>{}, search=""}) => {

    const classes = styles();

    return (
        <Box className={classes.searchbox}>

            {/* Searchfield */}
            
            <TextField placeholder='search projects'  variant='outlined' onChange={e=>onSearch(e.target.value)} value={search} InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <IconButton>
                             <SearchOutlinedIcon sx={{cursor:"pointer"}} />
                        </IconButton>
                    </InputAdornment>
                ),
                classes:{notchedOutline:classes.noBorder}
            }} />
        </Box>
    )
}

export default SearchField