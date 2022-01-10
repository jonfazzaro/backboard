import React from 'react';
import journal from '../domain/journal';
import ReactMarkdown from 'react-markdown';

function Journal(props) {
    return <div className="journal">
    <h1>Journal</h1>
    {journal.entries(props.cards).map((e, i) => 

    <ReactMarkdown key={i}>e</ReactMarkdown>
    )}
    </div>;
}

export default Journal;