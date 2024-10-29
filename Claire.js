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
        { src: "images/flower19.jpg", message: "Je t'aime plus chaque jour! 💗" },
        { src: "images/flower20.jpg", message: "Love you more than words can say! 💞" },
        { src: "images/flower21.jpg", message: "Learning French for you is my favorite new activity. Merci, mon chaton! 🌸" },
        { src: "images/flower22.jpg", message: "Harry Potter, the Boy Who Lived… come to die.(Pretend it´s me saying it) nheheheh" },
        { src: "images/flower23.jpg", message: "Stay safe and drink water, love. Have a fantastic day! 💛" },
        { src: "images/flower24.jpg", message: "Je suis fou de toi!💛" },
        { src: "images/flower25.jpg", message: "You complete me! ❤️" },
        { src: "images/flower26.jpg", message: "Je suis tellement chanceux de t'avoir! 🍀" },
        { src: "images/flower27.jpg", message: "Wishing the sexiest girl a wonderfull day🌸 🌟" },
        { src: "images/flower28.jpg", message: "Have a magical day my pookie! Don't forget that I'm always here for you. 💞💞" },
        { src: "images/flower29.jpg", message: "Je t'adore plus que tout! 💕" },
        { src: "images/flower30.jpg", message: "Hey cuties just want you to konw that your smile lights up my world! 🌟" },
        { src: "images/flower31.jpg", message: "Merci d'être toi, je t'aime! 💖" }
    ];

    const today = new Date();
    today.setDate(today.getDate() + 1);

    const currentHour = today.getHours();
    const currentMinutes = today.getMinutes();
    let dayIndex;

    if (currentHour >= 7) {
        const diffTime = Math.abs(today - new Date(today.getFullYear(), today.getMonth(), today.getDate() - (today.getDate() % 14)));
        dayIndex = Math.floor(diffTime / (1000 * 60 * 60 * 24)) % 14;
    } else {
        const diffTime = Math.abs(today - new Date(today.getFullYear(), today.getMonth(), today.getDate() - (today.getDate() % 14) - 1));
        dayIndex = Math.floor(diffTime / (1000 * 60 * 60 * 24)) % 14;
    }

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

            countdownElement.textContent = ${days}d ${hours}h ${minutes}m ${seconds}s;
        } else {
            countdownElement.textContent = "I'm with my Pookie now! 💖";
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