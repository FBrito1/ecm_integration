require('dotenv').config()
const { getPayload } = require('./services/payload-service')
const { getTranslatePayload } = require('./services/translation-service')
const { getToken, submitMessage } = require('./services/integration-service')

const main = async () => {
  const payload = await getPayload()

  const translatePayload = getTranslatePayload(payload)

  const token = await getToken({
    username: process.env.INTEGRATION_API_USER,
    password: process.env.INTEGRATION_API_PASSWORD
  })

  const messageIdsArr = await submitMessage({
    payloads: translatePayload,
    topicPath: `/topics/product/applications/${process.env.INTEGRATION_APPLICATION_ID}/publish`,
    token
  })

  console.log('messageIdsArr', messageIdsArr)

  return messageIdsArr
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
