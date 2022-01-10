export default { render };

function render(cards) {
  if (!cards) return "";

  return cards
    .filter(c => c.name === "Close the day" 
            || c.name.startsWith("Journal:"))
    .map(c => c.desc)
    .join("");
}

function forJournalCards(c) {
    return c.name === "Close the day" 
        || c.name.startsWith("Journal:");
}
