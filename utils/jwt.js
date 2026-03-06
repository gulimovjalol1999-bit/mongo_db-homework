const jwt = require("jsonwebtoken")

const access_token = (payload) => {
  return jwt.sign(payload, process.env.SEKRET_KEY, {expiresIn: "1d"})
}

const refresh_token = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_SEKRET_KEY, {expiresIn: "60d"})
}

module.exports = {
  access_token,
  refresh_token,
}