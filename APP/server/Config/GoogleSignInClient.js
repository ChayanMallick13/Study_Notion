const {OAuth2Client} = require('google-auth-library');

require('dotenv').config();
exports.client = new OAuth2Client(process.env.GOOGLE_OAUTH_CLIENT_ID);

