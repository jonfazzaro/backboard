import _ from "lodash";
import moment from "moment";

export default { entries, stories };

function entries(cards) {
  const journalCards = _.chain(cards)
    .filter(isJournal)
    .orderBy(date)
    .value();
    
  return journalCards.map(toJournalEntry);
}

function stories(cards) {
  const journal = entries(cards)
  return journal.flatMap(toStories)
}

function toStories(card) {
  const matches = card.match(storiesRegex)
  if (matches)
    return matches.groups.stories
      .trim()
      .split('\n')
      .map(e => e.trim())
  return []
}

function toJournalEntry(card) {
  return [
    header(2, title(card)), 
    newLine, 
    newLine, 
    card.desc
  ].join("");
}

function title(card) {
  if (card.name === dailyTitle)
    return format(createdDate(card));

  return journalTitle(card);
}

function createdDate(card) {
  return new Date(1000*parseInt(card.id.substring(0,8),16));
}

function journalTitle(card) {
  return [
    card.name.replace(journalTag, "").trim(), 
    newLine, 
    header(3, format(card.dateLastActivity))
  ].join("");
}

function header(level, text) {
  return `${"#".repeat(level)} ${text}`;
}

function date(card) {
  if (card.name === dailyTitle)
    return createdDate(card);
  return new Date(card.dateLastActivity);
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
const newLine = "\n";
const storiesRegex = /### Where's the story\?\s+(?<stories>.+)/s