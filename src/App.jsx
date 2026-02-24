import { useState, useEffect } from 'react'
import './App.css'

/* ─────────────── tiny SVG helpers ─────────────── */
const ChibiBear = ({ size = 120, color = '#4a7c59' }) => (
  <svg width={size} height={size} viewBox="0 0 120 120" className="chibi-bounce">
    {/* ears */}
    <circle cx="35" cy="25" r="18" fill={color} />
    <circle cx="85" cy="25" r="18" fill={color} />
    <circle cx="35" cy="25" r="12" fill="#c8e6c9" />
    <circle cx="85" cy="25" r="12" fill="#c8e6c9" />
    {/* body */}
    <ellipse cx="60" cy="65" rx="38" ry="40" fill={color} />
    {/* belly */}
    <ellipse cx="60" cy="72" rx="28" ry="26" fill="#c8e6c9" />
    {/* eyes */}
    <circle cx="48" cy="52" r="5" fill="#2d2d2d" />
    <circle cx="72" cy="52" r="5" fill="#2d2d2d" />
    <circle cx="49.5" cy="50.5" r="1.8" fill="#fff" />
    <circle cx="73.5" cy="50.5" r="1.8" fill="#fff" />
    {/* nose */}
    <ellipse cx="60" cy="60" rx="4" ry="3" fill="#795548" />
    {/* mouth */}
    <path d="M54 65 Q60 72 66 65" stroke="#795548" strokeWidth="2" fill="none" strokeLinecap="round" />
    {/* blush */}
    <ellipse cx="40" cy="62" rx="6" ry="4" fill="#f8bbd0" opacity="0.5" />
    <ellipse cx="80" cy="62" rx="6" ry="4" fill="#f8bbd0" opacity="0.5" />
    {/* heart on belly */}
    <path d="M56 78 Q56 74 60 74 Q64 74 64 78 Q64 82 60 86 Q56 82 56 78Z" fill="#e57373" opacity="0.6" />
  </svg>
)

const ChibiBunny = ({ size = 100, color = '#4a7c59' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" className="chibi-bounce">
    {/* ears */}
    <ellipse cx="35" cy="18" rx="10" ry="22" fill={color} />
    <ellipse cx="65" cy="18" rx="10" ry="22" fill={color} />
    <ellipse cx="35" cy="18" rx="6" ry="16" fill="#c8e6c9" />
    <ellipse cx="65" cy="18" rx="6" ry="16" fill="#c8e6c9" />
    {/* head */}
    <circle cx="50" cy="52" r="28" fill={color} />
    {/* face */}
    <circle cx="50" cy="55" r="20" fill="#c8e6c9" />
    {/* eyes */}
    <circle cx="42" cy="48" r="4" fill="#2d2d2d" />
    <circle cx="58" cy="48" r="4" fill="#2d2d2d" />
    <circle cx="43" cy="47" r="1.5" fill="#fff" />
    <circle cx="59" cy="47" r="1.5" fill="#fff" />
    {/* nose */}
    <ellipse cx="50" cy="54" rx="3" ry="2.5" fill="#f8bbd0" />
    {/* mouth */}
    <path d="M46 58 Q50 63 54 58" stroke="#795548" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    {/* blush */}
    <ellipse cx="36" cy="55" rx="5" ry="3" fill="#f8bbd0" opacity="0.4" />
    <ellipse cx="64" cy="55" rx="5" ry="3" fill="#f8bbd0" opacity="0.4" />
    {/* body */}
    <ellipse cx="50" cy="82" rx="18" ry="14" fill={color} />
    <ellipse cx="50" cy="85" rx="12" ry="9" fill="#c8e6c9" />
  </svg>
)

const FloatingHeart = ({ style, color = '#4a7c59' }) => (
  <div className="floating-heart" style={style}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill={color}>
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  </div>
)

const Sparkle = ({ style }) => (
  <div className="sparkle" style={style}>✦</div>
)

/* ─────────── page components ─────────── */

/* ① Landing Page */
function LandingPage({ onYes }) {
  const [noPos, setNoPos] = useState({ x: 0, y: 0 })
  const [noCount, setNoCount] = useState(0)
  const [yesSize, setYesSize] = useState(1)
  const [showHearts, setShowHearts] = useState(false)

  const noMessages = [
    'No', 'H-h-h-hey', 'Are you sure about this?', 'I like the smell of ur bra, dont u forget about this',
    'Frisk will be sad', 'No more potato mash for u', 'Ill make u coffee',
    "Ill flash my bum for u", 'Ill let u get 1 min of boobie grab', "FINAL WARNING",
    "BOOBICLES MODE ACTIVATED ( .  人  . )"
  ]

  const runAway = () => {
    // Pick a random angle and distance that keeps the No button far from the Yes button
    const angle = Math.random() * 2 * Math.PI
    const distance = 180 + Math.random() * 120 // always 180-300px away
    const x = Math.cos(angle) * distance
    // Bias y to keep it above (negative) or far below, never near the Yes button
    const y = Math.sin(angle) * distance
    // Clamp so it stays within viewport
    const clampedX = Math.max(-window.innerWidth / 2 + 80, Math.min(window.innerWidth / 2 - 80, x))
    const clampedY = Math.max(-window.innerHeight / 2 + 40, Math.min(window.innerHeight / 2 - 80, y))
    setNoPos({ x: clampedX, y: clampedY })
    setNoCount(c => c + 1)
    setYesSize(s => Math.min(s + 0.18, 2.8))
  }

  const handleYes = () => {
    setShowHearts(true)
    setTimeout(onYes, 2000)
  }

  return (
    <div className="page landing-page">
      <div className="hearts-bg">
        {Array.from({ length: 18 }).map((_, i) => (
          <FloatingHeart key={i} style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 4}s`,
            opacity: 0.12 + Math.random() * 0.18
          }} />
        ))}
      </div>
      {Array.from({ length: 10 }).map((_, i) => (
        <Sparkle key={i} style={{
          left: `${10 + Math.random() * 80}%`,
          top: `${10 + Math.random() * 80}%`,
          animationDelay: `${Math.random() * 3}s`
        }} />
      ))}
      <ChibiBear size={150} />
      <h1 className="title-text">Will you be my Valentine?</h1>
      <p className="subtitle-text">💚 Pretty pretty please? 💚</p>
      <div className="button-area">
        <button
          className="btn btn-no"
          style={{
            transform: `translate(${noPos.x}px, ${noPos.y}px)`,
            transition: 'transform 0.3s cubic-bezier(.34,1.56,.64,1)',
            zIndex: 5,
            position: noCount > 0 ? 'absolute' : 'relative'
          }}
          onMouseEnter={runAway}
          onTouchStart={runAway}
          onClick={runAway}
        >
          {noMessages[Math.min(noCount, noMessages.length - 1)]}
        </button>
        <button
          className="btn btn-yes"
          style={{ transform: `scale(${yesSize})`, zIndex: 10 }}
          onClick={handleYes}
        >
          Yes! 💚
        </button>
      </div>
      {showHearts && (
        <div className="heart-explosion">
          {Array.from({ length: 40 }).map((_, i) => (
            <FloatingHeart key={i} color={['#4a7c59', '#81c784', '#a5d6a7', '#c8e6c9', '#f8bbd0'][i % 5]} style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 0.5}s`,
              animationDuration: `${0.5 + Math.random()}s`
            }} />
          ))}
          <h2 className="yay-text">YAY!! 💚💚💚</h2>
        </div>
      )}
    </div>
  )
}

