const axios = require('axios')

function setupAxios () {
  const instance = axios.create({
    baseURL: process.env.INTEGRATION_API_URL
  })

  return instance
}

async function getToken ({ username, password }) {
  const integrationApi = setupAxios()

  const body = {
    username,
    password
  }

  const response = await integrationApi.post('/token', body)

  const { token } = response.data

  return token
}

async function submitMessage ({ payloads, token, topicPath }) {
  const integrationApi = setupAxios()

  const result = await Promise.all(
    payloads.map(async (payload) => {
      const messageResponse = await integrationApi.post(topicPath, payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      return messageResponse.data
    })
  )

  return result
}

module.exports = {
  getToken,
  submitMessage
}
