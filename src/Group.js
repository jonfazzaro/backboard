import React from 'react';
import _ from 'lodash';
import Cloud from './Cloud';
import Card from './Card';
import Pie from './Pie';

function Group(props) {
    const [showCards, setShowCards] = React.useState(false);

    return <div className="group">
        <Pie cards={props.cards} size={50} />
        <div className="header">
            <h2>{props.title}</h2>
            <small onClick={() => setShowCards(!showCards)}>{props.cards.length} cards</small>
        </div>
        <br />

        {showCards ?
            <ul className="cardlist">
                {_.orderBy(props.cards, 'dateLastActivity', 'desc')
                    .map((c, key) => <Card key={key} data={c} />)}
            </ul>
            :
            <div>
                <Cloud words={props.cards.map(prefix)} />
                <Cloud words={_.flatten(props.cards.map(words))} />
            </div>
        }

    </div>
}

function words(card) {
    const alphaNumeric = new RegExp(/^[a-zA-Z0-9_]*$/)
    return card.name.split(" ")
        .concat(card.desc.split(" "))
        .filter(w => common.indexOf(w.trim().toLowerCase()) === -1)
        .filter(w => alphaNumeric.test(w.trim()));
}

function prefix(card) {
    if (card.name.indexOf(":") > -1)
        return card.name.split(":")[0].trim()

    return null;
}

const common = [
    "are",
    "please",
    "i",
    "is",
    "your",
    "you",
    "year",
    "would",
    "work",
    "with",
    "will",
    "who",
    "which",
    "when",
    "what",
    "well",
    "we",
    "way",
    "want",
    "use",
    "us",
    "up",
    "two",
    "to",
    "time",
    "this",
    "think",
    "they",
    "these",
    "there",
    "then",
    "them",
    "their",
    "the",
    "that",
    "than",
    "take",
    "some",
    "so",
    "she",
    "see",
    "say",
    "people",
    "over",
    "out",
    "our",
    "other",
    "or",
    "only",
    "one",
    "on",
    "of",
    "now",
    "not",
    "no",
    "new",
    "my",
    "most",
    "me",
    "make",
    "look",
    "like",
    "know",
    "just",
    "its",
    "it",
    "into",
    "in",
    "if",
    "I",
    "how",
    "his",
    "him",
    "her",
    "he",
    "have",
    "good",
    "go",
    "give",
    "get",
    "from",
    "for",
    "first",
    "even",
    "do",
    "day",
    "could",
    "come",
    "can",
    "by",
    "but",
    "because",
    "be",
    "back",
    "at",
    "as",
    "any",
    "and",
    "an",
    "also",
    "all",
    "after",
    "about",
    "a"
];


export default Group;