/* ② Photo Gallery / Timeline */
function PhotoCarousel({ photos, month, onPhotoClick }) {
  const [current, setCurrent] = useState(0)

  if (photos.length === 1) {
    return (
      <div className="photo-frame" onClick={() => onPhotoClick && onPhotoClick(0)}>
        <img src={photos[0]} alt={month} className="gallery-photo" />
        <div className="photo-zoom-hint">🔍 Tap to view</div>
      </div>
    )
  }

  return (
    <div className="photo-carousel">
      <div className="photo-frame" onClick={() => onPhotoClick && onPhotoClick(current)}>
        <img src={photos[current]} alt={`${month} ${current + 1}`} className="gallery-photo" />
        <div className="photo-zoom-hint">🔍 Tap to view</div>
      </div>
      <div className="carousel-controls">
        <button
          className="carousel-btn"
          onClick={(e) => { e.stopPropagation(); setCurrent((current - 1 + photos.length) % photos.length) }}
        >‹</button>
        <span className="carousel-dots">
          {photos.map((_, i) => (
            <span
              key={i}
              className={`carousel-dot ${i === current ? 'active' : ''}`}
              onClick={(e) => { e.stopPropagation(); setCurrent(i) }}
            />
          ))}
        </span>
        <button
          className="carousel-btn"
          onClick={(e) => { e.stopPropagation(); setCurrent((current + 1) % photos.length) }}
        >›</button>
      </div>
    </div>
  )
}

