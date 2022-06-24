import React from "react";
import journal from "../domain/journal";
import ReactMarkdown from "react-markdown";

function Stories(props) {
  return (
    <div className="stories">
      <ul>
      {journal.stories(props.cards).map((entry, i) => (
        <li className="entry">
          <ReactMarkdown key={i}>{entry}</ReactMarkdown>
        </li>
      ))}
      </ul>
    </div>
  );
}

export default Journal;
