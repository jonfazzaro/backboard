import _ from "lodash";
import moment from "moment";

export default { entries };

function entries(cards) {
  return _.chain(cards)
    .filter(isJournal)
    .orderBy(date)
    .map(toJournalEntry)
    .value();
}

function toJournalEntry(card) {
  return `${header(format(card.dateLastActivity))}${card.desc}`;
}

function header(text) {
  return `## ${text}\n\n`;
}

function date(card) {
  return card.dateLastActivity;
}

function format(date) {
  return moment(date).format("LL");
}

function isJournal(card) {
  return card.name === dailyTitle 
      || card.name.startsWith(journalTag);
}

const dailyTitle = "Close the day";
const journalTag = "Journal:";