/* Photo Lightbox — fullscreen viewer with month-to-month transitions */
function PhotoLightbox({ months, initialMonth, initialPhoto, onClose }) {
  const [monthIdx, setMonthIdx] = useState(initialMonth)
  const [photoIdx, setPhotoIdx] = useState(initialPhoto)
  const [transition, setTransition] = useState('') // 'slide-left', 'slide-right', 'slide-up', 'slide-down'
  const [touchStart, setTouchStart] = useState(null)

  const month = months[monthIdx]
  const photos = month.photos

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight') goNextPhoto()
      else if (e.key === 'ArrowLeft') goPrevPhoto()
      else if (e.key === 'ArrowDown') goNextMonth()
      else if (e.key === 'ArrowUp') goPrevMonth()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  })

  const animateTransition = (dir, cb) => {
    setTransition(dir)
    setTimeout(() => {
      cb()
      setTransition(dir.replace('slide', 'enter'))
      setTimeout(() => setTransition(''), 350)
    }, 250)
  }

  const goNextPhoto = () => {
    if (photoIdx < photos.length - 1) {
      animateTransition('slide-left', () => setPhotoIdx(p => p + 1))
    } else if (monthIdx < months.length - 1) {
      goNextMonth()
    }
  }

  const goPrevPhoto = () => {
    if (photoIdx > 0) {
      animateTransition('slide-right', () => setPhotoIdx(p => p - 1))
    } else if (monthIdx > 0) {
      goPrevMonth()
    }
  }

  const goNextMonth = () => {
    if (monthIdx < months.length - 1) {
      animateTransition('slide-up', () => {
        setMonthIdx(m => m + 1)
        setPhotoIdx(0)
      })
    }
  }

  const goPrevMonth = () => {
    if (monthIdx > 0) {
      animateTransition('slide-down', () => {
        setMonthIdx(m => m - 1)
        setPhotoIdx(0)
      })
    }
  }

  // Touch / swipe support
  const handleTouchStart = (e) => {
    setTouchStart({ x: e.touches[0].clientX, y: e.touches[0].clientY })
  }
  const handleTouchEnd = (e) => {
    if (!touchStart) return
    const dx = e.changedTouches[0].clientX - touchStart.x
    const dy = e.changedTouches[0].clientY - touchStart.y
    const absDx = Math.abs(dx)
    const absDy = Math.abs(dy)
    if (Math.max(absDx, absDy) < 40) return // too small
    if (absDx > absDy) {
      dx < 0 ? goNextPhoto() : goPrevPhoto()
    } else {
      dy < 0 ? goNextMonth() : goPrevMonth()
    }
    setTouchStart(null)
  }

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <div
        className="lightbox-container"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Close button */}
        <button className="lightbox-close" onClick={onClose}>✕</button>

        {/* Month label with emoji */}
        <div className="lightbox-month-label">
          <button
            className="lightbox-month-nav"
            onClick={goPrevMonth}
            disabled={monthIdx === 0}
          >▲</button>
          <span className="lightbox-month-text">
            {month.emoji} {month.month} {month.emoji}
          </span>
          <button
            className="lightbox-month-nav"
            onClick={goNextMonth}
            disabled={monthIdx === months.length - 1}
          >▼</button>
        </div>

        {/* Photo area */}
        <div className="lightbox-photo-area">
          <button
            className="lightbox-arrow lightbox-arrow-left"
            onClick={goPrevPhoto}
            disabled={photoIdx === 0 && monthIdx === 0}
          >‹</button>

          <div className={`lightbox-photo-wrapper ${transition}`}>
            <img
              src={photos[photoIdx]}
              alt={`${month.month} photo ${photoIdx + 1}`}
              className="lightbox-photo"
            />
          </div>

          <button
            className="lightbox-arrow lightbox-arrow-right"
            onClick={goNextPhoto}
            disabled={photoIdx === photos.length - 1 && monthIdx === months.length - 1}
          >›</button>
        </div>

        {/* Dots for current month's photos */}
        <div className="lightbox-dots">
          {photos.map((_, i) => (
            <span
              key={i}
              className={`lightbox-dot ${i === photoIdx ? 'active' : ''}`}
              onClick={() => {
                const dir = i > photoIdx ? 'slide-left' : 'slide-right'
                animateTransition(dir, () => setPhotoIdx(i))
              }}
            />
          ))}
        </div>

        {/* Photo counter */}
        <div className="lightbox-counter">
          {photoIdx + 1} / {photos.length}
        </div>

        {/* Month progress bar */}
        <div className="lightbox-month-progress">
          {months.map((m, i) => (
            <div
              key={i}
              className={`lightbox-month-pip ${i === monthIdx ? 'active' : ''} ${i < monthIdx ? 'past' : ''}`}
              onClick={() => {
                const dir = i > monthIdx ? 'slide-up' : 'slide-down'
                animateTransition(dir, () => { setMonthIdx(i); setPhotoIdx(0) })
              }}
              title={m.month}
            >
              {m.emoji}
            </div>
          ))}
        </div>

        {/* Swipe hints */}
        <div className="lightbox-hints">
          <span>← → photos</span>
          <span>↑ ↓ months</span>
        </div>
      </div>
    </div>
  )
}

