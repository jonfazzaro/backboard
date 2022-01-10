export default { render };

function render(cards) {
  if (!cards) return "";

  return cards
    .filter(forJournalCards)
    .map(c => c.desc)
    .join("");
}

function forJournalCards(card) {
    return card.name === "Close the day" 
        || card.name.startsWith("Journal:");
}
