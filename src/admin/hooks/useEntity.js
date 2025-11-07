import { useState, useEffect } from 'react'

const STORAGE_KEY = 'admin_products_data'
let idCounter = Date.now()

// Локальное хранилище вместо API
const localAPI = {
  get: async (entityType) => {
    await new Promise(resolve => setTimeout(resolve, 200)) // Имитация задержки
    try {
      const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
      return data
    } catch {
      return []
    }
  },

  create: async (entityType, payload) => {
    await new Promise(resolve => setTimeout(resolve, 300))
    const newItem = { 
      id: ++idCounter, 
      ...payload, 
      createdAt: new Date().toISOString() 
    }
    
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    const updated = [newItem, ...existing]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    return newItem
  },

  update: async (entityType, itemId, payload) => {
    await new Promise(resolve => setTimeout(resolve, 300))
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    const updated = existing.map(item => 
      item.id === itemId 
        ? { ...item, ...payload, updatedAt: new Date().toISOString() }
        : item
    )
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    return updated.find(item => item.id === itemId)
  },

  delete: async (entityType, itemId) => {
    await new Promise(resolve => setTimeout(resolve, 300))
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    const updated = existing.filter(item => item.id !== itemId)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    return true
  }
}

export function useEntities() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Загрузка данных при монтировании
  useEffect(() => {
    let mounted = true
    
    const loadData = async () => {
      try {
        setLoading(true)
        const result = await localAPI.get('products')
        if (mounted) {
          setData(result)
        }
      } catch (err) {
        if (mounted) {
          setError(err)
        }
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    loadData()

    return () => { mounted = false }
  }, [])

  const createEntity = async (payload) => {
    try {
      setLoading(true)
      const result = await localAPI.create('products', payload)
      setData(prev => [result, ...prev])
      return result
    } catch (err) {
      setError(err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const updateEntity = async (itemId, payload) => {
    try {
      setLoading(true)
      const result = await localAPI.update('products', itemId, payload)
      setData(prev => prev.map(item => 
        item.id === itemId ? result : item
      ))
      return result
    } catch (err) {
      setError(err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const deleteEntity = async (itemId) => {
    try {
      setLoading(true)
      await localAPI.delete('products', itemId)
      setData(prev => prev.filter(item => item.id !== itemId))
      return true
    } catch (err) {
      setError(err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { 
    data, 
    loading, 
    error, 
    createEntity, 
    updateEntity, 
    deleteEntity 
  }
}