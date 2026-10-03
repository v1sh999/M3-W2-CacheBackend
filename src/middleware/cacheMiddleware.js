const cache = require('./cache');

function cacheMiddleware(req, res, next) {

    const key = req.originalUrl;

    const cached = cache.get(key);

    if (cached) {
        res.set("X-Cache", "HIT");
        return res.json(cached);
    }

    res.set("X-Cache", "MISS");

    // Save the original res.json function
    const originalJson = res.json.bind(res);

    // Replace res.json with our own function
    res.json = (data) => {

        // Store fresh data in cache
        cache.set(key, data);

        // Now actually send the response
        return originalJson(data);
    };

    next();
}

module.exports = cacheMiddleware;