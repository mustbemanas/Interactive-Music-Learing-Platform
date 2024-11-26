// Sound mappings for each instrument and their keys
const soundMappings = {
    piano: {
        C: 'Music Files/do.wav',
        D: 'Music Files/la.wav',
        E: 'Music Files/fa.wav',
        F: 'Music Files/mi.wav',
        G: 'Music Files/re.wav',
        A: 'Music Files/si.wav',
        B: 'Music Files/sol.wav',
    },
    guitar: {
        E: 'Music Files/chord-e.mp3',
        A: 'Music Files/sounds/guitar/a.mp3',
        D: 'Music Files/sounds/guitar/d.mp3',
        G: 'Music Files/sounds/guitar/g.mp3',
        B: 'Music Files/sounds/guitar/b.mp3',
        E2: 'Music Files/sounds/guitar/e2.mp3',
    },
    drums: {
        Kick: 'Music Files/kick.mp3',
        Snare: 'Music Files/snare.mp3',
        HiHat: 'Music Files/hi-hat.mp3',
        Tom1: 'Music Files/tom1.mp3',
        Tom2: 'Music Files/tom2.mp3',
        Cymbal: 'Music Files/cymbal.mp3',
    },
};

// Score variables for challenges and games
let currentScore = 0;
let challengeActive = false;

// Instrument challenge mappings for challenges and games
const challengeMappings = {
    piano: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
    guitar: ['E', 'A', 'D', 'G', 'B', 'E2'],
    drums: ['Kick', 'Snare', 'HiHat', 'Tom1', 'Tom2', 'Cymbal'],
};

// Function to show the selected page and hide others
function showPage(page) {
    const sections = ['home', 'lessons', 'progress','music-library', 'leaderboard', 'login','register'];
    sections.forEach(section => {
        document.getElementById(section).classList.add('hidden'); // Hide all sections
    });
    document.getElementById(page).classList.remove('hidden'); // Show the selected section
}

// Event listener for "Start Learning" button
document.getElementById('start-learning').addEventListener('click', function() {
    showPage('home'); // Show home page when "Start Learning" is clicked
});

// Function to show keys for the selected instrument
function showKeys(instrument) {
    const keysDisplay = document.getElementById('keys-display');
    keysDisplay.innerHTML = ''; // Clear previous keys
    keysDisplay.style.display = 'flex'; // Show keys display

    let keys = [];

    if (instrument === 'piano') {
        keys = Object.keys(soundMappings.piano);
    } else if (instrument === 'guitar') {
        keys = Object.keys(soundMappings.guitar);
    } else if (instrument === 'drums') {
        keys = Object.keys(soundMappings.drums);
    }

    keys.forEach(key => {
        const button = document.createElement('button');
        button.innerText = key;
        button.classList.add('key-button');
        button.onclick = () => playSound(instrument, key);
        keysDisplay.appendChild(button);
    });
}

// Function to play sound based on the selected instrument and key
function playSound(instrument, key) {
    const audioFile = soundMappings[instrument][key]; // Get the audio file path from the mapping
    const audio = new Audio(audioFile); // Load sound based on instrument and key
    audio.play();
}

// Function to toggle theme
function toggleTheme() {
    const body = document.body;
    body.classList.toggle('light-mode');
    body.style.backgroundColor = body.classList.contains('light-mode') ? '#ffffff' : '#1a1a2e'; // Change background
    body.style.color = body.classList.contains('light-mode') ? '#000000' : '#ffffff'; // Change text color
}

// Assign keyboard keys to instruments
document.addEventListener('keydown', function(event) {
    // Piano key mappings
    if (event.key === 'z') {
        playSound('piano', 'C');
    } else if (event.key === 'x') {
        playSound('piano', 'D');
    } else if (event.key === 'c') {
        playSound('piano', 'E');
    } else if (event.key === 'v') {
        playSound('piano', 'F');
    } else if (event.key === 'b') {
        playSound('piano', 'G');
    } else if (event.key === 'n') {
        playSound('piano', 'A');
    } else if (event.key === 'm') {
        playSound('piano', 'B');
    }

    // Guitar key mappings
    if (event.key === 'a') {
        playSound('guitar', 'E');
    } else if (event.key === 's') {
        playSound('guitar', 'A');
    } else if (event.key === 'd') {
        playSound('guitar', 'D');
    } else if (event.key === 'f') {
        playSound('guitar', 'G');
    } else if (event.key === 'g') {
        playSound('guitar', 'B');
    } else if (event.key === 'h') {
        playSound('guitar', 'E2');
    }

    // Drums key mappings
    if (event.key === 'q') {
        playSound('drums', 'Kick');
    } else if (event.key === 'w') {
        playSound('drums', 'Snare');
    } else if (event.key === 'e') {
        playSound('drums', 'HiHat');
    } else if (event.key === 'r') {
        playSound('drums', 'Tom1');
    } else if (event.key === 't') {
        playSound('drums', 'Tom2');
    } else if (event.key === 'y') {
        playSound('drums', 'Cymbal');
    }
});

