import React from 'react';

function Card({data, prefix}) {
    return <li className="truncated">
        <a href={data.url} target="_blank" rel="noopener noreferrer" title={data.name}>
            <small>{data.name.replace(`${prefix}: `, "")}</small>
        </a>
    </li>
}

export default Card;