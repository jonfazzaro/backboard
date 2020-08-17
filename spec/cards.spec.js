import api from "../src/domain/api";
import cache from "../src/domain/cache";
import subject from "../src/domain/cards";

describe("The cards service", () => {

    describe("when loading", () => {

        describe("given cached data", () => {
            let result;
            beforeEach(async () => {
                cache.get.and.returnValue("[{}, {}]");
                api.fetch.and.returnValue(Promise.resolve([{}, {}, {}]));
                result = await subject.load("a-key", "a-token", "a-query", 100)
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
                api.fetch.and.returnValue(Promise.resolve([
                    {},
                    {},
                    {},
                    { name: "Log time" },
                    { name: "Review time" },
                    { name: "What did you learn this week?" },
                    { name: "Nerd Lunch: Announce" },
                ]));
                const result = await subject.load("a-key", "a-token", "a-query", 100)
                expect(result).toEqual([{}, {}, {}]);
            });

            it("calls the Trello API", () => {
                const uri = "https://api.trello.com/1/search?cards_limit=100&query=a-query&key=a-key&token=a-token"
                expect(api.fetch).toHaveBeenCalledWith(uri);
            });

            it("caches the results", () => {
                expect(cache.set).toHaveBeenCalledWith("a-query", JSON.stringify([{}, {}, {}]));
            });

            expectEmpty("key", null, "a-token", "a-query");
            expectEmpty("token", "a-key", null, "a-query");
            expectEmpty("query", "a-key", "a-token", null);

            function expectEmpty(field, key, token, resource, query) {
                describe("given no " + field, () => {
                    it("returns an empty promise", async () => {
                        api.fetch.calls.reset();
                        const result = await subject.load(key, token, resource, query)
                        expect(result).toEqual([]);
                        expect(api.fetch).not.toHaveBeenCalled();
                    });
                });
            }

        });
    });

    beforeEach(() => {
        spyOn(api, 'fetch');
        spyOn(cache, 'get').and.returnValue(null);
        spyOn(cache, 'set');
    });

});