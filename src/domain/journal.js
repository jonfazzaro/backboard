import _ from "lodash";
import { Temporal } from "@js-temporal/polyfill";
import ActivityDate from "./activity-date";

const Journal = { entries, stories };
export default Journal;

function entries(cards) {
  const journalCards = _.chain(cards).filter(isJournal).orderBy(date).value();

  return journalCards.map(toJournalEntry);
}

function stories(cards) {
  const journal = entries(cards);
  return journal.flatMap(toStories);
}

function toStories(card) {
  return parseStories(card.match(storiesRegex))
}

function parseStories(matches) {
  if (matches)
    return matches.groups.stories
      .trim()
      .split("\n")
      .map(e => e.trim());
  return [];
}

function toJournalEntry(card) {
  return [header(2, title(card)), newLine, newLine, card.desc].join("");
}

function title(card) {
  if (card.name === dailyTitle) return format(createdDate(card));

  return journalTitle(card);
}

function createdDate(card) {
  const seconds = Number.parseInt(card.id.slice(0, 8), 16);

  return Temporal.Instant.fromEpochMilliseconds(seconds * 1_000)
    .toString({ fractionalSecondDigits: 3 });
}

function journalTitle(card) {
  return [
    card.name.replace(journalTag, "").trim(),
    newLine,
    header(3, format(card.dateLastActivity)),
  ].join("");
}

function header(level, text) {
  return `${"#".repeat(level)} ${text}`;
}

function date(card) {
  if (card.name === dailyTitle) return createdDate(card);
  return card.dateLastActivity;
}

function format(date) {
  return ActivityDate.from(date).toLocaleString(undefined, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function isJournal(card) {
  return card.name === dailyTitle || card.name.startsWith(journalTag);
}

const dailyTitle = "Journal the day";
const journalTag = "Journal:";
const newLine = "\n";
const storiesRegex = /### Where's the story\?\s+(?<stories>.+)/s;
