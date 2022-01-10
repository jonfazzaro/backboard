export default { render };

function render(cards) {
  if (!cards) return "";

  return cards
    .filter(forJournalCards)
    .map(c => c.desc)
    .join("");
}

function forJournalCards(c) {
    return c.name === "Close the day" 
        || c.name.startsWith("Journal:");
}
