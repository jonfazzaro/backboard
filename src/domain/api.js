module.exports = {
    fetch: (url) => {
        return window.fetch(url)
            .then(r => r.json());
    }
};