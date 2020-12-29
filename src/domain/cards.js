import api from './api';
import cache from './cache';
import _ from 'lodash';

export default { load };

function load(key, token, query, limit) {
    let cachedData = cache.get(query);
    if (cachedData)
        return Promise.resolve(JSON.parse(cachedData));
    else
        return loadFromApi(key, token, query, limit);
}

function loadFromApi(key, token, query, limit) {
    if (!key || !token || !query)
        return Promise.resolve([]);

    const uri = `https://api.trello.com/1/search?cards_limit=${limit || 1000}&query=${query}&key=${key}&token=${token}`;
    return api.fetch(uri)
        .then(filterOutNoise)
        .then(results => {
            cache.set(query, JSON.stringify(results))
            return results;
        });
}

function filterOutNoise(res) {
    return res.cards.filter(r =>
        !noiseCardNames.find(n => n === r.name))
}

const noiseCardNames = [
    "Log time",
    "Review time",
    "What did you learn this week?",
    "Nerd Lunch: Announce"
];