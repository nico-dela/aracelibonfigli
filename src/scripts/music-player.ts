type Track = {
  title: string;
  src: string;
  album: string;
  cover: string;
};

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60)
    .toString()
    .padStart(2, '0');
  return `${m}:${s}`;
}

export function initMusicPlayer() {
  if (document.documentElement.dataset.musicInit === '1') return;
  document.documentElement.dataset.musicInit = '1';

  const root = document.querySelector<HTMLElement>('[data-music-player]');
  if (!root) return;

  const playlistEl = root.querySelector<HTMLScriptElement>('[data-player-playlist]');
  const audio = root.querySelector<HTMLAudioElement>('[data-player-audio]');
  const titleEl = root.querySelector('[data-player-title]');
  const albumEl = root.querySelector('[data-player-album]');
  const coverEl = root.querySelector<HTMLImageElement>('[data-player-cover]');
  const playBtn = root.querySelector<HTMLButtonElement>('[data-player-play]');
  const playIcon = root.querySelector<SVGElement>('[data-player-play-icon]');
  const prevBtn = root.querySelector('[data-player-prev]');
  const nextBtn = root.querySelector('[data-player-next]');
  const seek = root.querySelector<HTMLInputElement>('[data-player-seek]');
  const currentEl = root.querySelector('[data-player-current]');
  const durationEl = root.querySelector('[data-player-duration]');

  if (!playlistEl?.textContent || !audio || !playBtn || !seek) return;

  const playlist = JSON.parse(playlistEl.textContent) as Track[];
  if (!playlist.length) return;

  const PLAY_PATH = 'M8 5.5v13l11-6.5L8 5.5z';
  const PAUSE_PATH = 'M6 5h4v14H6V5zm8 0h4v14h-4V5z';

  let index = 0;

  const render = () => {
    const track = playlist[index];
    if (!track) return;
    titleEl && (titleEl.textContent = track.title);
    albumEl && (albumEl.textContent = track.album);
    if (coverEl) coverEl.src = track.cover;
    audio.src = track.src;
  };

  const setPlaying = (playing: boolean) => {
    playBtn.setAttribute('aria-label', playing ? 'Pausar' : 'Reproducir');
    const path = playIcon?.querySelector('path');
    if (path) path.setAttribute('d', playing ? PAUSE_PATH : PLAY_PATH);
  };

  const play = async () => {
    try {
      await audio.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  };

  const load = (nextIndex: number, autoplay = false) => {
    index = (nextIndex + playlist.length) % playlist.length;
    render();
    if (autoplay) void play();
  };

  playBtn.addEventListener('click', () => {
    if (audio.paused) void play();
    else {
      audio.pause();
      setPlaying(false);
    }
  });

  prevBtn?.addEventListener('click', () => load(index - 1, true));
  nextBtn?.addEventListener('click', () => load(index + 1, true));

  audio.addEventListener('timeupdate', () => {
    if (!audio.duration) return;
    seek.value = String((audio.currentTime / audio.duration) * 100);
    if (currentEl) currentEl.textContent = formatTime(audio.currentTime);
  });

  audio.addEventListener('loadedmetadata', () => {
    if (durationEl) durationEl.textContent = formatTime(audio.duration);
  });

  audio.addEventListener('ended', () => load(index + 1, true));

  seek.addEventListener('input', () => {
    if (!audio.duration) return;
    audio.currentTime = (Number(seek.value) / 100) * audio.duration;
  });

  document.querySelectorAll<HTMLElement>('[data-play-track]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const i = Number(btn.dataset.playTrack);
      if (Number.isFinite(i)) load(i, true);
    });
  });

  render();
}
