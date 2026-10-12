import { useEffect, useId, useRef, useState } from 'react'
import { Pause, Play, RotateCcw, Volume2, VolumeX } from 'lucide-react'
import './MusicPreview.css'

const TRACKS = [
  { title: 'make you my what', src: '/audio/Make you my what.opus' },
  { title: 'hell of a time', src: '/audio/Quadeca - Hell of a time.opus' },
]

const MAX_VOLUME = 0.5
const DEFAULT_VOLUME = 0.42
const VOLUME_CURVE = 1.7

function MusicTrack({ track }) {
  const audioRef = useRef(null)
  const volumeControlRef = useRef(null)
  const volumeToggleRef = useRef(null)
  const previousVolume = useRef(DEFAULT_VOLUME)
  const sliderId = useId()
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [audioAvailable, setAudioAvailable] = useState(true)
  const [volume, setVolume] = useState(DEFAULT_VOLUME)
  const [volumeOpen, setVolumeOpen] = useState(false)

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = MAX_VOLUME * volume ** VOLUME_CURVE
  }, [volume])

  useEffect(() => {
    if (!volumeOpen) return
    function dismiss(event) {
      if (!volumeControlRef.current?.contains(event.target)) setVolumeOpen(false)
    }
    function escape(event) {
      if (event.key !== 'Escape') return
      setVolumeOpen(false)
      volumeToggleRef.current?.focus()
    }
    document.addEventListener('pointerdown', dismiss)
    document.addEventListener('keydown', escape)
    return () => {
      document.removeEventListener('pointerdown', dismiss)
      document.removeEventListener('keydown', escape)
    }
  }, [volumeOpen])

  function toggleMute() {
    if (volume > 0) {
      previousVolume.current = volume
      setVolume(0)
    } else {
      setVolume(previousVolume.current)
    }
  }

  function play() {
    const audio = audioRef.current
    if (!audio || !audioAvailable) return
    if (audio.paused) {
      audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false))
    } else {
      audio.pause()
      setPlaying(false)
    }
  }

  function restart() {
    const audio = audioRef.current
    if (!audio || !audioAvailable) return
    audio.currentTime = 0
    audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false))
  }

  function updateProgress(event) {
    const audio = event.currentTarget
    setProgress(audio.duration ? (audio.currentTime / audio.duration) * 100 : 0)
  }

  return (
    <span className="music-card" data-playing={playing} data-audio-state={audioAvailable ? 'ready' : 'missing'}>
      <span className="music-card-controls">
        <button type="button" aria-label={`${playing ? 'pause' : 'play'} ${track.title}`} aria-pressed={playing}
          disabled={!audioAvailable} onClick={play}>
          {playing ? <Pause aria-hidden="true" size={12} strokeWidth={2.4} /> : <Play aria-hidden="true" size={12} strokeWidth={2.4} />}
        </button>
        <button type="button" aria-label={`restart ${track.title}`} disabled={!audioAvailable} onClick={restart}>
          <RotateCcw aria-hidden="true" size={12} strokeWidth={2.4} />
        </button>
      </span>
      <span className="music-track-title">{track.title}</span>
      <span className="music-card-right-controls">
        <span className="music-volume-control" ref={volumeControlRef}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setVolumeOpen(false)
          }}>
          <button ref={volumeToggleRef} type="button" className="music-volume-toggle" aria-label={`volume ${track.title}`}
            aria-expanded={volumeOpen} aria-controls={sliderId} onClick={() => setVolumeOpen((open) => !open)}>
            {volume === 0 ? <VolumeX aria-hidden="true" size={13} strokeWidth={2.2} /> : <Volume2 aria-hidden="true" size={13} strokeWidth={2.2} />}
          </button>
          {volumeOpen && (
            <span id={sliderId} className="music-volume-popover" role="group" aria-label={`${track.title} volume controls`}>
              <span className="music-volume-heading"><span>volume</span><output>{Math.round(volume * 100)}%</output></span>
              <span className="music-volume-row">
                <button type="button" className="music-mute" aria-label={`${volume === 0 ? 'unmute' : 'mute'} ${track.title}`} onClick={toggleMute}>
                  {volume === 0 ? <VolumeX size={16} aria-hidden="true" /> : <Volume2 size={16} aria-hidden="true" />}
                </button>
                <input className="music-volume-slider" type="range"
                  min="0" max="1" step="0.01" value={volume} aria-label={`volume level for ${track.title}`}
                  aria-valuetext={`${Math.round(volume * 100)}%`} style={{ '--volume-level': `${volume * 100}%` }}
                  onChange={(event) => setVolume(Number(event.target.value))} />
              </span>
            </span>
          )}
        </span>
      </span>
      <span className="music-progress" role="progressbar" aria-label={`${track.title} progress`}
        aria-valuemin="0" aria-valuemax="100" aria-valuenow={Math.round(progress)}>
        <span style={{ width: `${progress}%` }} />
      </span>
      <audio ref={audioRef} src={track.src} preload="metadata"
        onTimeUpdate={updateProgress}
        onLoadedMetadata={updateProgress}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => { setPlaying(false); setProgress(100) }}
        onError={() => { setAudioAvailable(false); setPlaying(false) }} />
    </span>
  )
}

export default function MusicPreview() {
  return (
    <span className="music-preview" aria-label="currently listening">
      <MusicTrack track={TRACKS[0]} />
      <span className="music-joiner">and</span>
      <MusicTrack track={TRACKS[1]} />
    </span>
  )
}
