// Only add event listener if the form exists
const nameForm = document.getElementById("nameForm");
if (nameForm) {
  nameForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("nameInput").value;
    window.location.href = `welcome.html?name=${encodeURIComponent(name)}`;
  });
}

// Only update welcome message if the element exists
const welcomeMsg = document.getElementById("welcomeMsg");
if (welcomeMsg) {
  const urlParams = new URLSearchParams(window.location.search);
  const name = urlParams.get("name");
  if (name) {
    welcomeMsg.textContent = `Welcome, ${name}! 🎉`;
  }
}

// Music controls for each music section
document.querySelectorAll(".music").forEach((musicDiv) => {
  const audio = musicDiv.querySelector("audio");
  const playBtn = musicDiv.querySelector(".play-btn");
  const pauseBtn = musicDiv.querySelector(".pause-btn");

  if (audio && playBtn && pauseBtn) {
    playBtn.addEventListener("click", () => {
      // Pause all other audios before playing this one
      document.querySelectorAll("audio").forEach((a) => {
        if (a !== audio) a.pause();
      });
      audio.play();
    });

    pauseBtn.addEventListener("click", () => {
      audio.pause();
    });
  }
});

// Lyrics synchronization for loreen-audio
const audio = document.getElementById("loreen-audio");
const lyricsContainer = document.getElementById("loreen-lyrics");
const lyricLines = lyricsContainer.querySelectorAll('p[data-time]');

let firstVisible = false;


// ❌ Hide lyrics by default
    lyricsContainer.style.display = 'none';

    // ✅ Show lyrics on play
    audio.addEventListener('play', () => {
        lyricsContainer.style.display = 'block';
    });

    // ⏸️ Hide lyrics on pause or when song ends
    audio.addEventListener('pause', () => {
        if (!audio.ended && audio.paused) {
            lyricsContainer.style.display = 'none';
        }
    });

    audio.addEventListener('ended', () => {
      lyricsContainer.style.display = 'none';
      lyricLines.forEach(line => line.classList.remove('active'));
      firstVisible = false; // Reset for next play
    });


  function updateLyrics() {
    const currentTime = audio.currentTime;

    // ✋ Don't display lyrics until 14s
    if (currentTime < 14) {
        lyricsContainer.style.display = 'none';
        lyricLines.forEach(line => line.classList.remove('active'));
        firstVisible = false;
        return;
    } else {
        lyricsContainer.style.display = 'block';
    }

    if (!firstVisible) {
    // Activate correct line immediately
    lyricLines.forEach((line, index) => {
        const lineTime = parseFloat(line.getAttribute("data-time"));
        const nextLineTime =
            index + 1 < lyricLines.length
                ? parseFloat(lyricLines[index + 1].getAttribute("data-time"))
                : Infinity;

        if (currentTime >= lineTime && currentTime < nextLineTime) {
            line.classList.add("active");
        } else {
            line.classList.remove("active");
        }
    });
    firstVisible = true;
  }
}

// Attach the timeupdate event listener outside the function
audio.addEventListener('timeupdate', updateLyrics);

// 🎵 Bonus: Ensure it stays hidden if page is refreshed
window.addEventListener('load', () => {
    if (audio.paused || audio.ended) {
        lyricsContainer.style.display = 'none';
    }
});

const anyoneAudio = document.getElementById("anyone-audio");
const anyoneLyrics = document.getElementById("anyone-lyrics");
const lines = anyoneLyrics.querySelectorAll('p[data-time]');

anyoneAudio.addEventListener('timeupdate', () => {
    const currentTime = anyoneAudio.currentTime;

    lines.forEach((line, index) => {
        const start = parseFloat(line.getAttribute('data-time'));
        const end = index + 1 < lines.length
            ? parseFloat(lines[index + 1].getAttribute('data-time'))
            : Infinity;

        if (currentTime >= start && currentTime < end) {
            line.classList.add('active');
        } else {
            line.classList.remove('active');
        }
    });
});