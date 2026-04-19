/** Vercel maps `api/<name>.js` → `/api/<name>`. Re-export so POST /api/create-checkout-session hits this function. */
module.exports = require("./checkout.js");
