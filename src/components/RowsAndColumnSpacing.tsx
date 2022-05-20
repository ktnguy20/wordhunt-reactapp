import * as React from 'react';
// import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import aTile from '../assets/LetterTiles/Atile.png';
import './unselectable.css';


// const Item = styled(Paper)(({ theme }) => ({
//     // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//     ...theme.typography.body2,
//     color: theme.palette.text.secondary,
//   }));

const tileStyle = {
    width : "100%",
    // height: "100%",
    display:'block'
};

export default function RowAndColumnSpacing() {
  
    const elems = Array.apply(null, Array(16)).map(function (x, i) { return i+1; });
    console.log(elems)
    return (
        <Box width='20%' className="unselectable">
            <Grid container spacing={2} className="unselectable">
                {elems.map((label: number) =>
                    <Grid item xs={3} className="unselectable">
                        <img src={aTile} draggable="false" alt="Logo" style={tileStyle} className="unselectable"/>
                    </Grid>
                )}
            </Grid>
        </Box>
  );
}
