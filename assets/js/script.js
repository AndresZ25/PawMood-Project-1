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
    const response = await fetch('https://random.dog/woof.json')
    const data = await response.json()
    const dogUrl = data.url
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


