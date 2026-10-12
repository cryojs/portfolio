// Reproducible irregular starting positions; no ordered ring or shared orbit
const noise = (n) => { const v = Math.sin(n * 127.1 + 311.7) * 43758.5453; return v - Math.floor(v) }

export function createPearls() {
  return Array.from({ length: 16 }, (_, i) => {
    const angle = noise(i + 1) * Math.PI * 2
    const distance = Math.sqrt(noise(i + 23)) * 43
    const restY = i % 4 === 0 ? -2 : -14 - noise(i + 41) * 45
    return {
      x: Math.cos(angle) * distance, z: Math.sin(angle) * distance, y: restY,
      vx: 0, vz: 0, vy: 0, restY,
      radius: (7 + noise(i + 71) * 2) * 1.5,
      drag: 1.3 + noise(i + 83) * .9,
      phase: noise(i + 97) * Math.PI * 2, age: 0, energy: 0,
    }
  })
}

function contain(p) {
  const limit = 62 - p.radius
  const radius = Math.hypot(p.x, p.z)
  if (radius > limit) {
    const nx = p.x / radius, nz = p.z / radius
    p.x = nx * limit; p.z = nz * limit
    const outward = p.vx * nx + p.vz * nz
    if (outward > 0) { p.vx -= outward * nx * 1.35; p.vz -= outward * nz * 1.35 }
  }
  if (p.y > 0) { p.y = 0; p.vy = -Math.abs(p.vy) * .15 }
  if (p.y < -78) { p.y = -78; p.vy = Math.abs(p.vy) * .2 }
}

// Treat the straw as a vertical 3D capsule through the tea. The same live
// straw position drives both this collision and the front/back render split.
function collideStraw(p, straw) {
  const dx = p.x - straw.x, dz = p.z - straw.z
  const distance = Math.hypot(dx, dz)
  const minimum = p.radius + 13.5
  if (distance >= minimum) return
  const nx = distance > .001 ? dx / distance : Math.cos(p.phase)
  const nz = distance > .001 ? dz / distance : Math.sin(p.phase)
  p.x = straw.x + nx * minimum
  p.z = straw.z + nz * minimum
  const inward = p.vx * nx + p.vz * nz
  if (inward < 0) {
    p.vx -= inward * 1.25 * nx
    p.vz -= inward * 1.25 * nz
  }
  p.vx *= .86
  p.vz *= .86
}

// A playful particle-fluid approximation: local wakes and independent eddies,
// 3D collisions, viscous drag, and varied near-neutral buoyancy
export function stepPearls(pearls, straw, impulse, dt) {
  dt = Math.max(0, Math.min(dt, 1 / 30))
  const strength = Math.min(24, Math.hypot(impulse.x, impulse.z))
  for (const p of pearls) {
    p.age += dt
    const dx = p.x - straw.x, dz = p.z - straw.z
    const distance = Math.hypot(dx, dz) || 1
    const influence = Math.exp(-distance / 32) * (.65 + .35 * (1 + p.y / 78))
    p.energy = Math.min(1.5, p.energy + strength * influence * .045) * Math.exp(-1.15 * dt)
    const phase = p.phase + p.age * 2.1
    // Each pearl has a different lift and sideways response, without a global vortex
    p.vx += impulse.x * 2.2 * influence
    p.vz += impulse.z * 2.2 * influence
    p.vy += strength * influence * (Math.sin(phase) * 1.9 - .45)
    if (distance < p.radius + 13.5 && strength > .1) {
      p.vx += dx / distance * strength * .8
      p.vz += dz / distance * strength * .8
    }
    p.vx += Math.sin(phase + p.z * .08) * p.energy * 58 * dt
    p.vz += Math.cos(phase * 1.37 + p.x * .07) * p.energy * 58 * dt
    p.vy += Math.sin(phase * .83 + p.x * .05) * p.energy * 42 * dt
    // Gentle effective buoyancy instead of the previous strong downward gravity
    p.vy += (p.restY - p.y) * .8 * dt
    const damping = Math.exp(-p.drag * dt)
    p.vx *= damping; p.vz *= damping; p.vy *= Math.exp(-1.8 * dt)
    const speed = Math.hypot(p.vx, p.vy, p.vz)
    if (speed > 160) { p.vx *= 160 / speed; p.vy *= 160 / speed; p.vz *= 160 / speed }
    p.x += p.vx * dt; p.z += p.vz * dt; p.y += p.vy * dt
    contain(p)
    collideStraw(p, straw)
    contain(p)
  }
  // Resolve collisions in full 3D so pearls can pass above/below each other
  for (let pass = 0; pass < 2; pass++) {
    for (let i = 0; i < pearls.length; i++) for (let j = i + 1; j < pearls.length; j++) {
      const a = pearls[i], b = pearls[j]
      const dx = b.x-a.x, dy = b.y-a.y, dz = b.z-a.z
      const distance = Math.hypot(dx,dy,dz)
      const diameter = a.radius + b.radius
      if (distance >= diameter) continue
      const nx = distance > .001 ? dx/distance : 1
      const ny = distance > .001 ? dy/distance : 0
      const nz = distance > .001 ? dz/distance : 0
      const invA = 1 / a.radius ** 3, invB = 1 / b.radius ** 3
      const weightA = invA / (invA + invB), weightB = 1 - weightA
      const overlap = diameter-distance
      a.x -= nx*overlap*weightA; a.y -= ny*overlap*weightA; a.z -= nz*overlap*weightA
      b.x += nx*overlap*weightB; b.y += ny*overlap*weightB; b.z += nz*overlap*weightB
      const approach = (b.vx-a.vx)*nx + (b.vy-a.vy)*ny + (b.vz-a.vz)*nz
      if (approach < 0) {
        const impact = approach * 1.35
        a.vx += impact*nx*weightA; a.vy += impact*ny*weightA; a.vz += impact*nz*weightA
        b.vx -= impact*nx*weightB; b.vy -= impact*ny*weightB; b.vz -= impact*nz*weightB
      }
    }
    pearls.forEach(p => { contain(p); collideStraw(p, straw); contain(p) })
  }
  return pearls
}
