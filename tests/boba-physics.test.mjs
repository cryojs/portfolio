import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createPearls, stepPearls } from '../src/components/bobaPhysics.js'

test('stirring stays bounded and retains a volume of independent pearls', () => {
  const pearls = createPearls()
  assert.equal(pearls.length, 16)
  let previous = {x:0,z:0}
  for (let i = 0; i < 1800; i++) {
    const straw = {x:Math.sin(i/12)*40,z:Math.cos(i/12)*40}
    stepPearls(pearls, straw, {x:straw.x-previous.x,z:straw.z-previous.z}, 1/60)
    previous = straw
    for (const p of pearls) {
      assert.ok(Number.isFinite(p.x+p.y+p.z+p.vx+p.vy+p.vz))
      assert.ok(Math.hypot(p.x,p.z) <= 62-p.radius+.001)
      assert.ok(p.y >= -78 && p.y <= 0)
    }
  }
  const radii = pearls.map(p => Math.hypot(p.x,p.z))
  assert.ok(Math.max(...radii)-Math.min(...radii) > 15, 'not one shared ring')
  assert.ok(Math.max(...pearls.map(p=>p.y))-Math.min(...pearls.map(p=>p.y)) > 25, 'multiple vertical layers')
})

test('pearls settle gently with some suspended and the simulation can sleep', () => {
  const pearls = createPearls()
  stepPearls(pearls, {x:15,z:10}, {x:18,z:18}, 1/60)
  for (let i=0;i<3600;i++) stepPearls(pearls,{x:15,z:10},{x:0,z:0},1/60)
  assert.ok(pearls.filter(p=>p.y < -15).length >= 6)
  assert.ok(pearls.some(p=>p.y > -10))
  assert.ok(pearls.every(p=>Math.hypot(p.vx,p.vy,p.vz) < .3 && p.energy < .02))
})
