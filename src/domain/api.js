const api = {
    fetch: (url) => {
        return window.fetch(url)
            .then(r => r.json());
    }
};

export default api;