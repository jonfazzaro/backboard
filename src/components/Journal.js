import React from "react";
import journal from "../domain/journal";
import ReactMarkdown from "react-markdown";

function Journal(props) {
  return (
    <div className="journal">
      <h1>Journal</h1>
      <ul>
      {journal.entries(props.cards).map((entry, i) => (
        <li className="entry">
          <ReactMarkdown key={i}>{entry}</ReactMarkdown>
        </li>
      ))}
      </ul>
    </div>
  );
}

export default Journal;
