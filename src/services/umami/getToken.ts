import { umamiServer } from './instance'

const USERNAME = process.env.UMAMI_USERNAME
const PASSWORD = process.env.UMAMI_PASSWORD

/**
 * run only on the server.
 * It will return the token if the request is successful, otherwise it will return null
 * @returns The token or null
 */
export const getToken = async () => {
  const body = { username: USERNAME, password: PASSWORD }
  try {
    const response = await umamiServer.post<{ token: string }>('/api/auth/login', body)
    // return null if the status not 200
    if (response.status !== 200) {
      throw response
    }
    // return the token
    return response.data.token
  } catch (error) {
    return null
  }
}
