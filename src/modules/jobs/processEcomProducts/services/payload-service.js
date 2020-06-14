const fs = require('fs')
const path = require('path')

async function processPayload (payloads, entityId) {
  const filePath = path.resolve(
    __dirname,
    '..',
    '..',
    '..',
    '..',
    'infra',
    'EcomDatabase',
    'Ecommerce_database.json'
  )
  const file = await fs.promises.readFile(filePath)

  const parseJson = JSON.parse(file)
  const receipts = []

  payloads.forEach((p) => {
    receipts.push({
      entityId: 'productId',
      feedbackContent: {
        message: 'ok'
      },
      type: 'SUCCESS',
      referenceMessageId: p.messageId,
      receiptId: p.receiptId
    })
    parseJson.products.push(p.body)
  })

  await fs.promises.writeFile(filePath, JSON.stringify(parseJson))

  return receipts
}

module.exports = { processPayload }
