import React from "react";
import words from "../domain/words";
import Cloud from "./Cloud";
import Pie from "./Pie";
import Cards from "./Cards";
import Journal from "./Journal";

function Group(props) {
  const [showCards, setShowCards] = React.useState(false);

  return (
    <div className="group">
      <Pie cards={props.cards} size={50} />
      <div className="header">
        <h2>{props.title}</h2>
        <small onClick={() => setShowCards(!showCards)}>
          {props.cards.length} cards
        </small>
      </div>
      <br />

      {showCards ? (
        <>
          <Cards cards={props.cards} />
          <Journal></Journal>
        </>
      ) : (
        <>
          <Cloud
            words={words.prefixes(props.cards).concat(words.words(props.cards))}
          />
        </>
      )}
    </div>
  );
}

export default Group;
