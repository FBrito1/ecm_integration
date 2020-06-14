const neatCsv = require('neat-csv')
const fs = require('fs')
const path = require('path')

async function getPayload (csv) {
  const filePath = path.resolve(
    __dirname,
    '..',
    '..',
    '..',
    '..',
    'infra',
    'ERPDatabase',
    'ERP_database.csv'
  )

  const file = await fs.promises.readFile(filePath)

  const data = await neatCsv(file)

  return data
}

module.exports = {
  getPayload
}
