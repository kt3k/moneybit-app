/**
 * Gets the lang tag which the user use.
 * @return {string}
 */
exports.getLangTag = () => Promise.resolve(process.env.LANG_TAG || 'en')
