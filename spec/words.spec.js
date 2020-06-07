import subject from '../src/domain/words';

describe("The words service", () => {

    describe("given a list of cards", () => {

        it("gets a list of all of the cards' tags", () => {
            expect(subject.tags(cards)).toEqual(
                ["Ketchup", "Mustard", "Mayonnaise", "Ketchup", "Mustard", "Mayonnaise"]);
        });

        it("gets a list of all of the cards' prefixes", () => {
            expect(subject.prefixes(cards))
                .toEqual(["This", "This", "Work"]);
        });

        it("gets a list of all of the cards' non-common words", () => {
            expect(subject.words(cards)).toEqual(allTheWords);
        });

    });

    describe("given a list of words", () => {
        it("gets the top words", () => {
            expect(subject.top(subject.words(cards))).toEqual([
                { text: 'billions', value: 6 },
                { text: 'upon', value: 6 },
                { text: 'prefix', value: 2 },
                { text: 'stars', value: 2 },
                { text: 'realm', value: 1 },
                { text: 'galaxies', value: 1 },
                { text: 'made', value: 1 },
                { text: 'interiors', value: 1 },
                { text: 'collapsing', value: 1 },
                { text: 'spring', value: 1 }
            ]);
        });

        it("gets the top 3 words", () => {
            expect(subject.top(subject.words(cards), 3)).toEqual([
                { text: 'billions', value: 6 },
                { text: 'upon', value: 6 },
                { text: 'prefix', value: 2 },
            ]);
        });
    });

    const ketchup = { name: "Ketchup" };
    const mustard = { name: "Mustard" };
    const mayo = { name: "Mayonnaise" };

    const cards = [
        {
            name: "This: is a prefix",
            desc: "Realm of the galaxies made in the interiors of collapsing stars from which we spring globular star cluster paroxysm of global death",
            labels: [ketchup],
        },
        {
            name: "That is not",
            desc: "A mote of dust suspended in a sunbeam",
            labels: [],
        },
        {
            name: "This: is another one",
            desc: "",
            labels: [mustard, mayo],
        },
        {
            name: "Work: is a prefix too",
            desc: "Hearts of the stars invent the universe two ghostly white figures in coveralls and helmets are softly dancing Jean-François Champollion rich in heavy atoms with pretty stories for which there's little good evidence and billions upon billions upon billions upon billions upon billions upon billions upon billions.",
            labels: [ketchup, mustard, mayo],
        },
    ];

    const allTheWords = [
        'prefix', 'Realm', 'galaxies', 'made',
        'interiors', 'collapsing', 'stars', 'spring',
        'globular', 'star', 'cluster', 'paroxysm',
        'global', 'death', 'mote', 'dust',
        'suspended', 'sunbeam', 'another',
        'prefix', 'too', 'Hearts', 'stars',
        'invent', 'universe', 'ghostly', 'white',
        'figures', 'coveralls', 'helmets', 'softly',
        'dancing', 'Champollion', 'rich', 'heavy',
        'atoms', 'pretty', 'stories', 'little',
        'evidence', 'billions', 'upon', 'billions',
        'upon', 'billions', 'upon', 'billions',
        'upon', 'billions', 'upon', 'billions',
        'upon'
    ]

});