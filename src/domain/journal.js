export default {render};

function render(cards) {
    if (!cards)
        return "";
    return cards
        .filter(c => c.name === "Close the day")
        .map(c => c.desc)
        .join("");
}