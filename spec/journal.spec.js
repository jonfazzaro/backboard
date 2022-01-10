import subject from "../src/domain/journal";

describe("The journal service", () => {
  describe("given no cards", () => {
    it("renders an empty string", () => {
      expect(subject.render()).toEqual("");
    });
  });

  describe("given cards", () => {
    it("renders the content from journal cards in date order", () => {
      expect(subject.render(cards)).toEqual(
`Really don't mind
The poet and the painter`
      );
    });
  });
});

const cards = [
  { name: "Horse shoes", desc: "trill", dateLastActivity: "2022-01-01T18:33:02.714Z" },
  { name: "Journal: Thick as a Brick", desc: "The poet and the painter", dateLastActivity: "2021-12-15T18:33:02.714Z" },
  { name: "Close the day", desc: "Really don't mind", dateLastActivity: "2021-12-01T18:33:02.714Z" },
];
