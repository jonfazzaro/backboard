import React from 'react';
import journal from '../domain/journal';
import ReactMarkdown from 'react-markdown';

function Journal(props) {
    return <>
    <h1>Journal</h1>
    <ReactMarkdown children={journal.render(props.cards)}/>
    </>;
}

export default Journal;