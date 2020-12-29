import React from 'react';
import { orderBy } from 'lodash';
import words from "../domain/words";
import Cloud from './Cloud';
import Card from './Card';
import Pie from './Pie';

function Group(props) {
    const [showCards, setShowCards] = React.useState(false);

    return <div className="group">
        <Pie cards={props.cards} size={50} />
        <div className="header">
            <h2>{props.title}</h2>
            <small onClick={() => setShowCards(!showCards)}>
                {props.cards.length} cards
            </small>
        </div>
        <br />

        {showCards ?
            <ul className="cardlist">
                {sorted(props.cards)
                    .map((c, key) => <Card key={key} data={c} />)}
            </ul>
            :
            <div>
                <Cloud words={words.prefixes(props.cards)
                    .concat(words.words(props.cards))} />
            </div>
        }

    </div>
}

function sorted(cards) {
    return orderBy(cards, 'name');
}

export default Group;