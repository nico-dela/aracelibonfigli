
const audio = document.getElementById('audio');
const currentSongTitle = document.getElementById('currentSongTitle');
const currentSongAuthor = document.getElementById('currentSongAuthor');
//const playlistItems = document.querySelectorAll('#playlist li');
const playlistItems = document.querySelectorAll('.playlist-item');


const playlist = [
    { title: 'Mi Despertar', author: 'Araceli Bonfigli', src: '../multimedia/canciones/2023-ElDegrade-Vivo/00-MIDESPERTAR.mp3' },
    { title: 'Si Querés La Verdad', author: 'Araceli Bonfigli', src: '../multimedia/canciones/2023-ElDegrade-Vivo/01-SIQUERESLAVERDAD.mp3' },
    { title: 'Desordenada', author: 'Araceli Bonfigli', src: '../multimedia/canciones/2023-ElDegrade-Vivo/02-DESORDENADA.mp3' },
    { title: 'Oda Al Otoño Por Venir', author: 'Araceli Bonfigli', src: '../multimedia/canciones/2023-ElDegrade-Vivo/03-ODAALOTONOPORVENIR.mp3' },
    { title: 'Tu Luz Sin Fin', author: 'Araceli Bonfigli', src: '../multimedia/canciones/2023-ElDegrade-Vivo/04-TULUZSINFIN.mp3' },
    { title: 'Levitar', author: 'Araceli Bonfigli', src: '../multimedia/canciones/2023-ElDegrade-Vivo/05-LEVITAR.mp3' },
    { title: 'El Mar Volar', author: 'Araceli Bonfigli', src: '../multimedia/canciones/2023-ElDegrade-Vivo/06-ELMARVOLAR.mp3' },
    { title: 'Dibujando El Cielo', author: 'Araceli Bonfigli', src: '../multimedia/canciones/2023-ElDegrade-Vivo/07-DIBUJANDOELCIELO.mp3' },
    { title: 'Aire', author: 'Araceli Bonfigli', src: '../multimedia/canciones/2023-ElDegrade-Vivo/08-AIRE.mp3' },
    { title: 'Suelto Los Tientos', author: 'Araceli Bonfigli', src: '../multimedia/canciones/2023-ElDegrade-Vivo/09-SUELTOLOSTIENTOS.mp3' },

    { title: 'Clara', author: 'Araceli Bonfigli', src: 'https://res.cloudinary.com/dit43qjpn/video/upload/v1721140127/Araceli%20Bonfigli/Canciones-mp3/Fluir-2017/10-CLARA_esrmrb.mp3' },
    { title: 'Andar', author: 'Araceli Bonfigli', src: 'https://res.cloudinary.com/dit43qjpn/video/upload/v1721140151/Araceli%20Bonfigli/Canciones-mp3/Fluir-2017/11-ANDAR_lnzqbn.mp3' },
    { title: 'Anidar Primaveras', author: 'Araceli Bonfigli', src: 'https://res.cloudinary.com/dit43qjpn/video/upload/v1721140139/Araceli%20Bonfigli/Canciones-mp3/Fluir-2017/12-ANIDARPRIMAVERAS_o9zc71.mp3' },
    { title: 'Instante Fugaz', author: 'Araceli Bonfigli', src: 'https://res.cloudinary.com/dit43qjpn/video/upload/v1721140135/Araceli%20Bonfigli/Canciones-mp3/Fluir-2017/13-INSTANTEFUGAZ_myb1lu.mp3' },
    { title: 'Abre', author: 'Araceli Bonfigli', src: 'https://res.cloudinary.com/dit43qjpn/video/upload/v1721140155/Araceli%20Bonfigli/Canciones-mp3/Fluir-2017/14-ABRE_zkyzt7.mp3' },
    { title: 'Bienvenida', author: 'Araceli Bonfigli', src: 'https://res.cloudinary.com/dit43qjpn/video/upload/v1721140143/Araceli%20Bonfigli/Canciones-mp3/Fluir-2017/15-BIENVENIDA_xjicpg.mp3' },
    { title: 'Mariposa', author: 'Araceli Bonfigli', src: 'https://res.cloudinary.com/dit43qjpn/video/upload/v1721140214/Araceli%20Bonfigli/Canciones-mp3/Fluir-2017/16-MARIPOSA_yfetx3.mp3' },
    { title: 'Sonrisa De Cristal', author: 'Araceli Bonfigli', src: 'https://res.cloudinary.com/dit43qjpn/video/upload/v1721140225/Araceli%20Bonfigli/Canciones-mp3/Fluir-2017/17-SONRISADECRISTAL_xgvjsg.mp3' },
    { title: 'Cálido Invierno', author: 'Araceli Bonfigli', src: 'https://res.cloudinary.com/dit43qjpn/video/upload/v1721140214/Araceli%20Bonfigli/Canciones-mp3/Fluir-2017/18-CALIDOINVIERNO_icz6ob.mp3' },
    { title: 'No Estés Acá', author: 'Araceli Bonfigli', src: 'https://res.cloudinary.com/dit43qjpn/video/upload/v1721140222/Araceli%20Bonfigli/Canciones-mp3/Fluir-2017/19-NOESTESACA_a5qbcb.mp3' },
    { title: 'Desprender', author: 'Araceli Bonfigli', src: 'https://res.cloudinary.com/dit43qjpn/video/upload/v1721140229/Araceli%20Bonfigli/Canciones-mp3/Fluir-2017/20-DESPRENDER_uht79h.mp3' },
    { title: 'Fluir', author: 'Araceli Bonfigli', src: 'https://res.cloudinary.com/dit43qjpn/video/upload/v1721140221/Araceli%20Bonfigli/Canciones-mp3/Fluir-2017/21-FLUIR_l1fozj.mp3' },

    { title: 'Si Querés La Verdad', author: 'Araceli Bonfigli', src: 'https://res.cloudinary.com/dit43qjpn/video/upload/v1721138020/Araceli%20Bonfigli/Canciones-mp3/ElDegrad%C3%A9-LadoB/22-SIQUERESLAVERDAD_uncj2h.mp3' },
    { title: 'El Mar Volar', author: 'Araceli Bonfigli', src: 'https://res.cloudinary.com/dit43qjpn/video/upload/v1721138017/Araceli%20Bonfigli/Canciones-mp3/ElDegrad%C3%A9-LadoB/23-ELMARVOLAR_wqgjbb.mp3' },
    { title: 'Aire', author: 'Araceli Bonfigli', src: 'https://res.cloudinary.com/dit43qjpn/video/upload/v1721138016/Araceli%20Bonfigli/Canciones-mp3/ElDegrad%C3%A9-LadoB/24-AIRE_icrjps.mp3' },
    { title: 'Levitar', author: 'Araceli Bonfigli', src: 'https://res.cloudinary.com/dit43qjpn/video/upload/v1721138016/Araceli%20Bonfigli/Canciones-mp3/ElDegrad%C3%A9-LadoB/25-LEVITAR_wvziff.mp3' },
    { title: 'Oda Al Otoño Por Venir', author: 'Araceli Bonfigli', src: 'https://res.cloudinary.com/dit43qjpn/video/upload/v1721138019/Araceli%20Bonfigli/Canciones-mp3/ElDegrad%C3%A9-LadoB/26-ODAALOTONOPORVENIR_loc0sw.mp3' },

    { title: 'Mi Despertar', author: 'Araceli Bonfigli', src: 'https://res.cloudinary.com/dit43qjpn/video/upload/v1721139717/Araceli%20Bonfigli/Canciones-mp3/ElDegrad%C3%A9-LadoA/27-MIDESPERTAR_rv2inz.mp3' },
    { title: 'Tu Luz Sin Fin', author: 'Araceli Bonfigli', src: 'https://res.cloudinary.com/dit43qjpn/video/upload/v1721139714/Araceli%20Bonfigli/Canciones-mp3/ElDegrad%C3%A9-LadoA/28-TULUZSINFIN_wfcgub.mp3' },
    { title: 'Dibujando El Cielo', author: 'Araceli Bonfigli', src: 'https://res.cloudinary.com/dit43qjpn/video/upload/v1721139710/Araceli%20Bonfigli/Canciones-mp3/ElDegrad%C3%A9-LadoA/29-DIBUJANDOELCIELO_d5zrnp.mp3' },
    { title: 'Desordenada', author: 'Araceli Bonfigli', src: 'https://res.cloudinary.com/dit43qjpn/video/upload/v1721139712/Araceli%20Bonfigli/Canciones-mp3/ElDegrad%C3%A9-LadoA/30-DESORDENADA_mng6dk.mp3' },
    { title: 'Suelto Los Tientos', author: 'Araceli Bonfigli', src: 'https://res.cloudinary.com/dit43qjpn/video/upload/v1721139713/Araceli%20Bonfigli/Canciones-mp3/ElDegrad%C3%A9-LadoA/31-SUELTOLOSTIENTOS_naidlp.mp3' },





    // Add more songs as needed
];

