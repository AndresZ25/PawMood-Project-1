const moodForm = document.getElementById('moodForm');
const moodInput = document.getElementById('moodInput');
const moodList = document.getElementById('moodList');
const averageDisplay = document.getElementById('averageDisplay');



let moods = ["happy","sad","tired","playful","hungry"];

moodForm.addEventListener('submit', function(event) {
    event.preventDefault();

    // Get the mood value from input
    const mood = parseInt(moodInput.value);
    
    // Ensure mood is between 1 and 5
    if (mood >= 1 && mood <= 5) {
        // Add the mood to the array
        moods.push(mood);

        // Update the mood list display
        updateMoodList();
        
        // Update the average mood display
        updateAverageMood();

        // Clear input field
        moodInput.value = '';
    } else {
        alert('');
    }
});

// Function to update the mood list display
function updateMoodList() {
    moodList.innerHTML = '';
    moods.forEach((mood, index) => {
        const moodItem = document.createElement('li');
        moodItem.textContent = `Day ${index + 1}: Mood ${mood}`;
        moodList.appendChild(moodItem);
    });
}

// Function to update the average mood display
function updateAverageMood() {
    if (moods.length > 0) {
        const totalMood = moods.reduce((total, mood) => total + mood, 0);
        const averageMood = (totalMood / moods.length).toFixed(2);  // Average mood
        averageDisplay.textContent = `Your dog's average mood: ${averageMood}`;
    } else {
        averageDisplay.textContent = 'N/A';
    }
}


async function fetchdog() {
    const imageresponse = await fetch('https://random.dog/woof.json')
    const imagedata = await imageresponse.json()
    const dogUrl = imagedata.url
    const dogContainer = document.getElementById('dogImages')

    
    dogContainer.innerHTML = '';

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


async function fetchdogfacts() {
    const factresponse = await fetch('https://dog-api.kinduff.com/api/facts')
    const factdata = await factresponse.json()
    const dogFact = factdata.facts[0]
    const dogFactContainer = document.getElementById('dogFact').innerText=dogFact
    
}

document.addEventListener("DOMContentLoaded", function() {
    const moodForm = document.getElementById("moodForm");
    const moodInput = document.getElementById("moodInput");
    const notesInput = document.getElementById("notes");
    const moodList = document.getElementById("moodList");

    loadMoods();

    moodForm.addEventListener("submit", function(event) {
        event.preventDefault(); 
        const selectedMood = moodInput.value;
        const notes = notesInput.value;

        
        saveMood(selectedMood, notes);

        
        notesInput.value = '';
    });

    function saveMood(mood, notes) {
        const today = new Date();
        const weekNumber = getWeekNumber(today);
        const moodData = {
            mood: mood,
            notes: notes,
            date: today.toLocaleDateString()
        };


        const storedMoods = JSON.parse(localStorage.getItem("weeklyMoods")) || {};

        
        if (!storedMoods[weekNumber]) {
            storedMoods[weekNumber] = [];
        }

        
        storedMoods[weekNumber].push(moodData);
        localStorage.setItem("weeklyMoods", JSON.stringify(storedMoods));

        
        loadMoods();
    }

    function loadMoods() {
        const storedMoods = JSON.parse(localStorage.getItem("weeklyMoods")) || {};
        const weekNumber = getWeekNumber(new Date());
        moodList.innerHTML = ''; 

        if (storedMoods[weekNumber]) {
            storedMoods[weekNumber].forEach(entry => {
                const listItem = document.createElement("li");
                listItem.textContent = `Mood: ${getMoodName(entry.mood)} | Notes: ${entry.notes} | Date: ${entry.date}`;
                moodList.appendChild(listItem);
            });
        } else {
            moodList.innerHTML = '<li>No moods recorded for this week.</li>';
        }
    }

    function getMoodName(moodValue) {
        switch (moodValue) {
            case '1': return 'Happy';
            case '2': return 'Sad';
            case '3': return 'Playful';
            case '4': return 'Tired';
            case '5': return 'Hungry';
            default: return 'Unknown Mood';
        }
    }

    function getWeekNumber(d) {
    
        const date = new Date(d);
        const oneJan = new Date(date.getFullYear(), 0, 1);
        const numberOfDays = Math.floor((date - oneJan) / (24 * 60 * 60 * 1000));
        return Math.ceil((date.getDay() + 1 + numberOfDays) / 7);
    }
});
       


