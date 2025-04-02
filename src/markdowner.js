export default {toMarkdown};

function toMarkdown(groups) {
    return groups
        .map(group => formatGroup(group))
        .join("\n\n");

    function formatGroup(group) {
        const header = `### ${group.prefix}`;
        const listItems = formatCardList(group.cards, group.prefix);
        return `${header}\n\n${listItems}`;
    }

    function formatCardList(cards, groupPrefix) {
        return cards
            .map(card => formatCard(card, groupPrefix))
            .join("  \n");
    }

    function formatCard(card, groupPrefix) {
        const cleanCardName = card.name.replace(`${groupPrefix}: `, "");
        return `1. ${cleanCardName}`;
    }
}