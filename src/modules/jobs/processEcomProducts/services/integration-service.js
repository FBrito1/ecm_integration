const axios = require('axios')

function setupAxios () {
  const instance = axios.create({
    baseURL: process.env.CONSUME_INTEGRATION_API_URL
  })

  return instance
}

async function getToken ({ username, password }) {
  const consumeApi = setupAxios()

  const body = {
    username,
    password
  }

  const response = await consumeApi.post('/token', body)

  const { token } = response.data

  return token
}

async function consumeMessages ({ queueId, token }) {
  const consumeApi = setupAxios()

  const result = await consumeApi.post(
    `/queues/${queueId}/consume`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )

  return result.data
}

async function processReceipt ({ receipt, token, queueId }) {
  const consumeApi = setupAxios()

  const result = await consumeApi.post(
    `/queues/${queueId}/receipts/ack`,
    receipt,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )

  return result.status
}

module.exports = {
  getToken,
  consumeMessages,
  processReceipt
}
