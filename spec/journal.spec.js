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

  describe("when parsing stories", () => {
    it("returns a bulleted list", () => {
      expect(subject.stories(cards)).toEqual([
        "- Well then he says to me he says",
        "- 'you got a pineapple for a face, you know that?  '",
      ]);
    });
  });
});

const expected = [
  "## December 13, 2021\n\n" +
    "Really don't mind\n" +
    "\n" +
    "     ### Where's the story?  \n" +
    "  \n" +
    "    - Well then he says to me he says  \n" +
    "  - 'you got a pineapple for a face, you know that?  '\n" +
    "\n",

  "## Thick as a Brick\n" +
    "### December 15, 2021\n\n" +
    "The poet and the painter",
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
    name: "Journal the day",
    desc:
      "Really don't mind\n" +
      "\n" +
      "     ### Where's the story?  \n" +
      "  \n" +
      "    - Well then he says to me he says  \n" +
      "  - 'you got a pineapple for a face, you know that?  '\n" +
      "\n",
    dateLastActivity: "2021-12-20T18:33:02.714Z",
  },
];
