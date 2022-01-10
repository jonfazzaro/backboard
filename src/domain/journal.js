import _ from 'lodash';

export default { render };

function render(cards) {
  if (!cards) return "";

  return _.chain(cards)
    .filter(toJournalCards)
    .orderBy(c => c.dateLastActivity)
    .map(c => c.desc)
    .value()
    .join("\n");
}

function toJournalCards(card) {
    return card.name === "Close the day" 
        || card.name.startsWith("Journal:");
}
