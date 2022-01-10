import _ from "lodash";
import moment from "moment";

export default { render };

function render(cards) {
  if (!cards) return "";

  return _.chain(cards)
    .filter(toJournalCards)
    .orderBy(c => c.dateLastActivity)
    .map(toJournal)
    .value()
    .join(separator);
}

function toJournal(card) {
  return `## ${format(card.dateLastActivity)}\n\n${card.desc}`;
}

function format(date) {
  return moment(date).format("LL");
}

function toJournalCards(card) {
  return card.name === "Close the day" || card.name.startsWith("Journal:");
}

const separator = "\n\n";
