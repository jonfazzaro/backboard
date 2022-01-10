import subject from "../src/domain/journal";

describe("The journal service", () => {
  describe("given no cards", () => {
    it("renders an empty string", () => {
      expect(subject.render()).toEqual("");
    });
  });

  describe("given cards", () => {
    it("renders the content from journal cards", () => {
      expect(subject.render(cards)).toEqual(
`Really don't mind
The poet and the painter`
      );
    });
  });
});

const cards = [
  { name: "Horse shoes", desc: "trill" },
  { name: "Close the day", desc: "Really don't mind" },
  { name: "Journal: Thick as a Brick", desc: "The poet and the painter" },
];
