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
        { src: "images/flower13.jpg", message: "Can´t wait to give you real ones! 💛" },
        { src: "images/flower14.jpg", message: "You fill my life with color! 🎨" },
        { src: "images/flower1.jpg", message: "Love is a choice and I choose you! 💕" },
        { src: "images/flower15.jpg", message: "Can´t wait to match pjs with you! 👉 👈" },
        { src: "images/flower16.jpg", message: "Some days may be good some may be shit! At least I always have my chaton!💛💛💛" },
        { src: "images/flower17.jpg", message: "You make me find peace and happiness like no one else... 🌸🐈" }

    ];

    const today = new Date();
    // Set today's picture to the 15th entry explicitly
    const dayIndex = 17;  // Array index starts from 0, so 14 corresponds to the 15th entry

    document.getElementById('bouquetImage').src = content[dayIndex].src;
    document.getElementById('dailyMessage').textContent = content[dayIndex].message;
}

// Countdown timer
export function countdown() {
    const countToDate = new Date('October 31, 2024 16:20:00').getTime();
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
            countdownElement.textContent = "I'm with mon chaton now! 💛";
            bouquetImageElement.src = "images/together.jpg";
            dailyMessageElement.textContent = "We're together at last! 💞";
        }
    }

    setInterval(updateCountdown, 1000);
}

// Emoji reaction
export function react(emoji) {
    const numberOfEmojis = 10;
    for (let i = 0; i < numberOfEmojis; i++) {
        createFallingEmoji(emoji);
    }
    storeEmojiReaction(emoji); // Store emoji reaction in Firebase
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

// Call functions to initialize content and countdown
updateContent();
countdown();
