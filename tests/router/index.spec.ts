import { describe, it, expect } from 'vitest'
import router from '@/router'

describe('Router', () => {
  it('should have home route', () => {
    const homeRoute = router.hasRoute('home')
    expect(homeRoute).toBe(true)
  })

  it('should have favorites route', () => {
    const favoritesRoute = router.hasRoute('favorites')
    expect(favoritesRoute).toBe(true)
  })

  it('should redirect unknown routes to home', async () => {
    await router.push('/unknown-route')
    expect(router.currentRoute.value.path).toBe('/')
  })
}) 