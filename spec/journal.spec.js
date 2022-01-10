import subject from "../src/domain/journal";

describe("The journal service", () => {
  describe("given no cards", () => {
    it("renders an empty string", () => {
      expect(subject.render()).toEqual("");
    });
  });

  describe("given one card", () => {
    it("renders nothing", () => {
      expect(subject.render([{ name: "Horse shoes", desc: "trill" }])).toEqual(
        ""
      );
    });

    describe('labeled "Close the day"', () => {
      it("renders its content", () => {
        expect(
          subject.render([{ name: "Close the day", desc: "Let's do this" }])
        ).toEqual("Let's do this");
      });
    });

    describe('tagged with "Journal"', () => {
      it("renders its content", () => {
        expect(
          subject.render([
            {
              name: "Journal: Thick as a Brick",
              desc: "The poet and the painter",
            },
          ])
        ).toEqual("The poet and the painter");
      });
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
