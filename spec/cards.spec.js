const api = require("../src/domain/api");
const cache = require("../src/domain/cache");

describe("The cards service", () => {

    describe("when loading", () => {

        describe("given cached data", () => {
            let result;
            beforeEach((done) => {
                cache.get.and.returnValue("[{}, {}]");
                api.fetch.and.returnValue(Promise.resolve([{}, {}, {}]));
                subject.load("a-key", "a-token", "a-query", 100)
                    .then(r => {
                        result = r;
                        done();
                    });
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
            beforeEach(done => {
                api.fetch.and.returnValue(Promise.resolve([{}, {}, {}]));
                subject.load("a-key", "a-token", "a-query", 100)
                    .then(r => {
                        expect(r).toEqual([{}, {}, {}]);
                        done();
                    });
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
                    it("returns an empty promise", (done) => {
                        api.fetch.calls.reset();
                        subject.load(key, token, resource, query)
                            .then(r => {
                                expect(r).toEqual([]);
                                done();
                            });
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
        subject = require('../src/domain/cards');
    });

    let subject;
});