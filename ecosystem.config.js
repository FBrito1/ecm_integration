require('dotenv').config()

const defaultSettings = {
  watch: process.env.PM2_WATCH || false,
  exec_mode: 'cluster',
  namespace: process.env.SLS_ENV
}

module.exports = {
  apps: []
}
