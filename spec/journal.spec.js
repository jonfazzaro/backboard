import subject from "../src/domain/journal";

describe("The journal service", () => {
  describe("given no cards", () => {
    it("renders an empty string", () => {
      expect(subject.entries()).toEqual([]);
    });
  });

  describe("given cards", () => {
    it("renders the journal", () => {
      expect(subject.entries(cards)).toEqual(expected);
    });
  });
});

const expected = [
`## December 13, 2021

Really don't mind`,
`## Thick as a Brick
### December 15, 2021

The poet and the painter`
];

const cards = [
  {
    id: "61a5afd093085uqj34it",
    name: "Horse shoes",
    desc: "trill",
    dateLastActivity: "2022-01-01T18:33:02.714Z",
  },
  {
    id: "619097d0293085uqj34it",
    name: "Journal: Thick as a Brick",
    desc: "The poet and the painter",
    dateLastActivity: "2021-12-15T18:33:02.714Z",
  },
  {
    id: "61b6d350q90238u458",
    name: "Close the day",
    desc: "Really don't mind",
    dateLastActivity: "2021-12-20T18:33:02.714Z",
  },
];