function GalleryPage({ onNext }) {
  const [lightbox, setLightbox] = useState(null) // { monthIdx, photoIdx }

  const base = import.meta.env.BASE_URL

  const months = [
    { month: 'February 2025', emoji: '💚', photos: [`${base}imgs/feb2025.jpg`] },
    { month: 'March 2025', emoji: '🌸', photos: [`${base}imgs/march.jpg`] },
    { month: 'April 2025', emoji: '🌷', photos: [`${base}imgs/april1.jpg`, `${base}imgs/april2.jpg`, `${base}imgs/april3.jpg`, `${base}imgs/april4.jpg`, `${base}imgs/april5.jpg`, `${base}imgs/april6.jpg`, `${base}imgs/april7.jpg`, `${base}imgs/april8.jpg`] },
    { month: 'May 2025', emoji: '☀️', photos: [`${base}imgs/may1.jpg`, `${base}imgs/may2.jpg`] },
    { month: 'June 2025', emoji: '🌻', photos: [`${base}imgs/june1.jpg`, `${base}imgs/june2.jpg`, `${base}imgs/june3.jpg`] },
    { month: 'July 2025', emoji: '🎆', photos: [`${base}imgs/july.jpg`, `${base}imgs/july2.jpg`] },
    { month: 'August 2025', emoji: '🏖️', photos: [`${base}imgs/aug.jpg`, `${base}imgs/aug2.jpg`, `${base}imgs/aug3.jpg`, `${base}imgs/aug4.jpg`] },
    { month: 'September 2025', emoji: '🍂', photos: [`${base}imgs/sept.jpg`] },
    { month: 'October 2025', emoji: '🎃', photos: [`${base}imgs/oct.jpg`, `${base}imgs/oct1.jpg`, `${base}imgs/oct2.jpg`] },
    { month: 'November 2025', emoji: '🍁', photos: [`${base}imgs/nov1.jpg`, `${base}imgs/nov2.jpg`] },
    { month: 'December 2025', emoji: '🎄', photos: [`${base}imgs/dec1.jpg`, `${base}imgs/dec2.jpg`, `${base}imgs/dec3.jpg`, `${base}imgs/dec4.jpg`, `${base}imgs/dec6.jpg`, `${base}imgs/dec7.jpg`] },
    { month: 'January 2026', emoji: '❄️', photos: [`${base}imgs/jan1.jpg`, `${base}imgs/jan2.jpg`, `${base}imgs/jan3.jpg`] },
    { month: 'February 2026', emoji: '💚', photos: [`${base}imgs/feb2026_1.jpg`, `${base}imgs/feb2026_2.jpg`, `${base}imgs/feb2026_3.jpg`] },
  ]

  const openLightbox = (monthIdx, photoIdx) => {
    setLightbox({ monthIdx, photoIdx })
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    setLightbox(null)
    document.body.style.overflow = ''
  }

  return (
    <div className="page gallery-page">
      <ChibiBunny size={80} />
      <h1 className="page-title">Our Year Together 💚</h1>
      <p className="page-subtitle">A look back at the last year with booniena :3</p>
      <div className="timeline">
        <div className="timeline-line" />
        {months.map((m, i) => (
          <div key={i} className={`timeline-card ${i % 2 === 0 ? 'left' : 'right'}`}
            style={{ animationDelay: `${i * 0.08}s` }}>
            <div className="timeline-dot">{m.emoji}</div>
            <div className="card-content">
              <PhotoCarousel
                photos={m.photos}
                month={m.month}
                onPhotoClick={(photoIdx) => openLightbox(i, photoIdx)}
              />
              <h3>{m.month}</h3>
            </div>
          </div>
        ))}
      </div>
      <button className="btn btn-next" onClick={onNext}>Next Adventure →</button>

      {lightbox && (
        <PhotoLightbox
          months={months}
          initialMonth={lightbox.monthIdx}
          initialPhoto={lightbox.photoIdx}
          onClose={closeLightbox}
        />
      )}
    </div>
  )
}

/* ③ Puzzle Game */
const PUZZLE_IMAGES = [`${import.meta.env.BASE_URL}puzzle/img1.jpg`, `${import.meta.env.BASE_URL}puzzle/img2.jpg`, `${import.meta.env.BASE_URL}puzzle/img3.jpg`]

