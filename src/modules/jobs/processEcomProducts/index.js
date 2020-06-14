require('dotenv').config()

const {
  getToken,
  consumeMessages,
  processReceipt
} = require('./services/integration-service')
const { processPayload } = require('./services/payload-service')

const main = async () => {
  const token = await getToken({
    username: process.env.CONSUME_INTEGRATION_API_USER,
    password: process.env.CONSUME_INTEGRATION_API_PASSWORD
  })

  const queueId = process.env.CONSUME_INTEGRATION_API_QUEUE_ID

  const consumeData = await consumeMessages({
    token,
    queueId
  })

  const receipts = await processPayload(consumeData.messages)

  if (receipts.length > 0) {
    const result = await processReceipt({
      receipt: receipts[0],
      token,
      queueId
    })

    console.log('Queue return', result)

    return result
  }

  console.log('Empty queue')
  return false
}

const start = async () => {
  await main()
}

start()
  .then(() => process.exit(0))
  .catch((e) => {
    console.log('Somenthing went wrong', e)
    process.exit(1)
  })
