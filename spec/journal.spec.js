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
  });
});