function shuffleArray(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function PuzzlePage({ onNext }) {
  const [imageOrder] = useState(() => shuffleArray(PUZZLE_IMAGES))
  const [currentPuzzle, setCurrentPuzzle] = useState(0)
  const [tiles, setTiles] = useState([])
  const [solved, setSolved] = useState(false)
  const [moves, setMoves] = useState(0)
  const [draggedIdx, setDraggedIdx] = useState(null)
  const [selectedIdx, setSelectedIdx] = useState(null)
  const [pieces, setPieces] = useState([])
  const [loading, setLoading] = useState(true)
  const [transitioning, setTransitioning] = useState(false)

  useEffect(() => {
    loadImage(imageOrder[currentPuzzle])
  }, [currentPuzzle])

  const loadImage = (src) => {
    setLoading(true)
    setSolved(false)
    setMoves(0)
    setSelectedIdx(null)
    const img = new Image()
    img.onload = () => {
      sliceImage(img)
      setLoading(false)
    }
    img.src = src
  }

  const generatePuzzle = () => {
    const ordered = Array.from({ length: 9 }, (_, i) => i)
    let shuffled
    do {
      shuffled = [...ordered].sort(() => Math.random() - 0.5)
    } while (shuffled.every((v, i) => v === i))
    setTiles(shuffled)
    setSolved(false)
    setMoves(0)
    setSelectedIdx(null)
  }

  const sliceImage = (img) => {
    const size = Math.min(img.width, img.height)
    const pieceSize = size / 3
    const newPieces = []
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        const canvas = document.createElement('canvas')
        canvas.width = pieceSize
        canvas.height = pieceSize
        const ctx = canvas.getContext('2d')
        const sx = (img.width - size) / 2 + col * pieceSize
        const sy = (img.height - size) / 2 + row * pieceSize
        ctx.drawImage(img, sx, sy, pieceSize, pieceSize, 0, 0, pieceSize, pieceSize)
        newPieces.push(canvas.toDataURL())
      }
    }
    setPieces(newPieces)
    generatePuzzle()
  }

  useEffect(() => {
    if (tiles.length && tiles.every((v, i) => v === i) && moves > 0) {
      setSolved(true)
    }
  }, [tiles, moves])

  // Auto-advance to next puzzle after solving
  useEffect(() => {
    if (!solved) return
    if (currentPuzzle < PUZZLE_IMAGES.length - 1) {
      const timer = setTimeout(() => {
        setTransitioning(true)
        setTimeout(() => {
          setCurrentPuzzle(c => c + 1)
          setTransitioning(false)
        }, 800)
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [solved, currentPuzzle])

  const allDone = solved && currentPuzzle === PUZZLE_IMAGES.length - 1

  const swapTiles = (a, b) => {
    if (a === b) return
    const newTiles = [...tiles]
    ;[newTiles[a], newTiles[b]] = [newTiles[b], newTiles[a]]
    setTiles(newTiles)
    setMoves(m => m + 1)
  }

  // Desktop drag & drop
  const handleDragStart = (idx) => setDraggedIdx(idx)
  const handleDrop = (targetIdx) => {
    if (draggedIdx !== null) swapTiles(draggedIdx, targetIdx)
    setDraggedIdx(null)
  }

  // Mobile tap-to-swap
  const handleTap = (idx) => {
    if (selectedIdx === null) {
      setSelectedIdx(idx)
    } else {
      swapTiles(selectedIdx, idx)
      setSelectedIdx(null)
    }
  }

  return (
    <div className="page puzzle-page">
      <h1 className="page-title">Puzzle Time! 🧩</h1>
      <p className="page-subtitle">Drag the tiles to solve it 💚</p>

      {/* Progress dots */}
      <div className="puzzle-progress">
        {PUZZLE_IMAGES.map((_, i) => (
          <span
            key={i}
            className={`puzzle-dot ${i < currentPuzzle ? 'dot-done' : ''} ${i === currentPuzzle ? 'dot-active' : ''}`}
          >
            {i < currentPuzzle ? '✅' : i === currentPuzzle ? `${i + 1}` : `${i + 1}`}
          </span>
        ))}
      </div>

      {loading || transitioning ? (
        <p className="page-subtitle">{transitioning ? 'Next puzzle coming up... ✨' : 'Loading puzzle... ✨'}</p>
      ) : (
        <>
          <div className="puzzle-stats">
            <span className="stat-badge">🎯 Moves: {moves}</span>
            {solved && !allDone && <span className="solved-text">🎉 Solved! Next one loading...</span>}
            {allDone && <span className="solved-text">🎉 All puzzles solved!</span>}
          </div>

          <p className="puzzle-hint">
            {window.matchMedia('(hover: hover)').matches
              ? 'Drag & drop tiles to swap them!'
              : 'Tap two tiles to swap them!'}
          </p>

          <div className="puzzle-grid">
            {tiles.map((tileVal, idx) => (
              <div
                key={idx}
                className={`puzzle-tile ${draggedIdx === idx ? 'dragging' : ''} ${selectedIdx === idx ? 'selected-tile' : ''} ${solved ? 'solved-tile' : ''}`}
                draggable={!solved}
                onDragStart={() => !solved && handleDragStart(idx)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => !solved && handleDrop(idx)}
                onClick={() => !solved && handleTap(idx)}
                style={{
                  backgroundImage: `url(${pieces[tileVal]})`,
                  backgroundSize: 'cover'
                }}
              />
            ))}
          </div>

          {allDone && (
            <div className="puzzle-win">
              <ChibiBear size={80} />
              <p>You completed all 3 puzzles! You&apos;re amazing! 💚</p>
            </div>
          )}

          <div className="puzzle-actions">
            {allDone && <button className="btn btn-next" onClick={onNext}>Continue →</button>}
          </div>
        </>
      )}
    </div>
  )
}

/* ④ Reasons I Love You */
function ReasonsPage({ onNext }) {
  const [revealed, setRevealed] = useState(0)
  const [locked, setLocked] = useState(false)
  const [showLockedMsg, setShowLockedMsg] = useState(false)

  const unlockDate = new Date('2027-02-14T00:00:00')
  const isLocked = new Date() < unlockDate

  const reasons = [
    { text: 'Your smile is genuinely the best', emoji: '😊' },
    { text: 'You actually laugh at my terrible jokes', emoji: '😂' },
    { text: 'You always know what to say somehow', emoji: '💬' },
    { text: 'How kind you are to literally everyone', emoji: '🤗' },
    { text: 'The face you make when you concentrate', emoji: '🐰' },
    { text: 'I feel properly comfortable around you', emoji: '🏠' },
    { text: 'How into things you get when you care about them', emoji: '🔥' },
    { text: 'The little thoughtful things you do', emoji: '🎁' },
    { text: 'Everything is more fun with you there', emoji: '🗺️' },
    { text: 'Because you are just... you', emoji: '💚' },
  ]

  const revealNext = () => {
    if (isLocked) {
      setShowLockedMsg(true)
      return
    }
    if (revealed < reasons.length) setRevealed(r => r + 1)
  }

  return (
    <div className="page reasons-page">
      <ChibiBear size={80} />
      <h1 className="page-title">Reasons I Love You 💚</h1>
      {isLocked ? (
        <p className="page-subtitle">The hidden treasures of why boobicles loves you 🔒</p>
      ) : (
        <p className="page-subtitle">Tap to reveal each one!</p>
      )}

      <div className="reasons-list">
        {reasons.map((r, i) => (
          <div
            key={i}
            className={`reason-card ${i < revealed ? 'revealed' : 'hidden-card'}`}
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            <span className="reason-num">#{i + 1}</span>
            <span className="reason-emoji">{isLocked ? '🔒' : r.emoji}</span>
            <span className="reason-text">
              {i < revealed ? r.text : '? ? ?'}
            </span>
          </div>
        ))}
      </div>

      {showLockedMsg && isLocked && (
        <div className="locked-message fade-in" style={{ marginBottom: '1rem' }}>
          <p style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔒</p>
          <p style={{ fontWeight: 'bold', color: '#4a7c59', fontSize: '1.1rem' }}>Not unlocked till next year&apos;s Valentine&apos;s! 💚</p>
          <p style={{ fontSize: '0.9rem', opacity: 0.7, marginTop: '0.3rem' }}>See you on Feb 14, 2027</p>
        </div>
      )}

      {showLockedMsg && isLocked ? (
        <button className="btn btn-next" onClick={onNext}>Continue →</button>
      ) : revealed < reasons.length ? (
        <button className="btn btn-reveal" onClick={revealNext}>
          {isLocked ? '🔒 Reveal' : 'Reveal #' + (revealed + 1) + ' 💚'}
        </button>
      ) : (
        <div className="all-revealed">
          <ChibiBunny size={60} />
          <p>...and a million more reasons 💚</p>
          <button className="btn btn-next" onClick={() => setLocked(true)}>One More Surprise →</button>
          {locked && (
            <div className="locked-message fade-in">
              <p style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔒</p>
              <p style={{ fontWeight: 'bold', color: '#4a7c59', fontSize: '1.1rem' }}>Not unlocked till next year&apos;s Valentine&apos;s! 💚</p>
              <p style={{ fontSize: '0.9rem', opacity: 0.7, marginTop: '0.3rem' }}>See you on Feb 14, 2027</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

/* ⑥ Love Coupons */
function CouponsPage({ onNext }) {
  const [redeemed, setRedeemed] = useState({})
  const coupons = [
    { title: 'Movie Night', desc: 'Or tv show :3', emoji: '🎬' },
    { title: 'Hand Massage', desc: 'A bombastic hand massage', emoji: '🤲' },
    { title: 'Full Body Massage', desc: 'No massage gun, all hands', emoji: '💆' },
    { title: 'Foot Massage', desc: 'A soothing foot massage', emoji: '🦶' },
    { title: 'Date Night Out', desc: 'Including Frisk 🐱', emoji: '🌃' },
    { title: 'Go For a Walk', desc: 'Because I always am lazy for walks', emoji: '🚶' },
    { title: 'Chef Schlage Dinner', desc: 'Potato with gravy & chicken dinner prepped by Mr Schlage himself', emoji: '👨‍🍳' },
    { title: 'Board Game Night', desc: 'A cozy night of board games together', emoji: '🎲' },
  ]

  const redeem = (i) => setRedeemed(prev => ({ ...prev, [i]: !prev[i] }))

  return (
    <div className="page coupons-page">
      <h1 className="page-title">Love Coupons 🎟️</h1>
      <p className="page-subtitle">Redeem whenever you want - no expiry 💚</p>

      <div className="coupons-grid">
        {coupons.map((c, i) => (
          <div
            key={i}
            className={`coupon-card ${redeemed[i] ? 'redeemed' : ''}`}
            onClick={() => redeem(i)}
          >
            {redeemed[i] && <div className="coupon-stamp">✅ REDEEMED</div>}
            <span className="coupon-emoji">{c.emoji}</span>
            <h3 className="coupon-title">{c.title}</h3>
            <p className="coupon-desc">{c.desc}</p>
            <span className="coupon-redeem-text">
              {redeemed[i] ? 'Tap to undo' : '💚 Tap to redeem'}
            </span>
          </div>
        ))}
      </div>

      <button className="btn btn-next" onClick={onNext}>Continue →</button>
    </div>
  )
}

/* ⑤ Compatibility Quiz */
function RankList({ items, correctOrder, onSubmit, answered, wasCorrect }) {
  const [order, setOrder] = useState(() => items.map((_, i) => i))
  const [dragIdx, setDragIdx] = useState(null)
  const [dragOverIdx, setDragOverIdx] = useState(null)
  const [touchStartY, setTouchStartY] = useState(null)
  const [touchDragIdx, setTouchDragIdx] = useState(null)

  // Desktop drag handlers
  const handleDragStart = (e, idx) => {
    if (answered) return
    setDragIdx(idx)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e, idx) => {
    e.preventDefault()
    if (dragIdx === null || dragIdx === idx) return
    setDragOverIdx(idx)
  }

  const handleDrop = (e, idx) => {
    e.preventDefault()
    if (dragIdx === null || dragIdx === idx) return
    const newOrder = [...order]
    const [moved] = newOrder.splice(dragIdx, 1)
    newOrder.splice(idx, 0, moved)
    setOrder(newOrder)
    setDragIdx(null)
    setDragOverIdx(null)
  }

  const handleDragEnd = () => {
    setDragIdx(null)
    setDragOverIdx(null)
  }

  // Touch drag handlers
  const handleTouchStart = (e, idx) => {
    if (answered) return
    setTouchDragIdx(idx)
    setTouchStartY(e.touches[0].clientY)
  }

  const handleTouchMove = (e, idx) => {
    if (touchDragIdx === null) return
    const currentY = e.touches[0].clientY
    const elements = document.querySelectorAll('.rank-item')
    for (let i = 0; i < elements.length; i++) {
      const rect = elements[i].getBoundingClientRect()
      if (currentY >= rect.top && currentY <= rect.bottom && i !== touchDragIdx) {
        setDragOverIdx(i)
        break
      }
    }
  }

  const handleTouchEnd = () => {
    if (touchDragIdx !== null && dragOverIdx !== null && touchDragIdx !== dragOverIdx) {
      const newOrder = [...order]
      const [moved] = newOrder.splice(touchDragIdx, 1)
      newOrder.splice(dragOverIdx, 0, moved)
      setOrder(newOrder)
    }
    setTouchDragIdx(null)
    setDragOverIdx(null)
    setTouchStartY(null)
  }

  const handleLockIn = () => {
    if (answered) return
    onSubmit(order)
  }

  return (
    <div className="rank-list">
      {!answered && <p className="quiz-rank-hint">Drag to reorder, then lock in your answer</p>}
      <div className="rank-items">
        {order.map((optIdx, pos) => {
          const correctPos = correctOrder.indexOf(optIdx)
          let itemClass = 'rank-item'
          if (dragIdx === pos || touchDragIdx === pos) itemClass += ' dragging'
          if (dragOverIdx === pos) itemClass += ' drag-over'
          if (answered) {
            itemClass += ' answered'
            if (pos === correctPos) itemClass += ' correct'
            else itemClass += ' wrong'
          }
          return (
            <div
              key={optIdx}
              className={itemClass}
              draggable={!answered}
              onDragStart={(e) => handleDragStart(e, pos)}
              onDragOver={(e) => handleDragOver(e, pos)}
              onDrop={(e) => handleDrop(e, pos)}
              onDragEnd={handleDragEnd}
              onTouchStart={(e) => handleTouchStart(e, pos)}
              onTouchMove={(e) => handleTouchMove(e, pos)}
              onTouchEnd={handleTouchEnd}
            >
              <span className="rank-number">#{pos + 1}</span>
              <span className="rank-grip">{answered ? '' : '⠿'}</span>
              <span className="rank-text">{items[optIdx]}</span>
              {answered && pos !== correctPos && (
                <span className="rank-correct-badge">should be #{correctPos + 1}</span>
              )}
              {answered && pos === correctPos && (
                <span className="rank-check">✓</span>
              )}
            </div>
          )
        })}
      </div>
      {!answered && (
        <button className="btn btn-lock-in" onClick={handleLockIn}>
          Lock in answer 🔒
        </button>
      )}
    </div>
  )
}

const QUIZ_QUESTIONS = [
  {
    type: 'rank',
    q: "Rank my favourite things about you (1 = most favourite)",
    opts: ['Your cuteness aggression', 'Your burping skills', 'Bootyful smile', 'Always so sweet and understanding'],
    correctOrder: [3, 0, 2, 1]
  },
  {
    type: 'rank',
    q: 'Rank what I\'d choose for our perfect date (1 = top pick)',
    opts: ['Cinema night', 'Dinner date with some dessert', 'Netflix, snacks and painting', 'Theme Park'],
    correctOrder: [1, 2, 0, 3]
  },
  {
    type: 'rank',
    q: 'Rank the emojis that represent us (1 = most like us)',
    opts: ['🐱', '🥔', '🎮', '💃'],
    correctOrder: [1, 0, 2, 3]
  },
  {
    type: 'single',
    q: 'What makes our relationship special?',
    opts: ['The fact you seen me fart while doing starjumps 💀'],
    correct: [0]
  },
]

function QuizPage({ onNext }) {
  const [step, setStep] = useState(0)
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState(false)
  const [selected, setSelected] = useState(null)
  const [wasCorrect, setWasCorrect] = useState(false)

  const questions = QUIZ_QUESTIONS

  const handleRankSubmit = (order) => {
    setAnswered(true)
    const currentQ = questions[step]
    const isCorrect = order.every((v, i) => v === currentQ.correctOrder[i])
    setWasCorrect(isCorrect)
    if (isCorrect) setScore(s => s + 1)
  }

  const handleSingleAnswer = (idx) => {
    if (answered) return
    setSelected(idx)
    setAnswered(true)
    const isCorrect = questions[step].correct.includes(idx)
    setWasCorrect(isCorrect)
    if (isCorrect) setScore(s => s + 1)
  }

  const goNextQuestion = () => {
    if (step < questions.length - 1) {
      setStep(s => s + 1)
      setAnswered(false)
      setSelected(null)
      setWasCorrect(false)
    }
  }

  const isDone = step === questions.length - 1 && answered

  const getResultMessage = () => {
    if (score === questions.length) return { title: `${score}/${questions.length} — Perfect! 💚`, subtitle: "You know me and my boobies very well wow good job boonie" }
    if (score >= 3) return { title: `${score}/${questions.length} — So close! 💚`, subtitle: "Its ok at least you studied my boobies" }
    return { title: `${score}/${questions.length} — Hmm... 🤔`, subtitle: "Its ok at least you studied my boobies" }
  }

  const currentQ = questions[step]

  return (
    <div className="page quiz-page">
      <h1 className="page-title">Love Quiz 💕</h1>
      <p className="page-subtitle">Let&apos;s see how well you ACTUALLY know us 😏</p>

      {!isDone ? (
        <div className="quiz-card">
          <div className="quiz-progress">
            <div className="quiz-progress-bar"
              style={{ width: `${((step + (answered ? 1 : 0)) / questions.length) * 100}%` }} />
          </div>
          <p className="quiz-question">{currentQ.q}</p>

          {currentQ.type === 'rank' ? (
            <RankList
              key={step}
              items={currentQ.opts}
              correctOrder={currentQ.correctOrder}
              onSubmit={handleRankSubmit}
              answered={answered}
              wasCorrect={wasCorrect}
            />
          ) : (
            <div className="quiz-options">
              {currentQ.opts.map((opt, idx) => {
                let optClass = 'quiz-opt'
                if (answered) {
                  optClass += ' answered correct'
                } else if (selected === idx) {
                  optClass += ' selected'
                }
                return (
                  <button
                    key={idx}
                    className={optClass}
                    onClick={() => handleSingleAnswer(idx)}
                  >
                    {opt}
                  </button>
                )
              })}
            </div>
          )}
          {answered && !isDone && (
            <button className="btn btn-next quiz-next-btn" onClick={goNextQuestion}>Next →</button>
          )}
        </div>
      ) : (
        <div className="quiz-result">
          <ChibiBear size={100} />
          <h2>{getResultMessage().title}</h2>
          <p>{getResultMessage().subtitle}</p>
          <button className="btn btn-next" onClick={onNext}>Continue →</button>
        </div>
      )}
    </div>
  )
}

/* ⑧ Final Page */
function FinalPage({ onRestart }) {
  const [showFireworks, setShowFireworks] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setShowFireworks(true), 400)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="page final-page">
      {showFireworks && (
        <div className="fireworks">
          {Array.from({ length: 25 }).map((_, i) => (
            <FloatingHeart key={i} color={['#4a7c59', '#81c784', '#a5d6a7', '#f8bbd0', '#c8e6c9'][i % 5]} style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }} />
          ))}
        </div>
      )}
      <ChibiBear size={180} />
      <h1 className="final-title">Happy Valentine&apos;s Day!</h1>
      <h2 className="final-subtitle">💚 I love you 💚</h2>
      <div className="final-hearts">
        {'💚💚💚💚💚💚💚'.split('').filter(c => c.trim()).map((h, i) => (
          <span key={i} className="bounce-heart" style={{ animationDelay: `${i * 0.12}s` }}>💚</span>
        ))}
      </div>
      <button className="btn btn-restart" onClick={onRestart}>
        ↺ Start Over
      </button>
    </div>
  )
}

/* ──────────── NAV ──────────── */
function NavDots({ current, total, onNav }) {
  const labels = ['📸', '🧩', '🎟️', '💕', '💚', '🎉']
  return (
    <div className="nav-dots">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          className={`nav-dot ${i === current ? 'active' : ''}`}
          onClick={() => onNav(i)}
          title={labels[i]}
        >
          {labels[i]}
        </button>
      ))}
    </div>
  )
}

/* ──────────── APP ──────────── */
export default function App() {
  const [page, setPage] = useState(0)
  const [started, setStarted] = useState(false)

  const pages = [
    <GalleryPage key="gallery" onNext={() => setPage(1)} />,
    <PuzzlePage key="puzzle" onNext={() => setPage(2)} />,
    <CouponsPage key="coupons" onNext={() => setPage(3)} />,
    <QuizPage key="quiz" onNext={() => setPage(4)} />,
    <ReasonsPage key="reasons" onNext={() => setPage(5)} />,
    <FinalPage key="final" onRestart={() => { setStarted(false); setPage(0) }} />,
  ]

  if (!started) {
    return <LandingPage onYes={() => setStarted(true)} />
  }

  return (
    <div className="app-wrapper">
      {pages[page]}
      <NavDots current={page} total={pages.length} onNav={setPage} />
    </div>
  )
}
