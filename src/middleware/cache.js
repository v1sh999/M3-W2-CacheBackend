const cache = new Map();

function clearCache() {
    cache.clear();
}

module.exports = {
    cache,
    clearCache
};