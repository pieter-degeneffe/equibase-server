// Set up Auth0 configuration
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");

const authConfig = require("../auth_config.json");
if (!authConfig.domain || !authConfig.audience) {
  throw "Please make sure that auth_config.json is in place and populated";
}

// Middleware that validates incoming bearer tokens using JWKS from equibase.eu.auth0.com
const authCheck = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
  }),
  audience: authConfig.audience,
  issuer: `https://${authConfig.domain}/`,
  algorithms: ["RS256"]
});

module.exports = authCheck;
