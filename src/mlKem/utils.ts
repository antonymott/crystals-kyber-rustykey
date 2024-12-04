// import type { Crypto } from 'crypto'
// import { webcrypto } from 'node:crypto'
// import type { Crypto } from 'node:crypto.webcrypto.Crypto'
// import crypto from 'node:crypto'
import { webcrypto } from 'node:crypto'

import { shake256 } from './deps.ts'

export function byte(n: number): number {
  return n % 256
}

export function int16(n: number): number {
  const end = -32768
  const start = 32767

  if (n >= end && n <= start) {
    return n
  }
  if (n < end) {
    n = n + 32769
    n = n % 65536
    return start + n
  }
  // if (n > start) {
  n = n - 32768
  n = n % 65536
  return end + n
}

export function uint16(n: number): number {
  return n % 65536
}

export function int32(n: number): number {
  const end = -2147483648
  const start = 2147483647

  if (n >= end && n <= start) {
    return n
  }
  if (n < end) {
    n = n + 2147483649
    n = n % 4294967296
    return start + n
  }
  // if (n > start) {
  n = n - 2147483648
  n = n % 4294967296
  return end + n
}

// any bit operations to be done in uint32 must have >>> 0
// javascript calculates bitwise in SIGNED 32 bit so you need to convert
export function uint32(n: number): number {
  return n % 4294967296
}

/**
 * compares two arrays
 * @returns 1 if they are the same or 0 if not
 */
function checkUint8ArrayExists(arr: Uint8Array): boolean {
  // Check if the variable is defined and is an array
  return Array.isArray(arr) && arr.length > 0;
}
export function constantTimeCompare(x: Uint8Array, y: Uint8Array): number {
  if (!checkUint8ArrayExists(x) || !checkUint8ArrayExists(y) || (x.length != y.length)) {
    return 0
  }
  const v = new Uint8Array([0]);
  // constantTimeByteEq
  const z = new Uint8Array([0])
  // if (v[0] !== undefined && z[0] !== undefined) {
    for (let i = 0; i < x.length; i++) {
      v[0] |= (x?.[i] ?? 0) ^ (y?.[i] ?? 0)
    }
    
    z[0] = ~(v[0] ^ z[0])
    z[0] &= z[0] >> 4
    z[0] &= z[0] >> 2
    z[0] &= z[0] >> 1
    return z[0]
  // } else {
  //   return 0
  // }
}

export function equalUint8Array(x: Uint8Array, y: Uint8Array) {
  if (x.length != y.length) {
    return false
  }
  for (let i = 0; i < x.length; i++) {
    if (x[i] !== y[i]) {
      return false
    }
  }
  return true
}

export async function loadCrypto(): Promise<webcrypto.Crypto> {
  if (typeof globalThis !== 'undefined' && globalThis.crypto !== undefined) {

    return globalThis.crypto as webcrypto.Crypto
  } else {
    throw new Error('Web Crypto API not available ')
  }
  //   const x: webcrypto.Crypto = globalThis.crypto
  //   return x
  // }
}

// export async function loadCrypto(): Promise<webcrypto.Crypto> {
//   if (typeof globalThis !== 'undefined' && globalThis.crypto !== undefined) {
//     // const x: Crypto = globalThis.crypto
//     const x: webcrypto.Crypto = globalThis.crypto
//     // Browsers, Node.js >= v19, Cloudflare Workers, Bun, etc.
//     return x
//     // return globalThis.crypto
//   }
//   // // Node.js <= v18
//   // try {
//   //   // @ts-ignore: to ignore "crypto"
//   //   const { webcrypto } = await import('crypto') // node:crypto
//   //   return webcrypto as unknown as Crypto
//   // } catch (_e: unknown) {
//   //   throw new Error('failed to load Crypto')
//   // }
// }

// prf provides a pseudo-random function (PRF) which returns
// a byte array of length `l`, using the provided key and nonce
// to instantiate the PRF's underlying hash function.
export function prf(len: number, seed: Uint8Array, nonce: number): Uint8Array {
  return shake256
    .create({ dkLen: len })
    .update(seed)
    .update(new Uint8Array([nonce]))
    .digest()
}

// byteopsLoad24 returns a 32-bit unsigned integer loaded from byte x.
export function byteopsLoad24(x: Uint8Array): number {
  // if (x[0] !== undefined && x[1] !== undefined && x[2] !== undefined) {
    let r = uint32(x[0])
    r |= uint32(x[1]) << 8
    r |= uint32(x[2]) << 16
    return r
  // }
  // return 0
}


// byteopsLoad32 returns a 32-bit unsigned integer loaded from byte x.
export function byteopsLoad32(x: Uint8Array): number {
  // if (x[0] !== undefined && x[1] !== undefined && x[2] !== undefined && x[3] !== undefined) {
    let r = uint32(x[0])
    r |= uint32(x[1]) << 8
    r |= uint32(x[2]) << 16
    r |= uint32(x[3]) << 24
    return uint32(r)
  // }
  // return 0
}
