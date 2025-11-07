import { mockData } from './data'

const delay = ms => new Promise(r => setTimeout(r, ms))

class MockAPI {
  constructor() {
    this.data = JSON.parse(JSON.stringify(mockData))
  }

  async get(entity, id) {
    await delay(300)
    if (id) {
      const item = this.data[entity].find(x => x.id === id)
      if (!item) throw new Error('Not found')
      return item
    }
    return this.data[entity]
  }

  async create(entity, data) {
    await delay(500)
    const id = Math.max(...this.data[entity].map(x => x.id)) + 1
    const item = { id, ...data, createdAt: Date.now() }
    this.data[entity].unshift(item)
    return item
  }

  async update(entity, id, data) {
    await delay(400)
    const index = this.data[entity].findIndex(x => x.id === id)
    if (index === -1) throw new Error('Not found')
    const item = { ...this.data[entity][index], ...data, updatedAt: Date.now() }
    this.data[entity][index] = item
    return item
  }

  async delete(entity, id) {
    await delay(600)
    const index = this.data[entity].findIndex(x => x.id === id)
    if (index === -1) throw new Error('Not found')
    this.data[entity].splice(index, 1)
    return true
  }
}

export const api = new MockAPI()
