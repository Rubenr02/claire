// Firebase configuration and initialization
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-analytics.js";

const firebaseConfig = {
    apiKey: "AIzaSyBeWAuxxlMCVWQeEkgv4WzaxU-qWto_j9U",
    authDomain: "claire-8acdc.firebaseapp.com",
    projectId: "claire-8acdc",
    storageBucket: "claire-8acdc.appspot.com",
    messagingSenderId: "434856080342",
    appId: "1:434856080342:web:d150636f1a19ba574c6a77",
    measurementId: "G-G196Q69X66"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Function to update the daily message and image
export function updateContent() {
    const content = [
        { src: "images/flower8.jpg", message: "New update! Love you pookie ☀️" },
        { src: "images/flower9.jpg", message: "Every day with you is a blessing! 💕" },
        { src: "images/flower10.jpg", message: "Sending you all my love today and always! 💖" },
        { src: "images/flower11.jpg", message: "You're my reason to smile every day! 😁" },
        { src: "images/flower12.jpg", message: "My heart is yours, today and always! 💕" },
        { src: "images/flower13.jpg", message: "You're the most beautiful thing that ever happened to me! 💖" },
        { src: "images/flower14.jpg", message: "Every moment with you is my favorite! 🥰" },
        { src: "images/flower15.jpg", message: "It's my birthday today! You're yhe best gift I could wish for!! 🎉" },
        { src: "images/flower16.jpg", message: "You’re the sweetest person I know! 🍬" },
        { src: "images/flower17.jpg", message: "Your love makes every day brighter! 🌟" },
        { src: "images/flower18.jpg", message: "I’m so lucky to have you in my life! 🍀" },
        { src: "images/flower19.jpg", message: "I love waking up knowing you're part of my life! 🌸" },
        { src: "images/flower20.jpg", message: "You're always in my thoughts, and forever in my heart! ❤️" },
        { src: "images/flower21.jpg", message: "You make every day feel special! 💖" },
        { src: "images/flower22.jpg", message: "I'm so proud of everything you are! 🌸" },
        { src: "images/flower23.jpg", message: "The world is a better place with you in it! 🌍" },
        { src: "images/flower24.jpg", message: "You're the reason for my happiness today and every day! 😊" },
        { src: "images/flower25.jpg", message: "Merry Christmas, mon coeur! 🎄❤️" },
        { src: "images/flower26.jpg", message: "I can't wait to spend more time with you, mon chaton! 💞" },
        { src: "images/flower27.jpg", message: "You are my favorite person in the world! 🌏❤️" },
        { src: "images/flower28.jpg", message: "Every day with you feels like a new adventure! 🌟" },
        { src: "images/flower29.jpg", message: "I'm thankful for you every single day! 🍀" },
        { src: "images/flower30.jpg", message: "You're the reason my heart beats with joy! ❤️" },
        { src: "images/flower31.jpg", message: "Happy New Year, my love! 🎉 Wishing us all the happiness and love in the world in 2025! 🥂" }
    ];

    const today = new Date();
    const dayOfYear = today.getDate(); // Get the current day of the year (1-31)

    const index = (dayOfYear - 1) % content.length;  // Select content based on the current day of the month

    // Set the picture and message corresponding to the day
    document.getElementById('bouquetImage').src = content[index].src;
    document.getElementById('dailyMessage').textContent = content[index].message;

    // Initialize and hide the bouquet container and meme section
    document.getElementById('bouquetContainer').style.display = "none";
    document.getElementById('messageContainer').style.display = "none";
    document.getElementById('countdownContainer').style.display = "none";
    document.getElementById('memeGif').style.display = "none";

    countdown(); // Start the countdown timer
}

// Countdown timer to show the countdown until a specific event (e.g., when you are together)
export function countdown() {
    const countToDate = new Date('December 29, 2024 10:00:00').getTime();
    const countdownElement = document.getElementById('countdownTimer');
    const bouquetImageElement = document.getElementById('bouquetImage');
    const dailyMessageElement = document.getElementById('dailyMessage');

    function updateCountdown() {
        const now = new Date().getTime();
        const timeDifference = countToDate - now;

        if (timeDifference > 0) {
            const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

            countdownElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        } else {
            countdownElement.textContent = "I'm with my Pookie now! 💖";
            bouquetImageElement.src = "images/together.jpg";
            dailyMessageElement.textContent = "We're together at last! 💞";
        }
    }

    setInterval(updateCountdown, 1000);
}

export function adventCalendar() {
    const currentDate = new Date();
    const daysInMonth = 31; // You can adjust this to the current month dynamically
    const calendarGrid = document.getElementById('calendarGrid');
    
    // Clear the grid before adding days
    calendarGrid.innerHTML = '';

    // Add day names (Weekdays) as headers
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    dayNames.forEach(dayName => {
        const dayHeader = document.createElement('div');
        dayHeader.textContent = dayName;
        dayHeader.classList.add('header'); // Optional class for styling headers
        calendarGrid.appendChild(dayHeader);
    });

    // Calculate the first day of the month (for correct alignment)
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

    // Empty spaces before the 1st day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.classList.add('empty');  // Class for empty spaces
        calendarGrid.appendChild(emptyCell);
    }

    // Add day numbers
    for (let i = 1; i <= daysInMonth; i++) {
        const dayDiv = document.createElement('div');
        dayDiv.textContent = i;
        dayDiv.classList.add('day');  // Add class for styling

        // Highlight current day
        if (i === currentDate.getDate()) {
            dayDiv.classList.add('selected');
        }

        // Add click event to display bouquet and message or meme
        dayDiv.addEventListener('click', () => {
            if (i === currentDate.getDate()) {
                displayBouquet(i);  // Show bouquet and message if current day
            } else {
                showMeme(i);  // Show meme if non-current day
            }
        });

        calendarGrid.appendChild(dayDiv);
    }
}

