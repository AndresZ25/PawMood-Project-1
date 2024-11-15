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
