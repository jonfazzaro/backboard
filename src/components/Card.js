import React from 'react';

function Card(props) {
    return <li className="truncated">
        <a href={props.data.url} target="_blank" rel="noopener noreferrer" title={props.data.name}>
            <small>{props.data.name}</small>
        </a>
    </li>
}

export default Card;