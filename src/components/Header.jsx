import React from "react";
import SvgAni from "./SvgAni";
import Typography from '@mui/material/Typography';

const Header = () =>{
    return(
        <div style={{ display: 'flex', alignItems: 'center', padding:'10px' }}>
            <SvgAni />
            <Typography variant="h4" style={{marginLeft:'10px', fontFamily:'Trebuchet MS', fontWeight:'bold'}}>
                React Test - Return of the API :) </Typography>  
        </div>
    );
}

export default Header;