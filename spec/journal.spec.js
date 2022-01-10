import subject from "../src/domain/journal";

describe("The journal service", () => {
  describe("given no cards", () => {
    it("renders an empty string", () => {
      expect(subject.render()).toEqual("");
    });
  });

  describe("given cards", () => {
    it("renders the journal", () => {
      expect(subject.render(cards)).toEqual(expected);
    });
  });
});

const expected = 
`## December 1, 2021

Really don't mind

## December 15, 2021

The poet and the painter`;

const cards = [
  {
    name: "Horse shoes",
    desc: "trill",
    dateLastActivity: "2022-01-01T18:33:02.714Z",
  },
  {
    name: "Journal: Thick as a Brick",
    desc: "The poet and the painter",
    dateLastActivity: "2021-12-15T18:33:02.714Z",
  },
  {
    name: "Close the day",
    desc: "Really don't mind",
    dateLastActivity: "2021-12-01T18:33:02.714Z",
  },
];