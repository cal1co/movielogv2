import { describe, it, expect } from 'vitest'

// The two tests marked with concurrent will be run in parallel
describe('Vitest', () => {
    it('vitest works', async () => { 
        expect(1 + 1).toBe(2)
    })
})