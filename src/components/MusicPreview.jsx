import { useEffect, useId, useRef, useState } from 'react'
import { ChevronDown, ChevronUp, Pause, Play, RotateCcw, Volume2, VolumeX } from 'lucide-react'
import './MusicPreview.css'

const TRACKS = [
  {
    title: 'make you my what',
    artist: 'quadeca · kmoe',
    album: 'life 1',
    trackNumber: 6,
    cover: '/audio/life-1-cover.png',
    src: '/audio/Make you my what.opus',
  },
  {
    title: 'hell of a time',
    artist: 'quadeca',
    album: 'life 1',
    trackNumber: 11,
    cover: '/audio/life-1-cover.png',
    src: '/audio/Quadeca - Hell of a time.opus',
  },
]

const MAX_VOLUME = 0.5
const DEFAULT_VOLUME = 0.42
const VOLUME_CURVE = 1.7

function formatTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00'
  const minutes = Math.floor(seconds / 60)
  const remainder = Math.floor(seconds % 60).toString().padStart(2, '0')
  return `${minutes}:${remainder}`
}

function MusicTrack({ track }) {
  const audioRef = useRef(null)
  const detailsControlRef = useRef(null)
  const detailsToggleRef = useRef(null)
  const previousVolume = useRef(DEFAULT_VOLUME)
  const detailsId = useId()
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [audioAvailable, setAudioAvailable] = useState(true)
  const [volume, setVolume] = useState(DEFAULT_VOLUME)
  const [detailsOpen, setDetailsOpen] = useState(false)

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = MAX_VOLUME * volume ** VOLUME_CURVE
  }, [volume])

  useEffect(() => {
    if (!detailsOpen) return
    function dismiss(event) {
      if (!detailsControlRef.current?.contains(event.target)) setDetailsOpen(false)
    }
    function escape(event) {
      if (event.key !== 'Escape') return
      setDetailsOpen(false)
      detailsToggleRef.current?.focus()
    }
    document.addEventListener('pointerdown', dismiss)
    document.addEventListener('keydown', escape)
    return () => {
      document.removeEventListener('pointerdown', dismiss)
      document.removeEventListener('keydown', escape)
    }
  }, [detailsOpen])

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
    setCurrentTime(audio.currentTime || 0)
    setDuration(audio.duration || 0)
    setProgress(audio.duration ? (audio.currentTime / audio.duration) * 100 : 0)
  }

  function seek(event) {
    const audio = audioRef.current
    if (!audio || !Number.isFinite(audio.duration)) return
    audio.currentTime = Number(event.target.value)
    updateProgress({ currentTarget: audio })
  }

  return (
    <span className="music-card" data-playing={playing} data-audio-state={audioAvailable ? 'ready' : 'missing'}>
      <span className="music-card-controls">
        <button type="button" className="music-card-play" aria-label={`${playing ? 'pause' : 'play'} ${track.title}`} aria-pressed={playing}
          disabled={!audioAvailable} onClick={play}>
          {playing ? <Pause aria-hidden="true" size={12} strokeWidth={2.4} /> : <Play aria-hidden="true" size={12} strokeWidth={2.4} />}
        </button>
      </span>
      <span className="music-track-title">{track.title}</span>
      <span className="music-card-right-controls">
        <span className="music-details-control" ref={detailsControlRef}>
          <button ref={detailsToggleRef} type="button" className="music-more-toggle" aria-label={`more details for ${track.title}`}
            aria-expanded={detailsOpen} aria-controls={detailsId} onClick={() => setDetailsOpen((open) => !open)}>
            {detailsOpen ? <ChevronDown aria-hidden="true" size={16} strokeWidth={2.3} /> : <ChevronUp aria-hidden="true" size={16} strokeWidth={2.3} />}
          </button>
          {detailsOpen && (
            <span id={detailsId} className="music-details-popover" role="dialog" aria-label={`${track.title} details`}>
              <span className="music-details-overview">
                <img className="music-details-cover" src={track.cover} alt={`${track.album} album cover`} />
                <span className="music-details-copy">
                  <strong className="music-details-title">{track.title}</strong>
                  <span className="music-details-artist">{track.artist}</span>
                  <span className="music-details-album-badge" aria-label={`${track.album}, track ${track.trackNumber}`}>
                    <span>{track.album}</span>
                    <span aria-hidden="true">·</span>
                    <span>track {String(track.trackNumber).padStart(2, '0')}</span>
                  </span>
                </span>
              </span>
              <input className="music-details-progress" type="range" min="0" max={duration || 0} step="0.01" value={duration ? currentTime : 0}
                aria-label={`seek ${track.title}`} aria-valuemin="0" aria-valuemax={duration || 0} aria-valuenow={currentTime}
                style={{ '--progress-level': `${progress}%` }} disabled={!duration} onChange={seek} />
              <span className="music-details-time"><span>{formatTime(currentTime)}</span><span>{formatTime(duration)}</span></span>
              <span className="music-details-controls">
                <button type="button" className="music-detail-action" aria-label={`${playing ? 'pause' : 'play'} ${track.title}`} aria-pressed={playing} disabled={!audioAvailable} onClick={play}>
                  {playing ? <Pause aria-hidden="true" size={15} strokeWidth={2.2} /> : <Play aria-hidden="true" size={15} strokeWidth={2.2} />}
                </button>
                <button type="button" className="music-detail-action" aria-label={`restart ${track.title}`} disabled={!audioAvailable} onClick={restart}>
                  <RotateCcw aria-hidden="true" size={15} strokeWidth={2.2} />
                </button>
                <span className="music-detail-volume">
                  <button type="button" className="music-mute" aria-label={`${volume === 0 ? 'unmute' : 'mute'} ${track.title}`} onClick={toggleMute}>
                    {volume === 0 ? <VolumeX size={15} aria-hidden="true" /> : <Volume2 size={15} aria-hidden="true" />}
                  </button>
                  <input className="music-volume-slider" type="range"
                    min="0" max="1" step="0.01" value={volume} aria-label={`volume level for ${track.title}`}
                    aria-valuetext={`${Math.round(volume * 100)}%`} style={{ '--volume-level': `${volume * 100}%` }}
                    onChange={(event) => setVolume(Number(event.target.value))} />
                  <output>{Math.round(volume * 100)}%</output>
                </span>
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
