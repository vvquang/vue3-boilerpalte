export default {
  set: (key: string, data: unknown): void => {
    localStorage.setItem(key, JSON.stringify(data))
  },

  get: (key: string): any => {
    const data = localStorage.getItem(key) as string
    return JSON.parse(data)
  },

  remove: (key: string): void => {
    localStorage.removeItem(key)
  },

  has: (key: string): boolean => {
    return !!localStorage.getItem(key)
  },
}