// Display bouquet content when a day is clicked
function displayBouquet(day) {
    // Hide the calendar and other sections
    document.getElementById('calendarContainer').style.display = 'none';
    
    // Show bouquet content
    document.getElementById('bouquetContainer').style.display = 'block';
    document.getElementById('messageContainer').style.display = 'block';
    document.getElementById('countdownContainer').style.display = 'block';
    document.getElementById('memeGif').style.display = 'none';

    const content = [
        { src: "images/flower8.jpg", message: "You’re the best part of my day! ☀️" },
        { src: "images/flower9.jpg", message: "Every day with you is a blessing! 💕" },
        { src: "images/flower10.jpg", message: "Sending you all my love today and always! 💖" },
        { src: "images/flower11.jpg", message: "You're my reason to smile every day! 😁" },
        { src: "images/flower12.jpg", message: "My heart is yours, today and always! 💕" },
        { src: "images/flower13.jpg", message: "You're the most beautiful thing that ever happened to me! 💖" },
        { src: "images/flower14.jpg", message: "Every moment with you is my favorite! 🥰" },
        { src: "images/flower15.jpg", message: "It's my birthday today! You're yhe best gift I could wish for!! 🎉" },
        { src: "images/flower16.jpg", message: "You’re the sweetest person I know! 🍬" },
        { src: "images/flower17.jpg", message: "Your love makes every day brighter! 🌟" },
        { src: "images/flower18.jpg", message: "I’m so lucky to have you in my life! 🍀" },
        { src: "images/flower19.jpg", message: "I love waking up knowing you're part of my life! 🌸" },
        { src: "images/flower20.jpg", message: "You're always in my thoughts, and forever in my heart! ❤️" },
        { src: "images/flower21.jpg", message: "You make every day feel special! 💖" },
        { src: "images/flower22.jpg", message: "I'm so proud of everything you are! 🌸" },
        { src: "images/flower23.jpg", message: "The world is a better place with you in it! 🌍" },
        { src: "images/flower24.jpg", message: "You're the reason for my happiness today and every day! 😊" },
        { src: "images/flower25.jpg", message: "Merry Christmas, mon coeur! 🎄❤️" },
        { src: "images/flower26.jpg", message: "I can't wait to spend more time with you, mon chaton! 💞" },
        { src: "images/flower27.jpg", message: "You are my favorite person in the world! 🌏❤️" },
        { src: "images/flower28.jpg", message: "Every day with you feels like a new adventure! 🌟" },
        { src: "images/flower29.jpg", message: "I'm thankful for you every single day! 🍀" },
        { src: "images/flower30.jpg", message: "You're the reason my heart beats with joy! ❤️" },
        { src: "images/flower31.jpg", message: "Happy New Year, my love! 🎉 Wishing us all the happiness and love in the world in 2025! 🥂" }

    ];

    // Get the content based on the current day
    const today = new Date();
    const startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());
    const diffTime = Math.abs(today - startDate);
    const dayIndex = Math.floor(diffTime / (1000 * 60 * 60 * 24)) % content.length;

    document.getElementById('bouquetImage').src = content[dayIndex].src;
    document.getElementById('dailyMessage').textContent = content[dayIndex].message;

    // Add close button functionality
    const closeButton = document.getElementById('closeButton');
    closeButton.style.display = 'block';  // Show the close button

    closeButton.addEventListener('click', () => {
        // Hide the bouquet and message container when close button is clicked
        document.getElementById('calendarContainer').style.display = 'block';  // Show the calendar again
        document.getElementById('bouquetContainer').style.display = 'none';  // Hide the bouquet container
        document.getElementById('messageContainer').style.display = 'none';  // Hide the message container
        document.getElementById('countdownContainer').style.display = 'none';  // Hide the countdown container
        document.getElementById('memeGif').style.display = 'none';  // Hide the meme section if visible
        
        // Reset the close button
        closeButton.style.display = 'none';  // Hide the close button after clicking
    });
}

