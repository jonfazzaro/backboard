import React from "react";
import journal from "../domain/journal";
import ReactMarkdown from "react-markdown";

function Stories(props) {
  return (
    <div className="stories">
      <ReactMarkdown>{journal.stories(props.cards).join("  \n")}</ReactMarkdown>
    </div>
  );
}

export default Stories;
