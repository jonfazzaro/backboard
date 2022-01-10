import _ from 'lodash';
import moment from 'moment';

export default { render };

function render(cards) {
  if (!cards) return "";

  return _.chain(cards)
    .filter(toJournalCards)
    .orderBy(c => c.dateLastActivity)
    .map(renderJournals)
    .value()
    .join("\n\n");
}

function renderJournals(card) {
return `## ${moment(card.dateLastActivity).format("LL")}\n\n${card.desc}`
}

function toJournalCards(card) {
    return card.name === "Close the day" 
        || card.name.startsWith("Journal:");
}

const separator = "\n\n";