// Show a meme GIF when a non-current day is clicked
function showMeme(day) {
    // Hide the bouquet and other sections
    document.getElementById('calendarContainer').style.display = 'none';

    // Show meme content
    document.getElementById('memeGif').style.display = 'block';
    document.getElementById('bouquetContainer').style.display = 'none';
    document.getElementById('messageContainer').style.display = 'none';
    document.getElementById('countdownContainer').style.display = 'none';
    
    const memeUrl = `images/meme_day_${day}.gif`;  // Replace with your meme gif paths
    document.getElementById('memeGif').src = memeUrl;
}

// Emoji reaction (existing logic for reactions)
export function react(emoji) {
    const numberOfEmojis = 10;
    for (let i = 0; i < numberOfEmojis; i++) {
        createFallingEmoji(emoji);
    }
    storeEmojiReaction(emoji);
}

// Falling emoji creation function
function createFallingEmoji(emoji) {
    const emojiElement = document.createElement('div');
    emojiElement.classList.add('falling-emoji');
    emojiElement.textContent = emoji;
    document.body.appendChild(emojiElement);

    emojiElement.style.left = Math.random() * 100 + 'vw';
    emojiElement.style.animationDuration = Math.random() * 2 + 3 + 's';

    emojiElement.addEventListener('animationend', () => {
        emojiElement.remove();
    });
}

// Store emoji reaction in Firestore
async function storeEmojiReaction(emoji) {
    try {
        await addDoc(collection(db, 'emojiReactions'), {
            emoji: emoji,
            timestamp: serverTimestamp()
        });
        console.log('Emoji reaction stored:', emoji);
    } catch (error) {
        console.error('Error storing emoji reaction:', error);
    }
}

// Select all egg elements
const eggs = document.querySelectorAll('.egg');

// Loop through each egg and add event listener
eggs.forEach((egg, index) => {
    // Select the emoji face inside the yellow yolk
    const emoji = egg.querySelector('.emoji-face');
    
    // Add a click event to toggle the emoji visibility
    egg.addEventListener('click', () => {
        emoji.classList.toggle('show'); // Toggle emoji visibility on click
    });
});


// Call functions to initialize content and calendar
adventCalendar();
updateContent();

