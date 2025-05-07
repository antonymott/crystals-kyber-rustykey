# crystals-kyber-rustykey

## 🚧 WORK IN PROGRESS...do not install 🚧

<p align="center">
  <img src="./kyber.png"/>
</p>

The "Cryptographic Suite for Algebraic Lattices" (CRYSTALS) encompasses two cryptographic primitives: Kyber, an IND-CCA2-secure key-encapsulation mechanism (KEM); and Dilithium, a strongly EUF-CMA-secure digital signature algorithm. Both algorithms are based on hard problems over module lattices, are designed to withstand attacks by large quantum computers, and were selected among the winners of the [NIST post-quantum cryptography project](https://pq-crystals.org/index.shtml)

based on work by [Antony Tutoveanu](https://github.com/antontutoveanu/crystals-kyber-javascript)
and by [Ajitomi Daisuke](https://github.com/dajiaji/crystals-kyber-js/tree/main)


<div align="center">
<a href="https://www.npmjs.com/package/crystals-kyber-rustykey"><img src="https://img.shields.io/npm/v/crystals-kyber-rustykey" alt="NPM"/></a>


| package           | registry                                                                                                                  | description                                                                                                                                                                                                                          |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| crystals-kyber-rustykey | [![npm](https://img.shields.io/npm/v/crystals-kyber-rustykey)](https://www.npmjs.com/package/crystals-kyber-rustykey) |  🚧 WORK IN PROGRESS 🚧      |

<div align="left">
For Node.js, you can install crystals-kyber-rustykey via pnpm, npm or yarn:
test

```sh
pnpm install crystals-kyber-rustykey
```

Use:

```typescript
import { MlKem768 } from "crystals-kyber-rustykey";

async function doMlKem() {
  // A recipient generates a key pair.
  const recipient = new MlKem768(); // MlKem512 and MlKem1024 are also available.
  const [pkR, skR] = await recipient.generateKeyPair();
  //// Deterministic key generation is also supported
  // const seed = new Uint8Array(64);
  // globalThis.crypto.getRandomValues(seed); // node >= 19
  // const [pkR, skR] = await recipient.deriveKeyPair(seed);

  // A sender generates a ciphertext and a shared secret with pkR.
  const sender = new MlKem768();
  const [ct, ssS] = await sender.encap(pkR);

  // The recipient decapsulates the ciphertext and generates the same shared secret with skR.
  const ssR = await recipient.decap(ct, skR);

  // ssS === ssR
  return;
}

try {
  doMlKem();
} catch (err: unknown) {
  console.log("failed:", (err as Error).message);
}
```

## Index

- [Installation](#installation)
  - [Node.js](#nodejs)
- [Usage](#usage)
- [Contributing](#contributing)

## Installation

### Node.js

```sh
pnpm install crystals-kyber-rustykey
npm install crystals-kyber-rustykey
yarn add crystals-kyber-rustykey
```