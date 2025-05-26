// Only add event listener if the form exists
const nameForm = document.getElementById("nameForm");
if (nameForm) {
  nameForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const name = document.getElementById("nameInput").value;
    window.location.href = `welcome.html?name=${encodeURIComponent(name)}`;
  });
}

// Only update welcome message if the element exists
const welcomeMsg = document.getElementById("welcomeMsg");
if (welcomeMsg) {
  const urlParams = new URLSearchParams(window.location.search);
  const name = urlParams.get('name');
  if (name) {
    welcomeMsg.textContent = `Welcome, ${name}! 🎉`;
  }
}

document.querySelectorAll('.music').forEach(musicDiv => {
        const audio = musicDiv.querySelector('audio');
        const playBtn = musicDiv.querySelector('.play-btn');
        const pauseBtn = musicDiv.querySelector('.pause-btn');
        playBtn.addEventListener('click', () => {
          audio.play();
        });
        pauseBtn.addEventListener('click', () => {
          audio.pause();
        });
      });
      
const audio = document.getElementById('loreen-audio');
  const lyricsContainer = document.getElementById('loreen-lyrics');
  const lyricLines = lyricsContainer.querySelectorAll('p[data-time]');

  // Set active lyric line
  function updateLyrics() {
    const currentTime = audio.currentTime;

    lyricLines.forEach((line, index) => {
      const lineTime = parseFloat(line.getAttribute('data-time'));
      const nextLineTime = index + 1 < lyricLines.length
        ? parseFloat(lyricLines[index + 1].getAttribute('data-time'))
        : Infinity;

      if (currentTime >= lineTime && currentTime < nextLineTime) {
        line.classList.add('active');
      } else {
        line.classList.remove('active');
      }
    });
  }

  audio.addEventListener('play', () => {
    lyricsContainer.style.display = 'block';
  });

  audio.addEventListener('pause', () => {
    if (audio.ended || audio.paused) return;
    lyricsContainer.style.display = 'none';
  });

  audio.addEventListener('ended', () => {
    lyricsContainer.style.display = 'none';
  });

  // Watch the lyrics while song plays
  audio.addEventListener('timeupdate', updateLyrics);

  // Show lyrics if already playing on reload
  if (!audio.paused && !audio.ended) {
    lyricsContainer.style.display = 'block';
  }