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

// Function to get the user's local date (handles time zones properly)
function getLocalDate() {
    const now = new Date();
    // Adjust for timezone offset to get the correct local date
    const timezoneOffset = now.getTimezoneOffset() * 60000;
    return new Date(now.getTime() - timezoneOffset);
}

// Function to get the current day of the year (1-365/366)
function getDayOfYear() {
    const now = getLocalDate();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
}

// Function to track which messages have been shown using localStorage
function getNextMessageIndex(totalMessages) {
    // Use day of year as key to ensure one message per day
    const dayOfYear = getDayOfYear();
    const storageKey = `lastShownMessageIndex_${dayOfYear}`;
    
    let lastShownIndex = localStorage.getItem(storageKey);
    if (lastShownIndex !== null) {
        // Already shown today, return the same index
        return parseInt(lastShownIndex);
    }
    
    // Get the next sequential message index
    let sequentialIndex = localStorage.getItem('sequentialMessageIndex');
    sequentialIndex = sequentialIndex ? parseInt(sequentialIndex) : 0;
    
    // Wrap around if we've reached the end
    if (sequentialIndex >= totalMessages) {
        sequentialIndex = 0;
    }
    
    // Store both the daily and sequential indexes
    localStorage.setItem(storageKey, sequentialIndex.toString());
    localStorage.setItem('sequentialMessageIndex', (sequentialIndex + 1).toString());
    
    return sequentialIndex;
}

// Function to update the daily message and image
export function updateContent() {
    const content = [
        // Your 200 reasons here (shortened for example)
        { src: "images/reason1.jpeg", message: "Mon chaton, starting tomorrow, every morning you'll wake up to a new reason why I love you! 200 days, 200 reminders of how special you are to me. Please try to enjoy each fact equally, and not show preference for any over the others" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of your kindness" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of your musical taste" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of your delicious baking" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of your amazing smile" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of your're a foodie" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Your're extremely talented" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Your're special" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "You make me feel loved" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "You're super creative" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of the time you devote to me" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of how you always listen to me" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of how cared for you make me feel" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of your hilarious humor" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "You dance amazingly well" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "You're a little sunshine" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "You check my vibe" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "You're goofy and silly" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "You have the most beautifull beauty marks" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of how you've changed me for the better" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "You're present" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of your amazing handicrafts" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of your amazing drawings" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of your determination" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of your laugh" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of your cuddles..." },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of your guili guilis" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of your sewing skills" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of your handmade gifts" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of your food indecisiveness" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of your patience" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of your eyes" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of your lovely singing voice" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of how you speak portuguese" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of your smooooooth skin" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of your leg beauty mark" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of your style" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of your perfect imperfections" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of your crazy ideas" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "You have the sexiest body" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of your generosity" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of your sustainability... yes I actually do" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of your love for plants" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of your skincare" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of your stinky farts" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Your're very intelligent" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Your're like no one else" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "You scream like crazy in roller coasters" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "You make me fear losing you" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of your love for cats" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of your kindness" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Your're mine" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Your're a really good person" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "You make me feel comfortable" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of your stinky farts" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Your're also my best friend" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of your cute little ears" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "You make me feel like I belong with you" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of your perfect body" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "You bring me joy" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Food tastes better with you" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "You make me want to write you 200 reasons of why I love you... and let me tell you 200 is A LOT" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "You make me laugh soooo much" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "You can change my day with just one phone call" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "You make long distance easier" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "You're everything I could've ever wished for" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "You cook reaaaally well" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of the future you see with me" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of your kisses..." },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of how gentle you are" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of how brave you are!" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "I admire you" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of your attention to detail" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "You know me" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of your excited little jumps" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of your movies and series references" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "You know me" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of your good night calls" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "You get a bit grumpy when you're hungry" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "You're adventurous " },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "I love doing everything with you" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "You love partying" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of your snack choices" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of your cute messages" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "My heart beats harder whenever you tell me you love me" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Even showering is better with you" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "You introduced me into your life" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of your bondness to family" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of our shared vision" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of your love for pasteis de nata" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of you always stick musics in my head" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "I love doing tiktok trends with you" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of your home decor taste" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "You're naturally beautifull" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "You're not superficial" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "You love to travel" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of your laptop stickers" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of simply being you" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of your dessert cravings" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "You have the sexiest body" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of your focused face" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "You love cheeeese" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "You believe in us" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of your pretty hair" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "You smell sooo good" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "It feels like home if I'm with you" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "You're you, and that's more than enough" }
    ];

    // Get the message index for today
    const messageIndex = getNextMessageIndex(content.length);

    // Set the picture and message
    document.getElementById('bouquetImage').src = content[messageIndex].src;
    document.getElementById('dailyMessage').textContent = content[messageIndex].message;

    // Initialize and hide the bouquet container and meme section
    document.getElementById('bouquetContainer').style.display = "none";
    document.getElementById('messageContainer').style.display = "none";
    document.getElementById('memeGif').style.display = "none";

    countdown(); // Start the countdown timer
}

// Countdown timer to show the countdown until a specific event
export function countdown() {
    // Use UTC time to avoid timezone issues for the target date
    const countToDate = new Date('March 20, 2025 10:00:00 GMT+0000').getTime();
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

    // Update immediately and then every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

export function adventCalendar() {
    const currentDate = getLocalDate(); // Use local date
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // Get actual days in current month
    const calendarGrid = document.getElementById('calendarGrid');

    // Clear the grid before adding days
    calendarGrid.innerHTML = '';

    // Calculate the first day of the month (for correct alignment)
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    // Empty spaces before the 1st day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.classList.add('empty');
        calendarGrid.appendChild(emptyCell);
    }

    // Add day numbers
    for (let i = 1; i <= daysInMonth; i++) {
        const dayDiv = document.createElement('div');
        dayDiv.textContent = i;
        dayDiv.classList.add('day');

        // Highlight the current day
        if (i === currentDate.getDate()) {
            dayDiv.classList.add('selected');
        }

        // Add click event
        dayDiv.addEventListener('click', () => {
            if (i === currentDate.getDate()) {
                displayBouquet(i);
            } else {
                showMeme(i);
            }
        });

        calendarGrid.appendChild(dayDiv);
    }
}

