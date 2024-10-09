function react(emoji) {
    const numberOfEmojis = 10; // Number of emojis to fall
    for (let i = 0; i < numberOfEmojis; i++) {
        createFallingEmoji(emoji);
    }
}

function createFallingEmoji(emoji) {
    const emojiElement = document.createElement('span');
    emojiElement.className = 'falling-emoji';
    emojiElement.textContent = emoji;

    // Randomize the starting position of the emoji
    const randomX = Math.random() * window.innerWidth; 
    emojiElement.style.left = randomX + 'px'; // Set the horizontal position
    emojiElement.style.animationDuration = (Math.random() * 2 + 1) + 's'; // Set a random duration between 1s and 3s
    emojiElement.style.fontSize = (Math.random() * 2 + 1) + 'em'; // Random size for variety

    document.body.appendChild(emojiElement); // Append to the body

    // Remove the emoji after the animation ends
    emojiElement.addEventListener('animationend', () => {
        emojiElement.remove(); // Remove emoji from DOM
    });
}

// Function to update the daily message and image
function updateContent() {
    const content = [
        { src: "images/flower1.jpg", message: "You are my sunshine! 🌞" },
        { src: "images/flower2.jpg", message: "Sweet passionate love blooms here! 🌷" },
        { src: "images/flower3.jpg", message: "Here's a bouquet just for you! 🌹" },
        { src: "images/flower4.jpg", message: "Have a great day! Drink water girl! 🌼" },
        { src: "images/flower5.jpg", message: "Just because... I love you! 💖" },
        { src: "images/flower6.jpg", message: "You're the flower in my garden! 🌻" },
        { src: "images/flower7.jpg", message: "You're my pink, my blue, and all the other colors! 🌺" },
        { src: "images/flower8.jpg", message: "You're my favorite snack! 🍭" },
        { src: "images/flower9.jpg", message: "Just a reminder that I love you more! 💘" },
        { src: "images/flower10.jpg", message: "You make every day brighter! ☀️" },
        { src: "images/flower11.jpg", message: "A beautiful flower for my beautiful Pookie! 🌸" },
        { src: "images/flower12.jpg", message: "You did change me a lot!!!" },
        { src: "images/flower13.jpg", message: "Have a lovely day, Pookie! 🥰" },
        { src: "images/flower14.jpg", message: "You fill my life with color! 🎨" },
        { src: "images/flower1.jpg", message: "Love is a choice and I choose you! 💕" } // This can repeat or add a new image/message
    ];

    // Get the current date
    const today = new Date();
    
    // Set start date to tomorrow
    today.setDate(today.getDate() + 1);

    // Check if the current time is past 7:00 AM
    const currentHour = today.getHours();
    const currentMinutes = today.getMinutes();
    if (currentHour >= 7) {
        // If it’s past 7:00 AM, set the index based on today’s date
        const diffTime = Math.abs(today - new Date(today.getFullYear(), today.getMonth(), today.getDate() - (today.getDate() % 14)));
        const dayIndex = Math.floor(diffTime / (1000 * 60 * 60 * 24)) % 14; // Get the index for 14 days
        // Update the image and message
        document.getElementById('bouquetImage').src = content[dayIndex].src;
        document.getElementById('dailyMessage').textContent = content[dayIndex].message;
    } else {
        // If it’s before 7:00 AM, show the next day's content
        const diffTime = Math.abs(today - new Date(today.getFullYear(), today.getMonth(), today.getDate() - (today.getDate() % 14) - 1));
        const dayIndex = Math.floor(diffTime / (1000 * 60 * 60 * 24)) % 14; // Get the index for 14 days
        // Update the image and message
        document.getElementById('bouquetImage').src = content[dayIndex].src;
        document.getElementById('dailyMessage').textContent = content[dayIndex].message;
    }
}

// Call updateContent to set initial content
updateContent();
