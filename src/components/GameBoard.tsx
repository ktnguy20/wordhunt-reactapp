import React, {useState, useEffect} from 'react';
import {Grid} from '@mantine/core';
import aTile from '../assets/LetterTiles/Atile.png';
function GameBoard () {
    return (
        <Grid>
            <Grid.Col span={4}><img src={aTile} alt="Logo"/></Grid.Col>
            <Grid.Col span={4}><img src={aTile} alt="Logo"/></Grid.Col>
            <Grid.Col span={4}><img src={aTile} alt="Logo"/></Grid.Col>
        </Grid>
    );
}
export default GameBoard