export default {render};

function render(cards) {
    if (cards && cards.length && cards[0].name == "Close the day")
        return "Let's do this";
    return "";
}