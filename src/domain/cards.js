const api = require('./api');
const cache = require('./cache');

module.exports = {
    load: (key, token, query, limit) => {
        let cachedData = cache.get(query);
        if (cachedData)
            return Promise.resolve(JSON.parse(cachedData));
        else
            return loadFromApi(key, token, query, limit);
    }
};

function loadFromApi(key, token, query, limit) {
    if (!key || !token || !query)
        return Promise.resolve([]);

    const uri = `https://api.trello.com/1/search?cards_limit=${limit || 1000}&query=${query}&key=${key}&token=${token}`;
    return api.fetch(uri).then(r => {
        cache.set(query, r)
        return r;
    });
}