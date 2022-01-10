export default { render };

function render(cards) {
  if (!cards) return "";

  return cards
    .filter(toJournalCards)
    .map(c => c.desc)
    .join("\n");
}

function toJournalCards(card) {
    return card.name === "Close the day" 
        || card.name.startsWith("Journal:");
}
