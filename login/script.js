import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0efDsBW7fqjNUGRQId0CCYRAsqNOn15Q",
  authDomain: "pomodoro-d2df9.firebaseapp.com",
  projectId: "pomodoro-d2df9",
  storageBucket: "pomodoro-d2df9.firebasestorage.app",
  messagingSenderId: "546380577610",
  appId: "1:546380577610:web:f6cb3a437082624ece1fb3",
  measurementId: "G-HLLFNJBDWN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Handle Email Sign-In
document.getElementById("loginForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      alert(`Welcome ${user.email}`);
      window.location.href = "../index.html?username=" + encodeURIComponent(user.email.split("@")[0]);
    })
    .catch((error) => {
      alert("Error: " + error.message);
    });
});

// Handle Google Sign-In
document.getElementById("googleSignInBtn").addEventListener("click", () => {
  const provider = new GoogleAuthProvider();

  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      alert(`Welcome ${user.displayName}`);
      window.location.href = "../index.html?username=" + encodeURIComponent(user.displayName);
    })
    .catch((error) => {
      alert("Error: " + error.message);
    });
});

// Handle Form Submission
document.getElementById('loginForm').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent form from refreshing the page

  // Get the user's name
  const userName = document.getElementById('login-name').value;

  // Store the user's name in local storage
  localStorage.setItem('userName', userName);

  // Redirect to the home page
  window.location.href = '../home/home.html'; // Adjust the path to your home page
});