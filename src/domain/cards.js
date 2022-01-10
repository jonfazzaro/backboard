import api from './api';
import cache from './cache';

export default { load };

function load(key, token, query, limit) {
    let cachedData = cache.get(query);

    const data = cachedData ?
        Promise.resolve(JSON.parse(cachedData)) :
        loadFromApi(key, token, query, limit);

    return data.then(filterOutNoise);
}

function loadFromApi(key, token, query, limit) {
    if (!key || !token || !query)
        return Promise.resolve([]);

    const uri = `https://api.trello.com/1/search?cards_limit=${limit || 1000}&query=${query}&key=${key}&token=${token}`;
    return api.fetch(uri)
        .then(results => {
            cache.set(query, JSON.stringify(results))
            return results;
        });
}

function filterOutNoise(res) {
    if (!res.cards)
        return [];

    return res.cards.filter(r =>
        !noiseCardNames.find(n => n === r.name))
}

const noiseCardNames = [
    "What did you learn this week?",
    "Share your schedule for the week",
    "Submit your timesheet",
    "Emphasis Mine",
    "Prune"
];