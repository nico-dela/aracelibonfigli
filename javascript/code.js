class MusicPlayer {
  constructor() {
    this.audio = document.getElementById("audio")
    this.currentSongTitle = document.getElementById("currentSongTitle")
    this.currentSongAuthor = document.getElementById("currentSongAuthor")
    this.currentSongAlbum = document.getElementById("currentSongAlbum")
    this.currentAlbumArt = document.getElementById("currentAlbumArt")
    this.playlistItems = document.querySelectorAll(".playlist-item")
    this.progressBar = document.getElementById("progressBar")
    this.progress = document.getElementById("progress")
    this.volumeSlider = document.getElementById("volumeSlider")
    // this.speedControl = document.getElementById("speedControl")

    this.currentSongIndex = 0
    this.isShuffled = false
    this.isRepeating = false

    this.initializePlayer()
    this.setupEventListeners()
  }

  initializePlayer() {
    this.loadSong(this.currentSongIndex)
    this.updateVolumeDisplay()
  }

  setupEventListeners() {
    // Audio events
    this.audio.addEventListener("loadedmetadata", () => {
      document.getElementById("SongLength").textContent = this.calculateTime(this.audio.duration)
    })

    this.audio.addEventListener("timeupdate", () => {
      this.updateProgress()
    })

    this.audio.addEventListener("ended", () => {
      this.handleSongEnd()
    })

    this.audio.addEventListener("error", (e) => {
      console.error("Error loading audio:", e)
      this.showNotification("Error al cargar la canción", "error")
    })

    // Control events
    document.getElementById("PlayPause").addEventListener("click", () => {
      this.togglePlayPause()
    })

    document.getElementById("PreviousSong").addEventListener("click", () => {
      this.playPrevious()
    })

    document.getElementById("NextSong").addEventListener("click", () => {
      this.playNext()
    })

    // Progress bar click
    this.progressBar.addEventListener("click", (e) => {
      this.seekToPosition(e)
    })

    // Volume control
    this.volumeSlider.addEventListener("input", (e) => {
      this.setVolume(e.target.value)
    })

    // Speed control
    // this.speedControl.addEventListener("change", (e) => {
    //   this.setPlaybackSpeed(e.target.value)
    // })

    // Playlist items
    this.playlistItems.forEach((item) => {
      item.addEventListener("click", () => {
        const index = Number.parseInt(item.getAttribute("data-index"))
        this.playSongByIndex(index)
      })
    })

    // Keyboard shortcuts
    document.addEventListener("keydown", (e) => {
      this.handleKeyboardShortcuts(e)
    })

    // Expand button
    const expandButton = document.getElementById("expandButton")
    if (expandButton) {
      expandButton.addEventListener("click", () => {
        this.toggleExpanded()
      })
    }
  }

  loadSong(index) {
    if (index < 0 || index >= this.playlist.length) return

    const currentSong = this.playlist[index]
    this.audio.src = currentSong.src
    this.currentSongTitle.textContent = currentSong.title
    this.currentSongAuthor.textContent = currentSong.author
    this.currentSongAlbum.textContent = currentSong.album || "El Degradé Del Atardecer"

    // Update album art based on song
    this.updateAlbumArt(currentSong)

    this.audio.load()
    this.updatePlaylistHighlight(index)
    this.currentSongIndex = index

    // Update document title
    document.title = `${currentSong.title} - ${currentSong.author}`
  }

  updateAlbumArt(song) {
    const albumArtMap = {
      "El Degradé Del Atardecer": "../multimedia/eldegradedelatardecer.webp",
      Fluir: "../multimedia/fluir.webp",
      "El Degradé Del Atardecer - Lado B": "../multimedia/ladob.webp",
      "El Degradé Del Atardecer - Lado A": "../multimedia/ladoa.webp",
    }

    const artSrc = albumArtMap[song.album] || "../multimedia/eldegradedelatardecer.webp"
    this.currentAlbumArt.src = artSrc
  }

  togglePlayPause() {
    const playPauseBtn = document.getElementById("PlayPause")

    if (this.audio.paused) {
      this.audio
        .play()
        .then(() => {
          playPauseBtn.src = "../multimedia/png/pause.svg"
          playPauseBtn.title = "Pausar"
          this.showNotification(`Reproduciendo: ${this.currentSongTitle.textContent}`)
        })
        .catch((e) => {
          console.error("Error playing audio:", e)
          this.showNotification("Error al reproducir", "error")
        })
    } else {
      this.audio.pause()
      playPauseBtn.src = "../multimedia/png/Play.svg"
      playPauseBtn.title = "Reproducir"
    }
  }

  updateProgress() {
    const currentTime = this.audio.currentTime
    const duration = this.audio.duration

    if (duration) {
      const percentage = (currentTime / duration) * 100
      this.progress.style.width = percentage + "%"
    }

    document.getElementById("CurrentSongTime").textContent = this.calculateTime(currentTime)
  }

  seekToPosition(e) {
    const rect = this.progressBar.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const percentage = clickX / rect.width
    this.audio.currentTime = percentage * this.audio.duration
  }

  setVolume(value) {
    this.audio.volume = value / 100
    this.updateVolumeDisplay()
  }

  updateVolumeDisplay() {
    const volumeIcon = document.querySelector(".volume-icon")
    const volume = this.audio.volume * 100

    if (volume === 0) {
      volumeIcon.src = "../multimedia/png/Volume-Mute.svg"
    } else if (volume < 50) {
      volumeIcon.src = "../multimedia/png/Volume-Low.svg"
    } else {
      volumeIcon.src = "../multimedia/png/Volume.svg"
    }
  }

  setPlaybackSpeed(speed) {
    this.audio.playbackRate = Number.parseFloat(speed)
    this.showNotification(`Velocidad: ${speed}x`)
  }

  handleSongEnd() {
    if (this.isRepeating) {
      this.audio.currentTime = 0
      this.audio.play()
    } else {
      this.playNext()
    }
  }

  playNext() {
    let nextIndex
    if (this.isShuffled) {
      nextIndex = Math.floor(Math.random() * this.playlist.length)
    } else {
      nextIndex = (this.currentSongIndex + 1) % this.playlist.length
    }
    this.playSongByIndex(nextIndex)
  }

  playPrevious() {
    const prevIndex = this.currentSongIndex > 0 ? this.currentSongIndex - 1 : this.playlist.length - 1
    this.playSongByIndex(prevIndex)
  }

  playSongByIndex(index) {
    this.loadSong(index)
    this.audio.play().then(() => {
      document.getElementById("PlayPause").src = "../multimedia/png/pause.svg"
    })
  }

  updatePlaylistHighlight(index) {
    this.playlistItems.forEach((item, i) => {
      if (i === index) {
        item.classList.add("playing")
      } else {
        item.classList.remove("playing")
      }
    })
  }

  toggleExpanded() {
    const musicPlayer = document.getElementById("musicPlayer")
    const expandButton = document.getElementById("expandButton")

    musicPlayer.classList.toggle("expanded")

    if (musicPlayer.classList.contains("expanded")) {
      expandButton.textContent = "−"
      expandButton.title = "Contraer controles"
    } else {
      expandButton.textContent = "⋯"
      expandButton.title = "Expandir controles"
    }
  }

  handleKeyboardShortcuts(e) {
    switch (e.code) {
      case "Space":
        e.preventDefault()
        this.togglePlayPause()
        break
      case "ArrowRight":
        e.preventDefault()
        this.playNext()
        break
      case "ArrowLeft":
        e.preventDefault()
        this.playPrevious()
        break
      case "ArrowUp":
        e.preventDefault()
        this.setVolume(Math.min(100, this.audio.volume * 100 + 5))
        this.volumeSlider.value = this.audio.volume * 100
        break
      case "ArrowDown":
        e.preventDefault()
        this.setVolume(Math.max(0, this.audio.volume * 100 - 5))
        this.volumeSlider.value = this.audio.volume * 100
        break
    }
  }

  showNotification(message, type = "info") {
    // Create notification element
    const notification = document.createElement("div")
    notification.className = `notification notification-${type}`
    notification.textContent = message

    // Style the notification
    Object.assign(notification.style, {
      position: "fixed",
      top: "20px",
      right: "20px",
      padding: "12px 20px",
      borderRadius: "8px",
      color: "white",
      backgroundColor: type === "error" ? "#ef4444" : "#3b82f6",
      zIndex: "9999",
      fontSize: "14px",
      fontWeight: "500",
      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      transform: "translateX(100%)",
      transition: "transform 0.3s ease",
    })

    document.body.appendChild(notification)

    // Animate in
    setTimeout(() => {
      notification.style.transform = "translateX(0)"
    }, 100)

    // Remove after 3 seconds
    setTimeout(() => {
      notification.style.transform = "translateX(100%)"
      setTimeout(() => {
        document.body.removeChild(notification)
      }, 300)
    }, 3000)
  }

  calculateTime(secs) {
    if (isNaN(secs)) return "0:00"
    const minutes = Math.floor(secs / 60)
    const seconds = Math.floor(secs % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  // Playlist data
  playlist = [
    {
      title: "Mi Despertar",
      author: "Araceli Bonfigli",
      src: "../multimedia/canciones/2023-ElDegrade-Vivo/00-MIDESPERTAR.mp3",
      album: "El Degradé Del Atardecer",
    },
    {
      title: "Si Querés La Verdad",
      author: "Araceli Bonfigli",
      src: "../multimedia/canciones/2023-ElDegrade-Vivo/01-SIQUERESLAVERDAD.mp3",
      album: "El Degradé Del Atardecer",
    },
    {
      title: "Desordenada",
      author: "Araceli Bonfigli",
      src: "../multimedia/canciones/2023-ElDegrade-Vivo/02-DESORDENADA.mp3",
      album: "El Degradé Del Atardecer",
    },
    {
      title: "Oda Al Otoño Por Venir",
      author: "Araceli Bonfigli",
      src: "../multimedia/canciones/2023-ElDegrade-Vivo/03-ODAALOTONOPORVENIR.mp3",
      album: "El Degradé Del Atardecer",
    },
    {
      title: "Tu Luz Sin Fin",
      author: "Araceli Bonfigli",
      src: "../multimedia/canciones/2023-ElDegrade-Vivo/04-TULUZSINFIN.mp3",
      album: "El Degradé Del Atardecer",
    },
    {
      title: "Levitar",
      author: "Araceli Bonfigli",
      src: "../multimedia/canciones/2023-ElDegrade-Vivo/05-LEVITAR.mp3",
      album: "El Degradé Del Atardecer",
    },
    {
      title: "El Mar Volar",
      author: "Araceli Bonfigli",
      src: "../multimedia/canciones/2023-ElDegrade-Vivo/06-ELMARVOLAR.mp3",
      album: "El Degradé Del Atardecer",
    },
    {
      title: "Dibujando El Cielo",
      author: "Araceli Bonfigli",
      src: "../multimedia/canciones/2023-ElDegrade-Vivo/07-DIBUJANDOELCIELO.mp3",
      album: "El Degradé Del Atardecer",
    },
    {
      title: "Aire",
      author: "Araceli Bonfigli",
      src: "../multimedia/canciones/2023-ElDegrade-Vivo/08-AIRE.mp3",
      album: "El Degradé Del Atardecer",
    },
    {
      title: "Suelto Los Tientos",
      author: "Araceli Bonfigli",
      src: "../multimedia/canciones/2023-ElDegrade-Vivo/09-SUELTOLOSTIENTOS.mp3",
      album: "El Degradé Del Atardecer",
    },
    {
      title: "Clara",
      author: "Araceli Bonfigli",
      src: "https://res.cloudinary.com/dit43qjpn/video/upload/v1721140127/Araceli%20Bonfigli/Canciones-mp3/Fluir-2017/10-CLARA_esrmrb.mp3",
      album: "Fluir",
    },
    {
      title: "Andar",
      author: "Araceli Bonfigli",
      src: "https://res.cloudinary.com/dit43qjpn/video/upload/v1721140151/Araceli%20Bonfigli/Canciones-mp3/Fluir-2017/11-ANDAR_lnzqbn.mp3",
      album: "Fluir",
    },
    {
      title: "Anidar Primaveras",
      author: "Araceli Bonfigli",
      src: "https://res.cloudinary.com/dit43qjpn/video/upload/v1721140139/Araceli%20Bonfigli/Canciones-mp3/Fluir-2017/12-ANIDARPRIMAVERAS_o9zc71.mp3",
      album: "Fluir",
    },
    {
      title: "Instante Fugaz",
      author: "Araceli Bonfigli",
      src: "https://res.cloudinary.com/dit43qjpn/video/upload/v1721140135/Araceli%20Bonfigli/Canciones-mp3/Fluir-2017/13-INSTANTEFUGAZ_myb1lu.mp3",
      album: "Fluir",
    },
    {
      title: "Abre",
      author: "Araceli Bonfigli",
      src: "https://res.cloudinary.com/dit43qjpn/video/upload/v1721140155/Araceli%20Bonfigli/Canciones-mp3/Fluir-2017/14-ABRE_zkyzt7.mp3",
      album: "Fluir",
    },
    {
      title: "Bienvenida",
      author: "Araceli Bonfigli",
      src: "https://res.cloudinary.com/dit43qjpn/video/upload/v1721140143/Araceli%20Bonfigli/Canciones-mp3/Fluir-2017/15-BIENVENIDA_xjicpg.mp3",
      album: "Fluir",
    },
    {
      title: "Mariposa",
      author: "Araceli Bonfigli",
      src: "https://res.cloudinary.com/dit43qjpn/video/upload/v1721140214/Araceli%20Bonfigli/Canciones-mp3/Fluir-2017/16-MARIPOSA_yfetx3.mp3",
      album: "Fluir",
    },
    {
      title: "Sonrisa De Cristal",
      author: "Araceli Bonfigli",
      src: "https://res.cloudinary.com/dit43qjpn/video/upload/v1721140225/Araceli%20Bonfigli/Canciones-mp3/Fluir-2017/17-SONRISADECRISTAL_xgvjsg.mp3",
      album: "Fluir",
    },
    {
      title: "Cálido Invierno",
      author: "Araceli Bonfigli",
      src: "https://res.cloudinary.com/dit43qjpn/video/upload/v1721140214/Araceli%20Bonfigli/Canciones-mp3/Fluir-2017/18-CALIDOINVIERNO_icz6ob.mp3",
      album: "Fluir",
    },
    {
      title: "No Estés Acá",
      author: "Araceli Bonfigli",
      src: "https://res.cloudinary.com/dit43qjpn/video/upload/v1721140222/Araceli%20Bonfigli/Canciones-mp3/Fluir-2017/19-NOESTESACA_a5qbcb.mp3",
      album: "Fluir",
    },
    {
      title: "Desprender",
      author: "Araceli Bonfigli",
      src: "https://res.cloudinary.com/dit43qjpn/video/upload/v1721140229/Araceli%20Bonfigli/Canciones-mp3/Fluir-2017/20-DESPRENDER_uht79h.mp3",
      album: "Fluir",
    },
    {
      title: "Fluir",
      author: "Araceli Bonfigli",
      src: "https://res.cloudinary.com/dit43qjpn/video/upload/v1721140221/Araceli%20Bonfigli/Canciones-mp3/Fluir-2017/21-FLUIR_l1fozj.mp3",
      album: "Fluir",
    },
    {
      title: "Si Querés La Verdad",
      author: "Araceli Bonfigli",
      src: "https://res.cloudinary.com/dit43qjpn/video/upload/v1721138020/Araceli%20Bonfigli/Canciones-mp3/ElDegrad%C3%A9-LadoB/22-SIQUERESLAVERDAD_uncj2h.mp3",
      album: "El Degradé Del Atardecer - Lado B",
    },
    {
      title: "El Mar Volar",
      author: "Araceli Bonfigli",
      src: "https://res.cloudinary.com/dit43qjpn/video/upload/v1721138017/Araceli%20Bonfigli/Canciones-mp3/ElDegrad%C3%A9-LadoB/23-ELMARVOLAR_wqgjbb.mp3",
      album: "El Degradé Del Atardecer - Lado B",
    },
    {
      title: "Aire",
      author: "Araceli Bonfigli",
      src: "https://res.cloudinary.com/dit43qjpn/video/upload/v1721138016/Araceli%20Bonfigli/Canciones-mp3/ElDegrad%C3%A9-LadoB/24-AIRE_icrjps.mp3",
      album: "El Degradé Del Atardecer - Lado B",
    },
    {
      title: "Levitar",
      author: "Araceli Bonfigli",
      src: "https://res.cloudinary.com/dit43qjpn/video/upload/v1721138016/Araceli%20Bonfigli/Canciones-mp3/ElDegrad%C3%A9-LadoB/25-LEVITAR_wvziff.mp3",
      album: "El Degradé Del Atardecer - Lado B",
    },
    {
      title: "Oda Al Otoño Por Venir",
      author: "Araceli Bonfigli",
      src: "https://res.cloudinary.com/dit43qjpn/video/upload/v1721138019/Araceli%20Bonfigli/Canciones-mp3/ElDegrad%C3%A9-LadoB/26-ODAALOTONOPORVENIR_loc0sw.mp3",
      album: "El Degradé Del Atardecer - Lado B",
    },
    {
      title: "Mi Despertar",
      author: "Araceli Bonfigli",
      src: "https://res.cloudinary.com/dit43qjpn/video/upload/v1721139717/Araceli%20Bonfigli/Canciones-mp3/ElDegrad%C3%A9-LadoA/27-MIDESPERTAR_rv2inz.mp3",
      album: "El Degradé Del Atardecer - Lado A",
    },
    {
      title: "Tu Luz Sin Fin",
      author: "Araceli Bonfigli",
      src: "https://res.cloudinary.com/dit43qjpn/video/upload/v1721139714/Araceli%20Bonfigli/Canciones-mp3/ElDegrad%C3%A9-LadoA/28-TULUZSINFIN_wfcgub.mp3",
      album: "El Degradé Del Atardecer - Lado A",
    },
    {
      title: "Dibujando El Cielo",
      author: "Araceli Bonfigli",
      src: "https://res.cloudinary.com/dit43qjpn/video/upload/v1721139710/Araceli%20Bonfigli/Canciones-mp3/ElDegrad%C3%A9-LadoA/29-DIBUJANDOELCIELO_d5zrnp.mp3",
      album: "El Degradé Del Atardecer - Lado A",
    },
    {
      title: "Desordenada",
      author: "Araceli Bonfigli",
      src: "https://res.cloudinary.com/dit43qjpn/video/upload/v1721139712/Araceli%20Bonfigli/Canciones-mp3/ElDegrad%C3%A9-LadoA/30-DESORDENADA_mng6dk.mp3",
      album: "El Degradé Del Atardecer - Lado A",
    },
    {
      title: "Suelto Los Tientos",
      author: "Araceli Bonfigli",
      src: "https://res.cloudinary.com/dit43qjpn/video/upload/v1721139713/Araceli%20Bonfigli/Canciones-mp3/ElDegrad%C3%A9-LadoA/31-SUELTOLOSTIENTOS_naidlp.mp3",
      album: "El Degradé Del Atardecer - Lado A",
    },
  ]
}

// Initialize the music player when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.musicPlayer = new MusicPlayer()
})
