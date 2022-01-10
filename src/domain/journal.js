import _ from "lodash";
import moment from "moment";

export default { render };

function render(cards) {
  if (!cards) return "";

  return _.chain(cards)
    .filter(toJournalCards)
    .orderBy(date)
    .map(toJournalEntry)
    .value()
    .join(separator);
}

function toJournalEntry(card) {
  return `${header(format(card.dateLastActivity))}\n\n${card.desc}`;
}

function header(text) {
  return `## ${text}`;
}

function date(card) {
  return card.dateLastActivity;
}

function format(date) {
  return moment(date).format("LL");
}

function toJournalCards(card) {
  return card.name === dailyTitle 
      || card.name.startsWith(journalTag);
}

const separator = "\n\n";
const dailyTitle = "Close the day";
const journalTag = "Journal:";
