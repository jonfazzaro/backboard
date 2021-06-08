import React from 'react';
import { orderBy } from 'lodash';
import words from "../domain/words";
import Cloud from './Cloud';
import Card from './Card';
import Pie from './Pie';
import Cards from './Cards';

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
            <Cards cards={props.cards} />
            :
            <div>
                <Cloud words={words.prefixes(props.cards)
                    .concat(words.words(props.cards))} />
            </div>
        }

    </div>
}

export default Group;