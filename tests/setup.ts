import { beforeAll, afterAll, afterEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'

beforeAll(() => {
  // Setup global test environment
})

afterAll(() => {
  // Cleanup global test environment
})

afterEach(() => {
  // Reset Pinia stores after each test
  setActivePinia(createPinia())
}) 