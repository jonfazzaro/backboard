import api from "../src/domain/api";
import cache from "../src/domain/cache";
import subject from "../src/domain/cards";

describe("The cards service", () => {
  describe("when loading", () => {
    let res;

    describe("given cached data", () => {
      let result;
      beforeEach(async () => {
        res = { cards: [{}, {}] };
        cache.get.and.returnValue(JSON.stringify(res));
        api.fetch.and.returnValue(Promise.resolve(res));
        result = await subject.load("a-key", "a-token", "a-query", 100);
      });

      it("uses the query as the cache key", () => {
        expect(cache.get).toHaveBeenCalledWith("a-query");
      });

      it("returns the cached data", () => {
        expect(result).toEqual([{}, {}]);
      });

      it("does not call the API", () => {
        expect(api.fetch).not.toHaveBeenCalled();
      });
    });

    describe("given no cached data", () => {
      beforeEach(async () => {
        arrangeCards();
        api.fetch.and.returnValue(Promise.resolve(res));
        const result = await subject.load("a-key", "a-token", "a-query", 100);
        expect(result).toEqual([{ name: "" }, { name: "" }, { name: "" }]);
      });

      it("calls the Trello API", () => {
        const uri =
          "https://api.trello.com/1/search?cards_limit=100&query=a-query&key=a-key&token=a-token";
        expect(api.fetch).toHaveBeenCalledWith(uri);
      });

      it("caches the results", () => {
        expect(cache.set).toHaveBeenCalledWith("a-query", JSON.stringify(res));
      });

      expectEmpty("key", null, "a-token", "a-query");
      expectEmpty("token", "a-key", null, "a-query");
      expectEmpty("query", "a-key", "a-token", null);

      function expectEmpty(field, key, token, resource, query) {
        describe("given no " + field, () => {
          it("returns an empty promise", async () => {
            api.fetch.calls.reset();
            const result = await subject.load(key, token, resource, query);
            expect(result).toEqual([]);
            expect(api.fetch).not.toHaveBeenCalled();
          });
        });
      }

      function cardsFromNames(names) {
        return names.map(n => ({ name: n }));
      }

      function arrangeCards() {
        res = {
          cards: cardsFromNames([
            "",
            "",
            "",
            "What did you learn this week?",
            "Share your schedule for the week",
            "Submit your timesheet",
            "Emphasis Mine",
            "Prune",
          ]),
        };
      }
    });
  });

  beforeEach(() => {
    spyOn(api, "fetch");
    spyOn(cache, "get").and.returnValue(null);
    spyOn(cache, "set");
  });
});
