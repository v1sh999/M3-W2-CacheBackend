const cache = require('./cache');

function cacheMiddleware(req, res, next) {

    const key = req.originalUrl;

    const cached = cache.get(key);

    if (cached) {
        res.set("X-Cache", "HIT");
        return res.json(cached);
    }

    res.set("X-Cache", "MISS");

    next();
}

module.exports = cacheMiddleware;