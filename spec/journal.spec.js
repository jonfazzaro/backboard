import subject from "../src/domain/journal";

describe("The journal service", () => {
  describe("given no cards", () => {
    it("renders an empty string", () => {
      expect(subject.render()).toEqual("");
    });
  });

  describe("given cards", () => {
    it("renders the content from journal cards", () => {
      const cards = [
        { name: "Horse shoes", desc: "trill" },
        { name: "Close the day", desc: "Let's do this" },
        { name: "Journal: Thick as a Brick", desc: "The poet and the painter" },
      ];
      expect(subject.render(cards)).toEqual("Let's do this\nThe poet and the painter");
    });
  });
});