// Display bouquet content when the correct day is clicked
function displayBouquet(day) {
    document.getElementById('calendarContainer').style.display = 'none';
    document.getElementById('bouquetContainer').style.display = 'block';
    document.getElementById('messageContainer').style.display = 'block';
    document.getElementById('memeGif').style.display = 'none';

    // Use the same content array as updateContent()
    const content = [
        { src: "images/reason1.jpeg", message: "Mon chaton, starting tomorrow, every morning you'll wake up to a new reason why I love you! 200 days, 200 reminders of how special you are to me. Please try to enjoy each fact equally, and not show preference for any over the others" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of your kindness" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of your musical taste" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of your delicious baking" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of your amazing smile" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of your're a foodie" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Your're extremely talented" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Your're special" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "You make me feel loved" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "You're super creative" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of the time you devote to me" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of how you always listen to me" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of how cared for you make me feel" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of your hilarious humor" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "You dance amazingly well" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "You're a little sunshine" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "You check my vibe" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "You're goofy and silly" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "You have the most beautifull beauty marks" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of how you've changed me for the better" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "You're present" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of your amazing handicrafts" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of your amazing drawings" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of your determination" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of your laugh" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of your cuddles..." },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of your guili guilis" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of your sewing skills" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of your handmade gifts" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of your food indecisiveness" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of your patience" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of your eyes" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of your lovely singing voice" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of how you speak portuguese" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of your smooooooth skin" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of your leg beauty mark" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of your style" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of your perfect imperfections" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of your crazy ideas" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "You have the sexiest body" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of your generosity" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of your sustainability... yes I actually do" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of your love for plants" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of your skincare" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of your stinky farts" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Your're very intelligent" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Your're like no one else" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "You scream like crazy in roller coasters" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "You make me fear losing you" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of your love for cats" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of your kindness" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Your're mine" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Your're a really good person" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "You make me feel comfortable" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of your stinky farts" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Your're also my best friend" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of your cute little ears" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "You make me feel like I belong with you" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of your perfect body" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "You bring me joy" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Food tastes better with you" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "You make me want to write you 200 reasons of why I love you... and let me tell you 200 is A LOT" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "You make me laugh soooo much" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "You can change my day with just one phone call" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "You make long distance easier" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "You're everything I could've ever wished for" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "You cook reaaaally well" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of the future you see with me" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of your kisses..." },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of how gentle you are" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of how brave you are!" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "I admire you" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of your attention to detail" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "You know me" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of your excited little jumps" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of your movies and series references" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "You know me" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of your good night calls" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "You get a bit grumpy when you're hungry" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "You're adventurous " },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "I love doing everything with you" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "You love partying" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of your snack choices" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of your cute messages" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "My heart beats harder whenever you tell me you love me" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Even showering is better with you" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "You introduced me into your life" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of your bondness to family" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of our shared vision" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of your love for pasteis de nata" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of you always stick musics in my head" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "I love doing tiktok trends with you" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of your home decor taste" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "You're naturally beautifull" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "You're not superficial" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "You love to travel" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of your laptop stickers" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of simply being you" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of your dessert cravings" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "You have the sexiest body" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of your focused face" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "You love cheeeese" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "You believe in us" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "Of your pretty hair" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "You smell sooo good" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "It feels like home if I'm with you" },
        { src: `images/reason${Math.floor(Math.random() * 29) + 1}.jpeg`, message: "You're you, and that's more than enough" }
    ];
    
    // Get today's message index to ensure consistency
    const messageIndex = getNextMessageIndex(content.length);
    document.getElementById('bouquetImage').src = content[messageIndex].src;
    document.getElementById('dailyMessage').textContent = content[messageIndex].message;

    // Add close button functionality
    const closeButton = document.getElementById('closeButton');
    closeButton.style.display = 'block';

    closeButton.addEventListener('click', () => {
        document.getElementById('calendarContainer').style.display = 'block';
        document.getElementById('bouquetContainer').style.display = 'none';
        document.getElementById('messageContainer').style.display = 'none';
        document.getElementById('memeGif').style.display = 'none';
        closeButton.style.display = 'none';
    });
}

// Show a meme GIF when the wrong day is clicked
function showMeme(day) {
    document.getElementById('calendarContainer').style.display = 'none';
    document.getElementById('memeGif').style.display = 'block';
    document.getElementById('bouquetContainer').style.display = 'none';
    document.getElementById('messageContainer').style.display = 'none';

    const memeUrl = `images/meme_day_${day}.gif`;
    document.getElementById('memeGif').src = memeUrl;
}

// Emoji reaction function
export function react(emoji) {
    const numberOfEmojis = 10;
    for (let i = 0; i < numberOfEmojis; i++) {
        createFallingEmoji(emoji);
    }
    storeEmojiReaction(emoji);
}

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

// Egg click handlers
const eggs = document.querySelectorAll('.egg');
eggs.forEach((egg) => {
    const emoji = egg.querySelector('.emoji-face');
    egg.addEventListener('click', () => {
        emoji.classList.toggle('show');
    });
});

// Initialize the application
adventCalendar();
updateContent();