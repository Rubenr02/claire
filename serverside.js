// Import necessary modules
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

// Initialize Firebase Admin SDK
admin.initializeApp();

// Configure Nodemailer transport using environment variables
const gmailUser = functions.config().gmail.user; // Get the Gmail user from Firebase config
const gmailPassword = functions.config().gmail.password; // Get the Gmail password from Firebase config

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: gmailUser,
        pass: gmailPassword,
    },
});

// Cloud Function triggered on new emoji reactions
exports.sendEmailNotification = functions.firestore
    .document('emojiReactions/{reactionId}')
    .onCreate(async (snap, context) => {
        const reactionData = snap.data();
        const emoji = reactionData.emoji;

        const mailOptions = {
            from: gmailUser, // Use the environment variable
            to: 'rubenmrodrigues02@gmail.com', // The email you want to send to
            subject: 'New Emoji Reaction!',
            text: `A new emoji reaction was added: ${emoji}`,
        };

        try {
            await transporter.sendMail(mailOptions);
            console.log('Email sent successfully');
        } catch (error) {
            console.error('Error sending email:', error);
        }
    });
