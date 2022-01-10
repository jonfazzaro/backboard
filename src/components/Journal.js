import React from 'react';
import journal from '../domain/journal';
import ReactMarkdown from 'react-markdown';

function Journal(props) {
    return <div className="journal">
    <h1>Journal</h1>
    <ReactMarkdown children={journal.render(props.cards)}/>
    </div>;
}

export default Journal;