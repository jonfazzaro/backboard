import React from 'react';
import { uniq, orderBy } from 'lodash';
import words from "../domain/words";
import Card from './Card';

function Cards({cards}) {
    // TODO: move this to the grouping service
    const groups = orderBy(uniq(words.prefixes(cards))).map(grouped(cards));

    return (
        <div className="cardlist">
            {groups.map(renderGroup)}
            {renderGroup(byPrefix(cards, null), null)}
        </div>
    );
}

function grouped(cards) {
    return prefix => {
        const groupCards = byPrefix(cards, prefix);
        return { prefix, count: groupCards.length, cards: groupCards }
    }

    function byPrefix(cards, prefix) {
        return cards.filter(c => words.prefix(c) === prefix);
    }
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