let currentSongIndex = 0;

const loadSong = (index) => {
    const currentSong = playlist[index];
    audio.src = currentSong.src;
    currentSongTitle.textContent = currentSong.title;
    currentSongAuthor.textContent = currentSong.author;
    audio.load();
};

const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60),
        seconds = Math.floor(secs % 60),
        returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minutes}:${returnedSeconds}`;
};

audio.addEventListener('loadedmetadata', () => {
    document.getElementById('SongLength').textContent = calculateTime(audio.duration);
});

audio.addEventListener('ended', () => {
    // Play the next song when the current one ends
    currentSongIndex = (currentSongIndex + 1) % playlist.length;
    loadSong(currentSongIndex);
    audio.play();
});

audio.ontimeupdate = function () {
    document.getElementById('CurrentSongTime').textContent = calculateTime(audio.currentTime);
    setProgress();
};

function setProgress() {
    let percentage = (audio.currentTime / audio.duration) * 100;
    document.querySelector('.progress').style.width = percentage + '%';
}

document.getElementById('PlayPause').addEventListener('click', () => {
    if (audio.paused) {
        document.getElementById('PlayPause').src = '../multimedia/png/pause.svg';
        audio.play();
    } else {
        document.getElementById('PlayPause').src = '../multimedia/png/Play.svg';
        audio.pause();
    }
});

document.getElementById('Plus10').addEventListener('click', () => {
    audio.currentTime += 10;
});

document.getElementById('Back10').addEventListener('click', () => {
    audio.currentTime -= 10;
});

playlistItems.forEach(item => {
    item.addEventListener('click', function () {
        const index = this.getAttribute('data-index');
        currentSongIndex = parseInt(index);
        loadSong(currentSongIndex);
        audio.play();
    });
});

loadSong(currentSongIndex); // Load the first song

