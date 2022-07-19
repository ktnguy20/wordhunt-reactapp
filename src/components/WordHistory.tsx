import React, {useEffect, useRef} from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import styles from '../styles/WordHistory.module.scss';

type WordHistoryProps = {
    wordHistory: string[];
}
const WordHistory = ({wordHistory}: WordHistoryProps) => {
  const scrollRef = useRef<null | HTMLLIElement>(null);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView();
    }
  });
  return (
    <Box
      className = {styles.historyBox}
      height = {{
        xs: '40vw',
        sm: '30vw',
        md: '25vw',
        lg: '20vw',
        xl: '15vw',
      }}
    >
      <Paper
        className = {styles.historyPaper}
      >
        <Typography
          component="div"
        >
              Words
        </Typography>
        <ul>
          {wordHistory.map((word: string, idx: number) => {
            return (
              <li key = {idx}>
                {word}
              </li>
            );
          })}
        </ul>
      </Paper>
    </Box>
  );
};

export default WordHistory;
