import _ from 'lodash';
import moment from 'moment';

export default { render };

function render(cards) {
  if (!cards) return "";

  return _.chain(cards)
    .filter(toJournalCards)
    .orderBy(c => c.dateLastActivity)
    .map(c => `## ${moment(c.dateLastActivity).format("LL")}\n\n${c.desc}`)
    .value()
    .join("\n\n");
}

function toJournalCards(card) {
    return card.name === "Close the day" 
        || card.name.startsWith("Journal:");
}
