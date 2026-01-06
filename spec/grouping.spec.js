import { describe, it, expect } from "vitest";
import subject from "../src/domain/grouping";

describe("The grouping service", () => {

    describe("given an empty list", () => {
        it("returns an empty list", () => {
            expect(subject.by([])).toEqual([]);
        });
    });

    describe("when grouping by quarter", () => {
        it("returns a group for each quarter", () => {
            const cards = [
                { dateLastActivity: "2020-05-22" },
                { dateLastActivity: "2020-04-01" },
                { dateLastActivity: "2020-03-12" },
            ];
            expect(JSON.stringify(subject.by(cards, "q"))).toEqual(JSON.stringify([
                { title: "Q1 2020", items: [cards[2]] },
                { title: "Q2 2020", items: [cards[0], cards[1]] },
            ]));
        });
    });

    describe("when grouping by month", () => {
        it("returns a group for each month", () => {
            const cards = [
                { dateLastActivity: "2020-05-22" },
                { dateLastActivity: "2020-04-01" },
                { dateLastActivity: "2020-04-12" },
                { dateLastActivity: "2020-10-12" },
                { dateLastActivity: "2019-12-22" },
            ];
            expect(JSON.stringify(subject.by(cards, "M"))).toEqual(JSON.stringify([
                { title: "December 2019", items: [cards[4]] },
                { title: "April 2020", items: [cards[1], cards[2]] },
                { title: "May 2020", items: [cards[0]] },
                { title: "October 2020", items: [cards[3]] },
            ]));
        });
    });

    describe("when grouping by week", () => {
        it("returns a group for each week", () => {
            const cards = [
                { dateLastActivity: "2020-05-22" },
                { dateLastActivity: "2020-04-01" },
                { dateLastActivity: "2020-04-14" },
                { dateLastActivity: "2020-04-13" },
                { dateLastActivity: "2019-12-13" },
            ];
            expect(JSON.stringify(subject.by(cards, "W"))).toEqual(JSON.stringify([
                { title: "Week of December 9", items: [cards[4]] },
                { title: "Week of March 30", items: [cards[1]] },
                { title: "Week of April 13", items: [cards[2], cards[3]] },
                { title: "Week of May 18", items: [cards[0]] },
            ]));
        });
    });

});