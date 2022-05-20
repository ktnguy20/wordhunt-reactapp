import * as React from 'react';
// import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import './unselectable.css';
import tileImages from '../data/LetterImages';


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
  
    const randomLetterArray = Array.from({length: 16}, () => Math.floor(Math.random() * 26));
    return (
        <Box width='20%' className="unselectable">
            <Grid container spacing={2} className="unselectable">
                {randomLetterArray.map((x: number) =>
                    <Grid item xs={3} className="unselectable">
                        <img src={tileImages[x]} draggable="false" alt="Logo" style={tileStyle} className="unselectable"/>
                    </Grid> 
                )}
            </Grid>
        </Box>
  );
}
