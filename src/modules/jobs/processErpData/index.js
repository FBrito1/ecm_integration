require('dotenv').config()
const { getPayload } = require('./services/payload-service')
const { getTranslatePayload } = require('./services/translation-service')
const { getToken, submitMessage } = require('./services/integration-service')

async function handleIntegration () {
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

  return messageIdsArr
}

handleIntegration()
  .then(() => {
    console.log('finish running')
  })
  .catch((err) => {
    console.log('Error while runnig integration process: ', err)
  })
