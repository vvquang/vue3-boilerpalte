import { ERoles } from '@/enums/roles'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

export const mockApi = () => {
  // This sets the mock adapter on the default instance
  const mock = new MockAdapter(axios)

  const TOKEN_ADMIN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiBEb2UiLCJlbWFpbCI6ImVtYWlsQGdhbWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTUxNjIzOTAyMn0.qKNqfACMfAApz1FPZB_nAgxQM9udcBwGPnLZphSxA6Y'
  const TOKEN_USER = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiBEb2UiLCJlbWFpbCI6InVzZXJAZ21haWwuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE1MTYyMzkwMjJ9.aLG_jO6lvgAN4hCRS5hs7WWZgIhY_OhA5ezgQ8gbR9U'

  // Mock any GET request to /users
  // arguments for reply are (status, data, headers)
  mock.onPost('/auth/login').reply(function ({ data = {} }) {
    const email = JSON.parse(data)?.email
    const accessToken = email === 'admin@gmail.com' ? TOKEN_ADMIN : TOKEN_USER

    return [
      200,
      {
        success: true,
        result: {
          data: {
            accessToken,
            refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZWZlc2h0b2tlbiI6InJlZmVzaC10b2tlbiJ9.Tx7opVIKHOfZ7U0LyMV-9XGH0xs02ioi_LL5vhyFknQ'
          }
        },
        error: null
      }
    ]
  })

  mock.onGet('/auth/me').reply(function ({ headers = {} }) {
    const authorization = (headers?.Authorization || '').replace('Bearer ', '')
    const role = authorization === TOKEN_ADMIN ? ERoles.ADMIN : ERoles.USER

    return [
      200,
      {
        success: true,
        result: {
          data: {
            id: 1,
            name: 'John Smith',
            email: 'email@gmail.com',
            role,
          }
        },
        error: null
      }
    ]
  })
}
