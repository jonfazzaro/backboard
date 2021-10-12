import React from 'react';
import prefixer from '../domain/prefixer';
import Card from './Card';

function Cards({cards}) {
    const groups = prefixer.group(cards);

    return (
        <div className="cardlist">
            {groups.map(renderGroup)}
        </div>
    );
}

function renderGroup(group, groupKey) {
    return (<ul key={groupKey}>
        {renderHeader(group.prefix, group.count)}
        {renderCards(group.prefix, group.cards)}
    </ul>);        
}

function renderHeader(prefix, count) {
    return <li><strong>{prefix} ({count})</strong></li>
}    

function renderCards(prefix, cards) {
    return (cards || []).map((c, key) =>
        <Card key={key} data={c} prefix={prefix} />)
}        

export default Cards;