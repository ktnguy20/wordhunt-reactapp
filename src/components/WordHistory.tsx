import React, {useState, useEffect} from 'react';

type WordHistoryProps = {
    getWordHistory: () => string[];
}
const WordHistory = (props: WordHistoryProps) => {
    const [wordHistory, setWordHistory] = useState<string[]>([]);
    useEffect(
        () => {
            setWordHistory(props.getWordHistory())
            console.log(wordHistory)
        }

    )
    return (
        <p>
            {wordHistory}
        </p>
    );
}

export default WordHistory;