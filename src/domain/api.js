export default {
    fetch: (url) => {
        return window.fetch(url)
            .then(r => r.json());
    }
};