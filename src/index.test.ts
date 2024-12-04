import { describe, test, expect, it } from 'vitest'

import { add } from './index'

describe('#sum', () => {
  it('returns 0 with no numbers', () => {
    expect(add(0, 0)).toBe(0)
  })
  it('returns same with one number', () => {
    const a = 2
    expect(add(a, 0)).toBe(a)
  })
  it('returns sum with 2 numbers', () => {
    expect(add(4, 2)).toBe(6)
  })
  test('should work', () => {
    expect(true).toBe(true)
  })
})

import { MlKem512 } from './mlKem/mlKem512'

it('...', async() => {
    const recipient = new MlKem512()
    const [pkR, skR] = await recipient.generateKeyPair()

    const sender = new MlKem512()
    const [ct, ssS] = await sender.encap(pkR)
    const ssR = await recipient.decap(ct, skR)
    expect(ssR).toBe(ssS)
    // await new Promise(r => setTimeout(r))
})