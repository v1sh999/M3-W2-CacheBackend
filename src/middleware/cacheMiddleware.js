const { cache } = require('./cache.js');

const TTL = 60 * 1000; // 1 minute

function cacheMiddleware(req, res, next) {

    const key = req.originalUrl;

    const cached = cache.get(key);

    if (cached) {

        const age = Date.now() - cached.createdAt;

        if (age < TTL) {
            res.set("X-Cache", "HIT");

            return res.json(cached.data);
        }

        // Cache exists, but has expired
        cache.delete(key);
    }

    res.set("X-Cache", "MISS");

    const originalJson = res.json.bind(res);

    res.json = (data) => {

        cache.set(key, {
            data: data,
            createdAt: Date.now()
        });

        return originalJson(data);
    };

    next();
}

module.exports = cacheMiddleware;