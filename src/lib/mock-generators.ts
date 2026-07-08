// Small seeded PRNG so mock data stays stable across re-renders within a session
// instead of reshuffling on every hook re-evaluation.
export function createRng(seed: number) {
  let state = seed
  return function next() {
    state = (state * 1664525 + 1013904223) >>> 0
    return state / 4294967296
  }
}

export function pick<T>(rng: () => number, items: readonly T[]): T {
  return items[Math.floor(rng() * items.length)]
}

export function randomInt(rng: () => number, min: number, max: number): number {
  return Math.floor(rng() * (max - min + 1)) + min
}
