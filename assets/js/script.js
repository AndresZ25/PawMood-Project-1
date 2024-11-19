const moodForm = document.getElementById('moodForm');
const moodInput = document.getElementById('moodInput');
const moodList = document.getElementById('moodList');
const averageDisplay = document.getElementById('averageDisplay');
const notesInput = document.getElementById('notes');


// Store moods in an array
let moods = ["happy","sad","tired","playful","hungry"];

moodForm.addEventListener('submit', function(event) {
    event.preventDefault();

    // Get the mood and note values from their inputs
    const mood = parseInt(moodInput.value);
    const notes = notesInput.value;

    // Ensure mood is between 1 and 5
    if (mood >= 1 && mood <= 5) {
        
        saveMood(mood, notes);
        updateMoodList();
        updateAverageMood();

        // Clear input fields
        moodInput.value = '';
        notesInput.value = '';
    } else {
        // Displays a message for when the mood is invalid
        alert('Please enter a valid mood value between 1 and 5.');
    }
});

// Function used to save the mood, notes, and date of entry to local storage
function saveMood(mood, notes) {
    const today = new Date();
    const weekNumber = getWeekNumber(today);
    const moodData = {
        mood: mood,
        notes: notes,
        date: today.toLocaleDateString(),
    };

    // Get the current weekly moods stored in localStorage, or create a new object
    const storedMoods = JSON.parse(localStorage.getItem("weeklyMoods")) || {};

    if (!storedMoods[weekNumber]) {
        storedMoods[weekNumber] = [];
    }

    // Add the new mood data to the week's array
    storedMoods[weekNumber].push(moodData);

    // Store the updated moods object back into localStorage
    localStorage.setItem("weeklyMoods", JSON.stringify(storedMoods));
}

// Function to load the mood list from localStorage
function loadMoods() {
    const storedMoods = JSON.parse(localStorage.getItem("weeklyMoods")) || {};
    const weekNumber = getWeekNumber(new Date());
    moodList.innerHTML = '';

// If statement checks whether mood is a valid mood and makes sure it is shown on the display
    if (storedMoods[weekNumber]) {
        storedMoods[weekNumber].forEach(entry => {
            if (entry.mood >= 1 && entry.mood <= 5) {
                const listItem = document.createElement("li");
                listItem.textContent = `Mood: ${getMoodName(entry.mood)} | Notes: ${entry.notes} | Date: ${entry.date}`;
                moodList.appendChild(listItem);
            }
        });
    } else {
        moodList.innerHTML = '<li>No moods recorded for this week.</li>';
    }
}

// Function to update the mood list display
function updateMoodList() {
 loadMoods();
}

// Function to update the average mood display
function updateAverageMood() {
    const storedMoods = JSON.parse(localStorage.getItem("weeklyMoods")) || {};
    const weekNumber = getWeekNumber(new Date());

    if (storedMoods[weekNumber] && storedMoods[weekNumber].length > 0) {
        const totalMood = storedMoods[weekNumber].reduce((total, entry) => total + entry.mood, 0);
        const averageMood = (totalMood / storedMoods[weekNumber].length).toFixed(2);
        averageDisplay.textContent = `Your dog's average mood this week: ${averageMood}`;
    } else {
        averageDisplay.textContent = 'N/A';
    }
}


// Function to get the name of the mood based on its value
function getMoodName(moodValue) {
    switch (moodValue) {
        case 1: return 'Happy';
        case 2: return 'Sad';
        case 3: return 'Playful';
        case 4: return 'Tired';
        case 5: return 'Hungry';
        default: return 'Unknown Mood';
    }
}

// Function to calculate the current week number of the year
function getWeekNumber(date) {
    const oneJan = new Date(date.getFullYear(), 0, 1);
    const numberOfDays = Math.floor((date - oneJan) / (24 * 60 * 60 * 1000));
    return Math.ceil((date.getDay() + 1 + numberOfDays) / 7);
}

// Load the moods on page load
document.addEventListener("DOMContentLoaded", function() {
    loadMoods(); 
    updateAverageMood(); 
});

// Function to fetch and display random dog videos or images
async function fetchdog() {
    const imageresponse = await fetch('https://random.dog/woof.json')
    const imagedata = await imageresponse.json()
    const dogUrl = imagedata.url
    const dogContainer = document.getElementById('dogImages')
    dogContainer.innerHTML = '';

    // If statement to determine the format of the video or image
     if (dogUrl.endsWith('.mp4') || dogUrl.endsWith('.webm')) { 
        const video = document.createElement('video');
         video.src = dogUrl; 
         video.controls = true; 
         video.autoplay = true; 
         video.width = 600;
          dogContainer.appendChild(video);
      
    } else { const img = document.createElement('img'); 
            img.src = dogUrl; 
            img.alt = 'Random Dog'; 
            img.width = 600;
             dogContainer.appendChild(img); 
    } 
}

window.onload = fetchdog;

// Function to fetch and display random dog facts
async function fetchdogfacts() {
    const factresponse = await fetch('https://dog-api.kinduff.com/api/facts')
    const factdata = await factresponse.json()
    const dogFact = factdata.facts[0]
    const dogFactContainer = document.getElementById('dogFact').innerText=dogFact
    
}