const api = require('./api');
const cache = require('./cache');

module.exports = {
    load: (key, token, resource, query) => {
        let cachedData = cache.get(query);
        if (cachedData)
            return Promise.resolve(JSON.parse(cachedData));
        else
            return loadFromApi(key, token, resource, query);
    }
};

function loadFromApi(key, token, resource, query) {
    if (!key || !token || !query || !resource)
        return Promise.resolve([]);

    const uri = `https://api.trello.com/1/${resource}?${query}&key=${key}&token=${token}`;
    return api.fetch(uri).then(r => {
        cache.set(query, r)
        return r;
    });
}