// Function to start a gamified challenge based on the selected instrument
function startChallenge(instrument) {
    alert(`Starting ${instrument} challenge!`);
    currentScore = 0; // Reset score for new challenge
    challengeActive = true; // Flag to track active challenge
    document.getElementById('scoreboard').classList.remove('hidden'); // Show scoreboard

    playNextChallengeSound(instrument); // Start playing the challenge sounds
}

// Function to play the next sound for the challenge
function playNextChallengeSound(instrument) {
    if (!challengeActive) return;

    const randomKey = getRandomKey(instrument);
    alert(`Press the key: ${randomKey}`);

    document.addEventListener('keydown', function keyPressListener(event) {
        const keyPressed = mapKeyboardToInstrumentKey(event.key, instrument);
        if (keyPressed === randomKey) {
            currentScore += 10; // Increase score for correct key
            document.getElementById('current-score').innerText = currentScore; // Update scoreboard
            alert('Correct!');
        } else {
            alert('Wrong key, try again!');
        }

        // Remove event listener to prevent multiple triggers
        document.removeEventListener('keydown', keyPressListener);

        // Play next sound after delay
        setTimeout(() => playNextChallengeSound(instrument), 1000);
    });
}

// Get a random key from the instrument's key mappings
function getRandomKey(instrument) {
    const keys = challengeMappings[instrument];
    const randomIndex = Math.floor(Math.random() * keys.length);
    return keys[randomIndex];
}

// Helper function to map keyboard keys to instrument keys
function mapKeyboardToInstrumentKey(key, instrument) {
    const keyMap = {
        piano: { z: 'C', x: 'D', c: 'E', v: 'F', b: 'G', n: 'A', m: 'B' },
        guitar: { a: 'E', s: 'A', d: 'D', f: 'G', g: 'B', h: 'E2' },
        drums: { q: 'Kick', w: 'Snare', e: 'HiHat', r: 'Tom1', t: 'Tom2', y: 'Cymbal' },
    };

    return keyMap[instrument][key];
}

// End the game and reset
function endGame() {
    alert('Game over!');
    challengeActive = false;
    document.getElementById('scoreboard').classList.add('hidden'); // Hide scoreboard
    currentScore = 0;
    document.getElementById('current-score').innerText = currentScore;
}
// Function to play the next sound for the challenge
function playNextChallengeSound(instrument) {
    if (!challengeActive) return;

    const randomKey = getRandomKey(instrument);
    alert(`Press the key: ${randomKey}`);

    document.addEventListener('keydown', function keyPressListener(event) {
        const keyPressed = mapKeyboardToInstrumentKey(event.key, instrument);
        if (keyPressed === randomKey) {
            const randomScore = getRandomScore(); // Get random score increment
            currentScore += randomScore; // Increase score by a random value
            document.getElementById('current-score').innerText = currentScore; // Update scoreboard
            alert(`Correct! You earned ${randomScore} points!`);
        } else {
            alert('Wrong key, try again!');
        }

        // Remove event listener to prevent multiple triggers
        document.removeEventListener('keydown', keyPressListener);

        // Play next sound after delay
        setTimeout(() => playNextChallengeSound(instrument), 1000);
    });
}

// Function to generate a random score between 5 and 50
function getRandomScore() {
    return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
}


// Music Library Data
const Library = [
    { title: 'Classical Melody', file: 'beethoven-concert-nr3-relaxing-classical-piano-216328.mp3' },
    { title: 'Jazz Tune', file: 'epic-odyssey-western-classical-music-201986.mp3' },
    { title: 'Rock Anthem', file: 'weather-melody-182846.mp3' },
];

// Function to populate the music library on the page
function populateMusicLibrary() {
    console.log('Populating music library...'); // Debugging output
    const songList = document.getElementById('song-list');
    songList.innerHTML = ''; // Clear previous list

    Library.forEach((song) => {
        const songItem = document.createElement('div');
        songItem.classList.add('song-item');
        songItem.innerText = song.title;
        songItem.addEventListener('click', () => playSong(song.file));
        songList.appendChild(songItem);
    });
}

// Function to play the selected song
function playSong(file) {
    const musicPlayer = document.getElementById('music-player');
    const musicSource = document.getElementById('music-source');
    
    musicSource.src = file; // Set the audio source to the selected song
    musicPlayer.load(); // Load the new source
    musicPlayer.play(); // Play the song
}

// Event listener for the "Library" button
document.getElementById('library-button').addEventListener('click', function() {
    const musicLibraryDiv = document.getElementById('music-library');
    if (musicLibraryDiv.classList.contains('hidden')) {
        musicLibraryDiv.classList.remove('hidden'); // Show the library
    } else {
        musicLibraryDiv.classList.add('hidden'); // Hide the library if it's already visible
    }
    
    populateMusicLibrary(); // Populate songs when the library is shown
});

// Optional: populate the library on page load to test if it works
window.onload = function() {
    populateMusicLibrary(); // Test that the library is populated
}; 
