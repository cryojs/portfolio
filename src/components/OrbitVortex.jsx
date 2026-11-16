import { useEffect, useRef } from 'react'

const TAU = Math.PI * 2
const STEPS = 48

// Stable geometry: nothing respawns or wraps across the scene. Each ribbon
// rotates continuously in world space, then gets projected through one camera.
function createField() {
  let seed = 43
  const random = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0
    return seed / 4294967296
  }
  const ribbons = Array.from({ length: 56 }, (_, index) => {
    const radius = 0.58 + random() * 1.8
    const length = 0.45 + random() * 1.8
    const depth = (random() - 0.5) * 0.38
    return {
      points: Array.from({ length: STEPS + 1 }, (_, step) => {
        const t = step / STEPS
        const angle = t * length
        const r = radius * (1 - t * 0.15)
        return [Math.cos(angle) * r, Math.sin(angle) * r, depth + Math.sin(t * Math.PI) * 0.04, Math.sin(t * Math.PI) ** 1.4]
      }),
      phase: random() * TAU,
      speed: (0.025 + random() * 0.018) / radius,
      width: index % 7 === 0 ? 0.009 : 0.001 + random() * 0.0022,
      alpha: index % 7 === 0 ? 0.12 : 0.12 + random() * 0.24,
      tone: index % 4,
    }
  })
  const stars = Array.from({ length: 28 }, (_, index) => ({
    x: random(), y: random(), depth: random(),
    size: 0.6 + random() * 1.1, cross: index % 9 === 0,
  }))
  return { ribbons, stars }
}

const FIELD = createField()
const DARK = ['69, 87, 225', '61, 84, 202', '114, 132, 231', '151, 171, 240']
const LIGHT = ['72, 90, 211', '91, 110, 214', '74, 92, 187', '57, 74, 168']

export default function OrbitVortex({ motionRef }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d', { alpha: true })
    if (!context) return undefined
    const site = canvas.closest('.site')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const projected = new Float32Array((STEPS + 1) * 3)
    let width = 0
    let height = 0
    let light = site.classList.contains('theme-paper')
    let frame = 0
    let last = 0
    let elapsed = 0
    let visible = true

    function draw(now) {
      frame = 0
      const dt = last ? Math.min(now - last, 40) : 0
      last = now
      if (!reduced.matches) elapsed += dt / 1000
      const { x, y } = reduced.matches ? { x: 0, y: 0 } : motionRef.current
      context.clearRect(0, 0, width, height)
      const mobile = width <= 900
      const radius = mobile ? width * 0.57 : Math.min(width * 0.39, height * 0.71)
      const cx = width / 2 - x * 13
      const cy = mobile ? 178 : height * 0.53
      const tilt = 1.04 - y * 0.035
      const cosTilt = Math.cos(tilt), sinTilt = Math.sin(tilt)
      const yaw = x * 0.035
      const cosYaw = Math.cos(yaw), sinYaw = Math.sin(yaw)
      const focal = Math.max(width, height) * 1.65
      const palette = light ? LIGHT : DARK

      for (const ribbon of FIELD.ribbons) {
        const angle = ribbon.phase + elapsed * ribbon.speed
        const cos = Math.cos(angle), sin = Math.sin(angle)
        for (let i = 0; i <= STEPS; i++) {
          const [px, py, pz] = ribbon.points[i]
          const rx = (px * cos - py * sin) * radius
          const ry = (px * sin + py * cos) * radius
          const z = pz * radius
          const ty = ry * cosTilt - z * sinTilt
          const tz = ry * sinTilt + z * cosTilt
          const tx = rx * cosYaw + tz * sinYaw
          const depth = -rx * sinYaw + tz * cosYaw
          const perspective = focal / (focal - depth)
          projected[i * 3] = cx + tx * perspective
          projected[i * 3 + 1] = cy + (ty - y * 12) * perspective
          projected[i * 3 + 2] = perspective
        }
        // Tapered silhouettes suggest long-exposure motion without expensive
        // per-path blur filters or hundreds of composited DOM layers.
        context.beginPath()
        for (let side = 0; side < 2; side++) {
          for (let n = 0; n <= STEPS; n++) {
            const i = side ? STEPS - n : n
            const prev = Math.max(0, i - 1) * 3
            const next = Math.min(STEPS, i + 1) * 3
            const dx = projected[next] - projected[prev]
            const dy = projected[next + 1] - projected[prev + 1]
            const length = Math.hypot(dx, dy) || 1
            const half = radius * ribbon.width * ribbon.points[i][3] * projected[i * 3 + 2]
            const sign = side ? -1 : 1
            const sx = projected[i * 3] - dy / length * half * sign
            const sy = projected[i * 3 + 1] + dx / length * half * sign
            if (!side && !n) context.moveTo(sx, sy)
            else context.lineTo(sx, sy)
          }
        }
        context.closePath()
        context.fillStyle = `rgba(${palette[ribbon.tone]}, ${ribbon.alpha * (mobile ? 0.65 : 1)})`
        context.fill()
      }
      for (const star of FIELD.stars) {
        const sx = star.x * width - x * (6 + star.depth * 17)
        const sy = star.y * height - y * (4 + star.depth * 12)
        context.fillStyle = `rgba(${palette[3]}, ${light ? 0.36 : 0.3 + star.depth * 0.25})`
        context.beginPath()
        context.arc(sx, sy, star.size, 0, TAU)
        context.fill()
        if (star.cross) {
          context.globalAlpha = 0.45
          context.fillRect(sx - 4, sy - 0.4, 8, 0.8)
          context.fillRect(sx - 0.4, sy - 4, 0.8, 8)
          context.globalAlpha = 1
        }
      }
      if (!reduced.matches && visible && !document.hidden) frame = requestAnimationFrame(draw)
    }

    function wake() {
      cancelAnimationFrame(frame)
      frame = 0
      last = 0
      if (visible && !document.hidden) frame = requestAnimationFrame(draw)
    }
    function resize() {
      width = canvas.clientWidth
      height = canvas.clientHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      wake()
    }
    const sizeObserver = new ResizeObserver(resize)
    sizeObserver.observe(canvas)
    const themeObserver = new MutationObserver(() => {
      light = site.classList.contains('theme-paper')
      wake()
    })
    themeObserver.observe(site, { attributes: true, attributeFilter: ['class'] })
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      wake()
    })
    intersection.observe(canvas)
    reduced.addEventListener('change', wake)
    document.addEventListener('visibilitychange', wake)
    return () => {
      cancelAnimationFrame(frame)
      sizeObserver.disconnect()
      themeObserver.disconnect()
      intersection.disconnect()
      reduced.removeEventListener('change', wake)
      document.removeEventListener('visibilitychange', wake)
    }
  }, [motionRef])

  return <canvas ref={canvasRef} className="orbit-vortex" aria-hidden="true" />
}
