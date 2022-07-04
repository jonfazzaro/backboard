import { flatten, chain, countBy } from 'lodash';

export default { tags, prefixes, words, top, prefix }

function tags(cards) {
    return flatten(
        cards.map(c => c.labels))
        .map(l => l.name);
}

function prefixes(cards) {
    return cards.map(prefix).filter(p => !!p);
}

function prefix(card) {
    if (card.name.indexOf(":") > -1)
        return card.name.split(":")[0].trim()

    return null;
}

function words(cards) {
    return flatten(cards.map(wordsFrom)).filter(w => !!w);
}

function wordsFrom(card) {
    const alphaNumeric = new RegExp(/^[a-zA-Z0-9_]*$/)
    return card.name.split(" ")
        .concat(card.desc.split(" "))
        .filter(w => common.indexOf(w.trim().toLowerCase()) === -1)
        .filter(w => alphaNumeric.test(w.trim()));
}

function top(items, count) {
    return chain(Object.entries(countBy(items, i => i.toLowerCase())))
        .orderBy(([k, c]) => c, 'desc')
        .take(count || 10)
        .value()
        .map(([k, c]) => {
            return {
                text: k,
                value: c
            };
        });
}

const common = [
    "are",
    "please",
    "i",
    "is",
    "your",
    "you",
    "year",
    "would",
    "work",
    "with",
    "will",
    "who",
    "which",
    "when",
    "what",
    "well",
    "we",
    "way",
    "want",
    "use",
    "us",
    "up",
    "two",
    "to",
    "time",
    "this",
    "think",
    "they",
    "these",
    "there",
    "then",
    "them",
    "their",
    "the",
    "that",
    "than",
    "take",
    "some",
    "so",
    "she",
    "see",
    "say",
    "people",
    "over",
    "out",
    "our",
    "other",
    "or",
    "only",
    "one",
    "on",
    "of",
    "now",
    "not",
    "no",
    "new",
    "my",
    "most",
    "me",
    "make",
    "look",
    "like",
    "know",
    "just",
    "its",
    "it",
    "into",
    "in",
    "if",
    "I",
    "how",
    "his",
    "him",
    "her",
    "he",
    "have",
    "good",
    "go",
    "give",
    "get",
    "from",
    "for",
    "first",
    "even",
    "do",
    "day",
    "could",
    "come",
    "can",
    "by",
    "but",
    "because",
    "be",
    "back",
    "at",
    "as",
    "any",
    "and",
    "an",
    "also",
    "all",
    "after",
    "about",
    "a",
    "was",
    "were",
    "had",
    "am"
];
