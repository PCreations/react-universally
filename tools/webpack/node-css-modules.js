var loaderUtils = require("loader-utils");

/**
 * @see https://webpack.github.io/docs/loaders.html
 */
module.exports = function() {}

/**
 * @see https://webpack.github.io/docs/loaders.html#pitching-loader
 */
module.exports.pitch = function(remainingRequest) {
    if (this.cacheable) {
        this.cacheable();
    }

    return `
        var result = require(${loaderUtils.stringifyRequest(this, "!!" + remainingRequest)});

        if (Array.isArray(result)) {
            module.exports = result.locals;
        } else {
            module.exports = result;
        }
    `;
};
