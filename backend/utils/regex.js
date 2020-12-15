const urlRegex = /^https?:\/\/(www\.)?[a-z0-9]+[a-z0-9\-._~:/?#%[\]@!$&'()*+,;=]*#?$/i;
const mongoIdRegex = /^[0-9a-f]{24}$/i;

module.exports = { urlRegex, mongoIdRegex };
