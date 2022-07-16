import React, {useEffect, useRef} from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

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
    <Paper style={{height: 100, overflow: 'auto', marginTop: '2vh'}}>
      <Typography sx={{mt: 4, mb: 2}} variant="h6" component="div">
            Word Bank
      </Typography>
      <List>
        {wordHistory.map((word: string, idx: number) => {
          return (
            <ListItem key = {idx} ref={scrollRef}>
              <ListItemText>
                {word + '\n'}
              </ListItemText>
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );
};

export default WordHistory;
