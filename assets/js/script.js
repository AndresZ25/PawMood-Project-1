const moodForm = document.getElementById('moodForm');
const moodInput = document.getElementById('moodInput');
const notesInput = document.getElementById('notes');
const moodList = document.getElementById('moodList');
const averageDisplay = document.getElementById('averageDisplay');
let storedMoods = [];

window.onload = function() {
    loadMoods();
}

moodForm.onsubmit = function(event) {
    event.preventDefault(); 

    const mood = moodInput.value;
    const notes = notesInput.value;
    const today = new Date().toISOString().split('T')[0];

    const existingMoodIndex = storedMoods.findIndex(entry => entry.date === today);

    if (existingMoodIndex !== -1) {
        
        storedMoods[existingMoodIndex] = {
            mood: mood,
            notes: notes,
            date: today
        };
    } else {
        
        storedMoods.push({
            mood: mood,
            notes: notes,
            date: today
        });
    }

    
    localStorage.setItem('dogMoods', JSON.stringify(storedMoods));
    displayMoods();
    calculateAverageMood();
     
};

function loadMoods() {
    const savedMoods = JSON.parse(localStorage.getItem('dogMoods'));
    if (savedMoods) {
        storedMoods = savedMoods;
        displayMoods();
    }
    calculateAverageMood();
}


function displayMoods() {
    moodList.innerHTML = ''; 
    storedMoods.forEach(moodEntry => {
        const moodItem = document.createElement('li');
        moodItem.textContent = `Date: ${moodEntry.date}, Mood: ${getMoodText(moodEntry.mood)}, Notes: ${moodEntry.notes}`;
        moodList.appendChild(moodItem);
    });
}

function getMoodText(moodValue) {
    switch (moodValue) {
        case "1": return 'Happy';
        case "2": return 'Sad';
        case "3": return 'Playful';
        case "4": return 'Tired';
        case "5": return 'Hungry';
    }
}

function calculateAverageMood() {
    if (storedMoods.length === 0) {
        averageDisplay.querySelector('h2').textContent = 'Average Mood: N/A';
        return;
    }

    const totalMoodValue = storedMoods.reduce((total, moodEntry) => total + parseInt(moodEntry.mood), 0);
    const averageMoodValue = totalMoodValue / storedMoods.length;
    averageDisplay.querySelector('h2').textContent = `Average Mood: ${getMoodText(Math.round(averageMoodValue))}`;
}

function calculateAverageMood() {
    if (moods.length === 0) {
        averageDisplay.querySelector('h2').textContent = 'Average Mood: N/A';
        return;
    }

    const totalMoodValue = moods.reduce((total, moodEntry) => total + parseInt(moodEntry.mood), 0);
    const averageMoodValue = totalMoodValue / moods.length;
    averageDisplay.querySelector('h2').textContent = `Average Mood: ${getMoodText(Math.round(averageMoodValue))}`;
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

