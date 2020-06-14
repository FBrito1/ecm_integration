require('dotenv').config()

const defaultSettings = {
  watch: process.env.PM2_WATCH || false,
  exec_mode: 'cluster',
  namespace: process.env.NODE_ENV
}

module.exports = {
  apps: [
    {
      name: 'Process Ecommerce Products',
      script: './src/modules/jobs/processEcomProducts/index.js',
      error: './logs/jobs/processEcomProducts/error.log',
      autorestart: true,
      ...defaultSettings
    },
    {
      name: 'Process ERP Data',
      script: './src/modules/jobs/processErpData/index.js',
      error: './logs/jobs/processErpData/error.log',
      autorestart: false,
      ...defaultSettings
    }
  ]
}
